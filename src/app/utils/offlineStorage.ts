import { Track } from '@/app/types/Track';

interface OfflineTrack extends Track {
  offlineBlob?: string;
}

export class OfflineStorage {
  static async saveTrack(track: Track): Promise<void> {
    try {
      const response = await fetch(track.preview);
      const blob = await response.blob();
      const offlineTrack: OfflineTrack = {
        ...track,
        offlineBlob: URL.createObjectURL(blob)
      };
      
      await localStorage.setItem(
        `track_${track.id}`, 
        JSON.stringify(offlineTrack)
      );
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      throw new Error('Impossible de sauvegarder la piste en mode hors ligne');
    }
  }

  static async getOfflineTracks(): Promise<Track[]> {
    try {
      const tracks: Track[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('track_')) {
          const trackData = localStorage.getItem(key);
          if (trackData) {
            tracks.push(JSON.parse(trackData));
          }
        }
      }
      return tracks;
    } catch (error) {
      console.error('Erreur lors de la récupération des pistes hors ligne:', error);
      return [];
    }
  }

  static async removeOfflineTrack(trackId: number): Promise<void> {
    try {
      localStorage.removeItem(`track_${trackId}`);
    } catch (error) {
      console.error('Erreur lors de la suppression de la piste hors ligne:', error);
      throw new Error('Impossible de supprimer la piste hors ligne');
    }
  }
} 