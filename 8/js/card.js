// Заведите модуль, который будет отвечать за генерацию разметки похожих элементов.
// На основе временных данных для разработки и шаблона #card создайте DOM-элементы, соответствующие объявлениям, и заполните их данными:

import {similarOffer} from './data.js';
// Отрисуйте один из сгенерированных DOM-элементов, например первый, в блок #map-canvas, чтобы проверить, что данные в разметку были вставлены корректно.
const mapCanvas = document.querySelector('.map__canvas');

const template = document.querySelector('#card').content;
const popup = template.querySelector('.popup');

const housingType = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
  house: 'Дом',
  palace: 'Дворец',
};

const renderFeatures = (items, element) => {
  element.innerHTML = '';

  const fragment = document.createDocumentFragment();

  items.forEach((item) => {
    const cardElement = document.createElement('li');
    cardElement.classList.add('popup__feature');
    cardElement.classList.add(`popup__feature--${item}`);
    fragment.appendChild(cardElement);
  });

  element.appendChild(fragment);
  // Предусмотрите ситуацию, когда данных для заполнения не хватает. Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается.
  if (element && element.length === 0 ){
    element.classList.add('.visually-hidden');
  }
};

const createCardElement = ({author, offer}) => {
  const fragment = document.createDocumentFragment();
  const cardElement = popup.cloneNode(true);
  // Замените значение атрибута src у аватарки пользователя .popup__avatar на значение поля author.avatar.
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  // Выведите заголовок объявления offer.title в заголовок .popup__title.
  cardElement.querySelector('.popup__title').textContent = offer.title;
  // Выведите адрес offer.address в блок .popup__text--address.
  cardElement.querySelector('.popup__text--address').textContent = offer.adress;
  // Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}} ₽/ночь. Например, «5200 ₽/ночь».
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  // В блок .popup__type выведите тип жилья offer.type, сопоставив с подписями:
  cardElement.querySelector('.popup__type').textContent = housingType[offer.type];
  // Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей. Например, «2 комнаты для 3 гостей».
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms}  комнаты для ${offer.guests} гостей`;
  // Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}. Например, «Заезд после 14:00, выезд до 14:00».
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  // В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как атрибут src соответствующего изображения.
  cardElement.querySelector('.popup__photo').src = offer.photos;
  // В блок .popup__description выведите описание объекта недвижимости offer.description.
  const decsElement = cardElement.querySelector('.popup__description');
  decsElement.textContent = offer.description;
  if (decsElement.textContent && decsElement.textContent.length /*или нужно decsElement.textContent.lenght ===0 ???*/) {
    decsElement.classList.add('.visually-hidden');
  }
  // В список .popup__features выведите все доступные удобства в объявлении.
  const features = cardElement.querySelector('.popup__features');
  renderFeatures(offer.features, features);

  fragment.appendChild(cardElement);
  return fragment;
};

mapCanvas.appendChild(createCardElement(similarOffer[0]));

// Подключите модуль в проект.
export {createCardElement};
