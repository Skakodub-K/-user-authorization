import Link from "next/link";
import { useState } from 'react';

export default function CreateSignature() {

  const [file, setFile] = useState(null);
  // Закрытый ключ
  const [privateKey, setPrivateKey] = useState('');
  // Открытый ключ
  const [openKey, setOpenKey] = useState('');
  // Подпись
  const [signature, setSignature] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Нажали кнопку "Сгенерировать ключи"
  const handleKeyGen = async (e) => {
    const response = await fetch('/api/createKeys', { method: 'POST' });

    if (response.ok) {
      const data = await response.json();
      setPrivateKey(data.privateKey);
      setOpenKey(data.openKey);
    } else {
      const errorData = await response.json();
      setErrorMessage(errorData.error || 'Ошибка при создании ключей.');
    }
  };
  // Выбрали файл
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  // Нажали кнопку подписать
  const handleSign = async (e) => {
    e.preventDefault(); // Предотвращаем обновление страницы
    // Создаем FormData
    const formData = new FormData();
    formData.append('file', file, 'myfile.bin'); // Добавляем бинарные данные
    formData.append('openKey', openKey); // Добавляем текстовые данные
    formData.append('privateKey', privateKey); // Добавляем текстовые данные

    try {
      const response = await fetch('/api/createSign', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Ошибка при отправке:', error);
    }
  };

  return (
    <div>
      <h1>Создание подписи</h1>
      <Link href="/">На главную</Link>
      <form onSubmit={handleSign}>
        <input type="file" onChange={handleFileChange} required />
        <textarea
          value={privateKey}
          onChange={(e) => setPrivateKey(e.target.value)}
          placeholder="Введите закрытый ключ..."
          rows={10}
          required
        />
        <textarea
          value={openKey}
          onChange={(e) => setOpenKey(e.target.value)}
          placeholder="Введите открытый ключ..."
          rows={10}
          required
        />
        <button type="submit">Подписать</button>
      </form>
      <button onClick={(e) => handleKeyGen()}>Сгенерировать ключи</button>
      {signature && (
        <div>
          <h2>Подпись:</h2>
          <textarea value={signature} readOnly rows={5} />
        </div>
      )}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}
