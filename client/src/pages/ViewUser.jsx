import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserProfile = () => {
  const { userId, storyId } = useParams();
  const { API } = useAuth();
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔍 image preview modal state
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await API.get(`/users/c/${userId}`);
        setUserProfile(res.data.data);
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, [userId, API]);

  if (loading)
    return (
      <div className="min-h-screen grid place-items-center text-gray-500">
        Loading profile...
      </div>
    );

  if (!userProfile)
    return (
      <div className="min-h-screen grid place-items-center text-gray-500">
        User not found
      </div>
    );

  /* 📅 Member since (dd Mon yyyy) */
  const memberSince = new Date(userProfile.createdAt).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

  const firstLetter = userProfile.fullName?.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="h-.7" />

      {/* Cover Image */}
      <div
        className="h-64 md:h-80 w-full relative overflow-hidden cursor-pointer"
        onClick={() =>
          userProfile.coverImage && setPreviewImage(userProfile.coverImage)
        }
      >
        <img
          src={
            userProfile.coverImage ||
            "https://images.unsplash.com/photo-1557683311-eac922347aa1"
          }
          alt="cover"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />
      </div>

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto px-6">
        <div
          className="relative -mt-24 bg-white/80 backdrop-blur-xl 
                     rounded-3xl shadow-2xl p-10 border border-white/60"
        >
          <div className="flex flex-col items-center text-center">
            {/* Avatar */}
            {userProfile.avatar ? (
              <img
                src={userProfile.avatar}
                alt={userProfile.fullName}
                onClick={() => setPreviewImage(userProfile.avatar)}
                className="w-40 h-40 rounded-full border-8 border-white 
                           shadow-xl object-cover cursor-pointer"
              />
            ) : (
              <div
                className="w-40 h-40 rounded-full flex items-center justify-center
                           bg-gradient-to-br from-blue-600 to-purple-600
                           text-white text-5xl font-bold
                           border-8 border-white shadow-xl"
              >
                {firstLetter}
              </div>
            )}

            {/* Info */}
            <div className="mt-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {userProfile.fullName}
              </h1>

              {/* Info Row */}
              <div className="mt-8 flex flex-wrap justify-center gap-6">
                <div className="bg-slate-100/80 px-6 py-4 rounded-2xl">
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                    Email
                  </p>
                  <p className="text-gray-700 font-medium">
                    {userProfile.email}
                  </p>
                </div>

                <div className="bg-slate-100/80 px-6 py-4 rounded-2xl">
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                    Member Since
                  </p>
                  <p className="text-gray-700 font-medium">{memberSince}</p>
                </div>
              </div>

              <p className="mt-10 text-gray-600 max-w-md italic">
                “Sharing stories and experiences with the world.”
              </p>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="h-15"></div>
        <div className="pb-16 flex justify-center">
        <button
          onClick={() => navigate(-1)}
          className="group flex items-center gap-2 text-gray-500 font-semibold hover:text-gray-900 transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          Return
        </button>
      </div>
      </div>

      <div className="h-16" />

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

export default UserProfile;
