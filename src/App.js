import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  return (
    <div
      style={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      <label>
        Ethereum address
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Address..."
        />
      </label>
    </div>
  );
}

export default App;
