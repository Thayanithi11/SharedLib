import { useNavigate } from "react-router-dom";

const AllPeoplePage = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-blue-500 hover:underline"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-semibold mb-6">All Nearby People</h2>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-4 bg-white p-3 shadow rounded">
            <img src={item.image} className="w-16 h-16 rounded-full object-cover" />
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-500">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPeoplePage;
