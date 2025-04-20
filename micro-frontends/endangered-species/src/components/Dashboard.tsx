import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Container,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import ObservationTrends from "./ObservationTrends";
import TopSpeciesChart from "./TopSpeciesChart";
import SpeciesDetailCard from "./SpeciesDetailCard";
import SearchSpecies from "./SearchSpecies";
import SpeciesDetails from "./SpeciesDetails";

const MotionBox = motion(Box);

const Dashboard: React.FC = () => {
  const [selectedTaxonId, setSelectedTaxonId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Box minH="100vh" py={8}>
      <Container maxW="6xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          mb={5}
          gap={4}
        >
          <Heading as="h1" size="xl" fontWeight="bold">
            Endangered Species Dashboard
          </Heading>
        </Flex>

        <Box
          position="sticky"
          top={0}
          bg="white"
          _dark={{ bg: "gray.800" }}
          py={4}
          mb={8}
          width={'6xl'}
          display="flex"
        >
          <SearchSpecies setSearchTerm={setSearchTerm} />
        </Box>

        <Flex direction={{ base: "column", md: "row" }} gap={6} mb={8}>
          <Box
            flex={1}
            borderRadius="xl"
            p={5}
            bg="gray.50"
            _dark={{ bg: "gray.800" }}
            shadow="sm"
          >
            <ObservationTrends />
          </Box>

          <Box
            flex={1}
            borderRadius="xl"
            p={5}
            bg="gray.50"
            _dark={{ bg: "gray.800" }}
            shadow="sm"
          >
            <TopSpeciesChart onBarClick={setSelectedTaxonId} />
          </Box>
        </Flex>

        {selectedTaxonId && (
          <Flex justify="center" mt={10}>
            <MotionBox
              w="full"
              maxW="4xl"
              borderRadius="xl"
              p={5}
              bg="gray.50"
              _dark={{ bg: "gray.800" }}
              shadow="sm"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
            >
              <SpeciesDetailCard
                taxonId={selectedTaxonId}
                onClose={() => setSelectedTaxonId(null)}
              />
            </MotionBox>
          </Flex>
        )}

        {searchTerm && (
          <Flex justify="center" mt={10}>
            <MotionBox
              maxW="4xl"
              w="full"
              textAlign="center"
              bg="gray.50"
              _dark={{ bg: "gray.800" }}
              shadow="sm"
              p={5}
              borderRadius="xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SpeciesDetails searchTerm={searchTerm} />
            </MotionBox>
          </Flex>
        )}
      </Container>
    </Box>
  );
};

export default Dashboard;
