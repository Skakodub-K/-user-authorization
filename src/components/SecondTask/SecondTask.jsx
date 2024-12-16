import { useState } from "react";
import WindowForm from "../window";

export default function SecondTask() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openCheck, setOpenCheck] = useState(false);

  return (
    <>
      <h1 className="app-header">Приложение для Аутентификации</h1>
      <div className="button-container">
        {!openCreate ? (
          <div
            className="count-particles"
            onClick={() => {
              setOpenCreate(true);
            }}
          >
            Sign up
          </div>
        ) : (
          <WindowForm mode={3} exit={setOpenCreate} />
        )}
        {!openCheck ? (
          <div
            className="count-particles"
            onClick={() => {
              setOpenCheck(true);
            }}
          >
            Log in
          </div>
        ) : (
          <WindowForm mode={4} exit={setOpenCheck} />
        )}
      </div>
    </>
  );
}
