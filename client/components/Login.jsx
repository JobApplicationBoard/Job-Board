import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const Login = () => {
  return (
    <div>
      <form>
        <label>
          Username: <input id="usernameInput" placeholder="username"></input>
        </label>

        <label>
          Password:<input id="passwordInput" placeholder="password"></input>
        </label>

        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
