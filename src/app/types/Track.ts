export interface Track {
  id: number;
  title: string;
  artist: string;
  album: {
    title: string;
    cover: string;
  };
  preview: string;
  lyrics?: Array<{
    timestamp: number;
    text: string;
    translation?: string;
  }>;
} 