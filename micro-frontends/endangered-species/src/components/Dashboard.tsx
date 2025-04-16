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

const Dashboard: React.FC = () => {
  const [selectedTaxonId, setSelectedTaxonId] = useState<number | null>(null);

  return (
    <Box minH="100vh" py={8}>
      <Container maxW="6xl">
        <Box textAlign="center" mb={10}>
          <Heading as="h1" size="xl" fontWeight="bold">
            Endangered Species Dashboard
          </Heading>
        </Box>

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
      </Container>
    </Box>
  );
};

export default Dashboard;