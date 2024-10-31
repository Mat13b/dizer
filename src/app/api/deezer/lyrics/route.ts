import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const trackId = searchParams.get('trackId');

  if (!trackId) {
    return NextResponse.json({ error: 'trackId est requis' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.deezer.com/track/${trackId}/lyrics`);
    const data = await response.json();

    return NextResponse.json({
      lyrics: data.lyrics || []
    });
  } catch (_error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des paroles' },
      { status: 500 }
    );
  }
} 