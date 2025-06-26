import { Search } from "lucide-react";

export default function TopBar() {

    return (
    <div className="h-12 bg-white border-b flex items-center justify-between px-6">
      <span className="font-bold text-lg text-black">SharedLib</span>
        
        <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full w-1/2">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search for books..."
              className="bg-transparent outline-none w-full text-sm placeholder:text-gray-500"
            />
        </div>

    <img src="SharedLibLogo.png" className="w-8 h-8 rounded-full" />
    </div>
  );
}
