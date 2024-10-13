import { Formidable } from 'formidable'; // ES6
import fs from 'fs'; // Подключаем fs для чтения файлов
const crypto = require('crypto');

export const config = {
    api: {
      bodyParser: false, // Отключаем встроенный body parser
    },
};

const uploadHandler = (req, res) => {
    const form = new Formidable();

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: 'Ошибка при обработке данных' });
        }

        // Получаем текстовые данные
        const openKey = fields.openKey;
        console.log('Открытый ключ:', openKey);

        const privateKey = fields.privateKey;
        console.log('Закрытый ключ:', privateKey);

        // Получаем бинарные данные
        const binaryFile = files.file;
        //console.log('Полученный файл:', binaryFile);

        // Считываем файл и преобразуем в массив байтов
        const filePath = binaryFile[0].filepath; // Используем filepath для получения пути
        
        const hash = crypto.createHash('sha256'); // Можно использовать 'md5', 'sha1' и др.

        const input = fs.createReadStream(filePath);
        input.on('error', (err) => {
            console.error('Ошибка чтения файла:', err);
        });

        input.on('data', (chunk) => {
            hash.update(chunk);
        });

        input.on('end', () => {
            console.log('Хэш файла:', hash.digest('hex'));
    });
});}

export default uploadHandler;