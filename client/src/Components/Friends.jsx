import { Box, Grid, Text, Button, GridItem, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";

const Friends = () => {
  const toast = useToast();
  const [allUsers, setAllUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const userDetails = localStorage.getItem("user-details");
  const user = JSON.parse(userDetails);
  const getFilteredUser = allUsers.filter((el) => el._id !== user._id);

  const getAllUsersData = async () => {
    try {
      const response = await axios.get("http://localhost:5500/allusers");
      const data1 = response.data;
      setAllUsers(data1);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const handleFollow = (id) => {
    const followData = {
      userId: user?._id,
      targetUserId: id,
    };

    axios
      .post("http://localhost:5500/follow", followData)
      .then((res) => {
        toast({
          title: res.data.message,
          status: "success",
          isClosable: true,
        });
        getAllUsersData();
      })
      .catch((e) =>
        toast({
          title: e.message,
          status: "error",
          isClosable: true,
        })
      );
  };

  const handleUnfollow = (id) => {
    const unfollowData = {
      userId: user?._id,
      targetUserId: id,
    };

    axios
      .post("http://localhost:5500/unfollow", unfollowData)
      .then((res) => {
        toast({
          title: res.data.message,
          status: "success",
          isClosable: true,
        });
        getAllUsersData();
      })
      .catch((e) =>
        toast({
          title: e.message,
          status: "error",
          isClosable: true,
        })
      );
  };

  const isFollowing = (otherUserId) => {
    const currentUser = user;
    return currentUser.following.some((userr) => userr._id === otherUserId);
  };

  useEffect(() => {
    getAllUsersData();
    if (!loaded) {
      setLoaded(true);
      const pageRelaod = setTimeout(() => {
        window.location.reload();
      }, 100);

      clearTimeout(pageRelaod);
    }
  }, [loaded]);

  console.log("Data", getFilteredUser);

  return (
    <Grid templateColumns="repeat(3, 1fr)" gap={4} p={"25px 20px"}>
      {getFilteredUser?.map((el) => (
        <GridItem key={el._id}>
          <Box
            padding={"7px 12px"}
            margin={"15px auto"}
            border={"1px solid grey"}
          >
            <Text fontSize={"20px"} fontWeight={"bold"}>
              {el.username}
            </Text>

            {isFollowing(el._id) ? (
              <Button onClick={() => handleUnfollow(el._id)}>Unfollow</Button>
            ) : (
              <Button onClick={() => handleFollow(el._id)}>Follow</Button>
            )}
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};

export default Friends;
