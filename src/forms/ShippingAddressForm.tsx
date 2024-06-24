import { useForm, FieldValues } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import apiClient from "../services/api-client";

const schema = Joi.object({
  affiliation: Joi.string().allow("").label("Affiliation"),
  street: Joi.string().required().label("Street"),
  city: Joi.string().required().label("City"),
  zip: Joi.number().integer().required().label("Zip Code"),
  state: Joi.string().required().label("State"),
  country: Joi.string().required().label("Country"),
});

interface FormData {
  affiliation: string;
  street: string;
  city: string;
  zip: number;
  state: string;
  country: string;
}

interface Props {
  userId: string;
  shippingAddress: FormData;
  cancel: () => void;
  update: () => void;
}

function ShippingAddressForm({
  userId,
  shippingAddress,
  cancel,
  update,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: { ...shippingAddress },
    resolver: joiResolver(schema),
  });

  const onSubmit = (data: FieldValues) => {
    console.log({ ...data, user: userId });

    apiClient
      .put(
        "/users/me/shipping",
        { ...data, user: userId },
        {
          headers: {
            "x-auth-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjVkZmUwZTBjMDg3YjAwZmIxZTMxN2QiLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzE4NTE4MTM5fQ.48UKAfv7WfRn5SjETjsA8yCpbhzgLUXHn1VJxCbg5OI",
          },
        }
      )
      .then((res) => update())
      .catch((error) => console.log(error.message.data));
  };

  return (
    <form
      style={{
        padding: "0px 20px 0px 0px",
        width: "320px",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mb-3">
        <label htmlFor="affiliation" className="form">
          Affiliation
        </label>
        <input
          id="affiliation"
          type="text"
          className="form-control"
          {...register("affiliation")}
        />
        {errors.affiliation && (
          <p className="text-danger">{errors.affiliation.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="street" className="form">
          Street
        </label>
        <input
          id="street"
          type="text"
          className="form-control"
          {...register("street")}
        />
        {errors.street && (
          <p className="text-danger">{errors.street.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="city" className="form">
          City
        </label>
        <input
          id="city"
          type="text"
          className="form-control"
          {...register("city")}
        />
        {errors.city && <p className="text-danger">{errors.city.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="zip" className="form">
          Zip Code
        </label>
        <input
          id="zip"
          type="text"
          className="form-control"
          {...register("zip")}
        />
        {errors.zip && <p className="text-danger">{errors.zip.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="state" className="form">
          State
        </label>
        <input
          id="state"
          type="text"
          className="form-control"
          {...register("state")}
        />
        {errors.state && <p className="text-danger">{errors.state.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="country" className="form">
          Country
        </label>
        <input
          id="country"
          type="text"
          className="form-control"
          {...register("country")}
        />
        {errors.country && (
          <p className="text-danger">{errors.country.message}</p>
        )}
      </div>

      <div style={{ display: "flex" }}>
        <button type="button" className="btn btn-secondary" onClick={cancel}>
          Discard Changes
        </button>
        <button
          type="submit"
          className="btn btn-primary"
          style={{ marginLeft: "auto" }}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
}

export default ShippingAddressForm;
