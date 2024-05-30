import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { BsEye, BsCheckCircle, BsXCircle } from "react-icons/bs";

interface SampleFrameData {
  tag: string;
  description: string;
  created: string;
  received: string;
  dataAvailable: boolean;
  samplePlateL: SamplePlateData;
  samplePlateR: SamplePlateData;
}
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
  sampleFrameDataArr: SampleFrameData[];
  onClick: (tag: string) => void;
}

function SampleFrameDataTable({ sampleFrameDataArr, onClick }: Props) {
  return (
    <div
      style={{
        borderColor: "rgba(70, 70, 70, 1)",
        borderStyle: "solid",
        borderWidth: "2px",
        borderRadius: "5px",
        padding: "8px",
        margin: "4px",
      }}
    >
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Tag</Th>
              <Th>Frame Description</Th>
              <Th>Created</Th>
              <Th>Received</Th>
              <Th>Data</Th>
            </Tr>
          </Thead>
          <Tbody>
            {sampleFrameDataArr.map((sampleFrameData) => (
              <Tr
                key={sampleFrameData.tag}
                onClick={() => onClick(sampleFrameData.tag)}
              >
                <Td>{sampleFrameData.tag}</Td>
                <Td>{sampleFrameData.description}</Td>
                <Td>
                  {sampleFrameData.created ? sampleFrameData.created : "n/a"}
                </Td>
                <Td>
                  {sampleFrameData.received ? sampleFrameData.received : "n/a"}
                </Td>
                <Td>
                  {sampleFrameData.dataAvailable ? (
                    <BsCheckCircle size={20} color={"green"} />
                  ) : (
                    <BsXCircle size={20} color={"red"} />
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default SampleFrameDataTable;
