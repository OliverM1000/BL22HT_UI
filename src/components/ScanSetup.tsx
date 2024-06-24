import { joiResolver } from "@hookform/resolvers/joi";
import { ChangeEvent, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Joi from "joi";
import { edgeOptions, elementOptions } from "../assets/elements";

const schema = Joi.object({
  element: Joi.string().label("Element"),
  edge: Joi.string().label("Edge"),
  range: Joi.string().label("Range"),
  setup: Joi.string().label("Setup"),
  sweeps: Joi.number().min(1).max(999).label("Sweeps"),
});

export interface ScanSetupFormData {
  element: string;
  edge: string;
  range: string;
  setup: string;
  sweeps: number;
}

interface Props {
  onSubmit: (data: ScanSetupFormData) => void;
}

function ScanSetup({ onSubmit }: Props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [range, setRange] = useState("XANES");
  const [setup, setSetup] = useState("TRANSMISSION");

  const handleRangeSelection = (event: ChangeEvent<HTMLInputElement>) => {
    setRange(event.target.value);
  };

  const handleSetupSelection = (event: ChangeEvent<HTMLInputElement>) => {
    setSetup(event.target.value);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ScanSetupFormData>({
    resolver: joiResolver(schema),

    defaultValues: { range: "EXAFS", setup: "TRANSMISSION" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">
        <div style={{ display: "flex" }}>
          <h4 className="mb-2">Scan Setup</h4>
        </div>
        <div className="row mb-1">
          <div className="col-3">
            <label className="form-label">Element</label>
          </div>
          <div className="col-9">
            <select
              className="form-select"
              id="element"
              {...register("element")}
              defaultValue={"Cu"}
            >
              {elementOptions.map((e, id) => (
                <option key={id} value={e.name}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mb-1">
          <div className="col-3">
            <label className="form-label">Edge</label>
          </div>
          <div className="col-9">
            <select className="form-select" id="edge" {...register("edge")}>
              {edgeOptions.map((e, id) => (
                <option key={id} value={e}>
                  {e}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Controller
          name="range"
          control={control}
          render={({ field }) => (
            <>
              <div className="row mb-1">
                <div className="col-3">
                  <label className="form-label">Range</label>
                </div>
                <div className="col-9">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="XANES"
                      checked={field.value == "XANES"}
                      onChange={() => field.onChange("XANES")}
                    />
                    <label
                      className="form-check-label"
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      title="XANES: 150eV pre-edge, 250eV post-edge"
                    >
                      XANES
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="EXAFS"
                      checked={field.value == "EXAFS"}
                      onChange={() => field.onChange("EXAFS")}
                    />
                    <label
                      className="form-check-label"
                      data-bs-toggle="tooltip"
                      data-bs-placement="right"
                      title="EXAFS: 150eV pre-edge, 16&#8491; post-edge"
                    >
                      EXAFS
                    </label>
                  </div>
                </div>
              </div>
            </>
          )}
        />

        <Controller
          name="setup"
          control={control}
          render={({ field }) => (
            <>
              <div className="row mb-1">
                <div className="col-3">
                  <label className="form-label">Setup</label>
                </div>
                <div className="col-9">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="TRANSMISSION"
                      checked={field.value == "TRANSMISSION"}
                      onChange={() => field.onChange("TRANSMISSION")}
                    />
                    <label className="form-check-label">TRANSMISSION</label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      value="FY"
                      checked={field.value == "FY"}
                      onChange={() => field.onChange("FY")}
                    />
                    <label className="form-check-label">FY</label>
                  </div>
                </div>
              </div>
            </>
          )}
        />

        <div className="row mb-1">
          <div className="col-3">
            <label className="form-label">Sweeps</label>
          </div>
          <div className="col-9">
            <input
              type="number"
              className="form-control"
              id="sweeps"
              min={1}
              max={999}
              defaultValue={4}
              {...register("sweeps")}
            />
          </div>
        </div>

        <div style={{ display: "flex" }} className="mt-2">
          <div style={{ marginLeft: "auto" }}>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ScanSetup;
