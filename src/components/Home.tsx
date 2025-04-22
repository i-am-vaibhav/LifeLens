import { Box, Flex, Heading } from "@chakra-ui/react"
import ModularCard from "./ModularCard"
import endangeredSpeciesImage from "../assets/endangeredSpecies.jpeg"
import speciesCatalogue from "../assets/speciesCatalog.jpeg"

const Home = () => {
  return <>
      <Box p={8}>
        <Heading as="h2" textAlign="center" mb={8} fontSize="4xl">
          Welcome to LifeLens
        </Heading>
        <Flex wrap="wrap" justify="center">
          <ModularCard
            imageSrc={endangeredSpeciesImage}
            title="Endangered Species"
            description="Learn about species that are at risk of extinction and the efforts to protect them."
            route="/endangered-species"
          />
          <ModularCard
            imageSrc={endangeredSpeciesImage}
            title="Microbial Strains"
            description="Discover the fascinating world of microbes and their crucial ecological role."
          />
          <ModularCard
            imageSrc={speciesCatalogue}
            title="Species Catalog"
            description="Explore our comprehensive catalog featuring diverse species from around the globe."
            route="/species-catalogue"
          />
        </Flex>
      </Box>
  </>
}

export default Home;