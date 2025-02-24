import { Box, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router";

export function Header() {
  return (
    <Box>
      <Flex
        bg={"white"}
        color={"gray.600"}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={"gray.200"}
        align={"center"}
      >
        <Heading color={"gray.800"} size={"lg"}>
          <Link to="/">Form Builder</Link>
        </Heading>
      </Flex>
    </Box>
  );
}
