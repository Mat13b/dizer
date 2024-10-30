"use client";

import { ChevronLeft, ChevronRight, Heart, Plus, StepBack, Play, Pause, StepForward, MicVocal, VolumeX, Volume1, Volume2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import FavoriteButton from "./FavoriteButton";
import Input from "../Sidebar/input";

interface Track {
  id: number; // Revenir à number pour Deezer
  title: string;
  artist: string;
  album: {
    title: string;
    cover: string;
  };
  preview: string;
}

export default function Caroussel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [tracks, setTracks] = useState<Track[]>([]);
  const [footerData, setFooterData] = useState<Track | null>(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<Track[]>([]);
  
  // États pour le lecteur audio
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const response = await fetch('/api/deezer?q=pop');
      const data = await response.json();
      setTracks(data.tracks);
      if (data.tracks.length > 0) {
        setFooterData(data.tracks[0]);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des pistes:', error);
    }
  };

  const handleFavoriteToggle = async (track: Track) => {
    try {
      const response = await fetch('/api/deezer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trackId: track.id }),
      });

      if (response.ok) {
        const isFavorite = favorites.some(fav => fav.id === track.id);
        if (isFavorite) {
          setFavorites(favorites.filter(fav => fav.id !== track.id));
        } else {
          setFavorites([...favorites, track]);
        }
      }
    } catch (error) {
      console.error('Erreur lors de la gestion des favoris:', error);
    }
  };

  const getVisibleTracks = () => {
    const startIndex = currentIndex * 2;
    return tracks.slice(startIndex, startIndex + 2);
  };

  const handlePlayPause = () => {
    if (audioRef.current && footerData) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play().catch(error => {
            console.error('Erreur de lecture:', error);
          });
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error('Erreur lors de la lecture:', error);
      }
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleTrackEnd = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleNextTrack = () => {
    const currentTrackIndex = tracks.findIndex(track => track.id === footerData?.id);
    if (currentTrackIndex < tracks.length - 1) {
      setFooterData(tracks[currentTrackIndex + 1]);
    }
  };

  const handlePreviousTrack = () => {
    const currentTrackIndex = tracks.findIndex(track => track.id === footerData?.id);
    if (currentTrackIndex > 0) {
      setFooterData(tracks[currentTrackIndex - 1]);
    }
  };

  useEffect(() => {
    if (footerData && audioRef.current) {
      audioRef.current.src = footerData.preview;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('Erreur de lecture:', error);
          setIsPlaying(false);
        });
      }
    }
  }, [footerData]);

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch(`/api/deezer?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setTracks(data.tracks);
      if (data.tracks.length > 0) {
        setFooterData(data.tracks[0]);
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Barre de recherche */}
      <div className="w-full max-w-md mx-auto px-4 mt-4">
        <Input onSearch={handleSearch} />
      </div>

      {/* Section principale du carousel */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-4 w-full max-w-7xl">
          <ChevronLeft 
            className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer transition-all duration-300 dark:text-zinc-300 hover:scale-110 flex-shrink-0" 
            onClick={() => setCurrentIndex((currentIndex - 1 + Math.ceil(tracks.length / 2)) % Math.ceil(tracks.length / 2))} 
          />
          
          {/* Container des cartes */}
          <div className="flex gap-4 sm:gap-8 overflow-hidden justify-center">
            {getVisibleTracks().map((track, index) => (
              <div 
                key={`${track.id}-${currentIndex}-${index}`} 
                className="w-[280px] sm:w-[320px] flex-shrink-0 p-4 rounded-lg shadow-lg transition-all duration-300 dark:bg-zinc-800 bg-white hover:transform hover:scale-105"
              >
                <button 
                  className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all duration-300 text-sm sm:text-base" 
                  onClick={() => {
                    handleFavoriteToggle(track);
                    setShowFavorites(true);
                  }}
                >
                  {favorites.some(fav => fav.id === track.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                </button>
                
                {favorites.some(fav => fav.id === track.id) && 
                  <Heart className="w-6 h-6 text-red-500 mt-2" />
                }
                
                <img
                  src={track.album.cover}
                  alt={track.title}
                  className="w-full aspect-square object-cover rounded-lg mt-2"
                  onClick={() => setFooterData(track)}
                />
                
                <h2 className="mt-2 text-base sm:text-lg font-bold text-black dark:text-zinc-100 truncate">
                  {track.title}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-zinc-400 truncate">
                  {track.artist}
                </p>
              </div>
            ))}
          </div>

          <ChevronRight 
            className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer transition-all duration-300 dark:text-zinc-300 hover:scale-110 flex-shrink-0" 
            onClick={() => setCurrentIndex((currentIndex + 1) % Math.ceil(tracks.length / 2))} 
          />
        </div>
      </div>

      {/* Footer */}
      {footerData && (
        <footer className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-zinc-800/95 backdrop-blur-lg border-t dark:border-zinc-700 shadow-lg p-2 sm:p-3 md:p-4">
          <audio
            ref={audioRef}
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleTrackEnd}
            onError={(e) => console.error('Erreur audio:', e)}
            preload="auto"
            className="hidden"
          />
          <div className="max-w-[95%] mx-auto flex items-center justify-between gap-4">
            {/* Section gauche */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              <img 
                src={footerData.album.cover} 
                alt={footerData.title} 
                className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg shadow-md" 
              />
              <div className="hidden sm:block">
                <p className="font-bold text-black dark:text-zinc-100 truncate max-w-[150px]">
                  {footerData.title}
                </p>
                <p className="text-sm text-gray-600 dark:text-zinc-400 truncate max-w-[150px]">
                  {footerData.artist}
                </p>
              </div>
              <FavoriteButton
                Card={() => <div>{footerData.title}</div>}
                isFavorite={favorites.some(fav => fav.id === footerData.id)}
                handleFavoriteToggle={() => handleFavoriteToggle(footerData)}
              />
            </div>

            {/* Section centrale - Contrôles de lecture */}
            <div className="flex flex-col items-center gap-1 sm:gap-2 flex-1 max-w-[500px] px-4">
              <div className="flex items-center gap-2 sm:gap-4">
                <StepBack 
                  className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer dark:text-zinc-300 hover:text-red-500 dark:hover:text-red-500 transition-colors" 
                  onClick={handlePreviousTrack} 
                />
                <button 
                  onClick={handlePlayPause}
                  className="p-2 sm:p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-300 hover:scale-110"
                  disabled={!footerData?.preview}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
                  ) : (
                    <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                  )}
                </button>
                <StepForward 
                  className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer dark:text-zinc-300 hover:text-red-500 dark:hover:text-red-500 transition-colors" 
                  onClick={handleNextTrack} 
                />
              </div>
              <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-1 rounded-full">
                <div 
                  className="bg-red-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(currentTime / 30) * 100}%` }}
                />
              </div>
            </div>

            {/* Section droite - Contrôles du volume */}
            <div className="hidden sm:flex items-center gap-4 flex-shrink-0">
              <MicVocal className="w-6 h-6 dark:text-zinc-300" />
              <div className="flex items-center gap-2">
                {volume === 0 ? (
                  <VolumeX 
                    className="w-6 h-6 cursor-pointer dark:text-zinc-300 hover:text-red-500 dark:hover:text-red-500 transition-colors" 
                    onClick={() => handleVolumeChange(1)}
                  />
                ) : (
                  <Volume2 
                    className="w-6 h-6 cursor-pointer dark:text-zinc-300 hover:text-red-500 dark:hover:text-red-500 transition-colors" 
                    onClick={() => handleVolumeChange(0)}
                  />
                )}
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="w-24 accent-red-500"
                />
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
