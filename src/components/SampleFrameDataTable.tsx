import { BsCheckCircle, BsXCircle } from "react-icons/bs";

interface SampleFrameData {
  tag: string;
  description: string;
  created: string;
  received: string;
  dataAvailable: boolean;
  samplePlateL: PlateData;
  samplePlateR: PlateData;
}
interface PlateData {
  _id: string;
  sampleFrame: string;
  type: number;
  samples: SampleData[];
}

interface SampleData {
  _id: string;
  samplePlate: string;
  description: string;
  position: string;
  scanSetups: ScanData[];
}

interface ScanData {
  _id: string;
  sample: string;
  element: string;
  edge: string;
  range: string;
  setup: string;
  sweeps: number;
}

interface Props {
  sampleFrameDataArr: SampleFrameData[] | null;
  onClick: (tag: string) => void;
}

function SampleFrameDataTable({ sampleFrameDataArr, onClick }: Props) {
  return (
    <div
      style={{
        borderColor: "rgba(70, 70, 70, 1)",
        borderStyle: "solid",
        borderWidth: "1px",
        borderRadius: "5px",
        padding: "8px",
        margin: "4px 20px 4px 4px",
      }}
    >
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Tag</th>
              <th>Frame Description</th>
              <th>Created</th>
              <th>Received</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {sampleFrameDataArr &&
              sampleFrameDataArr.map((sampleFrameData) => (
                <tr
                  key={sampleFrameData.tag}
                  onClick={() => onClick(sampleFrameData.tag)}
                >
                  <td>{sampleFrameData.tag}</td>
                  <td>{sampleFrameData.description}</td>
                  <td>
                    {sampleFrameData.created ? sampleFrameData.created : "n/a"}
                  </td>
                  <td>
                    {sampleFrameData.received
                      ? sampleFrameData.received
                      : "n/a"}
                  </td>
                  <td>
                    {sampleFrameData.dataAvailable ? (
                      <BsCheckCircle size={20} color={"green"} />
                    ) : (
                      <BsXCircle size={20} color={"red"} />
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SampleFrameDataTable;
