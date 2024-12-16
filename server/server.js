const express = require('express');
const cors = require('cors');
const multer = require('multer');
const math = require('mathjs');
// Импортируем функции
const createKeys = require('./createKeys.js'); 
const generateSignature = require('./generateSignature.js')
const checkSignature = require('./checkSignature.js')

const app = express();
const PORT = process.env.PORT || 5000;

const upload = multer();

app.use(cors());
app.use(express.json()); // Для парсинга JSON-данных

// Пока сообщение храним тут.
let message = null;

app.get('/createKeys', (req, res) => {
    const jsonKeys = createKeys();
    res.json(jsonKeys);
});

// Обработка POST-запроса
app.post('/generateSignature', upload.none(), (req, res) => {
    // Доступ к данным формы
    const formData = req.body;
    console.log(formData);
    const openKey = JSON.parse(formData.openKey);
    const privateKey = formData.privateKey;
    const hash = formData.hash;
    const result = generateSignature(openKey.openKey, openKey.base, openKey.mod, privateKey, hash);
    res.json({ res: result });
});

app.post('/checkSignature', upload.none(), (req, res) => {
    // Доступ к данным формы
    const formData = req.body;
    console.log(formData);
    const openKey = JSON.parse(formData.openKey);
    const signature = formData.signature.split(" ");
    const hash = formData.hash;
    const result = checkSignature(openKey.openKey, openKey.base, openKey.mod, signature[0], signature[1], hash);
    res.json({ res: result });
})

app.post('/authRegistry', upload.none(), async (req, res) => {
    // Доступ к данным формы
    const formData = req.body;
    console.log(formData);
    const openKeyJson = formData.openKey;
    const openKey = JSON.parse(openKeyJson);
    const username = formData.username;

    const fs = require('fs'); // Модуль для работы с файловой системой
    try {
        const data = await fs.promises.readFile('./users.json', 'utf8');
        // Парсинг содержимого файла в объект
        let users = JSON.parse(data);
        if (users.find((user, index) => user.username === username )) {
            console.log("Такой пользователь уже есть!");
            return res.status(400).send();
        }

        // Добавление новой записи
        const newUser = {
            username: username,
            openKey: openKey
        };
        users.push(newUser);

        // Преобразование объекта обратно в JSON-строку
        const updatedData = JSON.stringify(users, null, 2);
        // Запись обновленных данных в файл
        await fs.promises.writeFile('./users.json', updatedData, 'utf8');        
        console.log('Данные успешно записаны.');

    } catch (err) {
        console.error('Ошибка при обработке файла:', err);
        res.status(500).send();
    }
    res.status(200).send();
});

// Клиент изъявляет просьбу залогиниться и мы даем ему шифр
app.post('/authLoginRequest', upload.none(), async (req, res) => {
    
    // Доступ к данным формы
    const formData = req.body;
    const username = formData.username;

    // Модуль для работы с файловой системой
    const fs = require('fs');
    let data = null;
    try {
        data = await fs.promises.readFile('./users.json', 'utf8');
    } catch (err) {
        console.error('Ошибка при обработке файла:', err);
        return res.status(500).send();
    }
    
    // Парсинг содержимого файла в объект
    const users = JSON.parse(data);
    const user = users.find((user, index) => user.username === username);
    if (!user) {
        console.log("Такого пользователя нет!");
        return res.status(400).send();
    }
    
    console.log(user.openKey);

    // Размер просстранства
    const n = user.openKey.BO.length;

    // M : mi <= M
    const M = 45;

    // message - сообщение
    message = Array.from({length: n}, () => Math.floor(Math.random() * M));
    
    console.log('радиус шума: ', user.openKey.r);

    // v = m * B'
    const ciphr = math.multiply(message, user.openKey.BO);
    // e: считаем вектор шума - он  должен быть в два раза меньше чем самый маленький вектор из базиса
    const e = Array.from({length: n}, () => Math.floor(Math.random() * user.openKey.r / Math.sqrt(n) ));

    console.log('шум: ', e);
    
    console.log('Обработка запроса на выдачу шифра прошла успешно.');
    res.status(200).send({
        ciphr: await JSON.stringify(math.add(ciphr, e))
    });
});

// Клиент присылает свой ответ и мы смотрим смог ли он разгадать шифр
app.post('/authLoginCheck', upload.none(), async (req, res) => {
    // Доступ к данным формы
    const formData = req.body;
    console.log(formData);
    
    const username = formData.username;
    const messageFormClient = formData.message;

    console.log(messageFormClient);

    if (messageFormClient != message) {
        console.log("Неверный пароль");
        return res.status(400).send();
    }
    
    console.log('Аутификация прошла успешно.');
    res.status(200).send();
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});