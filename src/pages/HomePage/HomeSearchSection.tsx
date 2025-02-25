import { FC } from "react";
import SearchBar from "../../components/molecules/SearchBar/SearchBar";

interface SearchSectionProps {
  onSearch: (query: string) => void;
}

const HomeSearchSection: FC<SearchSectionProps> = ({ onSearch }) => {
  return (
    <div className="search-section">
      <h1>Movie Explorer</h1>
      <SearchBar onSearch={onSearch} />
    </div>
  );
};

export default HomeSearchSection;
