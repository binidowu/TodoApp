import React, { createContext, useState, useEffect, useCallback } from "react";

import axios from "axios";
import { Alert } from "bootstrap";

// Axios default configuration to include credentials with every request
axios.defaults.withCredentials = true;

// Initial context state
const initialState = {
  user: null,
  tasks: [],
  isLoggedIn: false,
};

// Create the context
export const TaskContext = createContext(initialState);

// Provider component
export const TaskProvider = ({ children }) => {
  const [state, setState] = useState(() => {
    const userStored = localStorage.getItem("user");
    return userStored ? { ...initialState, user: JSON.parse(userStored), isLoggedIn: true } : initialState;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch tasks if user is logged in
    if (state.isLoggedIn) {
      fetchTasks();
    }
  }, []);

  // Function to update the tasks in the state
  const updateTasks = useCallback((tasks) => {
    setState((prevState) => ({ ...prevState, tasks }));
  }, []);

  // Authentication methods
  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Sign in failed");
      }
      console.log("Sign in successful:", data);

      // Use a function to ensure we have the most recent state
      setState((prevState) => ({ ...prevState, user: data.user, isLoggedIn: true }));
      localStorage.setItem("user", JSON.stringify(data.user));
      setLoading(false);
      return true;
    } catch (error) {
      setError(error.message || "Sign in failed. Please try again.");
      setState({ ...state, isLoggedIn: false });
      setLoading(false);
    }
  };

  const signUp = async (userData) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Sign up failed");
      }
      await signIn(userData.email, userData.password);
    } catch (error) {
      setLoading(false);
      console.error("Sign up failed:", error.message);
      setState({ ...state, isLoggedIn: false });
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/users/logout", { method: "GET" });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Logout failed");
      }
      setState({ ...state, user: null, isLoggedIn: false, tasks: [] });
      localStorage.removeItem("user");
      setLoading(false);
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Logout failed. Please try again.");
      setLoading(false);
    }
  };

  // Task management methods
  // const fetchTasks = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3000/", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await response.json();
  //     if (!response.ok) {
  //       throw new Error("Fetching tasks failed");
  //     }
  //     console.log("response get all task", data);
  //     updateTasks(data.tasks);
  //   } catch (error) {
  //     console.error("Fetching tasks failed:", error);
  //     setState({ ...state, tasks: [] });
  //   }
  // };

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tasks", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Fetching tasks failed");
      }
      console.log("response get all task", response.data);
      updateTasks(response.data.tasks);
    } catch (error) {
      console.error("Fetching tasks failed:", error);
      setState({ ...state, tasks: [] });
    }
  };

  const fetchTaskById = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:3000/${taskId}`);
      updateTasks(response.data.task);
    } catch (error) {
      console.error("Fetching task failed:", error);
      setState({ ...state, tasks: [] });
    }
  };

  const createTask = async (taskData) => {
    try {
      const response = await fetch("http://localhost:3000/newtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Creating task failed");
      }
      console.log("Task created:", data);
      updateTasks([...state.tasks, response.task]);
      return true;
    } catch (error) {
      console.error("Creating task failed:", error);
      alert("Creating task failed. Please try again.");
    }
  };

  const editTask = async (taskId, taskData) => {
    try {
      const response = await axios.put(`http://localhost:3000/${taskId}`, taskData);
      updateTasks(state.tasks.map((task) => (task._id === taskId ? response.data.task : task)));
    } catch (error) {
      console.error("Editing task failed:", error);
      setState({ ...state, tasks: [] });
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/${taskId}`);
      updateTasks(state.tasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Deleting task failed:", error);
      setState({ ...state, tasks: [] });
    }
  };

  const deleteAllTasks = async (taskId) => {
    try {
      await axios.delete("http://localhost:3000/all");
      updateTasks([]);
    } catch (error) {
      console.error("Deleting all tasks failed:", error);
      setState({ ...state, tasks: [] });
    }
  };

  // The context value that will be supplied to any descendants of this provider
  const contextValue = {
    ...state,
    signIn,
    signUp,
    signOut,
    fetchTasks,
    fetchTaskById,
    createTask,
    editTask,
    deleteTask,
    deleteAllTasks,
  };

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>;
};

export default TaskContext;
