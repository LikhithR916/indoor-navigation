
import { useState } from "react";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [detections, setDetections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function detectObjects() {
    if (!file) {
      setError("Please select an indoor image first.");
      return;
    }

    setLoading(true);
    setError("");
    setDetections([]);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "http://localhost:8000/api/detect",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Detection failed.");
      }

      setDetections(data.detections || []);
    } catch (err) {
      setError(err.message || "Could not connect to the backend.");
    } finally {
      setLoading(false);
    }
  }

  function handleImage(event) {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    setDetections([]);
    setError("");
  }

  return (
    <main className="container">
      <h1>Indoor Navigation</h1>
      <p>Computer Vision-Based Indoor Navigation</p>

      <section className="panel">
        <h2>Upload an Indoor Image</h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
        />

        {preview && (
          <img
            src={preview}
            alt="Indoor scene"
            className="preview"
          />
        )}

        <button onClick={detectObjects} disabled={!file || loading}>
          {loading ? "Detecting..." : "Detect Objects"}
        </button>
      </section>

      {error && <p className="error">{error}</p>}

      <section className="panel">
        <h2>Detection Results</h2>

        {detections.length === 0 && !loading && (
          <p>Upload an image to begin detection.</p>
        )}

        {detections.map((item, index) => (
          <div className="result" key={index}>
            <strong>{item.label}</strong>
            <span>
              {(item.confidence * 100).toFixed(1)}% confidence
            </span>
          </div>
        ))}
      </section>
    </main>
  );
}

export default App;
