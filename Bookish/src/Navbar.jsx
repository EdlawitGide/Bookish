import React, { useState } from "react";
import "./Navbar.css";
import SearchBar from "./SearchBar.jsx";

const Navbar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Bookish</div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button type="submit">Search</button>
      </form>
      <ul className="navbar-nav">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/create-post">Create Post</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
