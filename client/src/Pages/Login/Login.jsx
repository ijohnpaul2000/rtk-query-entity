import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../../Redux/Features/auth/loginSlice";
import { useLoginMutation } from "../../Redux/Services/auth/loginService";

import "./Login.css";
const Login = () => {
  const [login, { isLoading, isError, error, isSuccess, data }] =
    useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData);
    if (result.data) {
      dispatch(LOGIN(result.data));
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  };

  return (
    <main className="login">
      <section>
        <h1 className="login__title">Login</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__form--username login__field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formData.username}
              placeholder="Username"
              onChange={handleChange}
            />
          </div>

          <div className="login__form--password login__field">
            <label htmlFor="password">
              Password <span>Forgot?</span>
            </label>
            <input
              type="text"
              name="password"
              id="password"
              value={formData.password}
              placeholder="password"
              onChange={handleChange}
            />
          </div>

          {isError && (
            <span className="auth__message--error">{error.data.message}</span>
          )}

          {isSuccess && (
            <span className="auth__message--success">{data.message}</span>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
