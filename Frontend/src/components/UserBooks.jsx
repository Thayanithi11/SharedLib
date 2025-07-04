import { useState,useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import imageCompression from "browser-image-compression";


 export default function UserBooks({isOwner,userData})
 {
  const [activeTab, setActiveTab] = useState("Owned");
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [BsuccessMessage, setBSuccessMessage] = useState("");
  const [BerrorMessage, setBErrorMessage] = useState("");


  const [Bform, setBForm] = useState({
  bookname: "",
  ownername: "",
  authorname: "",
  BookimageURL: "",
  isAvailable: true,
});


const handleBookFileChange = (e) => {
  setBErrorMessage(""); // clear previous errors
  setBSuccessMessage(""); // clear previous success
  setBForm((f) => ({ ...f, BookimageURL: e.target.files[0] }));
};

const handleAddBook = async (e) => {
  e.preventDefault();
  setBErrorMessage("");
  setBSuccessMessage("");

  try {
    let BookimageURL = "";

    if (Bform.BookimageURL instanceof File) {
      const options = { maxSizeMB: 0.5, maxWidthOrHeight: 800, useWebWorker: true };
      const compressedFile = await imageCompression(Bform.BookimageURL, options);
      const storageRef = ref(storage, `BookCoverImages/${Bform.username}/${Bform.bookname}`);
      const uploadTask = uploadBytesResumable(storageRef, compressedFile);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          reject,
          async () => {
            BookimageURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve();
          }
        );
      });
    }

    await fetch("http://localhost:5001/sharedlib-bc490/us-central1/api/bookroutes/addbook", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    bookname: Bform.bookname,
    authorname: Bform.authorname,
    ownerUsername: userData.username,
    BookimageURL // 🔄 Set this after uploading image
  }),
});

    setBSuccessMessage("Book added ✅");
    setShowAddBookModal(false);
    setBForm({
      bookname: "",
      ownername: "",
      author: "",
      BookimageURL: "",
      isAvailable: true,
    }); 

  } catch (err) {
    console.error("Book upload error:", err);
    setBErrorMessage("Book upload failed. Try again.");
  }
};


//   const renderBookControls = (book) => {
//     if (activeTab === "Owned" && !isOwner) {
//       return requestedBooks[book.id] ? (
//         <button onClick={() => handleCancelClick(book.id)} className="text-red-600 bg-red-200 rounded px-2 py-1 text-sm">Requested</button>
//       ) : (
//         <button onClick={() => handleRequestClick(book.id)} className="bg-blue-100 text-blue-700 rounded px-2 py-1 text-sm hover:bg-blue-200">Request to borrow</button>
//       );
//     }
//     if (isOwner) {
//       return (
//         <button className="text-sm text-gray-500 hover:text-red-600">
//           <MoreVertical size={16} />
//         </button>
//       );
//     }
//     return null;
//   };
return(
      <div>
          {/* Tabs */}
      <div className="flex justify-center mt-6 space-x-6 border-b w-full max-w-md">
        {["Owned", "Reading", "Read", "Articles"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium ${
              activeTab === tab ? "border-b-2 border-indigo-600 text-indigo-700" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Add Book Button (only for Owner in relevant tabs) */}
{isOwner &&  activeTab !== "Articles" && (
  <div className="mt-4 flex items-center justify-center">
    <button
      onClick={() => setShowAddBookModal(true)}
      className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
    >
      Add Book
    </button>
  </div>
)}


{/* Book Section (Owned / Reading / Read) */}
<div className="mt-4 w-full max-w-md">
  {(userData[activeTab.toLowerCase()] || []).map((book) => (
    <div
      key={book.id}
      className="flex justify-between items-center bg-gray-50 border p-3 rounded mb-2"
    >
      <div>
        <h4 className="font-medium">{book.title}</h4>
        <p className="text-sm text-gray-600">by {book.author}</p>
      </div>
    </div>
  ))}
</div>

{showAddBookModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <form
      onSubmit={handleAddBook}
      className="bg-white p-6 rounded-xl w-80 shadow-lg"
    >
      <h2 className="text-lg font-semibold mb-4 text-center">Add a Book</h2>
      <input
        type="text"
        placeholder="Book Title"
        value={Bform.bookname}
        onChange={(e) => setBForm((prev) => ({ ...prev, bookname: e.target.value }))}
        className="w-full mb-3 px-3 py-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={Bform.authorname}
        onChange={(e) => setBForm((prev) => ({ ...prev, authorname: e.target.value }))}
        className="w-full mb-4 px-3 py-2 border rounded"
        required
      />
       <div className="mb-3">
              <label className="block text-sm">BookCover Photo</label>
              <input
                id="bookcoverimage"
                name="BookimageURL"
                type="file"
                accept="image/*"
                onChange={handleBookFileChange}
                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => setShowAddBookModal(false)}
          className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-1 rounded text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Add
        </button>
      </div>
    </form>
  </div>
)}
</div>
)
} 