"use client";

import { ChevronLeft, ChevronRight, Heart, Plus, StepBack, Pause, StepForward, MicVocal , VolumeX , Volume1, Volume2} from "lucide-react";
import { useState, useEffect } from "react";
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
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<Card[]>([]);
  const [cards, setCards] = useState(cardData);

  const handleImageClick = (card: Card) => {
    setFooterData(cards.find((c) => c.id === card.id) || cards[0]);
  };

  const getVisibleCards = () => {
    const startIndex = currentIndex * 2;
    return cards.slice(startIndex, startIndex + 2);
  };

  const handleFavoriteToggle = (id: number) => {
    setCards(prevCards => 
      prevCards.map(card => 
        card.id === id ? { ...card, isFavorite: !card.isFavorite } : card
      )
    );
  };

  useEffect(() => {
    const newFavorites = cards.filter(card => card.isFavorite);
    setFavorites(newFavorites);
    setFooterData(prevFooterData => ({
      ...prevFooterData,
      isFavorite: cards.find(card => card.id === prevFooterData.id)?.isFavorite || false
    }));
  }, [cards]);

  return (
    <div className="flex items-center justify-center gap-4 relative">
      <ChevronLeft className="w-10 h-10" onClick={() => setCurrentIndex((currentIndex - 1 + Math.ceil(cards.length / 2)) % Math.ceil(cards.length / 2))} />
      <div className="gap-8 flex">
        {getVisibleCards().map((card, index) => (
          <div key={`${card.id}-${currentIndex}-${index}`} className="bg-gray-200 p-4 rounded shadow">
            <button 
              className="bg-red-500 text-white p-2 rounded" 
              onClick={() => {
                handleFavoriteToggle(card.id);
                setShowFavorites(true);
              }}
            >
              {card.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            </button>
            {card.isFavorite && <Heart className="w-6 h-6 text-red-500" />}
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-56 object-cover rounded"
              onClick={() => handleImageClick(card)}
            />
            <h2 className="mt-2 text-lg font-bold">{card.title}</h2>
          </div>
        ))}
      </div>
      <ChevronRight className="w-10 h-10" onClick={() => setCurrentIndex((currentIndex + 1) % Math.ceil(cards.length / 2))} />
      
      {showFavorites && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Favoris</h2>
            {favorites.length > 0 ? (
              <ul>
                {favorites.map((fav) => (
                  <li key={fav.id} className="flex items-center gap-2 mb-2">
                    <img src={fav.image} alt={fav.title} className="w-10 h-10 object-cover rounded" />
                    <span>{fav.title}</span>  
                    <button className="bg-red-500 text-white p-2 rounded" onClick={() => handleFavoriteToggle(fav.id)}>supprimer</button>
                  </li>
                
                ))}
                 
              </ul>
            ) : (
              <p>Aucun favori pour le moment.</p>
            )}
            <button 
              className="mt-4 bg-blue-500 text-white p-2 rounded"
              onClick={() => setShowFavorites(false)}
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      <footer className="w-full bg-gray-700 text-white p-4 fixed bottom-0 left-0 right-0 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={footerData.image} alt={footerData.title} className="w-20 h-20 rounded-full" />
            <p>{footerData.title}</p>
            <FavoriteButton
              Card={() => <div>{footerData.title}</div>}
              isFavorite={footerData.isFavorite}
              handleFavoriteToggle={() => handleFavoriteToggle(footerData.id)}
            />
            <Plus className="w-6 h-6" />
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
