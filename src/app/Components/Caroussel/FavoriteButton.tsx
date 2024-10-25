import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  Card: Card;
  isFavorite: boolean;
  handleFavoriteToggle: () => void;
  className?: string; // Ajoutez cette ligne
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ Card, isFavorite, handleFavoriteToggle }) => {
  return (
    <Heart>
      {isFavorite ? "Unfavorite" : "Favorite"}
    </Heart>
  );
};

export default FavoriteButton;
