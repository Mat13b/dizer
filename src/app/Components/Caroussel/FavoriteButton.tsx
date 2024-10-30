import { Heart } from "lucide-react";

interface FavoriteButtonProps {
  Card: () => JSX.Element;
  isFavorite: boolean;
  handleFavoriteToggle: () => void;
  className?: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  isFavorite, 
  handleFavoriteToggle 
}) => {
  return (
    <button 
      onClick={handleFavoriteToggle}
      className="hover:scale-110 transition"
    >
      <Heart 
        className={`h-6 w-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-neutral-400'}`}
      />
    </button>
  );
};

export default FavoriteButton;
