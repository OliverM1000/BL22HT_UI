import { joiResolver } from "@hookform/resolvers/joi";
import { useForm, Controller } from "react-hook-form";
import Joi from "joi";
import { useEffect, useState } from "react";

const schema = Joi.object({
  samplePlateTypeL: Joi.number().integer().label("Sample Plate Type Left"),
  samplePlateTypeR: Joi.number().integer().label("Sample Plate Type Right"),
  description: Joi.string()
    .max(4096)
    .required()
    .label("Description")
    .messages({ "any.required": "Please provide a brief description." }),
});

export interface SampleFrameFormData {
  samplePlateTypeL: number;
  samplePlateTypeR: number;
  description: string;
}

interface Props {
  tag: string;
  data: SampleFrameFormData;
  setTypeL: (left: number) => void;
  setTypeR: (right: number) => void;
  onSubmit: (data: SampleFrameFormData) => void;
}

function SampleFrameSetup({ tag, data, setTypeL, setTypeR, onSubmit }: Props) {
  const [plateTypeL, setPlateTypeL] = useState(0);
  const [plateTypeR, setPlateTypeR] = useState(0);
  const [frameDescription, setFrameDescription] = useState("");

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SampleFrameFormData>({ resolver: joiResolver(schema) });

  const samplePlateTypeL = watch("samplePlateTypeL");
  const [rightOptions, setRightOptions] = useState([
    { value: "0", label: "empty" },
    { value: "1", label: "8-Slot" },
    { value: "2", label: "8-Circle" },
  ]);

  useEffect(() => {
    setPlateTypeL(data.samplePlateTypeL);
    setPlateTypeR(data.samplePlateTypeR);
    setFrameDescription(data.description);
  }, [data]);

  useEffect(() => {
    if (samplePlateTypeL > 2) {
      setRightOptions([{ value: "0", label: "empty" }]);
      setValue("samplePlateTypeR", 0);
      setTypeR(0);
    } else {
      setRightOptions([
        { value: "0", label: "empty" },
        { value: "1", label: "8-Slot" },
        { value: "2", label: "8-Circle" },
      ]);
    }
  }, [samplePlateTypeL]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">
        <h4 className="mb-2">Frame Definition</h4>
        <div className="row mb-1">
          <div className="col-3">
            <label className="form-label">Tag</label>
          </div>
          <div className="col-9">
            <input
              className="form-control bg-light z-index-1"
              name="tag"
              value={tag}
              readOnly
            />
          </div>
        </div>

        <Controller
          name="samplePlateTypeL"
          control={control}
          render={({ field }) => (
            <>
              <div className="row mb-1">
                <div className="col-3">
                  <label className="form-label">Left</label>
                </div>
                <div className="col-9">
                  <select
                    {...field}
                    className="form-select"
                    value={plateTypeL}
                    onChange={(o) => {
                      field.onChange(parseInt(o.target.value));
                      setTypeL(parseInt(o.target.value));
                      setPlateTypeL(parseInt(o.target.value));
                    }}
                  >
                    <option value="0">empty</option>
                    <option value="1">8-Slot</option>
                    <option value="2">8-Circle</option>
                    <option value="3">6-Circle-Air</option>
                  </select>
                </div>
              </div>
            </>
          )}
        />

        <Controller
          name="samplePlateTypeR"
          control={control}
          render={({ field }) => (
            <>
              <div className="row mb-1">
                <div className="col-3">
                  <label className="form-label">Right</label>
                </div>
                <div className="col-9">
                  <select
                    {...field}
                    className="form-select"
                    value={plateTypeR}
                    onChange={(o) => {
                      field.onChange(parseInt(o.target.value));
                      setTypeR(parseInt(o.target.value));
                      setPlateTypeR(parseInt(o.target.value));
                    }}
                  >
                    {rightOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <>
              <div className="row mb-1">
                <div className="col-3">
                  <label className="form-label">Description</label>
                </div>
                <div className="col-9">
                  <textarea
                    {...field}
                    rows={2}
                    className="form-control"
                    value={frameDescription}
                    onChange={(o) => {
                      field.onChange(o.target.value);
                      setFrameDescription(o.target.value);
                    }}
                  />
                  {errors.description && (
                    <p className="text-danger">{errors.description.message}</p>
                  )}
                </div>
              </div>
            </>
          )}
        />

        <div style={{ display: "flex" }} className="mt-2">
          <div style={{ marginLeft: "auto" }}>
            <button type="submit" className="btn btn-primary">
              Apply
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SampleFrameSetup;
