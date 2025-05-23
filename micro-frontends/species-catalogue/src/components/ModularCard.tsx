import { Box, Button, Card, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface ModularCardProps {
  imageSrc: string;
  title: string;
  description: string;
  route?: string;
  href?: string;
}

const ModularCard = ({
  imageSrc,
  title,
  description,
  route,
  href,
}: ModularCardProps) => (
  <Card.Root
    flexDirection="row"
    overflow="hidden"
    maxW="xl"
    margin={4}
    shadow={"lg"}
  >
    <Image objectFit="cover" maxW="200px" src={imageSrc} alt="Alternate Text" />
    <Box>
      <Card.Body>
        <Card.Title whiteSpace="normal" wordBreak="break-word" mb="2">
          {title}
        </Card.Title>
        <Card.Description whiteSpace="pre-wrap" wordBreak="break-word">
          {description}
        </Card.Description>
      </Card.Body>
      <Card.Footer>
        {route ? (
          <Button asChild>
            <Link to={route}>Explore</Link>
          </Button>
        ) : (
          <Button as="a" href={href} target="_blank" rel="noopener noreferrer">
            Explore
          </Button>
        )}
      </Card.Footer>
    </Box>
  </Card.Root>
);

export default ModularCard;
