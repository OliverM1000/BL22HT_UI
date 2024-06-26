import { FaRegTrashCan } from "react-icons/fa6";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useEffect, useState } from "react";

const schema = Joi.object({
  description: Joi.string()
    .max(4096)
    .required()
    .label("Description")
    .messages({ "any.required": "Please add a description of your sample." }),
});

export interface SampleSetupData {
  id: string;
  position: string;
  description: string;
}

interface FormData {
  description: string;
}

interface slot {
  arrayIndex: number;
  samplePlateId: string;
  sampleId: string;
  samplePosition: string;
  sampleDescription: string;
}

interface Props {
  slot: slot;
  disableEdit: boolean;
  onSubmit: (data: SampleSetupData) => void;
  onDelete: (id: string) => void;
}

function SampleSetup({ slot, disableEdit, onSubmit, onDelete }: Props) {
  const [sampleDescription, setSampleDescription] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: joiResolver(schema) });

  useEffect(() => {
    setSampleDescription(slot.sampleDescription);
  }, [slot]);

  const submit = (data: FormData) => {
    onSubmit({
      id: slot.samplePlateId,
      position: slot.samplePosition,
      description: data.description,
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="container-fluid">
        <div style={{ display: "flex" }}>
          <h4 className="mb-2">Sample</h4>
          <div style={{ marginLeft: "auto" }}>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => onDelete(slot.sampleId)}
            >
              <FaRegTrashCan size={20} color="#dc3545" />
            </div>
          </div>
        </div>

        <div className="row mb-1">
          <div className="col-3">
            <label className="form-label">Position</label>
          </div>
          <div className="col-9">
            <input
              type="text"
              className="form-control bg-light"
              value={slot.samplePosition}
              readOnly
            />
          </div>
        </div>

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
                    disabled={disableEdit}
                    className="form-control"
                    rows={3}
                    name="description"
                    value={sampleDescription}
                    onChange={(o) => {
                      field.onChange(o.target.value);
                      setSampleDescription(o.target.value);
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
            <button
              type="submit"
              className="btn btn-primary"
              disabled={disableEdit}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default SampleSetup;
