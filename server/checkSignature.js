// Импортируем функции
const { modularExponentiation } = require("./calculations.js");

// Проверка подписи
function checkSignature(openKey, g, mod, r, s, hash) {
  // Преобразуем все входные параметры в BigInt
  const bigIntOpenKey = BigInt(openKey);
  const bigIntG = BigInt(g);
  const bigIntMod = BigInt(mod);
  const bigIntR = BigInt(r);
  const bigIntS = BigInt(s);

  // Преобразуем строку хэш в BigInt
  const bigIntHash = BigInt("0x" + hash);

  // Вычисляем y и m как BigInt
  const y = bigIntOpenKey % bigIntMod;
  const m = bigIntHash % bigIntMod;

  // Вычисляем левую и правую части
  const leftSide =
    (modularExponentiation(y, bigIntR, bigIntMod) *
      modularExponentiation(bigIntR, bigIntS, bigIntMod)) %
    bigIntMod; //3066706820547*1036588989910
  const rightSide = modularExponentiation(bigIntG, m, bigIntMod);

  // Сравниваем BigInt значения
  return leftSide === rightSide;
}

module.exports = checkSignature;
