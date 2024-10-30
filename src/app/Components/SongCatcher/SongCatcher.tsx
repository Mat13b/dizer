import { useState } from 'react';

export function SongCatcher() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioData, setAudioData] = useState<Blob | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Logique d'enregistrement
    } catch (error) {
      console.error('Erreur d\'accès au micro:', error);
    }
  };

  const identifySong = async (audioBlob: Blob) => {
    // Logique d'identification avec l'API
  };

  return (
    <div className="p-4">
      <button 
        onClick={() => setIsRecording(!isRecording)}
        className="bg-red-500 text-white p-4 rounded-full"
      >
        {isRecording ? 'Arrêter' : 'Identifier une chanson'}
      </button>
    </div>
  );
} 