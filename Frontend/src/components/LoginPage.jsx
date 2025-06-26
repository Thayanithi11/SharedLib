import { Link, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

export default function LoginPage({ setIsLoggedIn }) {
  const navigate=useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm p-8 border border-black rounded-xl shadow-lg"
      >
        <h1 className="text-3xl font-semibold text-center text-black mb-2">
          Welcome back to SharedLib
        </h1>
        <div className="flex w-full justify-center mb-4">
          <img src="/SharedLibLogo.png" className="h-8 w-8" />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-black">UserName</label>
          <input
            name="username"
            type="text"
            required
            className="w-full px-4 py-2 bg-transparent border border-black rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-black">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full px-4 py-2 bg-transparent border border-black rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-black text-white font-semibold rounded-md hover:shadow-lg hover:bg-gray-500 hover:text-gray-200"
        >
          Log In
        </button>

        <div className="flex justify-center mt-2">
          <Link
            to="/signup"
            className="text-gray-500 underline hover:text-gray-700"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}
