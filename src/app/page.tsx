
'use client';
import Caroussel from "./Components/Caroussel/Caroussel";
import Sidebar from "./Components/Sidebar/Sidebar";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-900">
      <Sidebar />
      <div className="pb-24">
        <Caroussel />
      </div>
    </main>
  );
}
