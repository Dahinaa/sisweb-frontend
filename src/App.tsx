import type { FC } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

const App: FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header>
        <Navbar />
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default App;