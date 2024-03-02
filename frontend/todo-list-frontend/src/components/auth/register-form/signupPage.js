import React, { useState, useContext } from "react";
import { TaskContext } from "../../../tasks-context/taskContext";
import classes from "../auth.module.css";

const SignUp = () => {
  const { signUp } = useContext(TaskContext);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with:", userData);
    // Call the signUp method from context
    signUp(userData);
  };

  return (
    <div className={classes.signupContainer}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" value={userData.firstName} onChange={handleChange} required />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" value={userData.lastName} onChange={handleChange} required />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={userData.email} onChange={handleChange} required />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" minLength={8} placeholder="********" id="password" name="password" value={userData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
