// Импортируем функции
const {
  modularExponentiation,
  gcd,
  extendedGCD,
} = require("./calculations.js");

function generateSignature(openKey, base, mod, privateKey, hash) {
  // Преобразуем строку в число (BigInt)
  const bigIntNumber = BigInt("0x" + hash);

  const o = BigInt(openKey); // Преобразуем openKey в BigInt
  const c = BigInt(privateKey); // Преобразуем privateKey в BigInt

  // Текст
  const m = bigIntNumber % BigInt(mod); // Используем BigInt для модульного выражения

  // Случайное число
  let k;
  do {
    // Генерируем случайное число в диапазоне от 0 до mod
    k = BigInt(Math.floor(Math.random() * (mod - 1))); // Преобразуем в BigInt
  } while (gcd(k, BigInt(mod) - BigInt(1)) !== BigInt(1)); // Проверяем, что НОД равен 1

  let r = modularExponentiation(BigInt(base), k, BigInt(mod)); // 'base ^ k'
  const gcdXY = extendedGCD(k, BigInt(mod) - BigInt(1));
  const rK = gcdXY.x; // k ^ -1
  let s = (rK * (m - c * r)) % (BigInt(mod) - BigInt(1)); // 'k ^ -1 * (m - privateKey * r) mod (p-1)'
  s = s > BigInt(0) ? s : s + (BigInt(mod) - BigInt(1));

  return [r.toString(), s.toString()];
}

module.exports = generateSignature; // Экспортируем только handler
