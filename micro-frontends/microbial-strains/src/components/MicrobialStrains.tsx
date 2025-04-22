import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Input,
  Spinner,
  Text,
  Button,
  Flex,
  SimpleGrid,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import ModularCard from "./ModularCard";
import pubmlst from "../pubmlst.js";

interface Database {
  db: string;
  description?: string;
}

interface Strain {
  id: string;
  ST?: string;
  species?: string;
  image_url?: string;
}

const ITEMS_PER_PAGE = 10;

export default function MicrobialStrainBrowser() {
  const [databases, setDatabases] = useState<Database[]>([]);
  const [selectedDb, setSelectedDb] = useState<string>("");
  const [strains, setStrains] = useState<Strain[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  // Dropdown search state
  const [localSearchTerm, setLocalSearchTerm] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  // Fetch available databases
  useEffect(() => {
    const fetchDatabases = async () => {
      try {
        const res = await pubmlst.get(`/db`);
        setDatabases(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching databases:", err);
        setDatabases([]);
      }
    };
    fetchDatabases();
  }, []);

  // Fetch strains when a database is selected or page changes
  useEffect(() => {
    if (!selectedDb) return;
    const fetchStrains = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${API_BASE}/db/${selectedDb}/isolates?limit=${ITEMS_PER_PAGE}&offset=${(page - 1) * ITEMS_PER_PAGE}`
        );
        setStrains(res.data.isolates || []);
      } catch (err) {
        console.error("Error fetching strains:", err);
        setStrains([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStrains();
  }, [selectedDb, page]);

  // Filter dropdown suggestions
  const suggestions = databases.filter((db) =>
    (db.description || db.db).toLowerCase().includes(localSearchTerm.toLowerCase())
  );

  // Handle click on suggestion
  const handleSuggestionClick = (label: string, id: string) => {
    setLocalSearchTerm(label);
    setShowDropdown(false);
    setSelectedDb(id);
    setPage(1);
  };

  return (
    <Box p={6}>
      <Box
        px={{ base: 2, md: 4 }}
        py={4}
        borderWidth={1}
        borderRadius="lg"
        boxShadow="md"
        w="full"
        mb={4}
        ref={inputWrapperRef}
        position="relative"
      >
        <VStack spacing={4} align="stretch">
          <Heading size="md" textAlign="left">
            Search Database
          </Heading>

          <Box position="relative">
            <Input
              placeholder="Search microbial databases..."
              value={localSearchTerm}
              onChange={(e) => {
                setLocalSearchTerm(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => localSearchTerm && setShowDropdown(true)}
              pl="2.5rem"
              pr="3rem"
              py={2}
              borderRadius="full"
              borderColor="gray.300"
              _focus={{
                borderColor: "blue.400",
                boxShadow: "0 0 0 2px rgba(66, 153, 225, 0.6)",
              }}
            />
            <Box
              position="absolute"
              left="12px"
              top="50%"
              transform="translateY(-50%)"
              color="gray.500"
            >
              <FiSearch />
            </Box>

            {showDropdown && (
              <Box
                position="absolute"
                zIndex={10}
                bg="white"
                borderWidth="1px"
                borderRadius="lg"
                mt={2}
                w="full"
                maxH="240px"
                overflowY="auto"
                boxShadow="xl"
              >
                {suggestions.length > 0 ? (
                  suggestions.map((db) => (
                    <Box
                      key={db.db}
                      p={3}
                      _hover={{ bg: "gray.100", cursor: "pointer" }}
                      onClick={() => handleSuggestionClick(db.description || db.db, db.db)}
                    >
                      <Text fontWeight="semibold">{db.description || db.db}</Text>
                    </Box>
                  ))
                ) : (
                  <Box p={3}>
                    <Text color="gray.500" textAlign="center">
                      No results found
                    </Text>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </VStack>
      </Box>

      {loading ? (
        <Spinner />
      ) : (
        <>
          {strains.length > 0 ? (
            <>
              <SimpleGrid columns={[1, 2, 2]} spacing={4}>
                {strains.map((strain) => (
                  <ModularCard
                    key={strain.id}
                    imageSrc={strain.image_url || "/placeholder.png"}
                    title={`Strain ID: ${strain.id}`}
                    description={`ST: ${strain.ST || "N/A"}\nSpecies: ${strain.species || "Unknown"}`}
                    href={`${API_BASE}/db/${selectedDb}/isolate/${strain.id}`}
                  />
                ))}
              </SimpleGrid>

              <Flex mt={6} justify="space-between">
                <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} isDisabled={page === 1}>
                  Previous
                </Button>
                <Text>Page {page}</Text>
                <Button onClick={() => setPage((p) => p + 1)} isDisabled={strains.length < ITEMS_PER_PAGE}>
                  Next
                </Button>
              </Flex>
            </>
          ) : selectedDb ? (
            <Text>No strains found for this database.</Text>
          ) : null}
        </>
      )}
    </Box>
  );
}