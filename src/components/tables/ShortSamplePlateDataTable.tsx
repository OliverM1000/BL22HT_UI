import { range } from "lodash";
import { PlateData } from "../../interfaces/FrameDataInterfaces";

interface Props {
  dataL: PlateData | null;
  dataR: PlateData | null;
  selectedRow: string;
  onClick: (sampleId: string, scanId: string) => void;
}

function ShortSamplePlateDataTable({
  dataL,
  dataR,
  selectedRow,
  onClick,
}: Props) {
  return (
    <div
      style={{
        borderColor: "rgba(70, 70, 70, 1)",
        borderStyle: "solid",
        borderWidth: "1px",
        borderRadius: "5px",
        padding: "8px",
        marginRight: "20px",
        marginBottom: "20px",
      }}
    >
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Pos.</th>
            <th>Sample Description</th>
            <th>Scan</th>
            <th>Sweeps</th>
          </tr>
        </thead>
        <tbody>
          {dataL &&
            dataL.samples &&
            dataL.samples.map(
              (sample, sampleId) =>
                sample.scanSetups &&
                sample.scanSetups.map((scan, scanId) => (
                  <tr
                    key={sampleId * sample.scanSetups.length + scanId}
                    className={
                      selectedRow === `${sample._id}-${scan._id}`
                        ? "table-success"
                        : ""
                    }
                    onClick={() => onClick(sample._id, scan._id)}
                  >
                    <td>{sample.position}</td>
                    <td>{sample.description}</td>
                    <td>
                      {scan.element}-{scan.edge} {scan.range}
                    </td>
                    <td>{scan.sweeps}</td>
                  </tr>
                ))
            )}

          {dataR &&
            dataR.samples &&
            dataR.samples.map(
              (sample, sampleId) =>
                sample.scanSetups &&
                sample.scanSetups.map((scan, scanId) => (
                  <tr
                    key={sampleId * sample.scanSetups.length + scanId}
                    className={
                      selectedRow === `${sample._id}-${scan._id}`
                        ? "table-success"
                        : ""
                    }
                    onClick={() => onClick(sample._id, scan._id)}
                  >
                    <td>{sample.position}</td>
                    <td>{sample.description}</td>
                    <td>
                      {scan.element}-{scan.edge} {scan.range}
                    </td>
                    <td>{scan.sweeps}</td>
                  </tr>
                ))
            )}
        </tbody>
      </table>
    </div>
  );
}

export default ShortSamplePlateDataTable;
