"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Home, Globe, Heart, ChevronLeft, ChevronRight, CreditCard } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false); // Initialiser avec un booléen

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    console.log("Sidebar component mounted");
  }, []);

  return (
    <div>
      <button
        onClick={toggleSidebar}
        className="bg-gray-700 text-white p-2 rounded"
        style={{ position: 'fixed', top: '10px', left: isOpen ? '270px' : '10px', zIndex: 1000 }}
      >
        {isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white flex flex-col transform transition-transform duration-300 ease-in-out sm:w-80 md:w-96 lg:w-1/4 xl:w-1/5">
          <div className="flex items-center justify-center h-16 bg-gray-800">
            <div className="flex items-center gap-4">
              <ChevronLeft className="w-6 h-8" />
              <ChevronRight className="w-6 h-8" />
            </div>
            <h1 className="text-xl font-bold text-red-400">Mon Application</h1>
          </div>
          <nav className="flex-1">
            <ul className="p-4 space-y-2">
              <li>
                <Link href="/home">
                  <div className="block w-full px-4 py-2 rounded hover:bg-gray-600 cursor-pointer text-blue-400 flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    Accueil
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <div className="block w-full px-4 py-2 rounded hover:bg-gray-600 cursor-pointer text-green-400 flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Explorer
                  </div>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <div className="block w-full px-4 py-2 rounded hover:bg-gray-600 cursor-pointer text-yellow-400 flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    Favoris
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
