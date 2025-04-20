import React, { useState, useEffect } from "react";
import { Box, Text, Spinner, Image, VStack, Heading, List, ListItem, Badge } from "@chakra-ui/react";

interface SpeciesDetailsProps {
  searchTerm: string;
}

const SpeciesDetails: React.FC<SpeciesDetailsProps> = ({ searchTerm }) => {
  const [speciesDetails, setSpeciesDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpeciesDetails = async () => {
      if (!searchTerm) return;

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.inaturalist.org/v1/taxa?q=${encodeURIComponent(searchTerm)}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setSpeciesDetails(data.results[0]); // Assuming first result is the relevant species
        } else {
          setError("No species found.");
        }
      } catch (error) {
        console.error("Error fetching species details:", error);
        setError("Failed to fetch species details.");
      } finally {
        setLoading(false);
      }
    };

    fetchSpeciesDetails();
  }, [searchTerm]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  if (!speciesDetails) {
    return <Text>No species selected yet.</Text>;
  }

  return (
    <Box p={4} maxW="md" mx="auto" mt={8} borderWidth={1} borderRadius="lg" boxShadow="md">
      <VStack spacing={4}>
        <Heading size="md">{speciesDetails.name}</Heading>
        <Text fontStyle="italic" color="gray.600">
          {speciesDetails.preferred_common_name || "No common name available"}
        </Text>

        {/* Iconic Taxon */}
        {speciesDetails.iconic_taxon_name && (
          <Text fontWeight="bold">Taxon: {speciesDetails.iconic_taxon_name}</Text>
        )}

        {/* Taxonomy Details */}
        {speciesDetails.taxon && speciesDetails.taxon.ancestors && (
          <Box mt={4}>
            <Heading size="sm">Taxonomy:</Heading>
            <List spacing={1}>
              {speciesDetails.taxon.ancestors.map((ancestor: any) => (
                <ListItem key={ancestor.id}>
                  <Text>{ancestor.name}</Text>
                </ListItem>
              ))}
            </List>
          </Box>
        )}

        {/* Conservation Status */}
        {speciesDetails.conservation_status && (
          <Box mt={4}>
            <Heading size="sm">Conservation Status:</Heading>
            <Text>{speciesDetails.conservation_status.status}</Text>
            <Text>{speciesDetails.conservation_status.source}</Text>
          </Box>
        )}

        {/* Images */}
        {speciesDetails.default_photo && speciesDetails.default_photo.medium_url && (
          <Image
            src={speciesDetails.default_photo.medium_url}
            alt={speciesDetails.name}
            borderRadius="md"
            boxSize="250px"
            objectFit="cover"
          />
        )}

        {/* Wikipedia Summary */}
        {speciesDetails.wikipedia_summary && (
          <Box mt={4}>
            <Heading size="sm">Wikipedia Summary:</Heading>
            <Text>{speciesDetails.wikipedia_summary}</Text>
          </Box>
        )}

        {/* Location and Occurrence Information */}
        {speciesDetails.occurrence_status && (
          <Box mt={4}>
            <Heading size="sm">Occurrence Status:</Heading>
            <Text>{speciesDetails.occurrence_status}</Text>
          </Box>
        )}

        {/* Tags or Other Additional Information */}
        {speciesDetails.taxon && speciesDetails.taxon.taxon_tags && (
          <Box mt={4}>
            <Heading size="sm">Tags:</Heading>
            <List spacing={1}>
              {speciesDetails.taxon.taxon_tags.map((tag: any, index: number) => (
                <ListItem key={index}>
                  <Badge colorScheme="teal">{tag}</Badge>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default SpeciesDetails;