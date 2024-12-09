import "./App.css";
import { useState } from "react";
import FirstTask from "./components/FirstTask";
import SecondTask from "./components/SecondTask";
function App() {
  const [fsOpen, setFsOpen] = useState("0");
  return (
    <div className="App">
      {fsOpen === "0" ? (
        <>
          <div
            className="count-particles"
            onClick={() => {
              setFsOpen("1");
            }}
          >
            First
          </div>
          <div
            className="count-particles"
            onClick={() => {
              setFsOpen("2");
            }}
          >
            Second
          </div>
        </>
      ) : fsOpen === "1" ? (
        <FirstTask />
      ) : (
        <SecondTask />
      )}
    </div>
  );
}

export default App;
