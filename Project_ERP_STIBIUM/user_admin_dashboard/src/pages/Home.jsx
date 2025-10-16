import { Link } from "react-router-dom";
import bggImage from "../assets/bgg.jpg";

export default function Home() {
  return (
    <div
      className="flex flex-col lg:flex-row items-center justify-between min-h-screen w-screen overflow-hidden bg-fixed bg-cover bg-center relative"
      style={{
        backgroundImage: `url(${bggImage})`,
        backgroundAttachment: "fixed", // 🟡 makes image stay static
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-transparent"></div>

      {/* Content Section */}
      <div className="relative flex flex-col justify-center lg:pl-32 px-8 max-w-3xl text-left z-10 py-20">
        <h1 className="text-5xl lg:text-6xl italic font-extrabold text-gray-800 mb-6 drop-shadow-md">
          Recruiting
        </h1>
        <p className="text-gray-700 text-lg leading-relaxed mb-8 backdrop-blur-sm">
          Find and manage the right talent for your team. Simplify your
          recruitment process with intuitive tools and an effortless workflow
          designed for modern teams.
        </p>
        <Link
          to="/signup"
          className="bg-amber-500 hover:bg-amber-600 text-white text-lg font-semibold py-3 px-8 rounded-full w-fit transition-all duration-300 shadow-lg"
        >
          Get Started
        </Link>
      </div>

      {/* Empty right space for layout balance */}
      <div className="hidden lg:block w-1/2"></div>
    </div>
  );
}
