import { Container, VStack, Box, Text, Flex, Spacer, Button } from "@chakra-ui/react";

const Index = () => {
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
      </VStack>
    </Container>
  );
};

export default Index;