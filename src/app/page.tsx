'use client';
import Caroussel from "./Components/Caroussel/Caroussel";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <div className="pb-24">
        <Caroussel />
      </div>
    </main>
  );
}
