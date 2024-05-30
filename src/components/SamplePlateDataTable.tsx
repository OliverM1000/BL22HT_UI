import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

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
          borderColor: "rgba(70, 70, 70, 1)",
          borderStyle: "solid",
          borderWidth: "1px",
          borderRadius: "5px",
          padding: "8px",
          margin: "4px",
        }}
      >
        <div style={{ margin: "0px 8px" }}>
          <span>Sample Frame Tag: </span>
          <span style={{ fontWeight: "bold" }}>{tag}</span>
        </div>
        <div
          style={{
            borderColor: "rgba(70, 70, 70, 1)",
            borderStyle: "solid",
            borderWidth: "0px",
            borderRadius: "5px",
            padding: "8px",
            margin: "8px 4px",
            backgroundColor: "rgba(240, 240, 240, 1)",
          }}
        >
          <Text as="b">Left Plate</Text>
          <div>
            <Text
              bg="white"
              borderRadius="4px"
              padding="4px 4px"
              margin="4px 0px"
            >
              {samplePlateDescriptionL != "" ? samplePlateDescriptionL : "n/a"}
            </Text>
          </div>
          <TableContainer>
            <Table className="table table-hover">
              <Thead>
                <Tr>
                  <Th>Pos.</Th>
                  <Th>Sample Description</Th>
                  <Th>Element</Th>
                  <Th>Edge</Th>
                  <Th>Range</Th>
                  <Th>Sweeps</Th>
                  <Th>Data</Th>
                  <Th>Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {samplePlateDataL.samples.map((sample, sampleId) =>
                  sample.scanSetup.map((scan, scanId) => (
                    <Tr key={sampleId * sample.scanSetup.length + scanId}>
                      <Td>{sample.position}</Td>
                      <Td>{sample.description}</Td>
                      <Td>{scan.element}</Td>
                      <Td>{scan.edge}</Td>
                      <Td>{scan.range}</Td>
                      <Td>{scan.sweeps}</Td>
                      <Td>n/a</Td>
                      <Td>n/a</Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
        <div
          style={{
            borderColor: "rgba(70, 70, 70, 1)",
            borderStyle: "solid",
            borderWidth: "0px",
            borderRadius: "5px",
            padding: "8px",
            margin: "8px 4px",
            backgroundColor: "rgba(240, 240, 240, 1)",
          }}
        >
          <span style={{ fontWeight: "bold" }}>Right Plate</span>
          <div>
            <Text
              bg="white"
              borderRadius="4px"
              padding="4px 8px"
              margin="4px 0px"
            >
              {samplePlateDescriptionR != "" ? samplePlateDescriptionR : "n/a"}
            </Text>
          </div>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th>Pos.</Th>
                  <Th>Sample Description</Th>
                  <Th>Element</Th>
                  <Th>Edge</Th>
                  <Th>Range</Th>
                  <Th>Sweeps</Th>
                  <Th>Data</Th>
                  <Th>Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {samplePlateDataR.samples.map((sample, sampleId) =>
                  sample.scanSetup.map((scan, scanId) => (
                    <Tr key={sampleId * sample.scanSetup.length + scanId}>
                      <Td>{sample.position}</Td>
                      <Td>{sample.description}</Td>
                      <Td>{scan.element}</Td>
                      <Td>{scan.edge}</Td>
                      <Td>{scan.range}</Td>
                      <Td>{scan.sweeps}</Td>
                      <Td>n/a</Td>
                      <Td>n/a</Td>
                    </Tr>
                  ))
                )}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
}

export default SamplePlateDataTable;
