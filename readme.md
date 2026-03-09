# House Layout Designer

## Purpose

The **House Layout Designer** is a lightweight browser-based tool used to design and visualize home floor plans.
It provides an interactive canvas where rooms, walls, and layout components can be rendered and manipulated for quick architectural prototyping.

The project is intended for **simple layout experimentation and planning**, allowing users to test house configurations before committing them to formal design software.

This project runs entirely in the browser and uses a small JavaScript module structure with a canvas-based rendering approach.

---

**index.html**

* Defines the application container
* Loads the main JavaScript module
* Provides the base canvas area where the layout is rendered

**main.js**

* Contains the logic responsible for rendering the house layout
* Handles drawing operations and layout structure
* Serves as the main entry point for the client-side logic

---

# Requirements

* **Node.js** (Latest LTS recommended)
* **npm** (comes with Node.js)
* **npx live-server** for local development

---

# Setup

Clone the repository:

```
git clone <repo-url>
cd <repo-folder>
```

Ensure you are using the latest version of Node and npm:

```
node -v
npm -v
```

---

# Install Dependencies

This project does not require a full dependency install.
For local development we use **live-server** to serve the files.

You can run it directly with **npx**:

```
npx live-server
```

If you prefer installing it globally:

```
npm install -g live-server
```

Then run:

```
live-server
```

---

# Running the Project

Start the development server:

```
npx live-server
```

This will:

* Start a local development server
* Automatically open the project in your browser
* Refresh the browser when files change

The project will typically run at:

```
http://127.0.0.1:8080
```

---

# Development Notes

* The project uses **vanilla JavaScript modules**
* Rendering is handled using the **HTML Canvas API**
* No frontend framework is used
* The application is designed to remain lightweight and easy to extend

Future enhancements may include:

* Room snapping
* Wall thickness controls
* Measurement display
* Exporting floor plans
* Grid alignment
* Drag-and-drop layout editing

---

# License

Add your preferred license here (MIT, Apache 2.0, etc).
