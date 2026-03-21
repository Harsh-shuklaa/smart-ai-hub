import { Link } from "react-router-dom"

function Home() {
  return (

    <div className="p-10">

      <h1 className="text-3xl font-bold mb-8">
        SmartAI Hub Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <Link to="/chat" className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">

          <h2 className="text-xl font-bold mb-2">
            🤖 AI Chat
          </h2>

          <p className="text-gray-500">
            Chat with AI and get instant answers.
          </p>

        </Link>

        <Link to="/image" className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">

          <h2 className="text-xl font-bold mb-2">
            🎨 Image Generator
          </h2>

          <p className="text-gray-500">
            Generate AI images from text prompts.
          </p>

        </Link>

        <Link to="/resume" className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">

          <h2 className="text-xl font-bold mb-2">
            📄 Resume Analyzer
          </h2>

          <p className="text-gray-500">
            Upload resume and get AI feedback.
          </p>

        </Link>

        <Link to="/notes" className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition">

          <h2 className="text-xl font-bold mb-2">
            📝 Notes Summarizer
          </h2>

          <p className="text-gray-500">
            Convert long notes into summaries.
          </p>

        </Link>

      </div>

    </div>

  )
}

export default Home