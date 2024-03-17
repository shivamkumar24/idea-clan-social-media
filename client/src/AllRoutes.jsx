import Home from "./Components/Home";
import Login from "./Components/Login";
import Posts from "./Components/Posts";
import Friends from "./Components/Friends";
import Register from "./Components/Register";
import { Route, Routes } from "react-router-dom";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/login" element={<Login />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AllRoutes;
