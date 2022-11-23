const isEscEvent = (evt) => evt.key === ('Escape' || 'Esc');

// const getRandomPositiveFloat = (a, b, digits = 1) => {
//   if (a < 0 || b < 0 || digits < 0) {
//     return NaN;
//   }
//   const lower = Math.min(a, b);
//   const upper = Math.max(a, b);
//   const result = Math.random() * (upper - lower) + lower;
//   return +result.toFixed(digits);
// };

// const getRandomPositiveInteger = (a, b) => {
//   if (a < 0 || b < 0 || a === b) {
//     return NaN;
//   }
//   const lower = Math.ceil(Math.min(a, b));
//   const upper = Math.floor(Math.max(a, b));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// };

// const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// export {getRandomPositiveFloat, getRandomPositiveInteger, getRandomArrayElement, isEscEvent, debounce};
export {isEscEvent, debounce};
