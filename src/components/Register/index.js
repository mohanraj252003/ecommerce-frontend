import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/register", {
        username: email,
        password,
      });
      toast.success("Registration is successful!");
      toast.success("Your order is placed successfully!");
      localStorage.setItem("token", response.data);
      navigate("/");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <>
      <h1 className="display-1 text-center m-4">Register</h1>
      <div className="container">
        <form
          className="row g-3 needs-validation"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="col-md-4">
            <label htmlFor="validationCustomUsername" className="form-label">
              Email
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">
                @
              </span>
              <input
                type="text"
                className="form-control"
                id="validationCustomUsername"
                aria-describedby="inputGroupPrepend"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <div className="invalid-feedback">Please enter your email</div>
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="validationCustom01" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="validationCustom01"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="invalidCheck"
                required
              />
              <label className="form-check-label" htmlFor="invalidCheck">
                Agree to terms and conditions
              </label>
              <div className="invalid-feedback">
                You must agree before submitting.
              </div>
            </div>
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </div>
          <Link to="/Login" className="btn">
            Already have an account? <u>Login.</u>
          </Link>
        </form>
      </div>
    </>
  );
}
