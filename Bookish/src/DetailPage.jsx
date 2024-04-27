import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Post from "./Post";
import Comment from "./Comment";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase";

const DetailPage = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const [commentModified, setCommentModified] = useState(false);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const { data: postData, error: postError } = await supabase
          .from("Post")
          .select("*")
          .eq("id", id)
          .single();

        if (postError) {
          throw new Error(`Error fetching post: ${postError.message}`);
        }

        setPost(postData);

        const { data: commentsData, error: commentsError } = await supabase
          .from("Comment")
          .select("*")
          .eq("post_id", id);

        if (commentsError) {
          throw new Error(`Error fetching comments: ${commentsError.message}`);
        }

        setComments(commentsData);
        setCommentModified(false);
      } catch (error) {
        console.error("Error in fetchPostAndComments:", error);
        // Handle error state or display a message to the user
      }
    };

    fetchPostAndComments();
  }, [id, commentModified]);

  const handleAddComment = async () => {
    try {
      const { data: insertedComment, error } = await supabase
        .from("Comment")
        .insert({ post_id: id, content: newComment }) // Add user_id
        .single();

      if (error) {
        console.error("Error adding comment:", error.message);
        return;
      }

      setCommentModified(true);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <Post post={post} />

      <div className="comments">
        <h2>Comments</h2>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
      {/* Comment input */}
      <div className="comment-input">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default DetailPage;
