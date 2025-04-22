import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Flex,
  SimpleGrid,
  Button,
  Spinner,
  Text,
} from "@chakra-ui/react";
import ModularCard from "../components/ModularCard";
import picture from "../assets/speciesCatalog.jpeg";
import animalsListTemp from "../assets/animalList.json";

interface Species {
  name: string;
  description: string;
  image: string;
  url: string;
}

const itemsPerPage = 10;
const animalsList = animalsListTemp.animalsList;

function SpeciesCatalogue() {
  const [currentPage, setCurrentPage] = useState(1);
  const [speciesData, setSpeciesData] = useState<Species[]>([]);
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(animalsList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const baseURL = "https://api.inaturalist.org/v1/taxa?q=";

  useEffect(() => {
    setLoading(true);
    setSpeciesData([]);

    const fetchData = async () => {
      const requests = [];

      for (
        let i = indexOfFirstItem;
        i < indexOfLastItem && i < animalsList.length;
        i++
      ) {
        const animal = animalsList[i];
        const request = axios
          .get(`${baseURL}${animal}`)
          .then((response) => {
            const species = response.data?.results?.[0];

            if (species) {
              const taxonName = species.iconic_taxon_name
                ? `Taxon Name: ${species.iconic_taxon_name}`
                : "";
              const completeSpeciesCount =
                species.complete_species_count !== undefined &&
                species.complete_species_count !== null
                  ? `Complete Species Count: ${species.complete_species_count}`
                  : "";
              const completeRank = species.complete_rank
                ? `Complete Rank: ${species.complete_rank}`
                : "";
              const isActive =
                typeof species.is_active === "boolean"
                  ? `Active: ${species.is_active ? "Yes" : "No"}`
                  : "";

              const descriptionParts = [
                species.wikipedia_summary,
                taxonName,
                completeSpeciesCount,
                completeRank,
                isActive,
              ];

              const desc = descriptionParts
                .filter((part) => part && part.trim() !== "")
                .join("\n");

              return {
                name: species.name,
                description:
                  species.wikipedia_summary ||
                  desc ||
                  "No description available.",
                image: species.default_photo?.medium_url || picture,
                url: species.wikipedia_url || "#",
              };
            }

            return null;
          })
          .catch((error) => {
            console.error(`Error fetching data for ${animal}:`, error);
            return null;
          });

        requests.push(request);
      }

      const results = await Promise.all(requests);
      const filtered = results.filter((item) => item !== null) as Species[];
      setSpeciesData(filtered);
      setLoading(false);
    };

    fetchData();
  }, [currentPage]);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Box maxW="1200px" mx="auto" px={4} py={8}>
      <Heading as="h1" mb={6} textAlign="center">
        Species Catalogue
      </Heading>

      {loading ? (
        <Flex justify="center" align="center" minH="200px">
          <Spinner size="xl" />
        </Flex>
      ) : speciesData.length === 0 ? (
        <Text>No data available.</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {speciesData.map((item, idx) => (
            <ModularCard
              key={idx}
              imageSrc={item.image}
              title={item.name}
              description={item.description}
              href={item.url}
            />
          ))}
        </SimpleGrid>
      )}

      {/* Pagination */}
      <Flex justify="center" mt={8} wrap="wrap" gap={2}>
        <Button
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>

        {/* First Page */}
        {currentPage > 3 && (
          <>
            <Button
              onClick={() => paginate(1)}
              variant="outline"
              colorScheme="teal"
            >
              1
            </Button>
            {currentPage > 4 && <Text px={2}>...</Text>}
          </>
        )}

        {/* Middle Pages */}
        {Array.from({ length: totalPages }, (_, idx) => idx + 1)
          .filter(
            (num) =>
              num === currentPage || // current
              num === currentPage - 1 ||
              num === currentPage - 2 ||
              num === currentPage + 1 ||
              num === currentPage + 2
          )
          .map((num) => (
            <Button
              key={num}
              onClick={() => paginate(num)}
              variant={num === currentPage ? "solid" : "outline"}
              colorScheme="teal"
            >
              {num}
            </Button>
          ))}

        {/* Last Page */}
        {currentPage < totalPages - 2 && (
          <>
            {currentPage < totalPages - 3 && <Text px={2}>...</Text>}
            <Button
              onClick={() => paginate(totalPages)}
              variant="outline"
              colorScheme="teal"
            >
              {totalPages}
            </Button>
          </>
        )}

        <Button
          onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
}

export default SpeciesCatalogue;
