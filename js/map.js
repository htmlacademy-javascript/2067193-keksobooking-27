// Напишите код, который будет добавлять на карту специальную, «главную», метку. Иконка для метки находится в директории /img в корне проекта, файл main-pin.svg.

// Обратите внимание, что вам не нужно использовать иконки из директории vendor/leaflet/images, предоставляемые самой библиотекой.

// Реализуйте с помощью API карт выбор адреса путём перемещения главной метки. Ручное редактирование поля запрещено, однако поле должно быть доступно, чтобы значение отправлялось на сервер с формой.

// Напишите код, который добавит на карту метки объявлений, «обычные». Иконка для метки находится в директории /img в корне проекта, файл pin.svg. Для отображения используйте данные для разработки, которые мы генерировали несколько заданий назад.

// С помощью API карт реализуйте показ балуна с подробной информацией об объявлении. Учтите нюансы поведения и ограничения для обычных меток и главной.


import {createCardElement} from './card.js';
// import {deactivatePage, deactivateMapFilters, activatePage, activateMapFilters} from './form.js';
// import {similarOffer} from './data.js'

// const addressField = document.querySelector('#address');
// const offer = createCardElement(10);

// deactivateMapFilters();
// deactivatePage();

// const map = L.map('map-canvas')
//   .on('load', () => {
//     activatePage();
//     activateMapFilters();
//   })
//   .setView({
//     lat: 35.68211,
//     lng: 139.75364,
//   }, 12);


// скринкаст
const startCoordinate = {
  lat: 35.66023,
  lng: 139.73007,
};

const OFFERS_COUNT = 10;

const map = L.map('map-canvas');
const markerGroup = L.layerGroup().addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const adPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: 0,
    lng: 0,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const initMap = (coordinate) => {
  map.setView(coordinate, 10);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  mainPinMarker.setLatLng(coordinate);
  mainPinMarker.addTo(map);
};

const createAdPinMarkers = (offers) => {
  offers.forEach((offer) => {
    const marker = L.marker(
      {
        lat: offer.location.lat,
        lng: offer.location.lng,
      },
      {
        icon: adPinIcon,
      }
    );

    marker.addTo(markerGroup).bindPopup(createCardElement(offer));
  });
};

const setAdPins = (offers) => {
  markerGroup.clearLayers();
  createAdPinMarkers(offers.slice(0, OFFERS_COUNT));
};

const setOnMapLoad = (cb) => {
  map.on('load', cb);
};

const setOnMainPinMove = (cb) => {
  mainPinMarker.on('move', (evt) => cb(evt.target.getLatLng()));
};

export {initMap, setOnMapLoad, setOnMainPinMove, setAdPins, startCoordinate};
