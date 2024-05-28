import { Container, VStack, Box, Text, Flex, Spacer, Button, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useFoos } from "../integrations/supabase/index.js";

const Index = () => {
  const { data, error, isLoading } = useFoos();

  if (isLoading) return <Spinner />;
  if (error) return (
    <Alert status="error">
      <AlertIcon />
      {error.message}
    </Alert>
  );

  return (
    <Container maxW="container.xl" p={0}>
      <Flex as="nav" bg="blue.500" color="white" p={4} align="center">
        <Text fontSize="xl" fontWeight="bold">My Landing Page</Text>
        <Spacer />
        <Button variant="ghost" colorScheme="whiteAlpha" mr={4}>Home</Button>
        <Button variant="ghost" colorScheme="whiteAlpha" mr={4}>About</Button>
        <Button variant="ghost" colorScheme="whiteAlpha">Contact</Button>
      </Flex>
      <VStack spacing={4} align="stretch" p={8}>
        <Box bg="gray.100" p={8} borderRadius="md" boxShadow="md">
          <Text fontSize="2xl" fontWeight="bold">Welcome to Our Landing Page</Text>
          <Text mt={4}>This is a blank canvas for your content. Start adding your components and style them using Chakra UI.</Text>
        </Box>
        <Box bg="gray.100" p={8} borderRadius="md" boxShadow="md">
          <Text fontSize="2xl" fontWeight="bold">Foo Data</Text>
          {data.map(foo => (
            <Text key={foo.id}>{foo.title}</Text>
          ))}
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;