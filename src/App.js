import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import FirstTask from "./components/FirstTask/FirstTask";
import SecondTask from "./components/SecondTask/SecondTask";
import MainPage from "./components/MainPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="first_task" element={<FirstTask />} />
        <Route path="second_task" element={<SecondTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
