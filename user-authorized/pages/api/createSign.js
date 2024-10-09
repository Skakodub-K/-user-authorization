import { Formidable } from 'formidable'; // ES6

export const config = {
    api: {
      bodyParser: false, // Отключите встроенный body parser
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
        console.log('ОТкрытый ключ:', openKey);

        // Получаем текстовые данные
        const privateKey = fields.privateKey;
        console.log('Закрытый ключ:', privateKey);

        // Получаем бинарные данные
        const binaryFile = files.file;
        console.log('Полученный файл:', binaryFile);

        res.status(200).json({ message: 'Данные успешно отправлены' });
    });
};

export default uploadHandler;