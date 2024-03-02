import React, { useState, useContext, Fragment } from "react";
import "./taskForm.css";
import TaskContext from "../../../tasks-context/taskContext";
import Navbar from "../../navbar/navbar";

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
    startDate: new Date().toISOString().slice(0, 10),
    endDate: "",
    priority: "Medium",
  });
  const ctx = useContext(TaskContext);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with:", formData);
    formData.userId = ctx.user._id;
    const res = await ctx.createTask(formData);
    if (res) {
      setFormData({
        title: "",
        description: "",
        completed: false,
        startDate: new Date().toISOString().slice(0, 10),
        endDate: "",
        priority: "Medium",
      });
    }
  };

  return (
    <Fragment>
      <Navbar />

      <form onSubmit={handleSubmit} className="task-form">
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />

        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />

        <label htmlFor="completed">Completed:</label>
        <input type="checkbox" id="completed" name="completed" checked={formData.completed} onChange={handleChange} />

        <label htmlFor="startDate">Start Date:</label>
        <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} />

        <label htmlFor="endDate">End Date:</label>
        <input type="date" id="endDate" name="endDate" value={formData.endDate} onChange={handleChange} />

        <label htmlFor="priority">Priority:</label>
        <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <button type="submit">Submit Task</button>
      </form>
    </Fragment>
  );
};

export default TaskForm;
