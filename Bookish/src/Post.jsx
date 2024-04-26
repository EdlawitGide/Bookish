import React from "react";
import "./Post.css";
const Post = ({ post }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.content}</p>
      </div>
      <img src={post.image} alt="Post image" className="card-img-top" />

      <div className="card-footer">
        <span>{post.upvotes} upvotes</span>
        <span>Created on {new Date(post.created_at).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default Post;
