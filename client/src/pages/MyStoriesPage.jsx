import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import StoryCard from "../components/StoryCard";
import { useAuth } from "../context/AuthContext";

const MyStoriesPage = () => {
  const { API } = useAuth();
  const navigate = useNavigate();

  const [myStories, setMyStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyStories = async () => {
      try {
        const res = await API.get("/stories/me");
        setMyStories(res.data.data.stories || []);
      } catch (err) {
        console.error("ERROR:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyStories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      

      <div className="max-w-7xl mx-auto px-6 py-14">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              My Stories 📚
            </h1>
            <p className="mt-2 text-gray-500">
              All the memories you’ve shared so far
            </p>
          </div>

          <button
            onClick={() => navigate("/create-stories")}
            className="px-6 py-3 rounded-xl text-white font-medium
                       bg-gradient-to-r from-blue-600 to-purple-600
                       hover:from-blue-700 hover:to-purple-700
                       transition-all shadow-lg hover:shadow-xl"
          >
            + Create Story
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-500">Loading your stories...</p>
          </div>
        ) : myStories.length === 0 ? (
          /* ---------- Empty State ---------- */
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <div className="bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-xl border border-white/50 max-w-md">
              <h2 className="text-2xl font-semibold mb-3">
                No stories yet 📭
              </h2>
              <p className="text-gray-500 mb-6">
                Start capturing your memories and build your personal
                story collection.
              </p>
              <button
                onClick={() => navigate("/create-stories")}
                className="px-6 py-3 rounded-xl text-white font-medium
                           bg-gradient-to-r from-blue-600 to-purple-600
                           hover:from-blue-700 hover:to-purple-700
                           transition-all shadow-lg hover:shadow-xl"
              >
                Create Your First Story
              </button>
            </div>
          </div>
        ) : (
          /* ---------- Stories Grid ---------- */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {myStories.map((story) => (
              <div
                key={story._id}
                className="transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
              >
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-2xl border border-white/40">
                  <StoryCard story={story} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyStoriesPage;
