import _ from "lodash";
import { useForm, FieldValues } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import apiClient from "../services/api-client";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = Joi.object({
  first_name: Joi.string().min(3).max(20).required().label("First Name"),
  last_name: Joi.string().min(3).max(20).required().label("Second Name"),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .label("Email"),
  password: Joi.string().min(8).max(20).required().label("Password"),
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .label("Confirm Password")
    .messages({ "any.only": "{{#label}} does not match Password" }),
});

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

function RegisterUserForm() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: joiResolver(schema) });

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    apiClient
      .post("/users", _.omit(data, "confirm_password"))
      .then(() => navigate("/main"))
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
        <h1 className="mb-4">Create your account</h1>
        <div className="mb-3">
          <label htmlFor="first_name" className="form">
            First Name
          </label>
          <input
            id="first_name"
            type="text"
            className="form-control"
            {...register("first_name", {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
          {errors.first_name && (
            <p className="text-danger">{errors.first_name.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form">
            Last Name
          </label>
          <input
            id="last_name"
            type="text"
            className="form-control"
            {...register("last_name", {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
          />
          {errors.last_name && (
            <p className="text-danger">{errors.last_name.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form">
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
            {...register("password", {
              required: true,
            })}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="confirm_password" className="form">
            Confirm Password
          </label>
          <input
            id="confirm_password"
            type="password"
            className="form-control"
            {...register("confirm_password", {
              required: true,
            })}
          />
          {errors.confirm_password && (
            <p className="text-danger">{errors.confirm_password.message}</p>
          )}
        </div>

        <div style={{ display: "flex" }}>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => navigate("/")}
          >
            Login
          </button>
          <button
            style={{
              marginLeft: "auto",
            }}
            className="btn btn-primary"
          >
            Register
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

export default RegisterUserForm;
