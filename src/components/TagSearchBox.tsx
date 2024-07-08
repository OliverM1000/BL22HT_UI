import { FaMagnifyingGlass } from "react-icons/fa6";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { FieldValues, useForm } from "react-hook-form";

const schema = Joi.object({
  tag: Joi.string()
    .length(9)
    .required()
    .label("Tag")
    .messages({ "string.length": "Invalid TAG" }),
});

interface FormData {
  tag: string;
}

interface Props {
  onSearch: (tag: string) => void;
}

function TagSearchBox({ onSearch }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: joiResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    onSearch(data.tag);
  };

  return (
    <div>
      <form
        style={{
          borderColor: "rgba(70, 70, 70, 1)",
          borderStyle: "solid",
          borderWidth: "1px",
          borderRadius: "5px",
          padding: "2px",
          marginLeft: "4px",
          marginBottom: "8px",
          width: "180px",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="0000-0000"
              style={{ textAlign: "center" }}
              id="tag"
              {...register("tag")}
            />
          </div>
          <div>
            <button type="submit" className="btn">
              <FaMagnifyingGlass size={20} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default TagSearchBox;
