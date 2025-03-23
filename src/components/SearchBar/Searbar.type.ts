export interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  isSearchVisible: boolean;
  setIsSearchVisible: React.Dispatch<React.SetStateAction<boolean>>;
}