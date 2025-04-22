import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Input,
  Spinner,
  Text,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

interface SearchSpeciesProps {
  setSearchTerm: (term: string) => void;
}

interface Suggestion {
  id: number;
  name: string;
  matched_term: string;
  record: {
    name: string;
    preferred_common_name?: string;
    iconic_taxon_name?: string;
    conservation_status?: { status: string };
  };
}

const SearchSpecies: React.FC<SearchSpeciesProps> = ({ setSearchTerm }) => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const inputWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!localSearchTerm.trim()) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://api.inaturalist.org/v1/search?q=${encodeURIComponent(
            localSearchTerm
          )}&sources=taxa`
        );
        const data = await response.json();

        const filteredSuggestions = data.results.filter((s: any) => {
          const status = s.record.conservation_status?.status;
          return status && (status.includes("en") || status.includes("cr"));
        });

        setSuggestions(filteredSuggestions || []);
        setShowDropdown(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      } finally {
        setLoading(false);
      }
    };

    const delayDebounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delayDebounce);
  }, [localSearchTerm]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputWrapperRef.current &&
        !inputWrapperRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSuggestionClick = (name: string) => {
    setLocalSearchTerm(name);
    setSearchTerm(name);
    setSuggestions([]);
    setShowDropdown(false);
    setTimeout(() => {
      window.scrollBy({ top: 10000000, behavior: "smooth" });
    }, 300);
  };

  return (
    <Box px={{ base: 2, md: 4 }} py={4} borderWidth={1} borderRadius="lg" boxShadow="md" w="full">
      <VStack spacing={4} align="stretch">
        <Heading size="md" textAlign="left">
          Search Species
        </Heading>

        <Box position="relative" ref={inputWrapperRef}>
          <Input
            placeholder="Search endangered species..."
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
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
          <Box position="absolute" left="12px" top="50%" transform="translateY(-50%)" color="gray.500">
            <FiSearch />
          </Box>

          {loading && (
            <Spinner
              size="sm"
              position="absolute"
              top="50%"
              right="10px"
              transform="translateY(-50%)"
              color="blue.500"
            />
          )}

          {showDropdown && (
            <Box
              position="absolute"
              zIndex="10"
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
                suggestions.map((s) => (
                  <Box
                    key={s.id}
                    p={3}
                    _hover={{ bg: "gray.100", cursor: "pointer" }}
                    onClick={() => handleSuggestionClick(s.record.name)}
                  >
                    {s.record.preferred_common_name && (
                      <Text fontWeight="semibold">
                        {s.record.preferred_common_name}
                      </Text>
                    )}
                    <Text fontStyle="italic" color="gray.600" fontSize="sm">
                      {s.record.name}
                    </Text>
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
  );
};

export default SearchSpecies;