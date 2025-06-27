import Navbar from "./NavBar";

export default function LandingPage() {
  return (
    <div className="bg-white min-h-screen text-black">
      <Navbar />

      <section className="text-center py-16 px-6">
        <div className="flex items-center justify-center w-full">
            <h1 className="text-5xl font-bold mb-4">Welcome to SharedLib</h1>
            <img src="SharedLibLogo.png" className="h-20 w-20 mb-2"/>
        </div>
        <p className="text-gray-700 max-w-xl mx-auto mb-8">
          A platform to share, borrow, and discover books with your community. Build your digital library today!!
        </p>
      </section>

      <section className="py-4 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">Why SharedLib?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Borrow Nearby",
              desc: "Find and request books from people in your Locality",
            },
            {
              title: "Track Your Digital Library",
              desc: "Manage your own reading and lending records.",
            },
            {
              title: "Social Reading",
              desc: "Share your thoughts on a book with reviews",
            },
          ].map((f, idx) => (
            <div key={idx} className="p-4 bg-white border border-gray-200 shadow-sm rounded">
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
