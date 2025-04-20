import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  Portal,
  Image,
  Text,
  Stack,
  Skeleton,
  Heading,
  Center,
  CloseButton,
} from "@chakra-ui/react";

interface Props {
  taxonId: number;
  onClose: () => void;
}


interface Taxon {
  id: number;
  name: string;
  preferred_common_name?: string;
  wikipedia_summary?: string;
  conservation_status?: {
    status: string;
    status_name: string;
    authority: string;
  };
  default_photo?: {
    medium_url: string;
    attribution: string;
  };
}

const SpeciesDetailCard: React.FC<Props> = ({ taxonId, onClose }) => {
  const [taxon, setTaxon] = useState<Taxon | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch details and open dialog each time taxonId changes
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://api.inaturalist.org/v1/taxa/${taxonId}`)
      .then(({ data }) => setTaxon(data.results[0]))
      .catch(console.error)
      .finally(() => {
        setLoading(false);
        setIsOpen(true);
      });
  }, [taxonId]);

  const handleClose = () => {
    setIsOpen(false);
    onClose();
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={({ open }) => {
        // When the dialog is closed, open === false
        if (!open) {
          handleClose();
        }
      }}
      lazyMount
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            borderRadius="xl"
            maxW="lg"
            p={6}
            position="relative"
          >
            <Dialog.CloseTrigger asChild>
              <CloseButton position="absolute" top="4" right="4" />
            </Dialog.CloseTrigger>

            <Heading size="lg" mb={4}>
              {loading
                ? <Skeleton height="24px" width="60%" />
                : taxon?.preferred_common_name || taxon?.name || "Details"}
            </Heading>

            <Dialog.Body>
              {loading ? (
                <Stack spacing={4}>
                  <Skeleton height="200px" />
                  <Skeleton height="20px" />
                  <Skeleton height="16px" />
                  <Skeleton height="16px" />
                </Stack>
              ) : taxon ? (
                <Stack spacing={4}>
                  {taxon.default_photo ? (
                    <Image
                      src={taxon.default_photo.medium_url}
                      alt={`Photo of ${taxon.name}`}
                      borderRadius="md"
                      objectFit="cover"
                      maxH="300px"
                    />
                  ) : (
                    <Center color="gray.400" fontSize="xl">
                      No image available
                    </Center>
                  )}
                  <Text fontStyle="italic" color="gray.500">
                    {taxon.name}
                  </Text>
                  {taxon.conservation_status && (
                    <Text>
                      <strong>Conservation Status:</strong>{" "}
                      {taxon.conservation_status.status_name} (
                      {taxon.conservation_status.authority})
                    </Text>
                  )}
                  {taxon.wikipedia_summary && (
                    <Text>{taxon.wikipedia_summary}</Text>
                  )}
                </Stack>
              ) : (
                <Text color="red.500" textAlign="center">
                  Species details not available.
                </Text>
              )}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default SpeciesDetailCard;