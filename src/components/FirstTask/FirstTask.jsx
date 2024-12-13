import { useState } from "react";
import WindowForm from "../window";

export default function FirstTask() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openCheck, setOpenCheck] = useState(false);

  return (
    <>
      <h1 className="app-header">Приложение для создания и проверки ЭЦП</h1>
      <div className="button-container">
        {!openCreate ? (
          <div
            className="count-particles"
            onClick={() => {
              setOpenCreate(true);
            }}
          >
            Создать
          </div>
        ) : (
          <WindowForm mode={1} exit={setOpenCreate} />
        )}
        {!openCheck ? (
          <div
            className="count-particles"
            onClick={() => {
              setOpenCheck(true);
            }}
          >
            Проверить
          </div>
        ) : (
          <WindowForm mode={2} exit={setOpenCheck} />
        )}
      </div>
    </>
  );
}
