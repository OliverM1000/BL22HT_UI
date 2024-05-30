import { Button, Grid, GridItem } from "@chakra-ui/react";

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
      <GridItem bg="gray.100" area={"main"}>
        Main
      </GridItem>
      <GridItem bg="gray.100" area={"aux"}>
        Aux
      </GridItem>
    </Grid>
  );
}

export default App;
