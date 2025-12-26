import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const EditStory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { API, user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [story, setStory] = useState(null);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");

  const [newMedia, setNewMedia] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]);

  /* ---------- FETCH STORY ---------- */
  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await API.get(`/stories/${id}`);
        const data = res.data.data;

        if (data.owner !== user._id && data.owner?._id !== user._id) {
          navigate(`/stories/${id}`);
          return;
        }

        setStory(data);
        setTitle(data.title);
        setDate(data.date.split("T")[0]);
        setPlace(data.place);
        setDescription(data.description);
      } catch {
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchStory();
  }, [id, user._id, navigate]);

  /* ---------- MEDIA HANDLERS ---------- */
  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setNewMedia((prev) => [...prev, ...files]);
    setMediaPreviews((prev) => [
      ...prev,
      ...files.map((f) => ({ url: URL.createObjectURL(f) })),
    ]);
  };

  const removeNewMedia = (index) => {
    setNewMedia((prev) => prev.filter((_, i) => i !== index));
    setMediaPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------- SUBMIT ---------- */
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
    newMedia.forEach((file) => formData.append("media", file));

    setSaving(true);
    try {
      await API.patch(`/stories/${id}`, formData);
      navigate(`/stories/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update story");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <Navbar />
        <p className="text-center mt-20 text-gray-500">Loading story...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      

      <div className="max-w-3xl mx-auto px-6 py-14">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Edit Story ✨
          </h1>
          <p className="mt-3 text-gray-500">
            Refine your memory and make it even better
          </p>
        </div>

        {/* Form */}
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
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Date & Place */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="mt-1 w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Place</label>
              <input
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className="mt-1 w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          {/* Extra Text */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Add New Text (optional)
            </label>
            <textarea
              rows="2"
              placeholder="Add an extra memory..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-1 w-full px-4 py-3 rounded-xl border focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          {/* Existing Media */}
          {story.media?.length > 0 && (
            <div>
              <p className="font-semibold text-gray-800 mb-3">Existing Media</p>

              <div className="grid grid-cols-2 gap-4">
                {story.media.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl overflow-hidden shadow bg-white"
                  >
                    {item.type === "image" && (
                      <img
                        src={item.url}
                        className="h-32 w-full object-cover"
                      />
                    )}
                    {item.type === "text" && (
                      <p className="p-4 text-gray-700 italic">{item.content}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add Images */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Add Images
            </label>

            <label className="flex items-center justify-center w-full border-2 border-dashed rounded-xl p-6 cursor-pointer hover:border-blue-500 transition">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleMediaChange}
                className="hidden"
              />
              <span className="text-gray-500">
                Click to upload or drag & drop images
              </span>
            </label>
          </div>

          {mediaPreviews.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {mediaPreviews.map((item, i) => (
                <div
                  key={i}
                  className="relative group rounded-xl overflow-hidden shadow"
                >
                  <img
                    src={item.url}
                    className="h-24 w-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => removeNewMedia(i)}
                    className="absolute top-1 right-1 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={saving}
            className="w-full py-3 rounded-xl text-white font-medium
                       bg-gradient-to-r from-blue-600 to-purple-600
                       hover:from-blue-700 hover:to-purple-700
                       transition-all shadow-lg hover:shadow-xl
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditStory;
