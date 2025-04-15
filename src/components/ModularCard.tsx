import { Box, Button, Card, Image } from "@chakra-ui/react"
import { Link } from "react-router-dom";

interface ModularCardProps {
  imageSrc: string;
  title: string;
  description: string;
  route?: string;
}

const ModularCard = ({ imageSrc, title, description, route }: ModularCardProps) => (
  <Card.Root flexDirection="row" overflow="hidden" maxW="xl">
    <Image
      objectFit="cover"
      maxW="200px"
      src={imageSrc}
      alt="Alternate Text"
    />
    <Box>
      <Card.Body>
        <Card.Title mb="2">{title}</Card.Title>
        <Card.Description>{description}</Card.Description>
      </Card.Body>
      <Card.Footer>
        <Button asChild>
          <Link to={route}>Explore</Link>
        </Button>
      </Card.Footer>
    </Box>
  </Card.Root>
)

export default ModularCard;