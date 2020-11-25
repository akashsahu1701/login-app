import React from "react";
import { Link } from "react-router-dom";

const Register = ({
  emailRegister,
  passwordRegister,
  roleRegister,
  handleEmailRegister,
  handlePasswordRegister,
  handleRoleRgister,
  handleSubmitRegister,
}) => {
  return (
    <div className="login-page">
      <h1>Register Here</h1>
      <form onSubmit={handleSubmitRegister} className="form">
        <label htmlFor="email">email</label>
        <input
          type="email"
          value={emailRegister}
          onChange={handleEmailRegister}
        />
        <label htmlFor="role">role</label>
        <select name="Role" value={roleRegister} onChange={handleRoleRgister}>
          <option value="none"> None </option>
          <option value="student"> Student </option>
          <option value="teacher"> Teacher </option>
        </select>
        <label htmlFor="password">password</label>
        <input
          type="password"
          value={passwordRegister}
          onChange={handlePasswordRegister}
        />
        <button type="submit" className="button">
          <span>Register</span>
        </button>
        <br />
        Already a User ??
        <br />
        <button type="button" className="button">
          <Link to="/">
            <span>Login</span>
          </Link>
        </button>
      </form>
    </div>
  );
};
export default Register;
