import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import bgImage from "../assets/signImg.jpg";

export default function SignIn() {
  const { login, resetPassword } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isForgot, setIsForgot] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isForgot) {
      login(username, password);
    } else {
      resetPassword(email, newPassword);
    }
  };

  const handleClear = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setNewPassword("");
  };

  return (
    <div
      className="relative h-screen w-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-gray-500/20"></div>

      <div
        className="absolute text-black z-10"
        style={{
          top: "46%",
          left: "53%",
          transform: "translate(-50%, -30%)",
          width: "600px",
          height: "470px",
        }}
      >
        <h2 className="text-4xl font-extrabold text-center mb-10 italic tracking-wide drop-shadow-lg">
          {isForgot ? "Reset Password" : "Sign In"}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isForgot ? (
            <>
              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full bg-transparent border-b-2 border-black focus:outline-none focus:border-orange-400 py-3 text-lg placeholder-black"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full bg-transparent border-b-2 border-black focus:outline-none focus:border-orange-400 py-3 text-lg placeholder-black"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex space-x-4 mt-10">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition duration-300"
                >
                  LOGIN
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex-1 bg-gray-300 text-black font-semibold py-3 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
                >
                  CLEAR
                </button>
              </div>

              <div className="flex justify-between items-center text-sm mt-5">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="accent-orange-400" />
                  <span className="text-black">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsForgot(true)}
                  className="text-orange-500 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-6">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-transparent border-b-2 border-black focus:outline-none focus:border-orange-400 py-3 text-lg placeholder-black"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full bg-transparent border-b-2 border-black focus:outline-none focus:border-orange-400 py-3 text-lg placeholder-black"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>

              <div className="flex space-x-4 mt-10">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-orange-500 to-amber-400 text-white font-semibold py-3 rounded-lg shadow-lg hover:opacity-90 transition duration-300"
                >
                  RESET
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex-1 bg-gray-300 text-black font-semibold py-3 rounded-lg shadow-md hover:bg-gray-400 transition duration-300"
                >
                  CLEAR
                </button>
              </div>

              <div className="text-center mt-5">
                <button
                  type="button"
                  onClick={() => setIsForgot(false)}
                  className="text-orange-500 hover:underline text-sm"
                >
                  Back to Login
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
