import { useState } from 'react';
import { Link, useNavigate,useLocation} from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [errormsg, setErrormsg] = useState(false);
  const successMessage = location.state?.message || "";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate('/home');
    } catch (err) {
      setErrormsg(true);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      await fetch('/api/google-signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      navigate('/home');
    } catch (err) {
      if (err.code === 'auth/popup-closed-by-user') {
        console.log("Google Sign-In popup closed by user.");
      } else {
        alert("Google Sign-In failed: " + err.message);
      }
    }
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
          <img src="/SharedLibLogo.png" className="h-8 w-8" alt="Logo" />
        </div>

        {successMessage && (
          <div className="text-green-600 text-md text-center mb-2">
            {successMessage}
          </div>)}

        <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
        <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} />

        {errormsg && (
          <div className="text-red-500 text-sm mb-2">
            Invalid email or password. Please try again.
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 font-semibold rounded-md transition-all duration-200 ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-500'
          } text-white`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Logging in...
            </div>
          ) : (
            "Log In"
          )}
        </button>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-2 mt-2 font-semibold rounded-md border transition-all duration-200 
            bg-white text-black border-black hover:bg-gray-100"
        >
          Sign in with Google
        </button>

        <div className="flex justify-center mt-2">
          <Link to="/signup" className="text-gray-500 underline hover:text-gray-700">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}

function Input({ label, name, type = "text", value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-black">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-2 bg-transparent border border-black rounded"
      />
    </div>
  );
}
