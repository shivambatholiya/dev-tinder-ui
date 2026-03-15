import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      
      {/* HERO SECTION */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-28">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          Match with Developers.
          <span className="block text-indigo-500">Build Together.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-gray-400 text-lg">
          Dev Tinder helps developers connect, collaborate, and grow by matching
          based on skills, interests, and goals.
        </p>

        <div className="mt-8 flex gap-4">
          <Link to={"/feed"} className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-semibold transition">
            Get Started
          </Link>
          <button className="px-6 py-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition">
            Sign In
          </button>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          How Dev Tinder Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
            <p className="text-gray-400">
              Add your tech stack, interests, and what you want to build.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Match with Developers</h3>
            <p className="text-gray-400">
              Get matched with like-minded developers based on skills.
            </p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-2">Chat & Collaborate</h3>
            <p className="text-gray-400">
              Talk, plan, and build projects together in real time.
            </p>
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section className="bg-black/40 py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Finding the right developer is hard.
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto">
            Twitter is noisy. LinkedIn is crowded. Random Discord servers don’t
            work. Dev Tinder connects you with developers who actually want to
            build.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Built for Developers
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            🔥 Skill-based matching
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            💬 Real-time chat
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            🧑‍💻 Developer-focused profiles
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            🚀 Project-oriented connections
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="text-center py-24 px-6">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to find your dev match?
        </h2>

        <p className="text-gray-400 mt-4">
          Join Dev Tinder and start building with the right people.
        </p>

        <button className="mt-8 px-8 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 font-semibold transition">
          Create Your Free Account
        </button>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;
