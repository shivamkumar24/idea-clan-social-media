import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Text,
  Modal,
  Input,
  Button,
  useToast,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";

const Posts = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [userPosts, setUserPosts] = useState([]);
  const [followingPosts, setFollowingPosts] = useState([]);
  const [mergePosts, setMergePosts] = useState([]);
  const [status, setStatus] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [content, setContent] = useState("");
  const token = localStorage.getItem("user-token");
  const userDetails = localStorage.getItem("user-details");
  const user = JSON.parse(userDetails);
  const authorId = user?._id;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const createPostData = {
    content: content,
    authorId: authorId,
  };

  const handleCreatePost = () => {
    axios
      .post("http://localhost:5500/post", createPostData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast({
          title: res.data.message,
          status: "success",
          isClosable: true,
        });

        onClose();
        navigate("/posts");
      })
      .catch((e) =>
        toast({
          title: e.message,
          status: "error",
          isClosable: true,
        })
      );
  };

  const getAllPostsByUserID = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5500/user/posts/${id}`
      );
      const data1 = response.data;
      setUserPosts(data1);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const getAllFollowingUserPosts = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5500/following/posts/${id}`
      );
      const data1 = response.data;
      setFollowingPosts(data1);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const mergePostsData = (userPosts, followingPosts) => {
    const mergedArray = [];
    const maxLength = Math.max(userPosts.length, followingPosts.length);

    for (let i = 0; i < maxLength; i++) {
      if (i < userPosts.length) {
        mergedArray.push(userPosts[i]);
      }
      if (i < followingPosts.length) {
        mergedArray.push(followingPosts[i]);
      }
    }

    setMergePosts(mergedArray);
  };

  useEffect(() => {
    getAllPostsByUserID(authorId);
    getAllFollowingUserPosts(authorId);
    mergePostsData(userPosts, followingPosts);
    if (!loaded) {
      setLoaded(true);
      const pageRelaod = setTimeout(() => {
        window.location.reload();
      }, 100);

      clearTimeout(pageRelaod);
    }
  }, [loaded]);

  return (
    <Box>
      <Flex
        h="45px"
        align={"center"}
        fontWeight={"bold"}
        justifyContent={"space-evenly"}
        border={"1px solid blue"}
      >
        <Text>Logo</Text>

        <Text onClick={() => navigate("/friends")} cursor={"pointer"}>
          Friends
        </Text>
        <Button onClick={onOpen} color={"blue"}>
          Create Post
        </Button>
        <Text>Welcome, {user?.username}</Text>
        <Button
          color={"red"}
          onClick={() => {
            localStorage.removeItem("user-token");
            localStorage.removeItem("user-details");
            setStatus(false);
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </Flex>

      {/* Modal for create post */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreatePost}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Show All Posts */}
      <Box>
        {userPosts?.map((el) => {
          return (
            <Box
              key={el._id}
              width={"40%"}
              padding={"7px 12px"}
              margin={"15px auto"}
              border={"1px solid grey"}
            >
              <Text fontWeight={"bold"}>{el.content}</Text>
              <Text fontWeight={"thin"}>Written By AuthorID: {el.author}</Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Posts;
