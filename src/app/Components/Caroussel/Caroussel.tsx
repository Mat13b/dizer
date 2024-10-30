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
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
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
      if (isPlaying) {
        audioRef.current.play();
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
    <div className="flex flex-col gap-4 p-4">
      <div className="w-full max-w-md mx-auto px-4">
        <Input onSearch={handleSearch} />
      </div>
      <div className="flex items-center justify-center gap-4 relative">
        <ChevronLeft 
          className="w-10 h-10 cursor-pointer transition-all duration-300 dark:text-zinc-300 hover:scale-110" 
          onClick={() => setCurrentIndex((currentIndex - 1 + Math.ceil(tracks.length / 2)) % Math.ceil(tracks.length / 2))} 
        />
        <div className="gap-8 flex">
          {getVisibleTracks().map((track, index) => (
            <div 
              key={`${track.id}-${currentIndex}-${index}`} 
              className="p-4 rounded-lg shadow-lg transition-all duration-300 dark:bg-zinc-800 bg-white hover:transform hover:scale-105"
            >
              <button 
                className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-all duration-300" 
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
                className="w-full h-56 object-cover rounded-lg mt-2"
                onClick={() => setFooterData(track)}
              />
              <h2 className="mt-2 text-lg font-bold dark:text-zinc-100">{track.title}</h2>
              <p className="dark:text-zinc-400">{track.artist}</p>
            </div>
          ))}
        </div>
        <ChevronRight 
          className="w-10 h-10 cursor-pointer transition-all duration-300 dark:text-zinc-300 hover:scale-110" 
          onClick={() => setCurrentIndex((currentIndex + 1) % Math.ceil(tracks.length / 2))} 
        />

        {footerData && (
          <footer className="w-full p-4 fixed bottom-0 left-0 right-0 transition-all duration-300 dark:bg-zinc-800/95 bg-white/95 backdrop-blur-lg border-t dark:border-zinc-700 shadow-lg">
            <audio
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleTrackEnd}
              className="hidden"
            />
            <div className="flex items-center justify-between max-w-7xl mx-auto">
              <div className="flex items-center gap-4">
                <img 
                  src={footerData.album.cover} 
                  alt={footerData.title} 
                  className="w-16 h-16 rounded-lg shadow-md" 
                />
                <div>
                  <p className="font-bold dark:text-zinc-100">{footerData.title}</p>
                  <p className="text-sm dark:text-zinc-400">{footerData.artist}</p>
                </div>
                <FavoriteButton
                  Card={() => <div>{footerData.title}</div>}
                  isFavorite={favorites.some(fav => fav.id === footerData.id)}
                  handleFavoriteToggle={() => handleFavoriteToggle(footerData)}
                />
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-4">
                  <StepBack 
                    className="w-6 h-6 cursor-pointer dark:text-zinc-300 hover:text-red-500 dark:hover:text-red-500 transition-colors" 
                    onClick={handlePreviousTrack} 
                  />
                  <button 
                    onClick={handlePlayPause}
                    className="p-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition-all duration-300 hover:scale-110"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </button>
                  <StepForward 
                    className="w-6 h-6 cursor-pointer dark:text-zinc-300 hover:text-red-500 dark:hover:text-red-500 transition-colors" 
                    onClick={handleNextTrack} 
                  />
                </div>
                <div className="w-96 bg-zinc-200 dark:bg-zinc-700 h-1 rounded-full">
                  <div 
                    className="bg-red-500 h-full rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(currentTime / 30) * 100}%`
                    }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
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
    </div>
  );
}
