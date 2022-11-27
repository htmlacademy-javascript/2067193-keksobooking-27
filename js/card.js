const template = document.querySelector('#card').content;
const popup = template.querySelector('.popup');

const PHOTO_WIDTH = 45;
const PHOTO_HEIGHT = 40;

const housingType = {
  bungalow: 'Бунгало',
  flat: 'Квартира',
  hotel: 'Отель',
  house: 'Дом',
  palace: 'Дворец',
};

// const renderFeatures = (items, element) => {
//   element.innerHTML = '';

//   const fragment = document.createDocumentFragment();
//   items.forEach((item) => {
//     const cardElement = document.createElement('li');
//     cardElement.classList.add('popup__feature');
//     cardElement.classList.add(`popup__feature--${item}`);
//     fragment.appendChild(cardElement);
//   });

//   element.appendChild(fragment);
//   if (element && element.length === 0 ){
//     element.classList.add('visually-hidden');
//   }
// };

const renderFeatures = (features) => {
  const featuresFragment = document.createDocumentFragment();
  features.forEach((element) => {
    const featureElement = document.createElement('li');
    featureElement.classList.add('popup__feature', `popup__feature--${element}`);
    featuresFragment.appendChild(featureElement);
  });
  return featuresFragment;
};

const renderPhotos = (photos) => {
  const photosFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const PhotoElement = document.createElement('img');
    PhotoElement.classList.add('popup__photo');
    PhotoElement.src = photo;
    PhotoElement.width = PHOTO_WIDTH;
    PhotoElement.height = PHOTO_HEIGHT;
    PhotoElement.alt = 'Фотография жилья';
  });
  return photosFragment;
};

// const createCardElement = ({author, offer}) => {
//   const fragment = document.createDocumentFragment();
//   const cardElement = popup.cloneNode(true);
//   cardElement.querySelector('.popup__avatar').src = author.avatar;
//   cardElement.querySelector('.popup__title').textContent = offer.title;
//   cardElement.querySelector('.popup__text--address').textContent = offer.adress;
//   cardElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
//   cardElement.querySelector('.popup__type').textContent = housingType[offer.type];
//   cardElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms}  комнаты для ${offer.guests} гостей`;
//   cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
//   // cardElement.querySelector('.popup__photo').src = offer.photos;
//   const decsElement = cardElement.querySelector('.popup__description');
//   decsElement.textContent = offer.description;
//   if (decsElement.textContent && decsElement.textContent.length /*или нужно decsElement.textContent.lenght ===0 ???*/) {
//     decsElement.classList.add('.visually-hidden');
//   }
//   const features = cardElement.querySelector('.popup__features');
//   renderFeatures(offer.features, features);

//   const photo = cardElement.querySelector('.popup__photos');
//   renderPhotos(offer.photos, photo);

//   fragment.appendChild(cardElement);
//   return cardElement;
// };

const visuallyHidden = (elem) => {
  if(elem && elem.textContent.length === 0) {
    elem.classList.add('visually-hidden');
  }
};

const createCardElement = (arr) => {
  // const fragment = document.createDocumentFragment();
  const cardElement = popup.cloneNode(true);

  const cardElementAvatar = cardElement.querySelector('.popup__avatar');
  cardElementAvatar.src = arr.author.avatar;
  if(cardElementAvatar && cardElementAvatar.length === 0) {
    cardElementAvatar.classList.add('visually-hidden');
  }

  const cardElementTitle = cardElement.querySelector('.popup__title');
  cardElementTitle.textContent = arr.offer.title;
  visuallyHidden(cardElementTitle);

  const cardElementAddress = cardElement.querySelector('.popup__text--address');
  cardElementAddress.textContent = arr.offer.address;
  visuallyHidden(cardElementAddress);

  const cardElementPrice = cardElement.querySelector('.popup__text--price');
  cardElementPrice.textContent = `${arr.offer.price} ₽/ночь`;
  visuallyHidden(cardElementPrice);

  const cardElementType = cardElement.querySelector('.popup__type');
  cardElementType.textContent = housingType[arr.offer.type];
  visuallyHidden(cardElementType);

  const cardElementCapacity = cardElement.querySelector('.popup__text--capacity');
  cardElementCapacity.textContent = `${arr.offer.rooms}  комнаты для ${arr.offer.guests} гостей`;
  visuallyHidden(cardElementCapacity);

  const cardElementTime = cardElement.querySelector('.popup__text--time');
  cardElementTime.textContent = `Заезд после ${arr.offer.checkin}, выезд до ${arr.offer.checkout}`;
  visuallyHidden(cardElementTime);

  const decsElement = cardElement.querySelector('.popup__description');
  decsElement.textContent = arr.offer.description;
  visuallyHidden(decsElement);

  const features = cardElement.querySelector('.popup__features');
  features.innerHTML = '';
  if (arr.offer.features) {
    const newFeatures = renderFeatures(arr.offer.features);
    features.appendChild(newFeatures);
  } else {
    features.classList.add('visually-hidden');
  }

  const photo = cardElement.querySelector('.popup__photos');
  photo.innerHTML = '';
  if (arr.offer.photos) {
    const newPhoto = renderPhotos(arr.offer.photos);
    photo.appendChild(newPhoto);
  } else {
    photo.classList.add('visually-hidden');
  }

  return cardElement;
};

export {createCardElement};
