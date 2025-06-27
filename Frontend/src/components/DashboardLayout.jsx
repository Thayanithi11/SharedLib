import SideBar from "./SideBar";
import TopBar from "./TopBar";

export default function DashboardLayout({ collapsed, setCollapsed, setIsLoggedIn,isLoggedIn, children }) {
  return (
    <div className="flex h-screen">
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} setIsLoggedIn={setIsLoggedIn}/>
      <div className="flex-1 flex flex-col">
        <TopBar/>
        <div className="flex-1 overflow-y-auto p-2 bg-white">{children}</div>
      </div>
    </div>
  );
}
