import { LogOut, Home, Search, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({collapsed, setCollapsed,setIsLoggedIn}) {
  return (
    <div
      className={`flex flex-col justify-between h-screen bg-white border-r transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Top: User Info + Toggle */}
      <div className="flex flex-col items-center p-4">
        <img
          src="useravatar.png"
          alt="User Avatar"
          className={`${collapsed?"w-8 h-8":"w-12 h-12"}rounded-full object-cover mb-2`}
        />
        {!collapsed && (
          <>
            <h2 className="text-md font-semibold">Thayanithi R K</h2>
            <p className="text-xs text-gray-500">@thayanithi</p>
          </>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="mt-4 text-xs text-gray-600 hover:text-black"
        >
          {collapsed?<img src="expandicon.png" className="h-6 w-6"/>:
          <img src="collapseicon.png" className={"h-6 w-6"}/>}
        </button>
      </div>

      {/* Middle: Navigation Links */}
      <div className="flex flex-col space-y-4 px-2">
        <SidebarItem icon={<Home size={20} />} label="Home" collapsed={collapsed} />
        <SidebarItem icon={<Search size={20} />} label="Search" collapsed={collapsed} />
        <SidebarItem icon={<MessageSquare size={20} />} label="Chats" collapsed={collapsed} />
      </div>

      {/* Bottom: Logout */}
      <div className="flex flex-col items-center mb-4">
        <SidebarItem icon={<LogOut size={20}/>} label="Logout" collapsed={collapsed} setIsLoggedIn={setIsLoggedIn}/>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, collapsed,setIsLoggedIn}) {
  
  const navigate=useNavigate();
  const handleLogout=(e)=>{
    e.preventDefault();
    setIsLoggedIn(false);
    navigate('/');
  }

  return (
    <div
      className="flex items-center space-x-3 text-sm font-medium text-gray-700 p-2 rounded hover:bg-gray-100 group" onClick={handleLogout}
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
