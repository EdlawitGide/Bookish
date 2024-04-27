import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CreatePost from "./CreatePost";
import DetailPage from "./DetailPage";
import UpdatePost from "./UpdatePost";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/post/:id" element={<DetailPage />} />
        <Route path="/update/:postId" element={<UpdatePost />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
