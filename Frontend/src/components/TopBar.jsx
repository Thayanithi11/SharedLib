import { useState } from "react";
import { Search } from "lucide-react";

export default function TopBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const bookResults = ["Atomic Habits", "The Alchemist", "Deep Work"];
  const peopleResults = ["Thayanithi", "Arun Kumar", "Divya R"];

  const handleFocus = () => setShowResults(true);
  const handleBlur = () => setTimeout(() => setShowResults(false), 200); 

 
  const filteredBooks = searchQuery
    ? bookResults.filter(book =>
        book.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredPeople = searchQuery
    ? peopleResults.filter(person =>
        person.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="relative z-50">
      <div className="h-12 bg-white border-b flex items-center justify-between px-6 relative">
        <span className="font-bold text-lg text-black">SharedLib</span>

        <div className="relative w-1/2">
          <div className="flex items-center bg-gray-100 px-3 py-1.5 rounded-full">
            <Search className="w-4 h-4 text-gray-500 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder="Search for books/people"
              className="bg-transparent outline-none w-full text-sm placeholder:text-gray-500"
            />
          </div>

         
          {showResults && searchQuery && (filteredBooks.length > 0 || filteredPeople.length > 0) && (
            <div className="absolute top-full mt-2 left-0 w-full bg-white border shadow-lg rounded-lg p-4 text-sm space-y-4 max-h-60 overflow-y-auto">
              
              {filteredBooks.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Books</h3>
                  {filteredBooks.map((book, idx) => (
                    <div key={idx} className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
                      {book}
                    </div>
                  ))}
                </div>
              )}

           
              {filteredPeople.length > 0 && (
                <div>
                  <h3 className="font-semibold text-gray-700 mt-2 mb-2">People</h3>
                  {filteredPeople.map((person, idx) => (
                    <div key={idx} className="hover:bg-gray-100 px-2 py-1 rounded cursor-pointer">
                      {person}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

       
        <img src="SharedLibLogo.png" className="w-8 h-8 rounded-full" />
      </div>
    </div>
  );
}
