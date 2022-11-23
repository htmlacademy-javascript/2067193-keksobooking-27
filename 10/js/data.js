import {getRandomPositiveFloat, getRandomPositiveInteger, getRandomArrayElement} from './util.js';
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
const MAX_PRICE_NIGHT = 100000;

const TYPE_HOUSE = [
  'bungalow',
  'flat',
  'hotel',
  'house',
  'palace',
];

const MAX_ROOMS = 100;

const MAX_GUESTS = 100;

const CHECKIN_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECKOUT_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking', 'washer',
  'elevator',
  'conditioner',
];

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

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;

const avatarCreate = () => ({
  avatar: `img/avatars/user${getRandomPositiveInteger(1, 10).toString().padStart(2, '0')}.png`
});

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

getOffer();

// const SIMILAR_OFFER_COUNT = 10; //количество сгенерированных объектов
// const similarOffer = Array.from({length: SIMILAR_OFFER_COUNT}).fill(null).map(getOffer);

// eslint-disable-next-line no-console
// console.log(similarOffer);

// export {similarOffer};

