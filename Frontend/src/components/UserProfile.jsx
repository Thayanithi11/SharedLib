import { useState,useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { MapPin, Pencil, Plus, MoreVertical } from "lucide-react";
import imageCompression from "browser-image-compression";
import UserBooks from "./UserBooks";


export default function UserProfile({ isOwner, userData }) {
  const [requestedBooks, setRequestedBooks] = useState({});
  const [showEditModal, setShowEditModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userData1, setUserData] = useState(userData || {});

  const [form, setForm] = useState({
  name: "",
  username: "",
  email: "",
  bio: "",
  location: "",
  profileimageURL: "",
});

useEffect(() => {
  if (userData1) {
    setForm({
      name: userData1.name || "",
      username: userData1.username || "",
      email: userData1.email || "",
      bio: userData1.bio || "",
      location: userData1.location || "",
      profileimageURL: userData1.profileimageURL || "",
    });
  }
}, [userData1]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleFileChange = (e) => {
  setErrorMessage(""); // clear previous errors
  setSuccessMessage(""); // clear previous success
  setForm((f) => ({ ...f, profileimageURL: e.target.files[0] }));
};


const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSaving(true);
  setErrorMessage(""); // reset error message
  setSuccessMessage(""); // reset success message

  let imageURL = form.profileimageURL;

  try {
    if (form.profileimageURL instanceof File) {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(form.profileimageURL, options);
      const storageRef = ref(storage, `UserProfilePics/${form.username}`);
      const uploadTask = uploadBytesResumable(storageRef, compressedFile);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => reject(error),
          async () => {
            imageURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve();
          }
        );
      });
    }

    const payload = {
      name: form?.name || "",
      username: form?.username || "",
      email: form?.email || "",
      bio: form?.bio || "",
      location: form?.location || "",
      profileimageURL: imageURL,
    };

    const response = await fetch(`http://localhost:5001/sharedlib-bc490/us-central1/api/updateprofile/${form.username}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Unknown error");
    setUserData((prev) => ({ ...prev, ...payload }));

    setSuccessMessage("Profile updated ✅");
    setTimeout(() => {
      setSuccessMessage("");
      setShowEditModal(false);
    }, 1000);
  } catch (err) {
    setErrorMessage("Profile update failed please try again.");
  } finally {
    setIsSaving(false);
  }
};


  const handleRequestClick = (bookId) => {
    setRequestedBooks((prev) => ({ ...prev, [bookId]: true }));
  };

  const handleCancelClick = (bookId) => {
    setRequestedBooks((prev) => ({ ...prev, [bookId]: false }));
  };

  return (
    <div className="flex flex-col items-center py-5">
      {/* Profile Picture */}
      <div className="relative">
        <img
          src={
            form.profileimageURL instanceof File
              ? URL.createObjectURL(form.profileimageURL)
              : userData1.profileimageURL || "/useravatar.png"
          }
          alt="Profile"
          className="rounded-full w-28 h-28 mb-2 object-cover"
        />
        {isOwner && (
          <button onClick={() => setShowEditModal(true)} className="absolute bottom-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-200">
            <Pencil className="w-4 h-4 text-gray-600" />
          </button>
        )}
      </div>

      {/* Name, Username, Bio */}
      <h2 className="text-2xl font-semibold">{userData1.name}</h2>
      <p className="text-gray-500 text-sm">@{userData1.username}</p>
      <p className="text-sm text-gray-700">{userData1.bio}</p>
      <p className="text-sm text-gray-500 flex items-center gap-1">
        <MapPin className="w-4 h-4" /> {userData1.location}
      </p>

      {/* Followers / Following */}
      <div className="flex gap-4 mt-2">
        <span className="text-sm text-black">{userData1.followers.length} Followers</span>
        <span className="text-sm text-black">{userData1.following.length} Following</span>
      </div>

     <UserBooks isOwner={isOwner} userData={userData}/>


      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl w-80 shadow-lg" encType="multipart/form-data">
            <h2 className="text-xl font-semibold mb-4 text-center">Edit Profile</h2>

            {successMessage && (
              <div className="text-green-600 text-center text-sm mb-2">
                {successMessage}
              </div>
            )}
            {errorMessage && (
           <div className="text-red-600 text-center text-sm mb-2">{errorMessage}</div>
          )}

            <div className="mb-2">
              <label className="block text-sm">Name</label>
              <input name="name" value={form.name} onChange={handleInputChange} className="w-full px-3 py-1 border rounded" />
            </div>

            <div className="mb-2">
              <label className="block text-sm">Username</label>
              <input value={form.username} disabled className="w-full px-3 py-1 border rounded bg-gray-100 text-gray-600" />
            </div>

            <div className="mb-2">
              <label className="block text-sm">Email</label>
              <input value={form.email} disabled className="w-full px-3 py-1 border rounded bg-gray-100 text-gray-600" />
            </div>

            <div className="mb-2">
              <label className="block text-sm">Bio</label>
              <textarea name="bio" value={form.bio} onChange={handleInputChange} className="w-full px-3 py-1 border rounded" />
            </div>

            <div className="mb-2">
              <label className="block text-sm">Location</label>
              <input name="location" value={form.location} onChange={handleInputChange} className="w-full px-3 py-1 border rounded" />
            </div>

            <div className="mb-3">
              <label className="block text-sm">Profile Photo</label>
              <input
                id="profilePhoto"
                name="profileimageURL"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>

            <div className="flex justify-between mt-4">
              <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-1 rounded bg-gray-200 hover:bg-gray-300">Cancel</button>
              <button
                type="submit"
                disabled={isSaving}
                className={`px-4 py-1 rounded text-white ${
                  isSaving
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                } flex items-center gap-2`}
              >
                {isSaving && (
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                )}
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
