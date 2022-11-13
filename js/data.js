// const HOUSING_ROOMS = ["1", "2", "3", "100"];
// const HOUSING_GUESRS = ["3", "2", "1", "0"];

import {getRandomPositiveFloat, getRandomPositiveInteger, getRandomArrayElement} from './util.js';
/*В файле main.js на основе написанных в прошлом задании вспомогательных функций напишите необходимые функции для создания массива из 10 сгенерированных JS-объектов. Каждый объект массива — описание похожего объявления неподалёку.*/
// title, строка — заголовок предложения. Придумайте самостоятельно.
const TITLES = [
  'Маленькая уютная квартира.',
  'Квартира в новостройке на третьем этаже в тихом районе.',
  'Дом расположен в трех минутах ходьбы от метро.',
  'Двухкомнатный оазис в Москве.',
  'Лучшее бугало для двоих.',
  'Королевские аппартаменты в Южном Бутово.',
  'Номер для всей семьи.',
  'Дворец Романовых.',
  'Большой дом 100 кв.м.',
  'Номер интроверта.',
];
// price, число — стоимость. Случайное целое положительное число.
/*Цена за ночь:
Обязательное поле;Числовое поле;
Максимальное значение — 100000.
Пользователь может вписать цену в поле, а может указать её перемещением ползунка слайдера. Слайдер реализуется сторонней библиотекой noUiSlider.*/
const MAX_PRICE_NIGHT = 100000;

// type, строка — одно из пяти фиксированных значений: palace, flat, house, bungalow или hotel.
const TYPE_HOUSE = [
  'bungalow',
  'flat',
  'hotel',
  'house',
  'palace',
];

// rooms, число — количество комнат. Случайное целое положительное число.
const MAX_ROOMS = 100;

// guests, число — количество гостей, которое можно разместить. Случайное целое положительное число.
const MAX_GUESTS = 100;

// checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
const CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

// checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
const CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

// features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking', 'washer',
  'elevator',
  'conditioner',
];

// description, строка — описание помещения. Придумайте самостоятельно.
const DESCRIPTIONS = [
  'Шесть часов до океана.',
  'Пятнаядцать минут до метро со скоростью 85 км/час.',
  'Только для панд.',
  'Вид на Париж.',
  'Во дворе костяк интеллегентов из алкашей и хипстеров.',
  'Девятнаядцатый этаж, лифт не работает.',
  'Вход через чердак.',
  'Соседи только через 10 лет.',
  'Номер с пальмами.',
  'Домик на дереве.',
];

// photos, массив строк — массив случайной длины из значений: https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg, https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg.
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

// location, объект — местоположение в виде географических координат. Состоит из двух полей:
// lat, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000.
// lng, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000.

const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;

// address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.lat}}, {{location.lng}}.

// avatar, строка — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это число от 1 до 10. Перед однозначными числами ставится 0. Например, 01, 02...10. Адреса изображений не повторяются.
const avatarCreate = () => ({
  avatar: `img/avatars/user${getRandomPositiveInteger(1, 10).toString().padStart(2, '0')}.png`
});

// author, объект — описывает автора. Содержит одно поле:

// Функция возвращает сгенерированный элемент массива из заданных объектов
const getOffer = () => {
  const latCoordinate = getRandomPositiveFloat(LAT_MIN, LAT_MAX, 5);
  const lngCoordinate = getRandomPositiveFloat(LNG_MIN, LNG_MAX, 5);

  return {
    author: {
      avatar: avatarCreate(),
    },
    offer: {
      TITLE: getRandomArrayElement(TITLES),
      ADDRESS: `${latCoordinate}, ${lngCoordinate}`,
      PRICE: getRandomPositiveInteger(0, MAX_PRICE_NIGHT),
      TYPE: getRandomArrayElement(TYPE_HOUSE),
      ROOMS: getRandomPositiveInteger(0, MAX_ROOMS),
      GUESTS: getRandomPositiveInteger(0, MAX_GUESTS),
      CHECKIN: getRandomArrayElement(CHECKIN_TIME),
      CHECKOUT: getRandomArrayElement(CHECKOUT_TIME),
      FEATURES: FEATURES.slice(0, getRandomPositiveInteger(1, FEATURES.length)),
      DESCRIPTION: getRandomArrayElement(DESCRIPTIONS),
      PHOTOS: PHOTOS.slice(0, getRandomPositiveInteger(1, PHOTOS.length)),
    },
    location: {
      lat: latCoordinate,
      lng: lngCoordinate,
    },
  };
};

const SIMILAR_OFFER_COUNT = 10; //количество сгенерированных объектов
const similarOffer = Array.from({length: SIMILAR_OFFER_COUNT}).fill(null).map(getOffer);
// eslint-disable-next-line no-console
console.log(similarOffer);
// const offerList = [];
// for (let i = 0; i < SIMILAR_OFFER_COUNT; i++) {
//   offerList.push(getOffer())
// }
// console.log(offerList)

export {similarOffer};

