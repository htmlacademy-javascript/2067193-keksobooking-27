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
  if (element && element.length === 0 ){
    element.classList.add('visually-hidden');
  }
};

const renderPhotos = (items, elem) => {
  elem.innerHTML = '';

  const fragment = document.createDocumentFragment();
  if (items) {

    items.forEach((item) => {
      const element = document.createElement('img');
      element.classList.add('popup__photo');
      element.src = item;
      element.width = 45;
      element.height = 40;
      element.alt = 'Фотография жилья';
      fragment.appendChild(element);
    });

    elem.appendChild(fragment);

  } else {
    elem.classList.add('visually-hidden');
  }
};


const createCardElement = ({author, offer}) => {
  const fragment = document.createDocumentFragment();
  const cardElement = popup.cloneNode(true);
  cardElement.querySelector('.popup__avatar').src = author.avatar;
  cardElement.querySelector('.popup__title').textContent = offer.title;
  cardElement.querySelector('.popup__text--address').textContent = offer.adress;
  cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').textContent = housingType[offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms}  комнаты для ${offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  // cardElement.querySelector('.popup__photo').src = offer.photos;
  const decsElement = cardElement.querySelector('.popup__description');
  decsElement.textContent = offer.description;
  if (decsElement.textContent && decsElement.textContent.length /*или нужно decsElement.textContent.lenght ===0 ???*/) {
    decsElement.classList.add('.visually-hidden');
  }
  const features = cardElement.querySelector('.popup__features');
  renderFeatures(offer.features, features);

  const photo = cardElement.querySelector('.popup__photos');
  renderPhotos(offer.photos, photo);

  fragment.appendChild(cardElement);
  return cardElement;
};

export {createCardElement};
