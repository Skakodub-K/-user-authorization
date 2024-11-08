import CryptoJS from 'crypto-js';

export default async function hashFile(file) {
    return new Promise((resolve, reject) => {
      // Создаем reader
      const reader = new FileReader();
      
      // Обрабатываем завершение чтения всего файла
      reader.onload = (e) => {
        // Получаем ArrayBuffer
        const arrayBuffer = e.target.result;
        // Преобразуем в массив байтов
        const bytes = new Uint8Array(arrayBuffer);
        // Создаем WordArray из массива байтов
        const wordArray = CryptoJS.lib.WordArray.create(bytes);
        // Вычисляем SHA-256 хеш
        const hash = CryptoJS.SHA256(wordArray).toString();
        resolve(hash);
      };
      // Обработка неуспешного завершения операции
      reader.onerror = (error) => reject(error);
      
      // Читаем файл как ArrayBuffer
      reader.readAsArrayBuffer(file);
    });
}