import { useState, useEffect } from "react";
import hashFile from "../hash";
import DragAndDrop from "./DragAndDrop";

export default function CreateForm() {
  // Файл
  const [file, setFile] = useState(null);
  // Закрытый ключ
  const [privateKey, setPrivateKey] = useState("");
  // Открытый ключ
  const [openKey, setOpenKey] = useState("");
  // Подпись
  const [signature, setSignature] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Создание подписи
  const generateSignature = async (event) => {
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
      formData.append("privateKey", privateKey);
      formData.append("test", "test");
      const keys = formData.keys();
      const keyss = formData.getAll("test");

      const response = await fetch("http://localhost:5000/generateSignature", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("File uploaded successfully!");
        const dataJSON = await response.json();
        setSignature(dataJSON.res.join(" "));
        console.log(dataJSON);
      } else console.error("Upload failed:", response.statusText);
    } catch (error) {
      console.error("Error hashing the file:", error);
    }
  };

  const generateKeys = async () => {
    const response = await fetch("http://localhost:5000/createKeys");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const dataJSON = await response.json();
    // Преобразование JSON-строки в JavaScript-объект
    const keys = JSON.parse(dataJSON);

    setPrivateKey(keys.privateKey);
    setOpenKey(keys.openKey);
  };

  useEffect(() => {
    document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
      const dropZoneElement = inputElement.closest(".drop-zone");

      dropZoneElement.addEventListener("click", (e) => {
        inputElement.click();
      });

      inputElement.addEventListener("change", (e) => {
        if (inputElement.files.length) {
          updateThumbnail(dropZoneElement, inputElement.files[0]);
        }
      });

      dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
      });

      ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
          dropZoneElement.classList.remove("drop-zone--over");
        });
      });

      dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault();

        if (e.dataTransfer.files.length) {
          inputElement.files = e.dataTransfer.files;
          updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
        }

        dropZoneElement.classList.remove("drop-zone--over");
      });
    });

    /**
     * Updates the thumbnail on a drop zone element.
     *
     * @param {HTMLElement} dropZoneElement
     * @param {File} file
     */
    function updateThumbnail(dropZoneElement, file) {
      let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

      // First time - remove the prompt
      if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
      }

      // First time - there is no thumbnail element, so lets create it
      if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumbnailElement);
      }

      thumbnailElement.dataset.label = file.name;

      // Show thumbnail for image files
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
          thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        };
      } else {
        thumbnailElement.style.backgroundImage = null;
      }
    }
  });
  return (
    <div className="create-form_container">
      <h1 className="app-header">Cоздать ЭЦП</h1>
      <DragAndDrop uploadFile={setFile} />
      <div className="text-container">
        <div id="pad">
          <center>Закрытый ключ</center>
          <textarea
            className="textarea"
            value={privateKey}
            onChange={(event) => setPrivateKey(event.target.value)}
          ></textarea>
        </div>
          {signature ? (
            <div className="result-view">
              <img className="create-icon" src="./iconCrt.png" alt="icon"></img>
              <span className="signature">{signature}</span>
            </div>
          ):(<></>)
          }
        <div id="pad">
          <center>Открытый ключ</center>
          <textarea
            className="textarea"
            value={openKey}
            onChange={(event) => setOpenKey(event.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="text-container">
        <button
          className="count-particles key-button"
          onClick={(e) => {
            generateKeys();
          }}
        >
          Сгенерировать
        </button>
        <button
          className="count-particles key-button"
          onClick={(e) => {
            generateSignature();
          }}
        >
          Подписать
        </button>
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}
