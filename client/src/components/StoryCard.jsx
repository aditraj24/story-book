import { useNavigate } from "react-router-dom";
import { useState } from "react";

const StoryCard = ({ story }) => {
  const navigate = useNavigate();
  const [avatarError, setAvatarError] = useState(false);

  const author = story.owner;
  const storyDate = new Date(story.date);
  const formattedDate = storyDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Get first letter of author's name
  const getInitial = (name) => {
    if (!name || typeof name !== "string") return "U";
    const trimmedName = name.trim();
    if (trimmedName.length === 0) return "U";
    return trimmedName.charAt(0).toUpperCase();
  };

  // Generate a consistent color based on the author's name
  const getAvatarColor = (name) => {
    if (!name || typeof name !== "string") {
      return "bg-gradient-to-br from-gray-500 to-gray-600";
    }

    const colors = [
      "bg-gradient-to-br from-blue-500 to-blue-600", // Blue
      "bg-gradient-to-br from-purple-500 to-purple-600", // Purple
      "bg-gradient-to-br from-emerald-500 to-emerald-600", // Emerald
      "bg-gradient-to-br from-rose-500 to-rose-600", // Rose
      "bg-gradient-to-br from-amber-500 to-amber-600", // Amber
      "bg-gradient-to-br from-indigo-500 to-indigo-600", // Indigo
      "bg-gradient-to-br from-pink-500 to-pink-600", // Pink
      "bg-gradient-to-br from-cyan-500 to-cyan-600", // Cyan
    ];

    const charCode = name.trim().charCodeAt(0) || 0;
    const index = charCode % colors.length;
    return colors[index];
  };

  const showAvatar = author?.avatar && !avatarError;
  const avatarColor = getAvatarColor(author?.fullName);
  const initial = getInitial(author?.fullName);

  return (
    <div
      onClick={() => navigate(`/stories/${story._id}`)}
      className="group cursor-pointer h-full flex flex-col"
    >
      {/* Card Container */}
      <div
        className="relative h-full flex flex-col bg-gradient-to-br from-white/95 via-white/90 to-slate-50/95 
                    rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 
                    overflow-hidden border border-white/40 hover:border-blue-200/50
                    transform group-hover:-translate-y-1 group-hover:scale-[1.02]"
      >
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        ></div>

        {/* Shine Effect */}
        <div
          className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-blue-100/30 via-transparent to-transparent 
                      rounded-full blur-xl opacity-0 group-hover:opacity-100 
                      transition-opacity duration-700 group-hover:animate-pulse"
        ></div>

        {/* Content Container */}
        <div className="relative flex-1 p-6 flex flex-col">
          {/* Date Badge */}
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 
                        border border-blue-100/50 self-start mb-4"
          >
            <svg
              className="w-3.5 h-3.5 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs font-medium text-blue-700">
              {formattedDate}
            </span>
          </div>

          {/* Story Title */}
          <h3
            className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 
                       transition-colors duration-300"
          >
            {story.title}
          </h3>

          {/* Story Place/Location */}
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <svg
              className="w-4 h-4 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm font-medium line-clamp-1">
              {story.place}
            </span>
          </div>

          {/* Story Description (if available) - Changed to 1 line */}
          {story.description && (
            <p className="text-gray-500 text-sm leading-relaxed line-clamp-1 mb-6">
              {story.description}
            </p>
          )}

          {/* Divider */}
          <div className="mt-auto pt-4 border-t border-gray-100/50">
            {/* Author Info */}
            {author && (
              <div className="flex items-center gap-3 group-hover:gap-4 transition-all duration-300">
                {/* Avatar Container */}
                <div className="relative">
                  {/* Avatar Glow */}
                  <div
                    className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-purple-400 
                                rounded-full blur opacity-0 group-hover:opacity-30 
                                transition-opacity duration-500"
                  ></div>

                  {/* Avatar or Initial Circle */}
                  <div
                    className={`relative w-10 h-10 rounded-full overflow-hidden border-2 border-white 
                                shadow-md group-hover:border-blue-200 transition-all duration-300
                                ${showAvatar ? "" : avatarColor}`}
                  >
                    {showAvatar ? (
                      <img
                        src={author.avatar}
                        alt={author.fullName}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={() => setAvatarError(true)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {initial}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Author Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {author.fullName || "Anonymous"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {author.username ? `@${author.username}` : "Storyteller"}
                  </p>
                </div>

                {/* Arrow Indicator */}
                <div className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hover Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        ></div>
      </div>
    </div>
  );
};

export default StoryCard;
