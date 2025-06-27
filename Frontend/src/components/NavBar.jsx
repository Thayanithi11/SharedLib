import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow bg-white">
      <div className="text-2xl font-bold text-black">SharedLib</div>

      <div className="space-x-4">
        <Link
          to="/login"
          className="text-black border border-black px-4 py-1 rounded hover:bg-gray-100"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
