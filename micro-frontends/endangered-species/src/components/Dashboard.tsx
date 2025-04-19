import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Container,
} from "@chakra-ui/react";
import ObservationTrends from "./ObservationTrends";
import TopSpeciesChart from "./TopSpeciesChart";
import SpeciesDetailCard from "./SpeciesDetailCard";
import SearchSpecies from "./SearchSpecies";
import SpeciesDetails from "./SpeciesDetails";

const Dashboard: React.FC = () => {
  const [selectedTaxonId, setSelectedTaxonId] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Box minH="100vh" py={8}>
      <Container maxW="6xl">
        <Box textAlign="center" mb={10}>
          <Heading as="h1" size="xl" fontWeight="bold">
            Endangered Species Dashboard
          </Heading>
        </Box>
        <SearchSpecies searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Flex direction={{ base: "column", md: "row" }} gap={6}>
          <Box
            flex={1}
            borderRadius="xl"
            p={5}
          >
            <ObservationTrends />
          </Box>

          <Box
            flex={1}
            borderRadius="xl"
            p={5}
          >
            <TopSpeciesChart onBarClick={setSelectedTaxonId} />
          </Box>
        </Flex>

        {selectedTaxonId && (
          <Flex justify="center" mt={10}>
            <Box
              w="full"
              maxW="6xl"
              borderRadius="xl"
              p={5}
            >
              <SpeciesDetailCard
                taxonId={selectedTaxonId}
                onClose={() => setSelectedTaxonId(null)}
              />
            </Box>
          </Flex>
        )}

        { searchTerm && (<Box mt={10} textAlign="center">
          <SpeciesDetails searchTerm={searchTerm} />
        </Box>  )}
      </Container>
    </Box>
  );
};

export default Dashboard;