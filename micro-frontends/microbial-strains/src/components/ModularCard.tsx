import { Box, Button, Text } from "@chakra-ui/react";

interface ModularCardProps {
  title: number;
  onClick: () => void;
}

const ModularCard = ({ title, onClick }: ModularCardProps) => (
  <Box
    maxW="xl"
    margin={4}
    shadow="lg"
    borderRadius="md"
    overflow="hidden"
    borderWidth="1px"
    p={4}
    textAlign="center"
  >
    <Text fontSize="xl" fontWeight="bold" mb={4}>
      {title}
    </Text>

    <Button colorScheme="blue" onClick={onClick}>
      View
    </Button>
  </Box>
);

export default ModularCard;