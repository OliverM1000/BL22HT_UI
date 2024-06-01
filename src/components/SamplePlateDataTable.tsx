import SimpleSamplePlateDataTable from "./SimpleSamplePlateDataTable";

interface SamplePlateData {
  samplePlateType: number;
  description: string;
  samples: SampleData[];
}

interface SampleData {
  sampleId: number;
  position: string;
  description: string;
  scanSetup: SampleScanSetupData[];
}

interface SampleScanSetupData {
  scanId: number;
  element: string;
  edge: string;
  range: string;
  setup: string;
  optics: string;
  beamWidth: number;
  detune: number;
  sweeps: number;
}

interface Props {
  tag: string;
  samplePlateDescriptionL: string;
  samplePlateDescriptionR: string;
  samplePlateDataL: SamplePlateData;
  samplePlateDataR: SamplePlateData;
  onClick: (id: number) => void;
}

function SamplePlateDataTable({
  tag,
  samplePlateDescriptionL,
  samplePlateDescriptionR,
  samplePlateDataL,
  samplePlateDataR,
  onClick,
}: Props) {
  return (
    <div
      style={{
        borderColor: "rgba(100, 100, 100, 1)",
        borderStyle: "solid",
        borderWidth: "1px",
        borderRadius: "5px",
        padding: "8px",
        margin: "4px 20px 20px 4px",
      }}
    >
      <div style={{ margin: "4px 0px 8px 4px" }}>
        <span style={{ fontWeight: "bold", fontSize: "20px" }}>
          Sample Frame Tag: {tag}
        </span>
      </div>
      <SimpleSamplePlateDataTable
        description={samplePlateDescriptionL}
        data={samplePlateDataL}
        onClick={onClick}
      />
      <SimpleSamplePlateDataTable
        description={samplePlateDescriptionR}
        data={samplePlateDataR}
        onClick={onClick}
      />
    </div>
  );
}

export default SamplePlateDataTable;
