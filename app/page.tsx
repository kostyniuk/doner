import Image from "next/image";
import Footer from "./ui/footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#121212] text-white">
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-6xl font-bold tracking-tight">
            <span className="text-blue-500">🍔</span> <span className="text-purple-500">✨</span> Todo App
          </h1>
        </div>
      </main>
      <Footer />
    </div>
  );
}
