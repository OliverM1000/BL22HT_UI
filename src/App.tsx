import { Button, Grid, GridItem } from "@chakra-ui/react";
import SampleFrameDataTable from "./components/SampleFrameDataTable";

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
          position: "A",
          description: "first sample",
          scanSetup: [
            {
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
          position: "D",
          description: "second sample",
          scanSetup: [
            {
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
          position: "C",
          description: "some sample",
          scanSetup: [
            {
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
          position: "A",
          description: "Soil 001",
          scanSetup: [
            {
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
          position: "B",
          description: "Soil 002",
          scanSetup: [
            {
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
          position: "C",
          description: "Soil 003",
          scanSetup: [
            {
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
          position: "D",
          description: "Soil 004",
          scanSetup: [
            {
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

function App() {
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
          onClick={(tag) => console.log(tag)}
        />
      </GridItem>
      <GridItem area={"aux"}>
        <SampleFrameDataTable
          sampleFrameDataArr={data}
          onClick={(tag) => console.log(tag)}
        />
      </GridItem>
    </Grid>
  );
}

export default App;
