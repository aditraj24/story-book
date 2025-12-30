import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { API } = useAuth();
  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // modal state
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/me");
        setCurrentUser(res.data.data);
      } catch (err) {
        console.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No user found
      </div>
    );
  }

  const firstLetter = currentUser.fullName?.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">

      <div className="max-w-4xl mx-auto px-6 py-14">

        {/* Cover */}
        <div
          className="relative h-56 rounded-3xl overflow-hidden shadow-lg mb-16 
                     bg-gradient-to-r from-blue-500 to-purple-600 cursor-pointer"
          onClick={() =>
            currentUser.coverImage && setPreviewImage(currentUser.coverImage)
          }
        >
          {currentUser.coverImage && (
            <img
              src={currentUser.coverImage}
              alt="Cover"
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        {/* Profile Card */}
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl 
                        shadow-xl border border-white/50 px-8 pb-8">

          {/* Avatar */}
          <div className="absolute -top-14 left-1/2 -translate-x-1/2">
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt="Avatar"
                onClick={() => setPreviewImage(currentUser.avatar)}
                className="w-28 h-28 rounded-full object-cover border-4 
                           border-white shadow-lg cursor-pointer"
              />
            ) : (
              <div
                className="w-28 h-28 rounded-full flex items-center justify-center
                           bg-gradient-to-br from-blue-600 to-purple-600
                           text-white text-4xl font-bold shadow-lg border-4 border-white"
              >
                {firstLetter}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pt-20 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              {currentUser.fullName}
            </h2>
            <p className="text-gray-500 mt-1">{currentUser.email}</p>

            {/* Actions */}
            <div className="mt-6">
              <button
                onClick={() => navigate("/edit-profile")}
                className="px-8 py-3 rounded-xl text-white font-medium
                           bg-gradient-to-r from-blue-600 to-purple-600
                           hover:from-blue-700 hover:to-purple-700
                           transition-all shadow-lg hover:shadow-xl"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="h-15"></div>
        <div className="pb-16 flex justify-center">
        <button
          onClick={() => navigate("/")}
          className="group flex items-center gap-2 text-gray-500 font-semibold hover:text-gray-900 transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Return to Dashboard
        </button>
      </div>
      </div>

      {/* 🔍 Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-4xl w-full px-4">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full max-h-[85vh] object-contain rounded-xl"
            />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 text-white text-3xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
