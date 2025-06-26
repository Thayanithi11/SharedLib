export default function TopBar({collapsed}) {
  return (
    <header className={`flex justify-between items-center h-12 px-6 bg-white border-b fixed ${collapsed?"left-16":"left-64"} right-0 top-0 z-10`}>
      {/* Left: App Name */}
      <h1 className="text-xl font-bold text-[#121417]">SharedLib</h1>

      {/* Right: Logo */}
      <img src="SharedLibLogo.png" alt="Logo" className="h-12 w-12" />
    </header>
  );
}
