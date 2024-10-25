import { Heart } from "lucide-react";
import Card from "@/app/Components/Caroussel/Caroussel";

interface FavoriteButtonProps {
  Card: typeof Card; // Utilisez 'typeof Card' pour obtenir le type
  isFavorite: boolean;
  handleFavoriteToggle: () => void;
  className?: string;

}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ Card, isFavorite, handleFavoriteToggle }) => {
  return (
    <Heart>
      {isFavorite ? "Unfavorite" : "Favorite"}
    </Heart>
  );
};

export default FavoriteButton;
