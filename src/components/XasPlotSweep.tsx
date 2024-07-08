import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface Props {
  min: number;
  max: number;
  current: number;
  onChange: (i: number) => void;
  onReset: () => void;
}

function XasPlotSweep({ min, max, current, onChange, onReset }: Props) {
  return (
    <div
      style={{
        borderColor: "rgba(70, 70, 70, 1)",
        borderStyle: "solid",
        borderWidth: "1px",
        borderRadius: "5px",
        padding: "8px",
        marginLeft: "4px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div className="btn-group" role="group">
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            current === min ? onChange(0) : onChange(-1);
          }}
        >
          <FaChevronLeft size={15} />
        </button>
        <button type="button" className="btn btn-light" onClick={onReset}>
          {current}
        </button>
        <button
          type="button"
          className="btn btn-light"
          onClick={() => {
            current === max ? onChange(0) : onChange(1);
          }}
        >
          <FaChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}

export default XasPlotSweep;
