import { useState } from "react";

const LIMITS = {
  Twitter: 280,
  LinkedIn: 3000,
};

export default function App() {
  const [platform, setPlatform] = useState("Twitter");
  const [text, setText] = useState("");
  const [posted, setPosted] = useState(false);

  const limit = LIMITS[platform];
  const count = text.length;
  const exceeded = count > limit;
  const canPost = count > 0 && !exceeded;

  const handleChange = (e) => {
    setText(e.target.value);
    setPosted(false);
  };

  const handlePlatform = (e) => {
    setPlatform(e.target.value);
    setPosted(false);
  };

  const handlePost = () => {
    if (!canPost) return;
    setPosted(true);
    setText("");
  };

  return (
    <div className="container">
      <h1>Post Composer</h1>

      <label htmlFor="platform">Platform</label>
      <select id="platform" value={platform} onChange={handlePlatform}>
        <option value="Twitter">Twitter (280 chars)</option>
        <option value="LinkedIn">LinkedIn (3000 chars)</option>
      </select>

      <label htmlFor="post">Your post</label>
      <textarea
        id="post"
        rows={8}
        value={text}
        onChange={handleChange}
        placeholder={`Write your ${platform} post here...`}
        className={exceeded ? "invalid" : ""}
      />

      <div className="footer">
        <span className={exceeded ? "count error-text" : "count"}>
          {count} / {limit}
        </span>
        <button onClick={handlePost} disabled={!canPost}>
          Post
        </button>
      </div>

      {exceeded && (
        <p className="error-text">
          Character limit exceeded for {platform}. Remove {count - limit}{" "}
          character{count - limit === 1 ? "" : "s"}.
        </p>
      )}

      {posted && <p className="success-text">Post submitted successfully!</p>}
    </div>
  );
}
