import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import UserProfile from "./UserProfile";

export default function UserProfileWrapper() {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen for auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  // Fetch profile data by username
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:5001/sharedlib-bc490/us-central1/api/userprofileinfo/${username}`
        );
        const data = await res.json();
        setUserData(data);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [username]);

  if (loading || currentUser === null) {
    return <p>Loading profile...</p>;
  }

  const isOwner = currentUser?.email === userData?.email;
  return <UserProfile isOwner={isOwner} userData={userData} />;
}
