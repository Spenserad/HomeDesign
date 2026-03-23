import {
  buildSchedule,
  getSchedulePhaseMap,
  schedulePhases,
} from "../data/buildSchedule.js";

const phaseMap = getSchedulePhaseMap();
const allTaskIds = new Set(buildSchedule.map((task) => task.id));

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalize(value) {
  return String(value).trim().toLowerCase();
}

function matchesSearch(task, query) {
  if (!query) return true;

  const haystack = [
    task.id,
    task.name,
    task.subcontractor,
    task.phaseId,
    task.inspection,
    task.notes,
    ...task.dependsOn,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query);
}

function createDownloadCsv(tasks) {
  const header = [
    "Phase",
    "Task ID",
    "Task Name",
    "Subcontractor",
    "Duration (Days)",
    "Depends On",
    "Inspection",
    "Milestone",
    "Owner Task",
    "Notes",
  ];
  const rows = tasks.map((task) => [
    phaseMap[task.phaseId]?.label ?? task.phaseId,
    task.id,
    task.name,
    task.subcontractor,
    task.duration,
    task.dependsOn.join(" | "),
    task.inspection,
    task.milestone ? "Yes" : "No",
    task.ownerTask ? "Yes" : "No",
    task.notes,
  ]);

  const csv = [header, ...rows]
    .map((row) =>
      row
        .map((cell) => `"${String(cell ?? "").replaceAll('"', '""')}"`)
        .join(","),
    )
    .join("\n");

  return `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
}

function buildSummary(tasks) {
  const totalTasks = tasks.length;
  const totalDuration = tasks.reduce((sum, task) => sum + task.duration, 0);
  const totalInspections = tasks.filter((task) =>
    Boolean(task.inspection),
  ).length;
  const totalMilestones = tasks.filter((task) => task.milestone).length;
  const ownerTasks = tasks.filter((task) => task.ownerTask).length;

  return {
    totalTasks,
    totalDuration,
    totalInspections,
    totalMilestones,
    ownerTasks,
  };
}

function taskTag(label, kind = "") {
  return `<span class="task-tag ${kind}">${escapeHtml(label)}</span>`;
}

function taskCard(task) {
  const phase = phaseMap[task.phaseId];
  const tags = [
    task.milestone ? taskTag("Milestone", "milestone") : "",
    task.ownerTask ? taskTag("Owner", "owner") : "",
    task.inspection ? taskTag("Inspection", "inspection") : "",
  ].join("");

  const dependencyTags = task.dependsOn.length
    ? task.dependsOn.map((item) => taskTag(item, "dependency")).join("")
    : '<span class="muted">None</span>';

  return `
    <article class="task-card" data-task-id="${escapeHtml(task.id)}">
      <div class="task-card-top">
        <div>
          <div class="task-meta-row">
            <span class="phase-dot" style="background:${phase?.color ?? "#999"}"></span>
            <span class="task-id">${escapeHtml(task.id)}</span>
          </div>
          <h3>${escapeHtml(task.name)}</h3>
        </div>
        <div class="duration-pill">${task.duration} day${task.duration === 1 ? "" : "s"}</div>
      </div>
      <div class="task-sub-row">
        <span>${escapeHtml(phase?.label ?? task.phaseId)}</span>
        <span>•</span>
        <span>${escapeHtml(task.subcontractor)}</span>
      </div>
      <div class="tag-row">${tags || '<span class="muted">Standard task</span>'}</div>
      <div class="task-grid">
        <div>
          <div class="field-label">Depends on</div>
          <div class="chip-wrap">${dependencyTags}</div>
        </div>
        <div>
          <div class="field-label">Inspection</div>
          <div>${task.inspection ? escapeHtml(task.inspection) : '<span class="muted">None</span>'}</div>
        </div>
      </div>
      <div>
        <div class="field-label">Notes</div>
        <div>${task.notes ? escapeHtml(task.notes) : '<span class="muted">No extra notes</span>'}</div>
      </div>
    </article>
  `;
}

function computeTimeline(tasks) {
  const taskMap = new Map(tasks.map((task) => [task.id, task]));
  const cache = new Map();

  function compute(id, stack = new Set()) {
    if (cache.has(id)) return cache.get(id);
    if (stack.has(id)) {
      return { start: 0, finish: taskMap.get(id)?.duration ?? 0 };
    }

    const task = taskMap.get(id);
    if (!task) return { start: 0, finish: 0 };

    stack.add(id);
    const start = task.dependsOn.reduce((maxStart, depId) => {
      if (!taskMap.has(depId)) return maxStart;
      const dep = compute(depId, stack);
      return Math.max(maxStart, dep.finish);
    }, 0);

    const result = { start, finish: start + task.duration };
    cache.set(id, result);
    stack.delete(id);
    return result;
  }

  const enriched = tasks.map((task) => {
    const timing = compute(task.id);
    return {
      ...task,
      startDay: timing.start + 1,
      finishDay: timing.finish,
      phase: phaseMap[task.phaseId],
    };
  });

  const totalDays = enriched.reduce(
    (max, task) => Math.max(max, task.finishDay),
    0,
  );
  return { tasks: enriched, totalDays };
}

function ganttSection(state) {
  return `
    <section class="schedule-gantt-panel">
      <div class="schedule-gantt-toolbar">
        <div>
          <h3 style="margin:0;">Gantt Chart</h3>
          <p class="muted" style="margin:4px 0 0;">
            Dependency-based relative schedule rendered with Frappe Gantt.
          </p>
        </div>
        <div class="schedule-gantt-actions">
          <button
            type="button"
            class="toggle-button ${state.showGantt ? "active" : ""}"
            data-action="toggle-gantt"
          >
            ${state.showGantt ? "Hide Gantt" : "Show Gantt"}
          </button>
        </div>
      </div>

      <div class="schedule-gantt-host ${state.showGantt ? "" : "schedule-hidden"}" id="schedule-gantt-host"></div>
    </section>
  `;
}

export function createSchedulePage(target = "#schedule-app") {
  const root = document.querySelector(target);
  if (!root) throw new Error(`Schedule root not found for selector: ${target}`);

  const state = {
    query: "",
    selectedPhaseIds: new Set(schedulePhases.map((phase) => phase.id)),
    inspectionsOnly: false,
    milestonesOnly: false,
    ownerOnly: false,
    sortBy: "phase",
    viewMode: "cards",
    showGantt: false,
    zoom: "medium",
  };

  function getVisibleTasks() {
    const query = normalize(state.query.trim());

    const filtered = buildSchedule.filter((task) => {
      if (!state.selectedPhaseIds.has(task.phaseId)) return false;
      if (state.inspectionsOnly && !task.inspection) return false;
      if (state.milestonesOnly && !task.milestone) return false;
      if (state.ownerOnly && !task.ownerTask) return false;
      if (!matchesSearch(task, query)) return false;
      return true;
    });

    const phaseOrder = Object.fromEntries(
      schedulePhases.map((phase, index) => [phase.id, index]),
    );

    filtered.sort((a, b) => {
      switch (state.sortBy) {
        case "duration-desc":
          return b.duration - a.duration || a.id.localeCompare(b.id);
        case "duration-asc":
          return a.duration - b.duration || a.id.localeCompare(b.id);
        case "task":
          return a.name.localeCompare(b.name);
        case "phase":
        default:
          return (
            phaseOrder[a.phaseId] - phaseOrder[b.phaseId] ||
            a.id.localeCompare(b.id)
          );
      }
    });

    return filtered;
  }

  function phaseToggleHtml() {
    return schedulePhases
      .map((phase) => {
        const active = state.selectedPhaseIds.has(phase.id);
        return `
        <button
          type="button"
          class="phase-filter ${active ? "active" : ""}"
          data-phase-id="${phase.id}"
          style="--phase-color:${phase.color}"
        >
          ${escapeHtml(phase.label)}
        </button>
      `;
      })
      .join("");
  }

  function cardsSection(visibleTasks) {
    const groups = schedulePhases
      .map((phase) => ({
        phase,
        tasks: visibleTasks.filter((task) => task.phaseId === phase.id),
      }))
      .filter((group) => group.tasks.length > 0);

    return `
      <section class="group-list ${state.viewMode === "gantt" ? "hidden-view" : ""}">
        ${
          groups.length
            ? groups
                .map(
                  ({ phase, tasks }) => `
          <details class="phase-group" open>
            <summary>
              <span class="phase-summary-left">
                <span class="phase-dot large" style="background:${phase.color}"></span>
                <span>${escapeHtml(phase.label)}</span>
              </span>
              <span class="phase-summary-right">${tasks.length} tasks</span>
            </summary>
            <div class="task-list">
              ${tasks.map(taskCard).join("")}
            </div>
          </details>
        `,
                )
                .join("")
            : '<div class="empty-state">No tasks match the current filters.</div>'
        }
      </section>
    `;
  }

  function viewButton(value, label) {
    return `<button type="button" class="toggle-button ${state.viewMode === value ? "active" : ""}" data-view-mode="${value}">${label}</button>`;
  }

  function zoomButton(value, label) {
    return `<button type="button" class="toggle-button ${state.zoom === value ? "active" : ""}" data-zoom="${value}">${label}</button>`;
  }

  const FRAPPE_BASE_DATE = new Date("2026-01-05T00:00:00");

  function addDays(date, days) {
    const next = new Date(date);
    next.setDate(next.getDate() + days);
    return next;
  }

  function formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  function getDependencyIds(task) {
    if (!task.dependsOn) return [];
    if (Array.isArray(task.dependsOn)) {
      return task.dependsOn.map((x) => String(x).trim()).filter(Boolean);
    }
    return String(task.dependsOn)
      .split(",")
      .map((x) => x.trim())
      .filter(Boolean);
  }

  function buildRelativeSchedule(tasks) {
    const map = new Map(tasks.map((task) => [task.id, task]));
    const cache = new Map();

    function compute(taskId, stack = new Set()) {
      if (cache.has(taskId)) return cache.get(taskId);
      if (stack.has(taskId)) return { startDay: 0, endDay: 1 };

      const task = map.get(taskId);
      if (!task) return { startDay: 0, endDay: 1 };

      stack.add(taskId);

      const deps = getDependencyIds(task);
      let startDay = 0;

      for (const depId of deps) {
        const depRange = compute(depId, stack);
        startDay = Math.max(startDay, depRange.endDay);
      }

      const duration = Math.max(1, Number(task.duration || 1));
      const result = {
        startDay,
        endDay: startDay + duration,
      };

      cache.set(taskId, result);
      stack.delete(taskId);
      return result;
    }

    return tasks.map((task) => {
      const range = compute(task.id);
      return {
        ...task,
        startDay: range.startDay,
        endDay: range.endDay,
      };
    });
  }

  function toFrappeTasks(tasks) {
    const scheduled = buildRelativeSchedule(tasks);

    return scheduled.map((task) => {
      const start = addDays(FRAPPE_BASE_DATE, task.startDay);
      const end = addDays(
        FRAPPE_BASE_DATE,
        Math.max(task.startDay + 1, task.endDay),
      );

      const deps = getDependencyIds(task);

      return {
        id: task.id,
        name: `${task.id} · ${task.name}`,
        start: formatDate(start),
        end: formatDate(end),
        progress: 0,
        dependencies: deps.join(", "),
        custom_class: task.inspection
          ? "task-inspection"
          : task.ownerTask
            ? "task-owner"
            : task.milestone
              ? "task-milestone"
              : "",
      };
    });
  }

  function renderFrappeGantt(container, tasks, state) {
    if (!container || !window.Gantt) return;

    container.innerHTML = "";

    const svg = document.createElement("svg");
    container.appendChild(svg);

    const frappeTasks = toFrappeTasks(tasks);

    const viewMode =
      state.zoom === "close" ? "Week" : state.zoom === "wide" ? "Month" : "Day";

    new window.Gantt(svg, frappeTasks, {
      readonly: true,
      view_mode: viewMode,
      view_mode_select: true,
      scroll_to: "start",
      container_height: 560,
      column_width:
        state.zoom === "close" ? 38 : state.zoom === "wide" ? 60 : 45,
      bar_height: 24,
      padding: 18,
      lines: "both",
      popup: ({ task }) => {
        return `
        <div style="padding:10px 12px; min-width: 220px;">
          <div style="font-weight:700; margin-bottom:6px;">${task.name}</div>
          <div style="font-size:12px; color:#6b7280;">${task.start} → ${task.end}</div>
          <div style="font-size:12px; margin-top:8px;">Dependencies: ${task.dependencies || "None"}</div>
        </div>
      `;
      },
    });
  }

  function render() {
    const visibleTasks = getVisibleTasks();
    const summary = buildSummary(visibleTasks);
    const csvHref = createDownloadCsv(visibleTasks);

    root.innerHTML = `
      <section class="schedule-shell">
        <header class="hero">
          <div>
            <p class="eyebrow">Home Build Project</p>
            <h1>Construction Schedule</h1>
            <p class="hero-copy">
              Detailed owner-builder schedule with dependencies, inspection milestones, coordination tasks, and a relative Gantt chart view.
            </p>
          </div>
          <div class="hero-actions">
            <a class="button primary" href="${csvHref}" download="home-build-schedule.csv">Export CSV</a>
            <button type="button" class="button" data-action="reset-filters">Reset Filters</button>
          </div>
        </header>

        <section class="summary-grid">
          <article class="summary-card">
            <div class="summary-label">Visible Tasks</div>
            <div class="summary-value">${summary.totalTasks}</div>
          </article>
          <article class="summary-card">
            <div class="summary-label">Duration</div>
            <div class="summary-value">${summary.totalDuration}<span> days</span></div>
          </article>
          <article class="summary-card">
            <div class="summary-label">Inspections</div>
            <div class="summary-value">${summary.totalInspections}</div>
          </article>
          <article class="summary-card">
            <div class="summary-label">Milestones</div>
            <div class="summary-value">${summary.totalMilestones}</div>
          </article>
          <article class="summary-card">
            <div class="summary-label">Owner Tasks</div>
            <div class="summary-value">${summary.ownerTasks}</div>
          </article>
        </section>

        <section class="control-panel">
          <div class="control-row search-row">
            <label class="search-wrap">
              <span>Search</span>
              <input type="search" id="task-search" value="${escapeHtml(state.query)}" placeholder="Search task, trade, note, or inspection" />
            </label>
            <label class="select-wrap">
              <span>Sort</span>
              <select id="sort-by">
                <option value="phase" ${state.sortBy === "phase" ? "selected" : ""}>By phase</option>
                <option value="task" ${state.sortBy === "task" ? "selected" : ""}>By task name</option>
                <option value="duration-desc" ${state.sortBy === "duration-desc" ? "selected" : ""}>Duration high to low</option>
                <option value="duration-asc" ${state.sortBy === "duration-asc" ? "selected" : ""}>Duration low to high</option>
              </select>
            </label>
          </div>

          <div class="control-row phase-row">
            <div class="control-title">Phases</div>
            <div class="phase-filter-wrap">${phaseToggleHtml()}</div>
          </div>

          <div class="control-row check-row">
            <label><input type="checkbox" id="inspections-only" ${state.inspectionsOnly ? "checked" : ""} /> Inspection tasks only</label>
            <label><input type="checkbox" id="milestones-only" ${state.milestonesOnly ? "checked" : ""} /> Milestones only</label>
            <label><input type="checkbox" id="owner-only" ${state.ownerOnly ? "checked" : ""} /> Owner-builder tasks only</label>
          </div>

                    <div class="control-row view-row">
            <div class="toggle-group">
              <span class="control-title">View</span>
              <div class="toggle-wrap">
                ${viewButton("cards", "Cards")}
                ${viewButton("gantt", "Gantt")}
                ${viewButton("both", "Both")}
              </div>
            </div>

            <div class="toggle-group">
              <span class="control-title">Gantt Panel</span>
              <div class="toggle-wrap">
                <button
                  type="button"
                  class="toggle-button ${state.showGantt ? "active" : ""}"
                  data-action="toggle-gantt"
                >
                  ${state.showGantt ? "Hide Gantt" : "Show Gantt"}
                </button>
              </div>
            </div>

            <div class="toggle-group">
              <span class="control-title">Gantt Zoom</span>
              <div class="toggle-wrap">
                ${zoomButton("close", "Compact")}
                ${zoomButton("medium", "Medium")}
                ${zoomButton("wide", "Wide")}
              </div>
            </div>
          </div>
        </section>

        ${
          state.viewMode === "gantt" || state.viewMode === "both"
            ? ganttSection(state)
            : ""
        }

        ${
          state.viewMode === "cards" || state.viewMode === "both"
            ? cardsSection(visibleTasks)
            : ""
        }
      </section>
    `;

    if (
      state.showGantt &&
      (state.viewMode === "gantt" || state.viewMode === "both")
    ) {
      const ganttHost = root.querySelector("#schedule-gantt-host");
      renderFrappeGantt(ganttHost, visibleTasks, state);
    }

    bindEvents();
  }

  function bindEvents() {
    root.querySelector("#task-search")?.addEventListener("input", (event) => {
      state.query = event.target.value;
      render();
    });

    root.querySelector("#sort-by")?.addEventListener("change", (event) => {
      state.sortBy = event.target.value;
      render();
    });

    root
      .querySelector("#inspections-only")
      ?.addEventListener("change", (event) => {
        state.inspectionsOnly = event.target.checked;
        render();
      });

    root
      .querySelector("#milestones-only")
      ?.addEventListener("change", (event) => {
        state.milestonesOnly = event.target.checked;
        render();
      });

    root.querySelector("#owner-only")?.addEventListener("change", (event) => {
      state.ownerOnly = event.target.checked;
      render();
    });

    root.querySelectorAll("[data-phase-id]").forEach((button) => {
      button.addEventListener("click", () => {
        const phaseId = button.dataset.phaseId;
        if (!phaseId || !phaseMap[phaseId]) return;
        if (state.selectedPhaseIds.has(phaseId)) {
          if (state.selectedPhaseIds.size === 1) return;
          state.selectedPhaseIds.delete(phaseId);
        } else {
          state.selectedPhaseIds.add(phaseId);
        }
        render();
      });
    });

    root
      .querySelector('[data-action="toggle-gantt"]')
      ?.addEventListener("click", () => {
        state.showGantt = !state.showGantt;
        render();
      });

    root.querySelectorAll("[data-view-mode]").forEach((button) => {
      button.addEventListener("click", () => {
        state.viewMode = button.dataset.viewMode;

        if (state.viewMode === "gantt" || state.viewMode === "both") {
          state.showGantt = true;
        }

        render();
      });
    });

    root.querySelectorAll("[data-zoom]").forEach((button) => {
      button.addEventListener("click", () => {
        state.zoom = button.dataset.zoom;
        render();
      });
    });

    root
      .querySelector('[data-action="reset-filters"]')
      ?.addEventListener("click", () => {
        state.query = "";
        state.selectedPhaseIds = new Set(
          schedulePhases.map((phase) => phase.id),
        );
        state.inspectionsOnly = false;
        state.milestonesOnly = false;
        state.ownerOnly = false;
        state.sortBy = "phase";
        state.viewMode = "cards";
        state.showGantt = false;
        state.zoom = "medium";
        render();
      });
  }

  render();

  return {
    rerender: render,
    getVisibleTaskIds() {
      return getVisibleTasks().map((task) => task.id);
    },
    getTimeline() {
      return computeTimeline(buildSchedule);
    },
    getTaskById(id) {
      return buildSchedule.find((task) => task.id === id) ?? null;
    },
    getDependencyIssues() {
      return buildSchedule.flatMap((task) =>
        task.dependsOn
          .filter((depId) => !allTaskIds.has(depId))
          .map((depId) => ({ taskId: task.id, missingDependency: depId })),
      );
    },
  };
}
