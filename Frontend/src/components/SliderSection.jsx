    import { useNavigate } from 'react-router-dom';

    const SliderSection = ({ title, items = [], viewAllPath }) => {
    const navigate = useNavigate();

    return (
        <div className="mb-8 sm:mx-8 md:mx-20">
        <div className="flex justify-between items-center mb-4 px-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
            onClick={() => navigate(viewAllPath)}
            className="text-sm text-black-500 rounded-2xl border px-2 bg-white hover:border-[1px] hover:border-black"
            >
            View All
            </button>
        </div>
        <div className="overflow-x-auto px-4">
            <div className="flex space-x-4">
            {items.map((item, index) => (
                <div key={index} className="sm:w-[150px] md:w-[200px] flex flex-col items-center justify-center 
                rounded-lg shadow-xl hover:shadow-2xl bg-white p-2">
                <img
                    src={item.image}
                    alt={item.title}
                    className="w-32 h-32 object-cover rounded mb-2"
                />
                <p className="text-sm md:text-md font-semibold text-gray-800 truncate">{item.title}</p>
                <p className="text-xs md: text-sm text-gray-500 truncate">{item.subtitle}</p>
                </div>
            ))}
            </div>
        </div>
        </div>
    );
    };

    export default SliderSection;
