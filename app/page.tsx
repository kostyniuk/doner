import Image from "next/image";
import Footer from "./ui/footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#121212] text-white">
      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center space-y-6 max-w-2xl">
          <h1 className="text-6xl font-bold tracking-tight">
            Todo App
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed">
            Stay organized and productive with our sleek, modern todo application. 
            Manage your tasks efficiently with a clean, intuitive interface.
          </p>
          
          <div className="flex gap-4 items-center justify-center pt-8">
            <Link
              href="/todos"
              className="bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/todos"
              className="border border-gray-600 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              View Todos
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Task Creation</h3>
              <p className="text-gray-400">Quickly add new tasks with our intuitive interface</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Track Progress</h3>
              <p className="text-gray-400">Mark tasks as complete and track your productivity</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Organize with Tags</h3>
              <p className="text-gray-400">Categorize your tasks with custom tags and labels</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
