const {
  modularExponentiation,
  isPrimitiveRoot,
  sieveOfEratosthenesW2,
  findTheNearestLessPrimitiveRoot,
  isPrimitive,
} = require("./calculations.js");

const low_limit = BigInt(2250000000000000);
const high_limit = BigInt(4250000000000000);
function handler(req, res) {
  // Создаём ключи
  const { privateKey, openKey } = createKeys();

  // Преобразование BigInt в строку
  const jsonKeys = JSON.stringify({
    privateKey: privateKey.toString(),
    openKey: {
      openKey: openKey.openKey.toString(),
      base: openKey.base.toString(),
      mod: openKey.mod.toString(),
    },
  });

  return jsonKeys;
}

function createKeys() {
  // Ищем случайное простое число для модуля
  let randomN = BigInt(
    Math.floor(
      Number(low_limit) +
        (Number(high_limit) - Number(low_limit)) * Math.random()
    )
  );

  while (!isPrimitive(randomN)) {
    randomN--;
  }
  const mod = randomN;

  // Основание, генератор группы, первообразный корень
  let base = BigInt(
    Math.floor(Number(mod) / 2 - 1 + (Number(mod) / 2) * Math.random())
  );
  // Закрытый ключ
  const privateKey = BigInt(Math.floor(Math.random() * Number(mod)));
  // Открытй ключ
  const openKey = modularExponentiation(base, privateKey, mod);

  return {
    privateKey,
    openKey: { openKey, base, mod },
  };
}

module.exports = handler; // Экспортируем только handler
