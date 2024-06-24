import { joiResolver } from "@hookform/resolvers/joi";
import { ChangeEvent, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Joi from "joi";

const schema = Joi.object({
  element: Joi.string().label("Element"),
  edge: Joi.string().label("Edge"),
  range: Joi.string().label("Range"),
  setup: Joi.string().label("Setup"),
  sweeps: Joi.number().min(1).max(999).label("Sweeps"),
});

const elementOptions = [
  { z: 19, name: "K" },
  { z: 20, name: "Ca" },
  { z: 21, name: "Sc" },
  { z: 22, name: "Ti" },
  { z: 23, name: "V" },
  { z: 24, name: "Cr" },
  { z: 25, name: "Mn" },
  { z: 26, name: "Fe" },
  { z: 27, name: "Co" },
  { z: 28, name: "Ni" },
  { z: 29, name: "Cu" },
  { z: 30, name: "Zn" },
  { z: 31, name: "Ga" },
  { z: 32, name: "Ge" },
  { z: 33, name: "As" },
  { z: 34, name: "Se" },
  { z: 35, name: "Br" },
  { z: 36, name: "Kr" },

  { z: 37, name: "Rb" },
  { z: 38, name: "Sr" },
  { z: 39, name: "Y" },
  { z: 40, name: "Zr" },
  { z: 41, name: "Nb" },
  { z: 42, name: "Mo" },
  { z: 43, name: "Tc" },
  { z: 44, name: "Ru" },
  { z: 45, name: "Rh" },
  { z: 46, name: "Pd" },
  { z: 47, name: "Ag" },
  { z: 48, name: "Cf" },
  { z: 49, name: "In" },
  { z: 50, name: "Sn" },
  { z: 51, name: "Sb" },
  { z: 52, name: "Te" },
  { z: 53, name: "I" },
  { z: 54, name: "Xe" },

  { z: 55, name: "Cs" },
  { z: 56, name: "Ba" },
  { z: 57, name: "La" },
  { z: 58, name: "Ce" },
  { z: 59, name: "Pr" },
  { z: 60, name: "Nd" },
  { z: 61, name: "Pm" },
  { z: 62, name: "Sm" },
  { z: 63, name: "Eu" },
  { z: 64, name: "Gd" },
  { z: 65, name: "Tb" },
  { z: 66, name: "Dy" },
  { z: 67, name: "Ho" },
  { z: 68, name: "Er" },
  { z: 69, name: "Tm" },
  { z: 70, name: "Yb" },
  { z: 71, name: "Lu" },

  { z: 72, name: "Hf" },
  { z: 73, name: "Ta" },
  { z: 74, name: "W" },
  { z: 75, name: "Re" },
  { z: 76, name: "Os" },
  { z: 77, name: "Ir" },
  { z: 78, name: "Pt" },
  { z: 79, name: "Au" },
  { z: 80, name: "Hg" },
  { z: 81, name: "TI" },
  { z: 82, name: "Pb" },
  { z: 83, name: "Bi" },
  { z: 84, name: "Po" },
  { z: 85, name: "At" },
  { z: 86, name: "Rn" },
];
const edgeOptions = ["K", "L-1", "L-2", "L-3"];

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
