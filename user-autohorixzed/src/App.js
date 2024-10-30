import "./App.css";
import { useState } from "react";
import WindowForm from "./components/window";
function App() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openCheck, setOpenCheck] = useState(false);

  return (
    <div className="App">
      <h1 className="app-header">Приложение для создания и проверки ЭЦП</h1>
      <div className="button-container">
        {!openCreate ? (<div
          className="count-particles"
          onClick={() => {
            setOpenCreate(true);
          }}
        >
          Создать
        </div>) : (<WindowForm mode={true} exit={setOpenCreate}/>)}
        {!openCheck ? (<div
          className="count-particles"
          onClick={() => {
            setOpenCheck(true);
          }}
        >
          Проверить
        </div>) : (<WindowForm mode={false} exit={setOpenCheck}/>)}
      </div>
    </div>
  );
}

export default App;
