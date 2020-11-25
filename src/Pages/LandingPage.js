import React from "react";
import { Link } from "react-router-dom";

const LandingPage = ({ logout }) => {
  return (
    <div>
      <h1>welcome {localStorage.getItem("email")}</h1>
      <button className="button" onClick={logout}>
        <Link to="/">
          <span>Logout</span>
        </Link>
      </button>
    </div>
  );
};

export default LandingPage;
