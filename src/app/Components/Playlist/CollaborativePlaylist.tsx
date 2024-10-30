import React, { useState } from 'react';
import { Track } from '@/app/types/Track';

interface CollaborativePlaylist {
  id: string;
  name: string;
  tracks: Track[];
  collaborators: string[];
}

interface CollaborativePlaylistProps {
  initialPlaylists?: CollaborativePlaylist[];
}

export function CollaborativePlaylist({ initialPlaylists = [] }: CollaborativePlaylistProps) {
  const [playlists, setPlaylists] = useState<CollaborativePlaylist[]>(initialPlaylists);
  const [selectedPlaylist, setSelectedPlaylist] = useState<CollaborativePlaylist | null>(null);

  const addCollaborator = async (playlistId: string, collaboratorEmail: string) => {
    try {
      // Logique d'ajout de collaborateur
      const updatedPlaylists = playlists.map(playlist => {
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            collaborators: [...playlist.collaborators, collaboratorEmail]
          };
        }
        return playlist;
      });
      setPlaylists(updatedPlaylists);
    } catch (error) {
      console.error('Erreur lors de l\'ajout du collaborateur:', error);
    }
  };

  const addTrackToPlaylist = async (playlistId: string, track: Track) => {
    try {
      // Logique d'ajout de piste
      const updatedPlaylists = playlists.map(playlist => {
        if (playlist.id === playlistId) {
          return {
            ...playlist,
            tracks: [...playlist.tracks, track]
          };
        }
        return playlist;
      });
      setPlaylists(updatedPlaylists);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la piste:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Playlists Collaboratives</h2>
      <div className="space-y-4">
        {playlists.map(playlist => (
          <div key={playlist.id} className="border p-4 rounded">
            <h3 className="font-bold">{playlist.name}</h3>
            <p>{playlist.tracks.length} pistes</p>
            <p>{playlist.collaborators.length} collaborateurs</p>
          </div>
        ))}
      </div>
    </div>
  );
} 