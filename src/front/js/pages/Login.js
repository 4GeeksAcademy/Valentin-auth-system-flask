import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin() {
    if (store.token && store.token != "" && store.token != undefined) {
      actions.login(email, password);
      console.log("logedin");
      navigate("/");
    } else if (email && password == "") {
      alert("Cannot be empty");
      console.log("logedin");
    }
  }

  useEffect(() => {});

  const handleLogin = () => {
    const opts = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "email",
        password: "password",
      }),
    };
    fetch(
      "https://donducci-special-tribble-qr69v46w4ppc447r-3001.preview.app.github.dev/api/token",
      opts
    )
      .then((resp) => {
        if (resp.status !== 200) return resp.json();
        else alert("There has been some error");
      })
      .then(console.log("sucess"))
      .catch((error) => {
        console.error("There is an error", error);
      });
  };

  return (
    <div className="text-center mt-5 w-50 aligne-content-center ">
      <h1>Login</h1>
      <div>
        <input
          type="email"
          className="form-control"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => {
            e.preventDefault();
            if (email === "" || password === "") {
              alert("input cannot be empty");
            } else {
              actions.login(email, password);
              navigate("/home");
            }
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};
