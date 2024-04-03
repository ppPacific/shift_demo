import { createContext } from "react";

interface SearchContextProps {
  searchTerm: string;
  handleSearch: (term: string) => void;
}

export const SearchContext = createContext<SearchContextProps>({
  searchTerm: "",
  handleSearch: () => {},
});
