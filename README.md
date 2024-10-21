
## Task Management Application

This is the frontend for the Task Management system, built with **Angular** and **PrimeNG**. It allows users to manage tasks and visualize task assignments.

---

### Prerequisites

- **Node.js and npm**: [Download Link](https://nodejs.org/)
- **Angular CLI**: Install globally with:
  ```bash
  npm install -g @angular/cli
  ```

---

### Getting Started

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/task-management-frontend.git
   cd task-management-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**

   Create `src/environments/environment.ts` with the following content:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:5000/api'
   };
   ```

---

### Running the Application

Start the development server:
```bash
ng serve
```

Open your browser to `http://localhost:4200`.

---

### Features

- **User Authentication**: Register and log in.
- **Task Management**: Create and view tasks.
- **Task Assignment**: Assign tasks to users.
- **Visualization**: View task assignments in a graphical format.

---

### Project Structure

- **app/**
  - **auth/** - Login and registration components.
  - **components/** - Various components of applicaiton
  - - **dashboard/** - User dashboard.
  - - **tasks/** - Task-related components.
  - - **user-task-graph/** - Component for task visualization.
  - **services/** - Shared services for API calls.
- **environments/** - Configuration files for different environments.

---

### Notes

- Ensure that the API URL in `environment.ts` matches your backend API.
- The application uses **PrimeNG** components for UI elements.
- Modify styles and themes in `styles.css` and Angular configuration.
