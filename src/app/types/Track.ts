export interface Track {
  id: number;
  title: string;
  artist: string;
  album: {
    title: string;
    cover: string;
  };
  preview: string;
  quality?: 'FLAC' | 'MP3_320' | 'MP3_128';
  lyrics?: Array<{
    timestamp: number;
    text: string;
    translation?: string;
  }>;
} 