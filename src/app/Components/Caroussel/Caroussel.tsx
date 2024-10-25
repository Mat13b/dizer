"use client";

import { ChevronLeft, ChevronRight, Heart, Plus, StepBack, Pause, StepForward, MicVocal , VolumeX , Volume1, Volume2} from "lucide-react";
import { useState } from "react";
import FavoriteButton from "./FavoriteButton";
// Définir une interface pour les données de la carte
interface Card {
  id: number;
  title: string;
  image?: string;
  icon?: string;
  isFavorite?: boolean;
}

const cardData = [
  {
    id: 0,
    title: "Favoris",
    icon: "Heart",
    isFavorite: false,
  },
  {
    id: 1,
    title: "Image 1",
    image: "/abstract-royalty-free-album-cover-design-template-2c32911349349393a5b3bf5de27e5f0b_screen.jpg",
    isFavorite: false,
  },
  {
    id: 2,
    title: "Image 2",
    image: "/sea-ocean-glass-sphere-ball-cd-cover-music-design-template-05f82616b1004e221369d18a2461c61c_screen.jpg",
    isFavorite: false,
  },
  {
    id: 3,
    title: "Image 3",
    image: "/attachment_125784632.jpeg",
    isFavorite: false,
  },
  {
    id: 4,
    title: "Image 4",
    image: "/cool-animated-video-music-album-cover-design-template-b32363ff46d21798e89fe1333c50a6fc_screen.jpg",
    isFavorite: false,
  },
  {
    id: 5,
    title: "Image 5",
    image: "/meditation-spiritual-artwork-mysticism-fantasy-picture-composing-royalty-free-thumbnail.jpg",
    isFavorite: false,
  },
  {
    id: 6,
    title: "Image 6",
    image: "/tlp_hero_album-cover-art-73ab5b3d9b81f442cb2288630ab63acf.jpg",
    isFavorite: false,
  },
];

export default function Caroussel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [footerData, setFooterData] = useState(cardData[0]);

  const handleImageClick = (card: Card) => {
    setFooterData(cardData.find((c) => c.id === card.id) || cardData[0]);
  };

  const getVisibleCards = () => {
    const startIndex = currentIndex * 2;
    return cardData.slice(startIndex, startIndex + 2);
  };

  const handleFavoriteToggle = (id: number) => {
    setFooterData((prevData) => {
      const updatedData = cardData.map((card) =>
        card.id === id ? { ...card, isFavorite: !card.isFavorite } : card
      );
      return updatedData.find((card) => card.id === id) || prevData;
    });
  };

  return (
    <div className="flex items-center justify-center gap-4 relative">
      <ChevronLeft className="w-10 h-10" onClick={() => setCurrentIndex((currentIndex - 1 + Math.ceil(cardData.length / 2)) % Math.ceil(cardData.length / 2))} />
      <div className="gap-8 flex">
        {getVisibleCards().map((card) => (
          <div key={card.id} className="bg-gray-200 p-4 rounded shadow">
            {card.icon === "Heart" && <Heart className="w-full h-full bg-red-500" />}
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-56 object-cover rounded"
              onClick={() => handleImageClick(card)}
            />
            <h2 className="mt-2 text-lg font-bold">{card.title}</h2>
            <FavoriteButton
              Card={card}
              isFavorite={card.isFavorite}
              handleFavoriteToggle={() => handleFavoriteToggle(card.id)}
            />
          </div>
        ))}
      </div>
      <ChevronRight className="w-10 h-10" onClick={() => setCurrentIndex((currentIndex + 1) % Math.ceil(cardData.length / 2))} />
      <footer className="w-full bg-gray-700 text-white p-4 fixed bottom-0 left-0 right-0 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={footerData.image} alt={footerData.title} className="w-20 h-20 rounded-full" />
            <p>{footerData.title}</p>
            <FavoriteButton
              Card={footerData}
              isFavorite={footerData.isFavorite}
              handleFavoriteToggle={() => handleFavoriteToggle(footerData.id)}
            />
          </div>
          <div className="flex items-center gap-4">
            <StepBack className="w-6 h-6" />
            <Pause className="w-6 h-6" />
            <StepForward className="w-6 h-6" />
          </div>
          <div className="flex items-center gap-4">
            <MicVocal className="w-6 h-6" />
            <VolumeX className="w-6 h-6" />
            <Volume1 className="w-6 h-6" />
            <Volume2 className="w-6 h-6" />
          </div>
      </footer>
    </div>
  );
}
