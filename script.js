let minValue = parseInt(prompt("Минимальное знание числа для игры", "0")) || 0;
let maxValue =
  parseInt(prompt("Максимальное знание числа для игры", "100")) || 100;

minValue = minValue < -999 ? -999 : minValue > 999 ? 999 : minValue;
maxValue = maxValue < -999 ? -999 : maxValue > 999 ? 999 : maxValue;

alert(
  `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`
);

function numberToWords(num) {
  const ones = [
    "",
    "один",
    "два",
    "три",
    "четыре",
    "пять",
    "шесть",
    "семь",
    "восемь",
    "девять",
  ];

  const teens = [
    "десять",
    "одиннадцать",
    "двенадцать",
    "тринадцать",
    "четырнадцать",
    "пятнадцать",
    "шестнадцать",
    "семнадцать",
    "восемнадцать",
    "девятнадцать",
  ];

  const tens = [
    "",
    "",
    "двадцать",
    "тридцать",
    "сорок",
    "пятьдесят",
    "шестьдесят",
    "семьдесят",
    "восемьдесят",
    "девяносто",
  ];

  const hundreds = [
    "",
    "сто",
    "двести",
    "триста",
    "четыреста",
    "пятьсот",
    "шестьсот",
    "семьсот",
    "восемьсот",
    "девятьсот",
  ];

  if (num === 0) return "ноль";

  let words = "";
  let absNum = Math.abs(num);

  if (absNum >= 100) {
    words += hundreds[Math.floor(absNum / 100)] + " ";
    absNum %= 100;
  }

  if (absNum >= 10 && absNum <= 19) {
    words += teens[absNum - 10];
  } else {
    words += tens[Math.floor(absNum / 10)] + " ";
    words += ones[absNum % 10];
  }

  words = words.trim();
  return num < 0 ? "минус " + words : words;
}

let answerNumber = Math.floor((minValue + maxValue) / 2);
let orderNumber = 1;
let gameRun = true;

const orderNumberField = document.getElementById("orderNumberField");
const answerField = document.getElementById("answerField");

orderNumberField.innerText = orderNumber;

let textVersion = numberToWords(answerNumber);
answerField.innerText = `Вы загадали число ${
  textVersion.length <= 20 ? textVersion : answerNumber
}?`;

// При клике на btnRetry, начинаем игру заново
document.getElementById("btnRetry").addEventListener("click", function () {
  minValue = parseInt(prompt("Минимальное знание числа для игры", "0"));
  maxValue = parseInt(prompt("Максимальное знание числа для игры", "100"));
  alert(
    `Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`
  );
  answerNumber = Math.floor((minValue + maxValue) / 2);
  orderNumber = 1;
  gameRun = true;

  orderNumberField.innerText = orderNumber;
  let textVersion = numberToWords(answerNumber);
  answerField.innerText = `Вы загадали число ${
    textVersion.length <= 20 ? textVersion : answerNumber
  }?`;
});

// При нажатии на больше
document.getElementById("btnOver").addEventListener("click", function () {
  if (gameRun) {
    if (minValue === maxValue) {
      const phraseRandom = Math.round(Math.random());
      const answerPhrase =
        phraseRandom === 1
          ? `Вы загадали неправильное число!\n\u{1F914}`
          : `Я сдаюсь..\n\u{1F92F}`;

      answerField.innerText = answerPhrase;
      gameRun = false;
    } else {
      minValue = answerNumber + 1;
      answerNumber = Math.floor((minValue + maxValue) / 2);
      orderNumber++;
      orderNumberField.innerText = orderNumber;
      let textVersion = numberToWords(answerNumber);
      answerField.innerText = `Вы загадали число ${
        textVersion.length <= 20 ? textVersion : answerNumber
      }?`;
    }
  }
});
// При клике на меньше
document.getElementById("btnLess").addEventListener("click", function () {
  debugger;
  if (gameRun) {
    if (minValue >= maxValue || answerNumber == minValue) {
      let minNum = 1;
      let maxNum = 4;
      const phraseRandom =
        Math.round(Math.random() * (maxNum - minNum)) + minNum;
      let answerPhrase;
      switch (phraseRandom) {
        case 1:
          answerPhrase = "Вы забыли, какое число загадали?\n\u{1F92A}";
          break;
        case 2:
          answerPhrase = "Мне кажется, что вы ошиблись?\n\u{1F9D0}";
          break;
        case 3:
          answerPhrase = "Немедленно прекратите жульничать!\n\u{1F620}";
          break;
        case 4:
          answerPhrase = "Не пытайтесь обмануть меня!\n\u{1F620}";
          break;
      }

      answerField.innerText = answerPhrase;
      gameRun = false;
    } else {
      maxValue = answerNumber - 1;
      answerNumber = minValue + Math.floor((maxValue - minValue) / 2);
      orderNumber++;
      orderNumberField.innerText = orderNumber;
      let textVersion = numberToWords(answerNumber);
      answerField.innerText = `Вы загадали число ${
        textVersion.length <= 20 ? textVersion : answerNumber
      }?`;
    }
  }
});

// При клике на угадал
document.getElementById("btnEqual").addEventListener("click", function () {
  if (gameRun) {
    const phraseRandom = Math.round(Math.random() * 3);
    switch (phraseRandom) {
      case 1:
        answerPhrase = "Я всегда угадываю\n\u{1F60E}";
        break;

      case 2:
        answerPhrase = "Ура, как же я крут! \n\u{1F60E}";
        break;

      case 3:
        answerPhrase = "Я великолепен!\n\u{1F973}";
        break;

      case 4:
        answerPhrase = "Победа за мной\n\u{1F929}";
        break;
    }
    answerField.innerText = answerPhrase;
    gameRun = false;
  }
});
