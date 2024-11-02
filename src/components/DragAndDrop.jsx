import { useEffect } from "react";
export default function DragAndDrop() {
  useEffect(() => {
    document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
      const dropZoneElement = inputElement.closest(".drop-zone");

      dropZoneElement.addEventListener("click", (e) => {
        // Если щелчок не на элементе thumbnail
        if (!dropZoneElement.classList.contains("drop-zone--over")) {
          inputElement.click(); // Открываем файловый менеджер
        }
      });

      inputElement.addEventListener("change", (e) => {
        if (inputElement.files.length) {
          updateThumbnail(dropZoneElement, inputElement.files[0]);
          inputElement.blur(); // Закрываем файловый менеджер
        }
      });

      dropZoneElement.addEventListener("dragover", (e) => {
        e.preventDefault(); // Предотвращаем действие по умолчанию
        dropZoneElement.classList.add("drop-zone--over"); // Подсветка зоны
      });

      ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
          dropZoneElement.classList.remove("drop-zone--over"); // Убираем подсветку
        });
      });

      dropZoneElement.addEventListener("drop", (e) => {
        e.preventDefault(); // Предотвращаем действие по умолчанию

        if (e.dataTransfer.files.length) {
          inputElement.files = e.dataTransfer.files; // Установка файлов
          updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
          inputElement.blur(); // Закрываем файловый менеджер
        }

        dropZoneElement.classList.remove("drop-zone--over"); // Убираем подсветку
      });
    });

    function updateThumbnail(dropZoneElement, file) {
      let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");

      // Убираем подсказку с первого раза
      if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
      }

      // Создаем элемент миниатюры при первом добавлении файла
      if (!thumbnailElement) {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");
        dropZoneElement.appendChild(thumbnailElement);
      }

      thumbnailElement.dataset.label = file.name;

      // Отображаем миниатюру для изображений
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = () => {
          thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
        };
      } else {
        thumbnailElement.style.backgroundImage = null; // Если файл не изображение
      }
    }
  }, []);
  return (
    <div className="drop-zone">
      <span className="drop-zone__prompt">
        Drop file here or click to upload
      </span>
      <input type="file" name="myFile" className="drop-zone__input" />
    </div>
  );
}
