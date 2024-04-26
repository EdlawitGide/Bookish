import React, { useState, useEffect } from "react";
import { supabase } from "../supabase";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from("posts")
      .select("id, title")
      .ilike("title", `%${searchTerm}%`);
    if (error) {
      console.error(error);
    } else {
      setResults(data);
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Search posts"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>Search</button>
      </form>
      {results.length > 0 && (
        <ul>
          {results.map((result) => (
            <li key={result.id}>{result.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
