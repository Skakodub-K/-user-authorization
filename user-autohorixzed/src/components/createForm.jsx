import { useState, useEffect } from "react";

export default function CreateForm() {
  const [privateKey, setPrivateKey] = useState("");
  // Открытый ключ
  const [openKey, setOpenKey] = useState("");
  // Подпись
  const [signature, setSignature] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generateKeysHandler =async () => {
    const res = await fetch('http://localhost:5000/createKeys');
            //.then(response => response.text())
            //.then(data => setOpenKey(data))
            //.catch(err => console.error(err));
            debugger;
            console.log('gosha-test');
            setPrivateKey('gosha');
            setOpenKey('gosha');
  }

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
      <div className="drop-zone">
        <span className="drop-zone__prompt">
          Drop file here or click to upload
        </span>
        <input type="file" name="myFile" className="drop-zone__input" />
      </div>
      <div className="text-container">
        <div id="pad">
          <center>Закрытый ключ</center>
          <textarea class="textarea" value = {privateKey}></textarea>
        </div>
        <div id="pad">
          <center>Открытый ключ</center>
          <textarea class="textarea" value = {openKey}></textarea>
        </div>
      </div>
      <div className="text-container">
        <button className="key-button" onClick={(e) => {
          generateKeysHandler();
        }}>
          Сгенерировать
        </button>
        <button className="key-button" onClick={(e) => {}}>
          Подписать
        </button>
      </div>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}
