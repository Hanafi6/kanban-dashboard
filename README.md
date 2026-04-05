# 📋 Kanban Board Task Manager

A professional, responsive Kanban-style ToDo application built with **React**, **Zustand**, and **TanStack Query**. Featuring smooth drag-and-drop interactions, custom themes, and optimistic updates.

## 🚀 Live Demo
https://kanavan1.netlify.app/ *(Adding a live link is a big plus!)*

## ✨ Features
- **Full CRUD Operations:** Create, Read, Update, and Delete tasks seamlessly.
- **Drag & Drop:** Move tasks between 4 columns (**Backlog, In Progress, Review, Done**) using `@hello-pangea/dnd`.
- **Optimistic Updates:** Instant UI feedback using React Query for a "zero-latency" feel.
- **Advanced Search:** Real-time filtering by task title or description.
- **Smart Modal System:**
  - Unified Modal for Adding and Editing tasks.
  - **Safe Exit:** Confirmation dialog appears if you try to close the modal with unsaved changes (Dirty State Check).
- **Responsive UI:** Fully optimized for all screen sizes, from mobile (320px) to desktop.
- **Custom Theming:** CSS Variables-based theme supporting easy dark/light mode integration.

## 🛠️ Tech Stack
- **Core:** React 18 + TypeScript + Vite.
- **State Management:** - **Zustand:** For UI states (Modals, Task selection).
  - **TanStack Query (v5):** For server state, caching, and mutations.
- **Styling:** Material UI (MUI) + Custom CSS Modules.
- **Animations:** Framer Motion for smooth modal and card transitions.
- **Backend Mock:** `json-server`.

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone [https://github.com/Hanafi6/kanban-dashboard.git](https://github.com/Hanafi6/kanban-dashboard.git.git)
cd your-repo-name

npm install

This project requires json-server to be running.

npx json-server --watch db.json --port 4000

The API will be live at: http://localhost:4000/tasks

npm run dev

📂 Project Structure
/src/components: UI components (Columns, Cards, SearchBar, Form).

/src/hooks: Custom React Query hooks for data fetching.

/src/store: Zustand store for global UI state.

/src/Styels: Global CSS and Theme variables.

/src/types: TypeScript definitions.
