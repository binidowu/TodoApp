import React, { useState, useContext } from "react";
import TaskContext from "../../../tasks-context/taskContext";
import classes from "../auth.module.css";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { signIn } = useContext(TaskContext);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with:", userData);
    const res = await signIn(userData.email, userData.password);
    console.log("res", res);
    if (res) {
      navigate("/tasks");
    }
  };

  return (
    <div className={classes.signupContainer}>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="login-email" name="email" value={userData.email} onChange={handleChange} required />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" minLength={8} placeholder="********" id="login-password" name="password" value={userData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};
export default SignIn;
