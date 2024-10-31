import { NextResponse } from 'next/server';
import { DeezerResponse, DeezerTrack } from '@/app/types/DeezerTypes';

// Utiliser la variable d'environnement
const DEEZER_API_URL = process.env.DEEZER_API_URL || 'https://api.deezer.com';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || 'pop';

  try {
    const response = await fetch(`${DEEZER_API_URL}/search?q=${encodeURIComponent(query)}`);
    const data = (await response.json()) as DeezerResponse;

    if (!response.ok) {
      throw new Error('Erreur API Deezer');
    }

    return NextResponse.json({
      tracks: data.data.map((track: DeezerTrack) => ({
        id: track.id,
        title: track.title,
        artist: track.artist.name,
        album: {
          title: track.album.title,
          cover: track.album.cover_medium
        },
        preview: track.preview
      }))
    });
  } catch (error) {
    console.error('Erreur API:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { trackId } = body;

    // Récupérer les détails de la piste
    const response = await fetch(`${DEEZER_API_URL}/track/${trackId}`);
    const trackData = await response.json();

    // Ici vous pourriez ajouter une logique pour sauvegarder les favoris dans une base de données
    return NextResponse.json({
      message: 'Piste ajoutée aux favoris',
      track: {
        id: trackData.id,
        title: trackData.title,
        artist: trackData.artist.name,
        album: {
          title: trackData.album.title,
          cover: trackData.album.cover_medium
        }
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de l\'ajout aux favoris' }, { status: 500 });
  }
} 