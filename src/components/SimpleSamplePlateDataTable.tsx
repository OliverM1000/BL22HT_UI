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
  description: string;
  data: SamplePlateData;
  onClick: (id: number) => void;
}

function SimpleSamplePlateDataTable({ description, data, onClick }: Props) {
  return (
    <div style={{ margin: "0px 4px" }}>
      <span style={{ fontWeight: "bold", fontSize: "14px" }}>Left Plate: </span>
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
              <th>Data</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.samples.map((sample, sampleId) =>
              sample.scanSetup.map((scan, scanId) => (
                <tr
                  key={sampleId * sample.scanSetup.length + scanId}
                  onClick={() => onClick(sample.sampleId)}
                >
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
  );
}

export default SimpleSamplePlateDataTable;
