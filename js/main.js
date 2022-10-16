// const HOUSING_TYPE = ["bungalow", "flat", "hotel", "house", "palace"];
// const TIME_IN = ["12:00", "13:00", "14:00"];
// const TIME_OUT = ["12:00", "13:00", "14:00"];
// const HOUSING_ROOMS = ["1", "2", "3", "100"];
// const HOUSING_GUESRS = ["3", "2", "1", "0"];
// const HOUSING_FEATURES = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

// Задание считается выполненным, если в проекте описаны следующие функции:
// Функция, возвращающая случайное целое число из переданного диапазона включительно.
// (https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random).

const getRandomInt(min, max) => {
    if (min < 0 || max < 0 || min === max) {
        return NaN;
    };
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
const getRandomArbitrary(min, max) => {
    if (min < 0 || max < 0 || min === max) {
        return NaN;
    };

    if (max > min) {
        [max, min] = [min, max];
    };
    return Math.random() * (max - min) + min;
}

