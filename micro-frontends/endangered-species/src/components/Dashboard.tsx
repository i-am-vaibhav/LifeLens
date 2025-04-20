import React, { useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Container,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FiTrendingUp, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { GiWolfHowl } from "react-icons/gi";

import ObservationTrends from "./ObservationTrends";
import TopSpeciesChart from "./TopSpeciesChart";
import SpeciesDetailCard from "./SpeciesDetailCard";
import SearchSpecies from "./SearchSpecies";
import SpeciesDetails from "./SpeciesDetails";

// MotionBox remains untouched as per your request
const MotionBox = motion.create(Box);

const Dashboard: React.FC = () => {
  const [selectedTaxonId, setSelectedTaxonId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // New toggle states for mobile view
  const [observationTrendsVisible, setObservationTrendsVisible] = useState(true);
  const [topSpeciesChartVisible, setTopSpeciesChartVisible] = useState(true);

  return (
    <Box minH="100vh" py={2}>
      <Container maxW="8xl" px={{ base: 4, md: 8 }}>
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "flex-start", md: "center" }}
          mb={5}
          gap={4}
        >
          <Heading
            as="h1"
            size="xl"
            fontWeight="bold"
            textAlign={{ base: "center", md: "left" }}
            w="full"
          >
            Endangered Species Dashboard
          </Heading>
        </Flex>

        <Box
          position="sticky"
          top={0}
          bg="white"
          _dark={{ bg: "black" }}
          py={4}
          mb={8}
          px={{ base: 2, md: 0 }}
          zIndex={10}
        >
          <SearchSpecies setSearchTerm={setSearchTerm} />
        </Box>

        {/* MOBILE: Clickable toggles */}
        <Box display={{ base: "block", md: "none" }} mb={8}>
          {/* Observation Trends Toggle */}
          <Box
            onClick={() => setObservationTrendsVisible(!observationTrendsVisible)}
            p={4}
            borderRadius="lg"
            bg="teal.50"
            _hover={{ cursor: "pointer" }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Text fontWeight="semibold" display="flex" alignItems="center" gap={2}>
              <FiTrendingUp />
              Observation Trends
            </Text>
            {observationTrendsVisible ? <FiChevronUp /> : <FiChevronDown />}
          </Box>
          {observationTrendsVisible && (
            <Box
              p={4}
              borderRadius="xl"
              bg="gray.50"
              _dark={{ bg: "gray.800" }}
              shadow="sm"
              mb={6}
            >
              <ObservationTrends />
            </Box>
          )}

          {/* Top Species Chart Toggle */}
          <Box
            onClick={() => setTopSpeciesChartVisible(!topSpeciesChartVisible)}
            p={4}
            borderRadius="lg"
            bg="teal.50"
            _hover={{ cursor: "pointer" }}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Text fontWeight="semibold" display="flex" alignItems="center" gap={2}>
              <GiWolfHowl />
              Top Species Chart
            </Text>
            {topSpeciesChartVisible ? <FiChevronUp /> : <FiChevronDown />}
          </Box>
          {topSpeciesChartVisible && (
            <Box
              p={4}
              borderRadius="xl"
              bg="gray.50"
              _dark={{ bg: "gray.800" }}
              shadow="sm"
            >
              <TopSpeciesChart onBarClick={setSelectedTaxonId} />
            </Box>
          )}
        </Box>

        {/* DESKTOP: Side‑by‑side charts */}
        <Flex
          direction="row"
          gap={6}
          mb={8}
          display={{ base: "none", md: "flex" }}
        >
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

        {/* Selected Species Details */}
        {selectedTaxonId && (
          <Flex justify="center" mt={10} px={{ base: 2, md: 0 }}>
            <MotionBox
              w="full"
              maxW="4xl"
              borderRadius="xl"
              p={{ base: 3, md: 5 }}
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

        {/* Search Term Result */}
        {searchTerm && (
          <Flex justify="center" mt={10} px={{ base: 2, md: 0 }}>
            <MotionBox
              maxW="4xl"
              w="full"
              textAlign="center"
              bg="gray.50"
              _dark={{ bg: "gray.800" }}
              shadow="sm"
              p={{ base: 3, md: 5 }}
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