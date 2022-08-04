import React from "react";
import "./Signin.css";

const Signin = () => {
  return (
    <>
      <div class="signup">
        <h1 class="signup-heading">Sign up</h1>
        <button class="signup-social">
          <i class="fa fa-google signup-social-icon"></i>
          <span class="signup-social-text">Sign up with Google</span>
        </button>
        <div class="signup-or">
          <span>Or</span>
        </div>
        <form action="#" class="signup-form" autocomplete="off">
          <label for="fullname" class="signup-label">
            Full name
          </label>
          <input
            type="text"
            id="fullname"
            class="signup-input"
            placeholder="Eg: John Doe"
          />
          <label for="email" class="signup-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            class="signup-input"
            placeholder="Eg: johndoe@gmai.com"
          />
          <button class="signup-submit">Sign up</button>
        </form>
        <p class="signup-already">
          <span>Already have an account ?</span>
          <a href="#" class="signup-login-link">
            Login
          </a>
        </p>
      </div>
    </>
  );
};
export default Signin;
