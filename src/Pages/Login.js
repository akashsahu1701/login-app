import React from "react";
import { Link, Redirect } from "react-router-dom";

const Login = ({
  emailLogin,
  passwordLogin,
  roleLogin,
  redirect,
  handleEmailLogin,
  handlePasswordLogin,
  handleRoleLogin,
  handleSubmitLogin,
}) => {
  if (!redirect) {
    return (
      <div tetsid="Login" className="login-page">
        <h1>Login</h1>
        New To the Site ?
        <button className="button">
          <Link to="/register">
            <span>Register</span>
          </Link>
        </button>
        <br />
        <br />
        <form onSubmit={handleSubmitLogin} className="form">
          <label htmlFor="email">email</label>
          <input
            type="email"
            name="emailLogin"
            value={emailLogin}
            onChange={handleEmailLogin}
          />
          <label htmlFor="role">role</label>
          <select name="role" value={roleLogin} onChange={handleRoleLogin}>
            <option value="none"> None</option>
            <option value="student"> Student </option>
            <option value="teacher"> Teacher </option>
          </select>
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="passwordLogin"
            value={passwordLogin}
            onChange={handlePasswordLogin}
          />
          <button type="submit" className="button">
            <span>Login</span>
          </button>
        </form>
      </div>
    );
  } else {
    return <Redirect to="/landing" />;
  }
};

export default Login;
