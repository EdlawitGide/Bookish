import React, { useState } from "react";
import "./PostForm.css"; // Import PostForm styles

const PostForm = ({
  handleSubmit,
  setTitle,
  setContent,
  setImage,
  title,
  content,
  image,
  buttonString,
}) => {
  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <label className="form-label">
        Title:
        <input
          className="form-input"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter title..."
          required
        />
      </label>
      <label className="form-label">
        Content:
        <textarea
          className="form-input"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Enter content..."
          required
        />
      </label>
      <label className="form-label">
        Image URL:
        <input
          className="form-input"
          type="url"
          value={image}
          onChange={(event) => setImage(event.target.value)}
          placeholder="Enter image URL..."
        />
      </label>
      <button className="form-button" type="submit">
        {buttonString}
      </button>
    </form>
  );
};

export default PostForm;
