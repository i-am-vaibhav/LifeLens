import { Box, Heading, Text } from "@chakra-ui/react";

const About = () => {
  return (
    <Box p={8}>
      <Heading as="h2" size="xl" textAlign="center" mb={6}>
        About LifeLens
      </Heading>
      <Text fontSize="lg" mb={4}>
        LifeLens is a comprehensive platform dedicated to showcasing biodiversity and promoting wildlife conservation. Our goal is to educate the public and inspire meaningful action to protect our planet’s diverse species.
      </Text>
      <Text fontSize="lg">
        Through detailed catalogs, interactive modules, and engaging visual content, LifeLens brings together the latest in conservation efforts. We continuously work to highlight the beauty of our natural world while drawing attention to the species that require protection. Whether you're exploring endangered species or diving into the world of microbial strains, our mission is to be a trusted resource for biodiversity education and conservation.
      </Text>
    </Box>
  );
};

export default About;