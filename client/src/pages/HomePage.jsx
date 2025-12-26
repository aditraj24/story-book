import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import StoryCard from "../components/StoryCard";

const HomePage = () => {
  const { API } = useAuth();
  const navigate = useNavigate();

  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await API.get("/stories");
        setStories(res.data?.data?.stories || []);
      } catch (err) {
        console.error("Failed to fetch stories");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const fadeInUp = {
    initial: { y: 40, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerContainer = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-24 -right-24 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/4 w-48 h-48 bg-emerald-300/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-rose-300/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.12, 0.05],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent"></div>
      </div>
      {/* ================= HERO ================= */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-6">
                <motion.span
                  className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent"
                  initial={{ backgroundPosition: "0% 50%" }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Stories
                </motion.span>
                <motion.span
                  className="ml-4 inline-block"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  ✨
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              className="mt-4 text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              A place where memories live forever. Read, feel, and share moments
              that matter. Each story is a journey worth sharing.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.button
                onClick={() => navigate("/create-stories")}
                className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
                         text-white font-medium shadow-lg overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  y: -4,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-sm group-hover:blur-md transition-all duration-500"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ scale: 1.2, y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </motion.svg>
                  Create Story
                </span>
              </motion.button>

              <motion.button
                onClick={() =>
                  document
                    .getElementById("stories-grid")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="group px-8 py-3.5 rounded-xl bg-white/80 backdrop-blur-sm text-gray-700 
                         font-medium shadow-lg border border-gray-200"
                whileHover={{
                  scale: 1.05,
                  y: -4,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <motion.svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ y: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    ></path>
                  </motion.svg>
                  Explore Stories
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating particles */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 10 - 5, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </section>
      {/* ================= CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-6 pb-24 relative" id="stories-grid">
        <AnimatePresence mode="wait">
          {loading ? (
            /* ---------- Loading State ---------- */
            <motion.div
              key="loading"
              className="flex flex-col items-center justify-center py-32"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="relative">
                <div className="w-24 h-24 border-4 border-gray-200 rounded-full"></div>
                <motion.div
                  className="absolute top-0 left-0 w-24 h-24 border-4 border-blue-600 rounded-full border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute top-4 left-4 w-16 h-16 border-4 border-purple-600 rounded-full border-b-transparent"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </div>
              <motion.p
                className="mt-6 text-gray-500 font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Loading your stories...
              </motion.p>
            </motion.div>
          ) : stories.length === 0 ? (
            /* ---------- Empty State ---------- */
            <motion.div
              key="empty"
              className="flex flex-col items-center justify-center mt-20 text-center"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <motion.div
                className="p-10 rounded-3xl bg-white/90 backdrop-blur-xl shadow-2xl border border-white/50"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <motion.div
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 
                            rounded-full flex items-center justify-center"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <svg
                    className="w-12 h-12 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </motion.div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  No stories yet 📭
                </h2>
                <p className="text-gray-500 mb-8 max-w-md text-lg leading-relaxed">
                  Every great journey starts with a single story. Be the first
                  to share yours and inspire others.
                </p>

                <motion.button
                  onClick={() => navigate("/create-stories")}
                  className="group relative px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-600 
                           text-white font-medium shadow-lg overflow-hidden"
                  whileHover={{
                    scale: 1.05,
                    y: -4,
                    transition: { type: "spring", stiffness: 400, damping: 25 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <motion.svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      whileHover={{ scale: 1.2, y: -2 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 4v16m8-8H4"
                      ></path>
                    </motion.svg>
                    Write Your First Story
                  </span>
                </motion.button>
              </motion.div>
            </motion.div>
          ) : (
            /* ---------- Stories Grid ---------- */
            <motion.div
              key="stories"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {stories.map((story, index) => (
                <motion.div
                  key={story._id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  whileHover={{
                    y: -8,
                    transition: { type: "spring", stiffness: 300, damping: 20 },
                  }}
                >
                  <div
                    className="group relative bg-white/90 backdrop-blur-xl rounded-2xl 
                              shadow-lg border border-white/40 overflow-hidden"
                  >
                    {/* Gradient border effect */}
                    <motion.div
                      className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 
                                  rounded-2xl opacity-0 blur-sm"
                      whileHover={{ opacity: 0.2, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className="relative">
                      <StoryCard story={story} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      {/* ================= FOOTER ================= */}{" "}
      <motion.footer
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="border-t bg-white"
      >
        {" "}
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-4">
          {" "}
          <div className="flex flex-row gap-1">
            {" "}
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              {" "}
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />{" "}
              </svg>{" "}
            </div>{" "}
            <span className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {" "}
              StoryBook{" "}
            </span>{" "}
          </div>{" "}
          <p className="text-sm text-gray-500">
            {" "}
            © {new Date().getFullYear()} StoryBook. All rights reserved.{" "}
          </p>{" "}
          <div className="flex gap-6 text-sm text-gray-600">
            {" "}
            <span className="hover:text-gray-900 cursor-pointer">
              About
            </span>{" "}
            <span className="hover:text-gray-900 cursor-pointer">Privacy</span>{" "}
            <span className="hover:text-gray-900 cursor-pointer">Contact</span>{" "}
          </div>{" "}
        </div>{" "}
      </motion.footer>{" "}
    </div>
  );
};

export default HomePage;
