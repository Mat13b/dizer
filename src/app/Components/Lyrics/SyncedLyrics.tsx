import React, { useState, useEffect } from 'react';

interface LyricsLine {
  text: string;
  time: number;
  translation?: string;
}

export function SyncedLyrics({ trackId }: { trackId: number }) {
  const [lyrics, setLyrics] = useState<LyricsLine[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);

  const fetchLyrics = async (id: number) => {
    try {
      const response = await fetch(`/api/deezer/lyrics?trackId=${id}`);
      const data = await response.json();
      if (data.lyrics) {
        setLyrics(data.lyrics);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des paroles:', error);
      setLyrics([]);
    }
  };

  useEffect(() => {
    fetchLyrics(trackId);
  }, [trackId]);

  return (
    <div className="lyrics-container">
      {lyrics.map((line, index) => (
        <div 
          key={index}
          className={`lyric-line ${index === currentLine ? 'active' : ''}`}
        >
          <p>{line.text}</p>
          {showTranslation && line.translation && (
            <p className="translation">{line.translation}</p>
          )}
        </div>
      ))}
    </div>
  );
} 