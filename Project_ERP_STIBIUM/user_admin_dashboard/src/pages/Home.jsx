import { Link } from "react-router-dom";
import bggImage from "../assets/bgg.jpg";

export default function Home() {
  return (
    <div
      className="flex flex-col lg:flex-row items-center justify-between h-screen w-screen overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(249, 250, 252, 0.95) 55%, rgba(255, 255, 255, 0.1)), url(${bggImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Left Section */}
      <div className="flex flex-col justify-center lg:pl-32 px-8 max-w-3xl text-left">
        <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-800 mb-6">
          Recruiting
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          Find and manage the right talent for your team. Simplify your
          recruitment process with intuitive tools and an effortless workflow
          designed for modern teams.
        </p>
        <Link
          to="/signup"
          className="bg-amber-400 hover:bg-amber-500 text-white text-lg font-semibold py-3 px-8 rounded-full w-fit transition-all duration-300 shadow-lg"
        >
          Get Started
        </Link>
      </div>

      {/* Right Section (empty for now, just spacing) */}
      <div className="hidden lg:block w-1/2"></div>
    </div>
  );
}
