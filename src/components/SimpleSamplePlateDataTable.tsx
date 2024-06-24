import { FaRegTrashCan } from "react-icons/fa6";

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
  title: string;
  description: string;
  data: PlateData | null;
  //onClick: (sampleId: string) => void;
  onDelete: (scanId: string) => void;
}

function SimpleSamplePlateDataTable({
  title,
  description,
  data,
  onDelete,
}: Props) {
  return (
    <div style={{ margin: "0px 4px" }}>
      <span style={{ fontWeight: "bold", fontSize: "14px" }}>{title}: </span>
      <span style={{ fontSize: "14px" }}>
        {description != "" ? description : ""}
      </span>
      <div style={{ padding: "0px 4px" }}>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Pos.</th>
              <th>Sample Description</th>
              <th>Element</th>
              <th>Edge</th>
              <th>Range</th>
              <th>Sweeps</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.samples &&
              data.samples.map(
                (sample, sampleId) =>
                  sample.scanSetups &&
                  sample.scanSetups.map((scan, scanId) => (
                    <tr
                      key={sampleId * sample.scanSetups.length + scanId}
                      //onClick={() => onClick(sample._id)}
                    >
                      <td>{sample.position}</td>
                      <td>{sample.description}</td>
                      <td>{scan.element}</td>
                      <td>{scan.edge}</td>
                      <td>{scan.range}</td>
                      <td>{scan.sweeps}</td>
                      <td>
                        <div
                          style={{ cursor: "pointer" }}
                          onClick={() => onDelete(scan._id)}
                        >
                          <FaRegTrashCan size={20} color="#dc3545" />
                        </div>
                      </td>
                    </tr>
                  ))
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SimpleSamplePlateDataTable;
