import { Box, Flex, Heading, HStack, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ColorModeButton } from './ui/color-mode';

const Navbar = () => {
  return (
    <Box bg="teal.500" px={4} py={2} shadow={["inner"]}>
      <Flex alignItems="center" justifyContent="space-between">
        {/* App/Brand Title */}
        <Heading as="h1" size="lg" color="white">
          LifeLens
        </Heading>
        {/* Navigation Links */}
        <HStack spacing={4}>
          <Link
            as={RouterLink}
            to={{
              pathname: "/"
            }}
            fontSize="lg"
            color="white"
            _hover={{ textDecoration: 'underline' }}
          >
            Home
          </Link>
          <Link
            as={RouterLink}
            to={{
              pathname: "/about"
            }}
            fontSize="lg"
            color="white"
            _hover={{ textDecoration: 'underline' }}
          >
            About
          </Link>
          <ColorModeButton />
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar;
