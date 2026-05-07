import React, { useState } from "react";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);

  const handleSummarize = async () => {
    if (!text.trim()) {
      alert("Please enter some text first!");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/summarize-text",
        {
          text: text,
        }
      );

      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handlePdfSummarize = async () => {
    if (!pdfFile) {
      alert("Please upload a PDF first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", pdfFile);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/summarize-pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSummary(response.data.summary);
    } catch (error) {
      console.error(error);
      alert("Error uploading PDF!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "15px",
          width: "80%",
          maxWidth: "700px",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#243b55",
          }}
        >
          AI Text & PDF Summarizer
        </h1>

        <textarea
          rows="10"
          placeholder="Enter your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "20px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <button
          onClick={handleSummarize}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "15px",
            backgroundColor: "#243b55",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          {loading ? "Summarizing..." : "Summarize Text"}
        </button>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setPdfFile(e.target.files[0])}
          style={{
            marginTop: "20px",
          }}
        />

        <button
          onClick={handlePdfSummarize}
          style={{
            marginTop: "20px",
            width: "100%",
            padding: "15px",
            backgroundColor: "#141e30",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Upload & Summarize PDF
        </button>

        {summary && (
          <div
            style={{
              marginTop: "30px",
              backgroundColor: "#f4f4f4",
              padding: "20px",
              borderRadius: "10px",
            }}
          >
            <h2>Summary</h2>

            <p>{summary}</p>

            <button
              onClick={() => {
                navigator.clipboard.writeText(summary);
                alert("Summary copied!");
              }}
              style={{
                marginTop: "15px",
                padding: "10px 20px",
                backgroundColor: "#243b55",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Copy Summary
            </button>

            <button
              onClick={() => {
                setText("");
                setSummary("");
                setPdfFile(null);
              }}
              style={{
                marginTop: "15px",
                marginLeft: "10px",
                padding: "10px 20px",
                backgroundColor: "#800000",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;