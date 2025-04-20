import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";

interface SearchSpeciesProps {
  searchTerm: string;
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
  };
}

const SearchSpecies: React.FC<SearchSpeciesProps> = ({ searchTerm, setSearchTerm }) => {
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
        setSuggestions(data.results || []);
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

  // Close dropdown when clicking outside
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

  const handleSearch = () => {
    console.log("Searching for:", localSearchTerm);
    setSearchTerm(localSearchTerm);
    setShowDropdown(false);
  };

  const handleSuggestionClick = (name: string) => {
    setLocalSearchTerm(name);
    setSearchTerm(name);
    setSuggestions([]);
    setShowDropdown(false);
  };

  return (
    <Box p={4} maxW="md" mx="auto" mt={8} borderWidth={1} borderRadius="lg" boxShadow="md">
      <VStack spacing={4} align="stretch">
        <Heading size="md">Search Species</Heading>

        <Box position="relative" ref={inputWrapperRef}>
          <Input
            placeholder="Enter species name"
            value={localSearchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
            onFocus={() => localSearchTerm && setShowDropdown(true)}
          />
          {loading && <Spinner size="sm" position="absolute" top="10px" right="10px" />}

          {showDropdown && suggestions.length > 0 && (
            <Box
              position="absolute"
              zIndex="10"
              bg="white"
              borderWidth="1px"
              borderRadius="md"
              mt={1}
              width="100%"
              maxHeight="200px"
              overflowY="auto"
              boxShadow="lg"
            >
              {suggestions.map((s) => (
                <Box
                  key={s.id}
                  p={2}
                  _hover={{ bg: "gray.100", cursor: "pointer" }}
                  onClick={() => handleSuggestionClick(s.record.name)}
                >
                  {s.record.preferred_common_name && (
                    <Text fontWeight="bold">{s.record.preferred_common_name}</Text>
                  )}
                  <Text fontStyle="italic" color="gray.600">
                    {s.record.name}
                  </Text>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default SearchSpecies;