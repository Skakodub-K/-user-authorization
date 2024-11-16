import { useState } from "react";
import DragAndDrop from "./DragAndDrop";
import hashFile from "../hash";

export default function CheckForm() {
  // Файл
  const [file, setFile] = useState(null);
  // Подпись
  const [signature, setSignature] = useState("");
  // Открытый ключ
  const [openKey, setOpenKey] = useState("");

  const handleCheckSign = async () => {
    if (!file) {
      console.warn("No file selected.");
      return;
    }
    try {
      const hash = await hashFile(file);
      console.log("File hash:", hash);

      // Отправляем хеш и ключи на сервер с использованием fetch API
      const formData = new FormData();
      formData.append("hash", hash);
      formData.append("openKey", openKey);
      formData.append("signature", signature);

      const response = await fetch("http://localhost:5000/checkSignature", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully!");
        const dataJSON = await response.json();
        console.log(dataJSON);
      } else console.error("Upload failed:", response.statusText);
    } catch (error) {
      console.error("Error hashing the file:", error);
    }
  };

  return (
    <div className="check-form_container">
      <center>
        <h1 className="app-header">Проверить ЭЦП</h1>
      </center>
      <DragAndDrop uploadFile={setFile} />
      <div id="pad" className="check-pad">
        <center>Открытый ключ</center>
        <textarea
          className="textarea"
          value={openKey}
          onChange={(event) => setOpenKey(event.target.value)}
        ></textarea>
      </div>
      <div id="pad" className="sign-pad">
        <center>Подпись</center>
        <textarea
          className="textarea"
          value={signature}
          onChange={(event) => setSignature(event.target.value)}
        ></textarea>
      </div>
      <button
        className="count-particles check-button"
        onClick={(e) => {
          handleCheckSign();
        }}
      >
        Проверить
      </button>
    </div>
  );
}
