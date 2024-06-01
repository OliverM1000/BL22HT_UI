interface SamplePlateData {
  samplePlateType: number;
  description: string;
  samples: SampleData[];
}

interface SampleData {
  position: string;
  description: string;
  scanSetup: SampleScanSetupData[];
}

interface SampleScanSetupData {
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
}

function SamplePlateDataTable({
  tag,
  samplePlateDescriptionL,
  samplePlateDescriptionR,
  samplePlateDataL,
  samplePlateDataR,
}: Props) {
  return (
    <>
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
        <div style={{ margin: "0px 8px" }}>
          <span style={{ fontWeight: "bold", fontSize: "18px" }}>
            Sample Frame Tag: {tag}
          </span>
        </div>
        <div
          style={{
            padding: "8px",
            margin: "8px 4px",
          }}
        >
          <span style={{ fontWeight: "bold", fontSize: "14px" }}>
            Left Plate:{" "}
          </span>
          <span style={{ fontSize: "14px" }}>
            {samplePlateDescriptionL != "" ? samplePlateDescriptionL : ""}
          </span>
          <div style={{ padding: "8px 0px" }}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Pos.</th>
                  <th>Sample Description</th>
                  <th>Element</th>
                  <th>Edge</th>
                  <th>Range</th>
                  <th>Sweeps</th>
                  <th>Data</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {samplePlateDataL.samples.map((sample, sampleId) =>
                  sample.scanSetup.map((scan, scanId) => (
                    <tr key={sampleId * sample.scanSetup.length + scanId}>
                      <td>{sample.position}</td>
                      <td>{sample.description}</td>
                      <td>{scan.element}</td>
                      <td>{scan.edge}</td>
                      <td>{scan.range}</td>
                      <td>{scan.sweeps}</td>
                      <td>n/a</td>
                      <td>n/a</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div
          style={{
            padding: "8px",
            margin: "8px 4px",
          }}
        >
          <span style={{ fontWeight: "bold", fontSize: "14px" }}>
            Right Plate:{" "}
          </span>
          <span style={{ fontSize: "14px" }}>
            {samplePlateDescriptionR != "" ? samplePlateDescriptionR : ""}
          </span>
          <div style={{ padding: "8px 0px" }}>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Pos.</th>
                  <th>Sample Description</th>
                  <th>Element</th>
                  <th>Edge</th>
                  <th>Range</th>
                  <th>Sweeps</th>
                  <th>Data</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {samplePlateDataR.samples.map((sample, sampleId) =>
                  sample.scanSetup.map((scan, scanId) => (
                    <tr key={sampleId * sample.scanSetup.length + scanId}>
                      <td>{sample.position}</td>
                      <td>{sample.description}</td>
                      <td>{scan.element}</td>
                      <td>{scan.edge}</td>
                      <td>{scan.range}</td>
                      <td>{scan.sweeps}</td>
                      <td>n/a</td>
                      <td>n/a</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default SamplePlateDataTable;
