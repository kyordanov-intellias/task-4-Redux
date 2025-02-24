import React, { FC, useState } from "react";
import { Search } from "lucide-react";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import "./SearchBar.css"; // Import the CSS file

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <Input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <Button type="submit" className="search-button">
        <Search size={20} />
      </Button>
    </form>
  );
};

export default SearchBar;
