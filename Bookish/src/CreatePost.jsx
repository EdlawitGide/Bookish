import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import Navbar from "./Navbar";
import PostForm from "./PostForm";
import { supabase } from "../supabase"; // Import the Supabase client

const CreatePost = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPost = {
      title,
      content,
      image,
    };
    // Call the Supabase API to create a new post
    const { data, error } = await supabase.from("Post").insert([newPost]); // Use insert([newPost]) instead of insert(newPost)
    if (error) {
      console.error(error);
    } else {
      navigate("/"); // Use navigate("/") to navigate back to the home page
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Create Post</h1>
      <PostForm
        title={title}
        content={content}
        image={image}
        handleSubmit={handleSubmit}
        setTitle={setTitle}
        setContent={setContent}
        setImage={setImage}
      />
    </div>
  );
};

export default CreatePost;
