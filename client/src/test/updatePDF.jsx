import { useState } from "react";

const API_ROUTES = import.meta.env.VITE_URL;

export default function UploadPDF() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a PDF file");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", file);
    formData.append("candidate_id", "20e7b1c5-ae36-4026-b103-d8b02a9a9331");
    formData.append("file_name", "resumes");

    console.log(formData.get("pdf"));

    try {
      const res = await fetch(`${API_ROUTES}/api/candidates/upload/pdf`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      console.log(data);

      setMessage(data.message || "Upload successful");
    } catch (error) {
      console.error(error);
      setMessage("Upload failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-[350px]">
        <h2 className="text-2xl font-bold mb-4 text-center">Upload PDF</h2>

        {/* File Input */}
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-300 
                     file:mr-4 file:py-2 file:px-4 
                     file:rounded-lg file:border-0 
                     file:text-sm file:font-semibold 
                     file:bg-purple-600 file:text-white 
                     hover:file:bg-purple-700 cursor-pointer"
        />

        {/* File Name */}
        {file && (
          <p className="mt-3 text-sm text-gray-300">Selected: {file.name}</p>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="mt-5 w-full bg-purple-600 hover:bg-purple-700 transition-all duration-300 py-2 rounded-lg font-semibold"
        >
          Upload
        </button>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-sm text-green-400">{message}</p>
        )}
      </div>
    </div>
  );
}
