import React from "react";

interface Props {
  onNumeratorChange: (numerator: number) => void;
  onDenominatorChange: (denominator: number) => void;
  onLogChange: (log: boolean) => void;
}

function XasPlotDefinition({
  onNumeratorChange,
  onDenominatorChange,
  onLogChange,
}: Props) {
  return (
    <div
      style={{
        borderColor: "rgba(70, 70, 70, 1)",
        borderStyle: "solid",
        borderWidth: "1px",
        borderRadius: "5px",
        padding: "8px",
        //margin: "4px 20px 8px 4px",
        marginLeft: "4px",
      }}
    >
      <div className="mb-2">
        <label className="form-label">Numerator</label>
        <select
          className="form-select"
          defaultValue={1}
          onChange={(o) => {
            onNumeratorChange(parseInt(o.target.value));
          }}
        >
          <option value={1}>ADC_1</option>
          <option value={2}>ADC_2</option>
          <option value={3}>ADC_3</option>
          <option value={4}>ADC_4</option>
          <option value={5}>1.0</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Denominator</label>
        <select
          className="form-select"
          defaultValue={2}
          onChange={(o) => {
            onDenominatorChange(parseInt(o.target.value));
          }}
        >
          <option value={1}>ADC_1</option>
          <option value={2}>ADC_2</option>
          <option value={3}>ADC_3</option>
          <option value={4}>ADC_4</option>
          <option value={5}>1.0</option>
        </select>
      </div>
      <div className="">
        <input
          className="form-check-input"
          type="checkbox"
          defaultChecked={true}
          onChange={(o) => onLogChange(o.target.checked)}
        />
        <label className="form-label mx-2">Log</label>
      </div>
    </div>
  );
}

export default XasPlotDefinition;
