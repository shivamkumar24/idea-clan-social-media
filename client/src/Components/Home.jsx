import { useNavigate } from "react-router-dom";
import { Box, Button, Flex } from "@chakra-ui/react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box>
        <Flex>
          <Button onClick={() => navigate("/login")} mr={"15px"}>
            Login
          </Button>
          <Button onClick={() => navigate("/register")} ml={"15px"}>
            Register
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Home;
