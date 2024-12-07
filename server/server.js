const express = require('express');
const cors = require('cors');
const multer = require('multer');

// Импортируем функции
const createKeys = require('./createKeys.js'); 
const generateSignature = require('./generateSignature.js')
const checkSignature = require('./checkSignature.js')

const app = express();
const PORT = process.env.PORT || 5000;

const upload = multer();

app.use(cors());
app.use(express.json()); // Для парсинга JSON-данных

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

// Добавьте другие маршруты по мере необходимости

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});