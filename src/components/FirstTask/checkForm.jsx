import { useState } from "react";
import DragAndDrop from "./DragAndDrop";
import hashFile from "../../hash";

export default function CheckForm() {
  // Файл
  const [file, setFile] = useState(null);
  const [fileWarning, setFileWarning] = useState(false);
  // Подпись
  const [signature, setSignature] = useState("");
  // Открытый ключ
  const [openKey, setOpenKey] = useState(null);
  // Проверка успешна или нет
  const [isCheck, setIsCheck] = useState(null);

  const handleCheckSign = async () => {
    if (!file) {
      setFileWarning(true);
      return;
    }
    // Обнуляем предыдущие предупреждения
    setFileWarning(false);
    try {
      const hash = await hashFile(file);
      console.log("File hash:", hash);

      // Отправляем хеш и ключи на сервер с использованием fetch API
      const formData = new FormData();
      formData.append("hash", hash);
      formData.append("openKey", JSON.stringify(openKey));
      formData.append("signature", signature);

      const response = await fetch("http://localhost:5000/checkSignature", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const dataJSON = await response.json();
        setIsCheck(dataJSON.res);
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error hashing the file:", error);
    }
  };

  const renderFeedback = () => {
    if (fileWarning) {
      return (
        <div>
          <div className="feedback error">🔴 Прикрепите, пожалуйста, файл.</div>
          <button className="ok-button" onClick={() => setFileWarning(false)}>OK</button>
        </div>
      );
    }

    if (isCheck !== null) {
      return (
        <div className={`feedback ${isCheck ? "success" : "error"}`}>
          {isCheck ? "✅ Подпись действительна!" : "❌ Подпись недействительна!"}
        </div>
      );
    }

    return null;
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
          onChange={(event) => {
            const words = event.target.value.split('\n');
            console.log(words[0], words[1], words[2]);
            setOpenKey({
              openKey: words[0],
              base: words[1],
              mod: words[2]
            })
          }}
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
      {renderFeedback()}
      <button
        className="count-particles check-button"
        onClick={handleCheckSign}
      >
        Проверить
      </button>
    </div>
  );
}
