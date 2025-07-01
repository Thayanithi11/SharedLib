import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignupPage() {
  const navigate = useNavigate();
  const [signedUp, setSignedUp] = useState(false);
  const [loading, setLoading] = useState(false);

  const [usernameStatus, setUsernameStatus] = useState("idle"); // idle | checking | taken | available
  const [emailStatus, setEmailStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });

  // 🔍 Username availability check
  useEffect(() => {
    const checkUsername = async () => {
      const uname = form.username.trim();
      if (!uname) {
        setUsernameStatus("idle");
        return;
      }

      setUsernameStatus("checking");
      try {
        const res = await fetch(`/api/check-username/${uname}`);
        const { available } = await res.json();
        setUsernameStatus(available ? "available" : "taken");
      } catch (err) {
        console.error("Username check error:", err);
        setUsernameStatus("idle");
      }
    };

    const delay = setTimeout(checkUsername, 500);
    return () => clearTimeout(delay);
  }, [form.username]);

  // 📧 Email availability check
  useEffect(() => {
    const checkEmail = async () => {
      const email = form.email.trim();
      if (!email) {
        setEmailStatus("idle");
        return;
      }

      setEmailStatus("checking");
      try {
        const res = await fetch(`/api/check-email/${encodeURIComponent(email)}`);
        const { available } = await res.json();
        setEmailStatus(available ? "available" : "taken");
      } catch (err) {
        console.error("Email check error:", err);
        setEmailStatus("idle");
      }
    };

    const delay = setTimeout(checkEmail, 500);
    return () => clearTimeout(delay);
  }, [form.email]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (usernameStatus === "taken") {
      setErrorMsg("Username already taken.");
      return;
    }
    if (emailStatus === "taken") {
      setErrorMsg("Email already registered.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (res.ok) {
  setSignedUp(true);
  setTimeout(() => navigate('/home'), 2000);
} else {
  const errText = await res.text();
  if (errText.includes("Username already taken")) {
    setUsernameStatus("taken");
    setErrorMsg("Username already taken.");
  } else if (errText.includes("Email already exists")) {  // <-- updated check
    setEmailStatus("taken");
    setErrorMsg("An account with this email already exists.");
  } else {
    setErrorMsg("Signup failed. Please try again.");
  }
}}
 catch (error) {
      console.error("Signup error:", error);
      setErrorMsg("Something went wrong.");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  if (signedUp) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black mb-2">Signup Successful!</h1>
          <p className="text-gray-600">Redirecting to Landing page</p>
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
        <h1 className="text-3xl font-semibold text-center text-black mb-2">Welcome to SharedLib</h1>
        <div className="flex w-full justify-center mb-4">
          <img src="/SharedLibLogo.png" className="h-8 w-8" alt="ShareLib Logo" />
        </div>

        <Input label="Name" name="name" value={form.name} onChange={handleChange} />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          status={emailStatus}
        />
        <Input
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          status={usernameStatus}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={
            loading ||
            usernameStatus === "taken" || usernameStatus === "checking" ||
            emailStatus === "taken" || emailStatus === "checking"
          }
          className={`w-full py-2 font-semibold rounded-md transition-all duration-200 ${
            loading ||
            usernameStatus === "taken" || usernameStatus === "checking" ||
            emailStatus === "taken" || emailStatus === "checking"
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-black hover:bg-gray-500'
          } text-white`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Signing Up...
            </div>
          ) : (
            "Sign Up"
          )}
        </button>

        {errorMsg && <p className="mt-2 text-center text-red-600 text-sm">{errorMsg}</p>}

        <div className="flex justify-center mt-2">
          <p>
            Already a user?{' '}
            <Link to="/login" className="text-gray-500 underline hover:text-gray-700">Log in</Link>
          </p>
        </div>
      </form>
    </div>
  );
}


function Input({ label, name, type = "text", value, onChange, status = "idle" }) {
  let message = "", color = "";
  if (status === "checking") {
    message = "Checking...";
    color = "text-gray-500";
  } else if (status === "taken") {
    message = name === "email" ? "Email already registered." : "Username already taken.";
    color = "text-red-600";
  } else if (status === "available") {
    message = "Available.";
    color = "text-green-600";
  }

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
      {status !== "idle" && <p className={`text-sm ${color}`}>{message}</p>}
    </div>
  );
}
