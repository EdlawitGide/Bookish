import React, { useState } from "react";
import "./Post.css";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const Post = ({ post }) => {
  const [upvotes, setUpvotes] = useState(post.upvotes);
  const handleUpvote = async (event) => {
    event.stopPropagation();
    try {
      // Call the Supabase API to update the upvotes count for the post
      const { data, error } = await supabase
        .from("Post")
        .update({ upvotes: upvotes + 1 })
        .eq("id", post.id)
        .select();
      console.log(data);
      setUpvotes(data[0].upvotes);
    } catch (error) {
      console.error("Error handling upvote:", error.message);
    }
  };

  const handlePostClick = () => {
    window.location.href = `/post/${post.id}`;
  };

  const handleUpdate = (event) => {
    event.stopPropagation();
    window.location.href = `/update/${post.id}`;
  };

  const handleDelete = async (event) => {
    event.stopPropagation();
    const { error } = await supabase.from("Post").delete().eq("id", post.id);
    window.location.href = `/`;
  };

  return (
    <div className="card" onClick={handlePostClick}>
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.content}</p>
      </div>
      <img src={post.image} alt="Post image" className="card-img-top" />
      <div className="card-footer">
        <span>{upvotes} upvotes</span>
        <button onClick={handleUpvote}>Upvote</button>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
        <span>Created on {new Date(post.created_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default Post;
