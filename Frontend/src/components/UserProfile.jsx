import { useState } from "react";
import { MapPin, Pencil } from "lucide-react";

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
  const [showEditModal, setShowEditModal] = useState(false);

  const [form, setForm] = useState({
    name: "Sophia Bennett",
    username: "sophiab123",
    email: "sophia@example.com",
    bio: "Book lover and avid reader",
    location: "Udumalpet, TN",
    profilePic: null,
  });

  const handleRClick = (id) => {
    setRequestedBooks((prev) => ({ ...prev, [id]: true }));
  };

  const handleCclick = (id) => {
    setRequestedBooks((prev) => ({ ...prev, [id]: false }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFileChange = (e) => {
    setForm((f) => ({ ...f, profilePic: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      // Replace with actual backend URL
      await fetch("/api/update-profile", {
        method: "POST",
        body: formData,
      });
      alert("Profile updated!");
      setShowEditModal(false);
    } catch (err) {
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="flex flex-col items-center py-5">
      {/* Profile Photo with Edit Icon */}
      <div className="relative">
        <img
          src="/useravatar.png"
          alt="Profile"
          className="rounded-full w-28 h-28 mb-4"
        />
        <button
          onClick={() => setShowEditModal(true)}
          className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-200"
        >
          <Pencil className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Name & Info */}
      <h2 className="text-2xl font-semibold">{form.name}</h2>
      <p className="text-sm text-gray-600">{form.bio}</p>
      <p className="text-sm text-gray-500 flex items-center gap-1">
        <MapPin className="w-4 h-5" />
        {form.location}
      </p>

      {/* Tabs */}
      <div className="flex justify-center mt-10 space-x-6 border-b w-full max-w-md">
        {["Owned", "Reading", "Read", "Articles"].map((tab) => (
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

      {/* Books */}
      {(activeTab === "Owned" || activeTab === "Reading" || activeTab === "Read" || activeTab === "Articles") && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-10">
          {books.map((book, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <img
                src="/book1.png"
                className="w-48 h-56 bg-gray-200 rounded shadow-sm mb-2"
              />
              <p className="text-sm text-center mb-2">{book.title}</p>
              {activeTab === "Owned" && (
                <div className="flex justify-center items-center gap-1">
                  {!requestedBooks[book.title] && (
                    <button
                      onClick={() => handleRClick(book.title)}
                      className="px-2 py-1 ml-8 text-sm bg-indigo-100 text-blue-700 rounded-xl hover:bg-indigo-400 transition"
                    >
                      Request to borrow
                    </button>
                  )}
                  {requestedBooks[book.title] && (
                    <button
                      className="text-red-800 bg-red-200 rounded-md px-1 py-1 ml-8 text-sm font-medium hover:border hover:bg-red-300"
                      onClick={() => handleCclick(book.title)}
                    >
                      Cancel request
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl w-80 shadow-lg"
          >
            <h2 className="text-xl font-semibold mb-4 text-center">
              Edit Profile
            </h2>

            <div className="mb-2">
              <label className="block text-sm">Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleInputChange}
                className="w-full px-3 py-1 border rounded"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm">Username</label>
              <input
                value={form.username}
                disabled
                className="w-full px-3 py-1 border rounded bg-gray-100 text-gray-600"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm">Email</label>
              <input
                value={form.email}
                disabled
                className="w-full px-3 py-1 border rounded bg-gray-100 text-gray-600"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm">Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleInputChange}
                className="w-full px-3 py-1 border rounded"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm">Location</label>
              <input
                name="location"
                value={form.location}
                onChange={handleInputChange}
                className="w-full px-3 py-1 border rounded"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm">Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full"
              />
            </div>

            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() => setShowEditModal(false)}
                className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1 rounded bg-indigo-600 text-white hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
