import SignIn from "./login-form/loginPage";
import SignUp from "./register-form/signupPage";
import classes from "./auth.module.css";
import { useState } from "react";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const activateSignIn = () => {
    setIsSignIn(true);
  };

  const activateSignUp = () => {
    setIsSignIn(false);
  };

  return (
    <div>
      <div className={classes.btnsBox}>
        <button className={isSignIn ? classes.activeBtn : ""} onClick={activateSignIn}>
          Sign In
        </button>
        <button className={!isSignIn ? classes.activeBtn : ""} onClick={activateSignUp}>
          Sign Up
        </button>
      </div>
      {isSignIn && <SignIn />}
      {!isSignIn && <SignUp />}
    </div>
  );
};
export default Auth;
