import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const MAX_PHOTOS = 10;

const CreateStory = () => {
  const { API } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");

  const [photos, setPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------- Cleanup previews ---------- */
  useEffect(() => {
    return () => {
      photoPreviews.forEach(URL.revokeObjectURL);
    };
  }, [photoPreviews]);

  /* ---------- Photo Handlers ---------- */
  const handlePhotosChange = (e) => {
    const files = Array.from(e.target.files).slice(
      0,
      MAX_PHOTOS - photos.length
    );

    setPhotos((prev) => [...prev, ...files]);
    setPhotoPreviews((prev) => [
      ...prev,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------- Submit ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!title || !date || !place || !description) {
      setError("All required fields must be filled");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("date", date);
    formData.append("place", place);
    formData.append("description", description);
    if (text) formData.append("text", text);
    photos.forEach((photo) => formData.append("media", photo));

    setLoading(true);

    try {
      await API.post("/stories", formData);
      navigate("/my-story");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create story");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-3xl mx-auto px-6 py-14">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create New Story ✨
          </h1>
          <p className="mt-3 text-gray-500">
            Share a moment that matters. Your story will live forever.
          </p>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/50 space-y-6"
        >
          {error && (
            <p className="text-red-600 text-sm text-center bg-red-50 py-2 rounded-lg">
              {error}
            </p>
          )}

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Story Title *
            </label>
            <input
              type="text"
              placeholder="A moment to remember"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Date & Place */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Date *
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Place *
              </label>
              <input
                type="text"
                placeholder="Where did it happen?"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className="mt-1 w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              rows="4"
              placeholder="Describe the story..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          {/* Extra Text */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Extra Memory (optional)
            </label>
            <textarea
              rows="2"
              placeholder="Any extra feelings or thoughts?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          {/* Photos */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Photos (up to {MAX_PHOTOS})
            </label>

            <div className="flex items-center justify-center w-full">
              <label className="w-full cursor-pointer border-2 border-dashed rounded-xl p-6 text-center hover:border-blue-500 transition">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handlePhotosChange}
                  className="hidden"
                />
                <p className="text-gray-500">
                  Click to upload or drag & drop photos
                </p>
              </label>
            </div>

            {photoPreviews.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
                {photoPreviews.map((src, idx) => (
                  <div
                    key={idx}
                    className="relative group rounded-xl overflow-hidden shadow"
                  >
                    <img
                      src={src}
                      className="h-24 w-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(idx)}
                      className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-medium
                       bg-gradient-to-r from-blue-600 to-purple-600
                       hover:from-blue-700 hover:to-purple-700
                       transition-all shadow-lg hover:shadow-xl
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Story..." : "Create Story"}
          </button>
        </form>
      </div>
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
      <div className="h-15"></div>
    </div>
  );
};

export default CreateStory;
