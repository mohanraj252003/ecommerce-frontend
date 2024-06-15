import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/login", {
        username: email,
        password,
      });
      toast.success("Login successful!");
      toast.success("Your order is placed successfully!");
      localStorage.setItem("token", response.data);
      navigate("/");
    } catch (error) {
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <>
      <h1 className="display-1 text-center m-4">Login</h1>
      <div className="container">
        <form
          className="row g-3 needs-validation"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <Link to="/Register" className="btn">
            Don't have an account? <u>Register.</u>
          </Link>
        </form>
      </div>
    </>
  );
}
