import React, { useState, useEffect } from "react";
import Post from "./Post";
import Navbar from "./Navbar";
import { supabase } from "../supabase"; // Import the Supabase client
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // Default sort by newest

  useEffect(() => {
    const fetchPosts = async () => {
      let query = supabase
        .from("Post")
        .select("id, title, content, image, upvotes, created_at");

      // Apply sorting based on sortBy state
      if (sortBy === "newest") {
        query = query.order("created_at", { ascending: false });
      } else if (sortBy === "highestUpvotes") {
        query = query.order("upvotes", { ascending: false });
      }

      const { data, error } = await query;
      if (error) {
        console.error(error);
      } else {
        setPosts(data);
      }
    };

    fetchPosts();
  }, [sortBy]); // Fetch posts whenever sortBy changes

  const handleSearch = async (query) => {
    setSearchQuery(query);
    const { data, error } = await supabase
      .from("Post")
      .select("id, title, content, image, upvotes, created_at")
      .ilike("title", `%${query}%`);
    if (error) {
      console.error(error);
    } else {
      setPosts(data);
    }
  };

  const handleSortByChange = (value) => {
    setSortBy(value);
  };

  return (
    <div>
      <Navbar handleSearch={handleSearch} />
      <div className="filter-buttons">
        <button
          className={sortBy === "newest" ? "active" : ""}
          onClick={() => handleSortByChange("newest")}
        >
          Newest
        </button>
        <button
          className={sortBy === "highestUpvotes" ? "active" : ""}
          onClick={() => handleSortByChange("highestUpvotes")}
        >
          Highest Upvotes
        </button>
      </div>
      <div className="posts-container">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
