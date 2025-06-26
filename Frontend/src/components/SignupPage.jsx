import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  const [signedUp, setSignedUp] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();
    // TODO: Call backend API here
    setSignedUp(true); 
    setTimeout(() => navigate('/'), 2000); 
  };

  if (signedUp) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black mb-2">Signup Successful!</h1>
          <p className="text-gray-600">Redirecting to login page...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-sm p-8 border border-black rounded-xl shadow-lg"
      >
        <h1 className="text-3xl font-semibold text-center text-black mb-2">
          Welcome to ShareLib
        </h1>
        <div className="flex w-full justify-center mb-4">
          <img src="/SharedLibLogo.png" className="h-8 w-8" alt="ShareLib Logo" />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-black">Name</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 bg-transparent border border-black rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-black">Username</label>
          <input
            type="text"
            required
            className="w-full px-4 py-2 bg-transparent border border-black rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-black">Password</label>
          <input
            type="password"
            required
            className="w-full px-4 py-2 bg-transparent border border-black rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-black text-white font-semibold rounded-md hover:shadow-lg hover:bg-gray-500 hover:text-gray-200"
        >
          Sign Up
        </button>

        <div className="flex justify-center mt-2">
          <p>
            Already a user?{' '}
            <Link to="/" className="text-gray-500 underline hover:text-gray-700">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
