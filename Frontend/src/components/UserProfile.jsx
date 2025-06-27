import { useState } from "react";
import { MapPin } from "lucide-react";

const books = [
  { title: "The Secret Garden", cover: "link1" },
  { title: "Pride and Prejudice", cover: "link2" },
  { title: "To Kill a Mockingbird", cover: "link3" },
  { title: "1984", cover: "link4" },
  { title: "The Great Gatsby", cover: "link5" },
  { title: "The Catcher in the Rye", cover: "link6" },
];

export default function UserProfile() {
  const [activeTab, setActiveTab] = useState("Owned");
  const [requestedBooks, setRequestedBooks] = useState({});

  const handleRClick=(id)=>{
      setRequestedBooks((prev) => ({ ...prev, [id]: true }));
  }

  const handleCclick=(id)=>{
      setRequestedBooks((prev) => ({ ...prev, [id]: false }));
  }

  return (
    <div className="flex flex-col items-center py-5">
      <img
        src="/useravatar.png"
        alt="Profile"
        className="rounded-full w-28 h-26 mb-4"
      />
      <h2 className="text-2xl font-semibold">Sophia Bennett</h2>
      <p className="text-sm text-gray-600">Book lover and avid reader</p>
      <p className="text-sm text-gray-500 flex items-center gap-1">
          <MapPin className="w-4 h-5" />
          Udumalpet,TN
      </p>
      {/* <p className="text-sm text-gray-500 mb-4">120 followers • 80 following</p>

      <button className="px-6 py-1 bg-indigo-100 text-indigo-700 rounded-md text-sm hover:bg-indigo-200 transition">
        Follow
      </button> */}

      {/* Tabs */}
      <div className="flex justify-center mt-10 space-x-6 border-b w-full max-w-md">
        {["Owned", "Reading", "Read"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${
              activeTab === tab
                ? "border-b-2 border-indigo-600 text-indigo-700"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

     
      {activeTab === "Owned" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-10">
          {books.map((book, idx) => (
          <div key={idx} className="flex flex-col items-center">
              <img src="/book1.png" className="w-48 h-56 bg-gray-200 rounded shadow-sm mb-2" />
              <p className="text-sm text-center mb-2">{book.title}</p>
              <div className="flex justify-center items-center gap-1">
                    <button onClick={() => handleRClick(book.title)} className={`${requestedBooks[book.title]?"px-1 py-1 text-sm font-light  bg-green-100 text-gray-500 rounded-md ml-8":
                      "px-2  py-1 ml-8 text-sm bg-indigo-100 text-blue-700 rounded-xl hover:bg-indigo-400 transition"}`}>
                       {requestedBooks[book.title] ? "Requested" : "Request to Borrow"}
                    </button>
                     {
                       requestedBooks[book.title] && <button className="text-red-800 bg-red-200 rounded-md px-1 py-1 text-sm font-medium
                       hover:border-[1px] hover:bg-red-300" onClick={() => handleCclick(book.title)}>
                       Cancel request</button>
                     }
              </div>
         </div>
          ))}
        </div>
      )}

      {activeTab === "Reading" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-10">
          {books.map((book, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <img src="/book1.png" className="w-48 h-56 bg-gray-200 rounded shadow-sm mb-2" />
              <p className="text-sm text-center mb-2">{book.title}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "Read" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-10">
          {books.map((book, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <img src="/book1.png" className="w-48 h-56 bg-gray-200 rounded shadow-sm mb-2" />
              <p className="text-sm text-center mb-2">{book.title}</p>
            </div>
          ))}
        </div>
      )}

      </div>
  );
}
