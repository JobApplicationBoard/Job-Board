import React, { useState } from 'react';

const Login = ({ setRenderLogin }) => {
  // declare state for object with username & password in it
  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  // Handle submission of the event
  const handleSubmitEvent = async (e) => {
    try {
      // Prevents page refresh
      e.preventDefault();
      // fetch request to /user/login
      let response = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      // User now has a cookie with userId, lets redirect
      if(response.status === 200) setRenderLogin(false);
      
    } catch (err) {
      console.log(
        'Error when submitting in login component. Error is: ',
        err
      );
    }
  };

  // Handle typing in the form boxes
  // Opted not to use Redux to limit dependencies, and since this won't be used in any other components
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div id="loginContainer">
      <form id="loginForm" onSubmit={handleSubmitEvent}>
        <div id="loginInput">
          <label>
            Username:
            <input
              id="usernameInput"
              placeholder="username"
              name="username"
              onChange={handleInput}
            ></input>
          </label>

          <label>
            Password:
            <input
              id="passwordInput"
              type="password"
              placeholder="password"
              name="password"
              onChange={handleInput}
            ></input>
          </label>
        </div>
        <div id="loginButtonsContainer">
          <button id="createAccount" type="button">
            Create Account
          </button>
          <button id="loginSubmit" type="submit">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
