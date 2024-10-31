import { useState } from "react";
import DragAndDrop from "./DragAndDrop";
export default function CreateForm() {
  const [privateKey, setPrivateKey] = useState("");
  // Открытый ключ
  const [openKey, setOpenKey] = useState("");
  // Подпись
  const [isSignature, setIsSignature] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="create-form_container">
      <center>
        <h1 className="app-header">Cоздать ЭЦП</h1>
      </center>
      <DragAndDrop />
      <div className="text-container">
        <div id="pad">
          <center>
            <b>Закрытый ключ</b>
          </center>
          <textarea className="textarea"></textarea>
        </div>
        <div id="pad">
          <center>
            <b>Открытый ключ</b>
          </center>
          <textarea className="textarea"></textarea>
        </div>
      </div>
      {isSignature && (
        <img className="create-icon" src="../../iconCrt.png" alt="done" />
      )}
      <div className="text-container">
        <button className="count-particles key-button" onClick={(e) => {}}>
          Сгенерировать
        </button>
        <button
          className="count-particles key-button"
          onClick={(e) => {
            setIsSignature(true);
          }}
        >
          Подписать
        </button>
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}
