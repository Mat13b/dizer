import { useState, useEffect } from 'react';
import { Track } from '@/app/types/Track';

interface LyricsDisplayProps {
  trackId: number;
  currentTime: number;
}

export default function LyricsDisplay({ trackId, currentTime }: LyricsDisplayProps) {
  const [lyrics, setLyrics] = useState<NonNullable<Track['lyrics']>>([]);
  const [showTranslation, setShowTranslation] = useState(false);

  useEffect(() => {
    fetchLyrics(trackId);
  }, [trackId]);

  const fetchLyrics = async (id: number) => {
    try {
      const response = await fetch(`/api/deezer/lyrics?trackId=${id}`);
      const data = await response.json();
      setLyrics(data.lyrics || []);
    } catch (error) {
      console.error('Erreur lors du chargement des paroles:', error);
      setLyrics([]);
    }
  };

  return (
    <div className="lyrics-container bg-gray-800 p-4 rounded-lg">
      <button 
        onClick={() => setShowTranslation(!showTranslation)}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {showTranslation ? 'Masquer la traduction' : 'Afficher la traduction'}
      </button>
      
      <div className="lyrics-content space-y-4">
        {lyrics.map((line, index) => (
          <div 
            key={index}
            className={`transition-all ${
              Math.abs(currentTime - line.timestamp) < 0.5 ? 'text-blue-400 scale-110' : 'text-white'
            }`}
          >
            <p className="text-lg">{line.text}</p>
            {showTranslation && line.translation && (
              <p className="text-sm text-gray-400">{line.translation}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 