import { createApp } from './createApp.js'
import { createSchedulePage } from './createSchedulePage.js'

function setActiveTab(tabId) {
  document.querySelectorAll('[data-tab-target]').forEach((button) => {
    button.classList.toggle('active', button.dataset.tabTarget === tabId)
  })

  document.querySelectorAll('[data-tab-panel]').forEach((panel) => {
    panel.hidden = panel.dataset.tabPanel !== tabId
  })
}

function initTabs() {
  const defaultTab = window.location.hash === '#schedule' ? 'schedule' : 'plan'
  setActiveTab(defaultTab)

  document.querySelectorAll('[data-tab-target]').forEach((button) => {
    button.addEventListener('click', () => {
      const tabId = button.dataset.tabTarget
      if (!tabId) return
      window.location.hash = tabId === 'schedule' ? 'schedule' : 'plan'
      setActiveTab(tabId)
    })
  })

  window.addEventListener('hashchange', () => {
    setActiveTab(window.location.hash === '#schedule' ? 'schedule' : 'plan')
  })
}

createApp()
createSchedulePage('#embedded-schedule-app')
initTabs()
