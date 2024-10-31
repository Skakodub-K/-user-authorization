const express = require('express');
const cors = require('cors');

const myFunction = require('./createKeys.js'); // Импортируем функцию

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Для парсинга JSON-данных

app.get('/createKeys', (req, res) => {
    res.send('Hello World!');
});

// Добавьте другие маршруты по мере необходимости

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});