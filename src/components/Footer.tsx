import { Box, Text, Link, Stack } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box as="footer" bg="gray.100" py={6} mt={12} shadow={"inner"}>
      <Stack direction="row" spacing={4} justify="center" mb={2}>
        <Link href="/" color="gray.600" _hover={{ color: 'gray.800' }}>
          Home
        </Link>
      </Stack>
      <Text textAlign="center" color="gray.500" fontSize="sm">
        &copy; {new Date().getFullYear()} LifeLens. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
