import React, { useContext } from "react";
import TaskContext from "../../tasks-context/taskContext";
import classes from "../navbar/navbar.module.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { signOut } = useContext(TaskContext);
  const navigate = useNavigate();

  // Dummy functions for "Display Tasks" and "Delete All Tasks" actions
  const displayTasks = () => {
    console.log("Displaying tasks...");
    navigate("/tasks");
    // Implement task display logic here
  };

  const deleteAllTasks = () => {
    console.log("Deleting all tasks...");
    // Implement task deletion logic here
  };

  const createTaskHanlder = () => {
    navigate("/tasks/taskform");
  };

  const signOutHandler = () => {
    console.log("Signing out...");
    signOut();
  };

  return (
    <nav className={classes.nav}>
      <h1>Task Manager</h1>
      <div className={classes.navBtnBox}>
        <button onClick={createTaskHanlder} className={classes.button}>
          Create Task
        </button>
        <button onClick={displayTasks} className={classes.button}>
          Display Tasks
        </button>
        <button onClick={deleteAllTasks} className={classes.button}>
          Delete All Tasks
        </button>
        <button onClick={signOutHandler} className={classes.button}>
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
