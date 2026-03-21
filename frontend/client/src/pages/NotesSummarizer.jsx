function NotesSummarizer() {
  return (
    <div className="flex justify-center mt-10">

      <div className="w-150 bg-white p-6 rounded shadow">

        <h2 className="text-2xl font-bold mb-4">
          Notes Summarizer
        </h2>

        <textarea
          className="w-full border p-3 rounded"
          rows="6"
          placeholder="Paste your notes here..."
        />

      </div>

    </div>
  )
}

export default NotesSummarizer