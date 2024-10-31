"use client";

import { Search } from "lucide-react";
import { useState } from "react";

interface InputProps {
  onSearch: (query: string) => void;
}

const Input = ({ onSearch }: InputProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative">
      <Search className="absolute top-3 left-3 h-4 w-4 text-black" />
      <input
        className="rounded-full bg-white w-full pl-9 pr-3 py-2 text-black"
        placeholder="Que souhaitez-vous écouter ?"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default Input;
