import React from 'react';
import {
  Box,
  Heading,
  Text,
  Stack,
  Badge,
} from '@chakra-ui/react';
import { IsolateData } from '../IsolateSchema';

interface MicrobialCardProps {
  isolate: IsolateData;
}

const MicrobialCard: React.FC<MicrobialCardProps> = ({ isolate }) => {
  const { schemes, aliases, provenance } = isolate || {};
  const scheme = schemes?.[0];
  const st = scheme?.fields?.ST;

  return (
    <Box
      p={6}
      bg="white"
      borderRadius="xl"
      boxShadow="md"
      border="1px solid"
      borderColor="gray.100"
      width="100%"
    >
      <Heading size="md" mb={3}>
        {provenance?.species} ({provenance?.isolate})
      </Heading>

      <Stack spacing={2} fontSize="sm" color="gray.700">
        <Text><strong>Source:</strong> {provenance?.source}</Text>
        <Text><strong>Disease:</strong> {provenance?.disease}</Text>
        <Text>
          <strong>Location:</strong> {provenance?.region}, {provenance?.country}
        </Text>
        <Text><strong>Year:</strong> {provenance?.year}</Text>
        {provenance?.comments && (
          <Text><strong>Notes:</strong> {provenance?.comments}</Text>
        )}

        {aliases?.length > 0 && (
          <Text>
            <strong>Aliases:</strong>{' '}
            {aliases.map((alias, i) => (
              <Badge key={i} colorScheme="purple" mr={1}>
                {alias}
              </Badge>
            ))}
          </Text>
        )}

        {scheme && (
          <>
            <Text><strong>MLST:</strong> {scheme.description}</Text>
            <Text><strong>Loci:</strong> {scheme.loci_designated_count}</Text>
            {st !== undefined && <Text><strong>ST:</strong> {st}</Text>}
          </>
        )}
      </Stack>
    </Box>
  );
};

export default MicrobialCard;