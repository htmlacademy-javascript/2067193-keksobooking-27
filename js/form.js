/* eslint-disable no-undef */
// Заведите модуль, который будет отвечать за работу с формой.

// Реализуйте с помощью JavaScript (удобнее функцией!) перевод страницы в неактивное состояние. Все пункты, кроме первого про карту.
// Важно. Неактивность должна добавляться именно средствами JavaScript, иначе, если классы и атрибуты добавить напрямую в HTML, при ошибке в скриптах или ошибке загрузки скриптов сайт будет недоступен пользователю.

import './form-validator';
import './data.js';


const adForm = document.querySelector('.ad-form');
const fieldset = adForm.querySelectorAll('fieldset');
const adress = adForm.querySelector('#address');

// 1.1. Неактивное состояние. При открытии страница находится в неактивном состоянии:
const deactivatePage = () => {
  // Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
  adForm.classList.add('ad-form--disabled');
  // Все интерактивные элементы формы .ad-form должны быть заблокированы с помощью атрибута disabled, добавленного на них или на их родительские блоки fieldset. Слайдер также должен быть заблокирован ???? какой слайдер))));
  fieldset.forEach((element) => {
    element.disabled = true;
  });
};

// Форма с фильтрами .map__filters заблокирована так же, как и форма .ad-form — на форму добавлен специальный класс, а на её интерактивные элементы атрибуты disabled.
const MapFilters = document.querySelector('.map__filters');
const select = MapFilters.querySelectorAll('select');

const deactivateMapFilters = () => {
  MapFilters.classList.add('map__filters--disabled');
  select.forEach((element) => {
    element.disabled = true;
  });
};

deactivatePage();
deactivateMapFilters();

// Напишите функцию, которая будет переводить страницу в активное состояние. В задании про карту мы будем вызывать эту функцию, когда карта будет загружена и готова к работе, а пока вы можете просто вызвать эту функцию активации в своём коде.

// 1.2. Активное состояние. Загрузка и успешная инициализация карты (карта реализуется сторонней библиотекой Leaflet) переводит страницу в активное состояние. В активном состоянии страница позволяет:

// Вносить изменения в форму и отправлять её на сервер;
// После загрузки данных с сервера просматривать похожие объявления на карте, фильтровать их и уточнять подробную информацию о них, показывая для каждого из объявлений карточку.

const activatePage = () => {
  // Форма заполнения информации об объявлении .ad-form содержит класс ad-form--disabled;
  adForm.classList.remove('ad-form--disabled');
  // Все интерактивные элементы формы .ad-form должны быть заблокированы с помощью атрибута disabled, добавленного на них или на их родительские блоки fieldset. Слайдер также должен быть заблокирован
  fieldset.forEach((element) => {
    element.disabled = false;
  });
};

const activateMapFilters = () => {
  MapFilters.classList.remove('map__filters--disabled');
  select.forEach((element) => {
    element.disabled = false;
  });
};

activatePage();
activateMapFilters();

const numberPoint = 5;

const setAdress = (coordinates) => {
  adress.value = `${coordinates.lat.toFixed(numberPoint)}, ${coordinates.lng.toFixed(numberPoint)}`;
};

export {deactivatePage, deactivateMapFilters, activatePage, activateMapFilters, setAdress};
