export interface DeezerTrack {
  id: number;
  title: string;
  artist: {
    name: string;
  };
  album: {
    title: string;
    cover_medium: string;
  };
  preview: string;
}

export interface DeezerResponse {
  data: DeezerTrack[];
} 