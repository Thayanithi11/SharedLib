import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReviewPage() {
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);


    setTimeout(() => {
      navigate("/home");
    }, 2500); 
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded mt-10">
      {!submitted ? (
        <>
        <h2 className="text-2xl font-semibold mb-6 text-center">Write a Review</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
         
          <div>
            <label className="block mb-1 text-sm font-medium">Upload Book Cover</label>
            <input
              type="file"
              accept="image/*"
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Book Name</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g. The Alchemist"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Author</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              placeholder="e.g. Paulo Coelho"
              required
            />
          </div>

      
          <div>
            <label className="block mb-1 text-sm font-medium">Your Review</label>
            <textarea
              className="w-full border px-3 py-2 rounded"
              rows="7"
              placeholder="Write your thoughts here..."
              required
            ></textarea>
          </div>

        
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Submit Review
          </button>
        </form>
        </>
      ) : (
        <div className="text-center text-green-600 font-medium text-lg">
           Thank you! Your review has been submitted. Redirecting to home...
        </div>
      )}
    </div>
  );
}
