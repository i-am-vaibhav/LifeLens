import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Input,
  Spinner,
  Text,
  Button,
  Flex,
  VStack,
  Heading,
  Grid,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import pubmlst from "../pubmlst.ts";
import MicrobialCard from "./MicrobialCard.tsx";
import { IsolateData } from "../IsolateSchema.ts";
import ModularCard from "./ModularCard.tsx";

interface DatabaseItem {
  description?: string;
  name: string;
  databases?: {
    href: string;
    description: string;
    name: string;
  }[];
}


const ITEMS_PER_PAGE = 10;

export default function MicrobialStrainBrowser() {
  const [databaseGroups, setDatabaseGroups] = useState<DatabaseItem[]>([]);
  const [selectedDbName, setSelectedDbName] = useState<string>("");
  const [selectedDbId, setSelectedDbId] = useState<string>("");
  const [strains, setStrains] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [localSearchTerm, setLocalSearchTerm] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const [selectedIsolate, setSelectedIsolate] = useState<IsolateData | null>(null);

  const inputWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDatabases = async () => {
      try {
        const res = await pubmlst.get(`/db`);
        setDatabaseGroups(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching databases:", err);
      }
    };
    fetchDatabases();
  }, []);

  useEffect(() => {
    if (!selectedDbId) return;

    const fetchStrains = async () => {
      setLoading(true);
      try {
        const res = await pubmlst.get(
          `/db/${selectedDbId}/isolates?page_size=${ITEMS_PER_PAGE}&offset=${(page - 1) * ITEMS_PER_PAGE}`
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
  }, [selectedDbId, page]);

  const fetchStrainDetails = async (strain: string , index: number) => {
    try { // Get the URL from the strain object using the index
    
      if (strain) {
        // Split the URL at "db"
        const urlParts = strain.split('/db/');
        const res = await pubmlst.get(`/db/${urlParts[1]}`);
        setSelectedIsolate(res.data);
      } else {
        console.error("Strain URL not found for index:", index);  
      }
    } catch (error) {
      console.error("Failed to fetch isolate details", error);
    }
  };

  const suggestions = databaseGroups.reduce<
    { label: string; id: string }[]
  >((acc, group) => {
    if (group.databases) {
      group.databases.forEach((db) => {
        if (
          db.description.toLowerCase().includes(localSearchTerm.toLowerCase())
        ) {
          acc.push({ label: db.description, id: db.name });
        }
      });
    } else if (
      group.description?.toLowerCase().includes(localSearchTerm.toLowerCase())
    ) {
      acc.push({ label: group.description, id: group.name });
    }
    return acc;
  }, []);

  const handleSuggestionClick = (label: string, id: string) => {
    setLocalSearchTerm(label);
    setShowDropdown(false);
    setSelectedDbName(label);
    setSelectedDbId(id);
    setPage(1);
    setSelectedIsolate(null);
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
                  suggestions.map((suggestion) => (
                    <Box
                      key={suggestion.id}
                      p={3}
                      _hover={{ bg: "gray.100", cursor: "pointer" }}
                      onClick={() => handleSuggestionClick(suggestion.label, suggestion.id)}
                    >
                      <Text fontWeight="semibold">{suggestion.label}</Text>
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
              <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                {strains.map((strain, index) => (
                  <ModularCard
                    key={index}
                    title={index + 1}
                    onClick={() => {
                      fetchStrainDetails(strain, index + 1);
                    }}
                  />
                ))}
              </Grid>

              {selectedIsolate && (
                <Box mt={6}>
                  <MicrobialCard isolate={selectedIsolate} />
                </Box>
              )}

              <Flex mt={6} justify="space-between">
                <Button onClick={() => setPage((p) => Math.max(p - 1, 1))} isDisabled={page === 1}>
                  Previous
                </Button>
                <Text>Page {page}</Text>
                <Button
                  onClick={() => setPage((p) => p + 1)}
                  isDisabled={strains.length < ITEMS_PER_PAGE}
                >
                  Next
                </Button>
              </Flex>
            </>
          ) : selectedDbId ? (
            <Text>No strains found for the database "{selectedDbName}".</Text>
          ) : null}
        </>
      )}
    </Box>
  );
}
