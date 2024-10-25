"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function Input() {
  const [search, setSearch] = useState(false);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(true);
  };

  return (
    <div className="flex items-center w-full">
    <div className="w-full h-12 px-4 rounded-md relative ">
      <input type="text" placeholder="Recherche" className="w-full h-full pl-6 bg-gray-500 text-white rounded-md" onChange={handleSearch} onFocus={handleSearch} />
      <Search className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-white " /> 
    </div>
    </div>
  );
}
