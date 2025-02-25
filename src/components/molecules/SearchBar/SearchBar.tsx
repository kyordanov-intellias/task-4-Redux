import { FC, useState, FormEvent } from "react";
import { Search } from "lucide-react";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
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
