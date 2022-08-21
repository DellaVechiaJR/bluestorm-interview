import { FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/auth";
import { data } from "../data/Data";
import "../styles/Login.css";

const url = "https://djbnrrib9e.execute-api.us-east-2.amazonaws.com/v1";

async function loginUser(credentials: any) {
  return fetch(`${url}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

export const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [globalToken, setGlobalToken] = useState("");
  const [status, setStatus] = useState(0);
  const { state, dispatch } = useContext(Context);

  const navigate = useNavigate();

  const handleUser = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const authNavigate = () => {
    if (state.user.token == undefined) {
      window.alert("Invalid Credentials");
    } else if (state.user.token != "") {
      navigate("/medications");
    } else {
      window.alert("Invalid Credentials");
    }
  };

  const toggleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (user != "" && password != "") {
      const token = await loginUser({
        username: user,
        password: password,
      });
      setContextToken(token.token);
      setStatus(token.message);
      console.log(state.user.token);
      authNavigate();
    } else {
      window.alert("Preencha todos os campos");
    }
  };

  const setContextToken = (authToken: any) => {
    dispatch({
      type: "CHANGE_TOKEN",
      payload: {
        token: authToken,
      },
    });
  };

  return (
    <div className="container">
      <div className="img-logo-one">
        <img src={data} alt="logo" width="490" />
      </div>
      <div className="registration-container">
        <form onSubmit={toggleSubmit} className="form-registration ">
          <label className="label-user" htmlFor="user">
            User
          </label>
          <input
            type="text"
            placeholder="Type your user"
            value={user}
            onChange={handleUser}
            className="user-input"
          />
          <label className="label-password" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            placeholder="Type your password"
            id="password"
            value={password}
            onChange={handlePassword}
            className="password-input"
          />
          <button className="button" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
