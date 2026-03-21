import { useState } from "react"

function ChatBox() {

  const [message, setMessage] = useState("")
  const [response, setResponse] = useState("")

  const handleSend = () => {

    if (!message) return

    setResponse("AI response will appear here...")

  }

  return (

    <div className="flex flex-col gap-4">

      <textarea
        className="border p-3 rounded-lg w-full"
        rows="3"
        placeholder="Ask AI anything..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={handleSend}
        className="bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
      >
        Send Message
      </button>

      {response && (

        <div className="bg-gray-100 p-4 rounded-lg">

          <p className="font-semibold mb-2">
            AI Response
          </p>

          <p>{response}</p>

        </div>

      )}

    </div>

  )
}

export default ChatBox