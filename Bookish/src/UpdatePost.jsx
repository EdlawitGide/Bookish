import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import PostForm from "./PostForm";
import { supabase } from "../supabase";

const UpdatePost = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const buttonString = "Update Post";

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data: postData, error: postError } = await supabase
          .from("Post")
          .select("*")
          .eq("id", postId)
          .single();

        if (postError) {
          throw new Error(`Error fetching post: ${postError.message}`);
        }

        setPost(postData);
        setTitle(postData.title); // Update state with post data
        setContent(postData.content);
        setImage(postData.image);
      } catch (error) {
        console.error("Error in fetchPost:", error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Update the post using Supabase API
      const { error } = await supabase
        .from("Post")
        .update({ title, content, image })
        .eq("id", postId);

      if (error) {
        console.error("Error updating post:", error);
      } else {
        console.log("Post updated successfully!");
        navigate(`/post/${postId}`);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <h1>Update Post</h1>
      <PostForm
        title={title}
        content={content}
        image={image}
        handleSubmit={handleSubmit}
        setTitle={setTitle}
        setContent={setContent}
        setImage={setImage}
        buttonString={buttonString}
      />
    </div>
  );
};

export default UpdatePost;
