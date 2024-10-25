import Sidebar from "@/app/Components/Sidebar/Sidebar";
import Input from "@/app/Components/Sidebar/input";
import Caroussel from "@/app/Components/Caroussel/Caroussel";
import { Bell, User } from "lucide-react";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] overflow-hidden">
      <div className="flex w-full h-full">
        <Sidebar />
        <div className="flex justify-end gap-5 ml-auto w-full">
          <Input />
          <Bell className="w-6 h-6" />
          <User className="w-6 h-6" />
        </div>
      </div>
      <main className="flex-1 w-full h-full">
        <div className="flex flex-col gap-4 h-full">
          <Caroussel />
        </div>
      </main>
    </div>
  );
}
