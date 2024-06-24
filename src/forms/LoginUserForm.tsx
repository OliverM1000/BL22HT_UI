import { useForm, FieldValues } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/api-client";
import { useState } from "react";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string().min(8).max(20).required().label("Password"),
});

interface FormData {
  email: string;
  password: string;
}

function LoginUserForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: joiResolver(schema) });

  const onSubmit = async (data: FieldValues) => {
    apiClient
      .post("/auth", data)
      .then((res) => {
        localStorage.setItem("x-auth-token", res.data);
        navigate("/main/account");
      })
      .catch((error) => setErrorMessage(error.response.data));
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "100px",
      }}
    >
      <form
        style={{
          borderColor: "rgba(70, 70, 70, 1)",
          borderStyle: "solid",
          borderWidth: "1px",
          borderRadius: "5px",
          padding: "16px",
          width: "400px",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-4">Login</h1>
        <div className="mb-3">
          <label htmlFor="username" className="form">
            Email Address
          </label>
          <input
            id="email"
            type="text"
            className="form-control"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <div style={{ display: "flex" }}>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
          <button
            style={{
              marginLeft: "auto",
            }}
            className="btn btn-primary"
          >
            Login
          </button>
        </div>
        {errorMessage && (
          <div style={{ padding: "16px 0px 0px 0px" }}>
            <span className="text-danger">{errorMessage}</span>
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginUserForm;
