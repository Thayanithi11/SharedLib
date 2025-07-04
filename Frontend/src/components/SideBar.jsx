import { useEffect, useState } from "react";
import { LogOut, Home, MessageSquare, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"; // ⬅️ Make sure db (Firestore) is exported from firebase.js
import { doc, getDoc } from "firebase/firestore";

export default function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
  name:"",
  username: "",
  profileimageURL: "",
});


  // 🔍 Get username from Firestore
 useEffect(() => {
  const fetchUserProfile = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserProfile({
          name: data.name,
          username: data.username,
          profileimageURL: data.profileimageURL || "useravatar.png", // fallback if null
        });
      }
    }
  };
  fetchUserProfile();
}, []);


  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className={`flex flex-col justify-between h-screen bg-white border-r transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      <div className="flex flex-col items-center p-4">
        <img
          src={userProfile.profileimageURL || "useravatar.png" }// Fallback if null
          alt="User Avatar"
          onClick={() => navigate(`/home/userprofile/${userProfile.username}`)} // ✅ Use dynamic route
          className={`${collapsed ? "w-8 h-8" : "w-12 h-12"} rounded-full object-cover mb-2 cursor-pointer`}
        />
        {!collapsed && (
         <>
           <h2 className="text-md font-semibold">{userProfile.name}</h2>
           <p className="text-xs text-gray-500">@{userProfile.username}</p>
         </>
      )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mt-4 text-xs text-gray-600 hover:text-black"
        >
          {collapsed ? (
            <img src="https://firebasestorage.googleapis.com/v0/b/sharedlib-bc490.firebasestorage.app/o/expandicon.png?alt=media&token=1bdbdb45-13e9-4954-aba7-3745d06b19a4" 
            className="h-6 w-6" />
          ) : (
            <img src="https://firebasestorage.googleapis.com/v0/b/sharedlib-bc490.firebasestorage.app/o/collapseicon.png?alt=media&token=fffd6370-d5e7-42f3-8588-18672bc2cd7b"
             className="h-6 w-6" />
          )}
        </button>
      </div>

      <div className="flex flex-col items-center space-y-4 px-2">
        <SidebarItem icon={<Home size={20} />} label="Home" collapsed={collapsed} onClick={() => navigate("/home")} />
        <SidebarItem icon={<MessageSquare size={20} />} label="Chats" collapsed={collapsed} onClick={() => navigate("/chats")} />
        <SidebarItem icon={<Plus size={20} />} label="Write a review" collapsed={collapsed} onClick={() => navigate("/userreview")} />
      </div>

      <div className="flex flex-col items-center mb-4">
        <SidebarItem icon={<LogOut size={20} />} label="Logout" collapsed={collapsed} onClick={handleLogout} />
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, collapsed, onClick }) {
  return (
    <div
      className="flex items-center space-x-3 text-sm font-medium text-gray-700 p-2 rounded hover:bg-gray-100 group"
      onClick={onClick}
    >
      <div className="text-gray-700">{icon}</div>
      {!collapsed && <span className="whitespace-nowrap">{label}</span>}
      {collapsed && (
        <div className="absolute left-16 bg-white shadow px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition">
          {label}
        </div>
      )}
    </div>
  );
}
