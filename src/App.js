import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Alert from "./components/Alert";
import LandingPage from "./Pages/LandingPage";

const App = () => {
  // for login feature
  const [emailLogin, setEmailLogin] = React.useState("");
  const [roleLogin, setRoleLogin] = React.useState("none");
  const [passwordLogin, setPasswordLogin] = React.useState("");

  // for register feature
  const [emailRegister, setEmailRegister] = React.useState("");
  const [roleRegister, setRoleRegister] = React.useState("none");
  const [passwordRegister, setPasswordRegister] = React.useState("");

  // alert
  const [alert, setAlert] = React.useState({ show: false });

  //   A Mock DataBase
  const [data, setData] = React.useState([]);
  const [redirect, setRedirect] = React.useState(false);

  React.useEffect(() => {
    async function getdata() {
      const response = await fetch("http://localhost:3001/user");
      const data = await response.json();
      setData(data);
    }
    getdata();
  }, [emailRegister]);

  // handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 2000);
  };
  // for login feature
  const handleEmailLogin = (e) => {
    setEmailLogin(e.target.value);
  };
  const handlePasswordLogin = (e) => {
    setPasswordLogin(e.target.value);
  };
  const handleRoleLogin = (e) => {
    setRoleLogin(e.target.value);
  };

  const isValid = () => {
    let N = data.findIndex((item) => item.email === emailLogin);
    console.log(N);

    if (emailLogin.length > 0 && passwordLogin.length > 0) {
      if (emailLogin === data.map((item) => item.email)[N]) {
        if (
          passwordLogin === data.map((item) => item.password)[N] &&
          roleLogin === data.map((item) => item.role)[N]
        ) {
          handleAlert({ type: "success", text: "login successfullly" });
          return true;
        } else {
          handleAlert({ type: "danger", text: "wrong password" });
          return false;
        }
      } else {
        handleAlert({ type: "danger", text: "user not found" });

        return false;
      }
    } else {
      handleAlert({ type: "danger", text: "enter valid inputs" });

      return false;
    }
  };

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (isValid()) {
      localStorage.setItem("user", true);
      localStorage.setItem("email", emailLogin);
      setRedirect(true);
    } else {
      setRedirect(false);
    }
    setEmailLogin("");
    setPasswordLogin("");
    setRoleLogin("");
  };
  // for Logging Out
  const logout = () => {
    localStorage.setItem("user", false);
    localStorage.setItem("email", "");
    setRedirect(false);
  };

  // for register feature
  const handleEmailRegister = (e) => {
    setEmailRegister(e.target.value);
  };

  const handlePasswordRegister = (e) => {
    setPasswordRegister(e.target.value);
  };

  const handleRoleRgister = (e) => {
    setRoleRegister(e.target.value);
  };

  let index = data.findIndex((item) => item.email === emailRegister);
  const handleSubmitRegister = (e) => {
    e.preventDefault();
    if (emailRegister.length > 0 && passwordRegister.length > 0) {
      if (emailRegister !== data.map((item) => item.email)[index]) {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: emailRegister,
            password: passwordRegister,
            role: roleRegister,
          }),
        };
        fetch("http://localhost:3001/user", requestOptions)
          .then((response) => response.json())
          .then((data) => console.log(data));
        handleAlert({ type: "success", text: "Your Login Has Been Created" });
        setEmailRegister("");
        setPasswordRegister("");
        setRoleRegister("none");
      } else {
        handleAlert({
          type: "danger",
          text: "This Email has Already Registered",
        });
        setEmailRegister("");
        setPasswordRegister("");
      }
    } else {
      handleAlert({ type: "danger", text: "Use Valid Input" });
    }
  };

  return (
    <div>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <Router>
        <Route exact path="/">
          <Login
            emailLogin={emailLogin}
            passwordLogin={passwordLogin}
            roleLogin={roleLogin}
            redirect={redirect}
            handleEmailLogin={handleEmailLogin}
            handlePasswordLogin={handlePasswordLogin}
            handleRoleLogin={handleRoleLogin}
            handleSubmitLogin={handleSubmitLogin}
          />
        </Route>
        <Route path="/register">
          <Register
            emailRegister={emailRegister}
            passwordRegister={passwordRegister}
            roleRegister={roleRegister}
            handleEmailRegister={handleEmailRegister}
            handlePasswordRegister={handlePasswordRegister}
            handleRoleRgister={handleRoleRgister}
            handleSubmitRegister={handleSubmitRegister}
          />
        </Route>
        <Route path="/landing">
          <LandingPage logout={logout} />
        </Route>
      </Router>
    </div>
  );
};
export default App;
