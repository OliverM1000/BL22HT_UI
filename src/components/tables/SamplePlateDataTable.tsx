import { PlateData } from "../../interfaces/FrameDataInterfaces";
import SimpleSamplePlateDataTable from "./SimpleSamplePlateDataTable";

interface Props {
  tag: string;
  samplePlateDescriptionL: string;
  samplePlateDescriptionR: string;
  samplePlateDataL: PlateData | null;
  samplePlateDataR: PlateData | null;
  onClick: (scanId: string) => void;
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
        title="Left"
        description={samplePlateDescriptionL}
        data={samplePlateDataL}
        showDelete={false}
      />
      <SimpleSamplePlateDataTable
        title="Right"
        description={samplePlateDescriptionR}
        data={samplePlateDataR}
        showDelete={false}
      />
    </div>
  );
}

export default SamplePlateDataTable;
