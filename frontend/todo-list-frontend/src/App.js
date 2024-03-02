import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { TaskProvider } from "./tasks-context/taskContext";
import AuthPage from "./pages/authPage";
import PrivateRoute from "./components/private-route/privateRoute";
import TaskPage from "./pages/taskPage";
import TaskForm from "./components/tasks/task-form/taskForm";

const App = () => {
  return (
    <TaskProvider>
      <Router>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TaskPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/tasks/taskform"
            element={
              <PrivateRoute>
                <TaskForm />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/tasks" replace />} />
        </Routes>
      </Router>
    </TaskProvider>
  );
};

export default App;
