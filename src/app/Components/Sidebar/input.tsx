"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function Input() {
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSearch(value.trim().toLowerCase()); // Mettre à jour le terme de recherche dans le composant parent avec des lettres en minuscule
  };

  return (
    <div className="flex items-center w-full ">
      <div className="w-full h-12 px-5 rounded-md relative ">
        <input 
          type="text" 
          placeholder="Recherche un album , un artiste ou une playlist" 
          className="w-full h-full pl-7 bg-gray-500 text-white rounded-md" 
          value={searchTerm}
          onChange={handleSearch} 
          onFocus={handleSearch} 
        />
        <Search 
          className="w-6 h-6 absolute left-4 top-1/2 transform -translate-y-1/2 text-white " 
        /> 
      </div>
    </div>
  );
}
