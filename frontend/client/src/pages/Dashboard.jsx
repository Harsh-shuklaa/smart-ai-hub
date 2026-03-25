import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Dashboard() {
  const stats = [
    { title: "Credits", value: 20 },
    { title: "Chats", value: 12 },
    { title: "Notes", value: 5 },
    { title: "Resumes", value: 3 },
  ];

  const features = [
    { name: "AI Chat", path: "/chat" },
    { name: "Image Generator", path: "/image" },
    { name: "Resume Analyzer", path: "/resume" },
    { name: "Notes Summarizer", path: "/notes" },
  ];

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gradient-to-br from-purple-900 via-black to-blue-900 text-white">

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl md:text-3xl font-bold mb-6"
      >
        🚀 Welcome to SmartAI Hub
      </motion.h1>

      {/* 🔥 Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-lg hover:scale-105 transition"
          >
            <h2 className="text-gray-300 text-sm">{item.title}</h2>
            <p className="text-xl font-bold">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* ⚡ Quick Actions */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {features.map((f, index) => (
            <Link
              key={index}
              to={f.path}
              className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-xl text-center hover:scale-105 transition shadow-md"
            >
              <h2 className="font-semibold">{f.name}</h2>
            </Link>
          ))}
        </div>
      </div>

      {/* 🕒 Recent Activity */}
      <div className="bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-lg">
        <h2 className="text-lg font-semibold mb-3">Recent Activity</h2>

        <div className="space-y-2 text-gray-300 text-sm">
          <p>🧠 Chat generated</p>
          <p>📄 Resume analyzed</p>
          <p>📝 Notes summarized</p>
        </div>
      </div>

    </div>
  );
}