import { Button, Divider, Grid, GridItem } from "@chakra-ui/react";
import SampleFrameDataTable from "./components/SampleFrameDataTable";
import SamplePlateDataTable from "./components/SamplePlateDataTable";
import { useState } from "react";

let data = [
  {
    tag: "AAA-BBB",
    description: "Test Frame AAA-BBB",
    created: "2024-05-03",
    received: "2024-05-24",
    dataAvailable: true,
    samplePlateL: {
      samplePlateType: 1,
      description: "left test plate",
      samples: [
        {
          sampleId: 1,
          position: "A",
          description: "first sample",
          scanSetup: [
            {
              scanId: 1,
              element: "Cu",
              edge: "K",
              range: "EXAFS",
              setup: "transmission",
              optics: "default",
              beamWidth: 4,
              detune: 0.2,
              sweeps: 4,
            },
            {
              scanId: 2,
              element: "Zn",
              edge: "K",
              range: "EXAFS",
              setup: "transmission",
              optics: "default",
              beamWidth: 4,
              detune: 0.2,
              sweeps: 4,
            },
          ],
        },
        {
          sampleId: 2,
          position: "D",
          description: "second sample",
          scanSetup: [
            {
              scanId: 3,
              element: "Fe",
              edge: "K",
              range: "XANES",
              setup: "transmission",
              optics: "default",
              beamWidth: 4,
              detune: 0.2,
              sweeps: 8,
            },
          ],
        },
      ],
    },
    samplePlateR: {
      samplePlateType: 1,
      description: "right test plate",
      samples: [
        {
          sampleId: 3,
          position: "C",
          description: "some sample",
          scanSetup: [
            {
              scanId: 4,
              element: "Co",
              edge: "K",
              range: "EXAFS",
              setup: "transmission",
              optics: "default",
              beamWidth: 6,
              detune: 0.4,
              sweeps: 4,
            },
          ],
        },
      ],
    },
  },
  {
    tag: "CCC-DDD",
    description: "some frame",
    created: "2024-05-04",
    received: "",
    dataAvailable: false,
    samplePlateL: {
      samplePlateType: 2,
      description: "Soils 2024",
      samples: [
        {
          sampleId: 4,
          position: "A",
          description: "Soil 001",
          scanSetup: [
            {
              scanId: 5,
              element: "Mn",
              edge: "K",
              range: "XANES",
              setup: "transmission",
              optics: "default",
              beamWidth: 6,
              detune: 0.4,
              sweeps: 4,
            },
          ],
        },
        {
          sampleId: 5,
          position: "B",
          description: "Soil 002",
          scanSetup: [
            {
              scanId: 6,
              element: "Mn",
              edge: "K",
              range: "XANES",
              setup: "transmission",
              optics: "default",
              beamWidth: 6,
              detune: 0.4,
              sweeps: 4,
            },
          ],
        },
        {
          sampleId: 6,
          position: "C",
          description: "Soil 003",
          scanSetup: [
            {
              scanId: 7,
              element: "Mn",
              edge: "K",
              range: "XANES",
              setup: "transmission",
              optics: "default",
              beamWidth: 6,
              detune: 0.4,
              sweeps: 4,
            },
          ],
        },
        {
          sampleId: 8,
          position: "D",
          description: "Soil 004",
          scanSetup: [
            {
              scanId: 9,
              element: "Mn",
              edge: "K",
              range: "XANES",
              setup: "transmission",
              optics: "default",
              beamWidth: 6,
              detune: 0.4,
              sweeps: 4,
            },
          ],
        },
      ],
    },
    samplePlateR: { samplePlateType: 0, description: "", samples: [] },
  },
];

function GetSampleFrameId(tag: string) {
  return data.findIndex((e) => e.tag == tag);
}

function App() {
  const [selectedSampleFrameId, setSelectedSampleFrameId] = useState(0);

  return (
    <Grid
      templateAreas={`"header header" "nav main" "nav aux"`}
      h="200px"
      gap="1"
      gridTemplateRows={"50px 1fr 1fr"}
      gridTemplateColumns={"150px 1fr"}
    >
      <GridItem bg="gray.100" area={"header"}>
        Header
      </GridItem>
      <GridItem bg="gray.100" area={"nav"}>
        Navigation
      </GridItem>
      <GridItem area={"main"}>
        <SampleFrameDataTable
          sampleFrameDataArr={data}
          onClick={(tag) => setSelectedSampleFrameId(GetSampleFrameId(tag))}
        />
      </GridItem>
      <GridItem area={"aux"}>
        <SamplePlateDataTable
          tag={data[selectedSampleFrameId].tag}
          samplePlateDescriptionL={
            data[selectedSampleFrameId].samplePlateL.description
          }
          samplePlateDescriptionR={
            data[selectedSampleFrameId].samplePlateR.description
          }
          samplePlateDataL={data[selectedSampleFrameId].samplePlateL}
          samplePlateDataR={data[selectedSampleFrameId].samplePlateR}
          onClick={(id) => console.log(id)}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
