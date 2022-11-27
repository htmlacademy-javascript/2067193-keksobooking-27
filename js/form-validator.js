import {sendData} from './api.js';
import {DEFAULT_AVATAR, previewPhoto, previewAvatar} from './pictures.js';
import {resetMainMark} from './map.js';
import {resetFilter} from './filters.js';

const adForm = document.querySelector('.ad-form');
const submitBtn = adForm.querySelector('.ad-form__submit');
const adFormType = document.querySelector('#type');
const roomsField = adForm.querySelector('#room_number');
const capacityField = adForm.querySelector('#capacity');
const priceField = adForm.querySelector('#price');
const SLIDER_MIN = 0;
const SLIDER_MAX = 100000;
const SLIDER_START = 1000;
const SLIDER_STEP = 1;
const checkinTime = adForm.querySelector('#timein');
const checkoutTime = adForm.querySelector('#timeout');
const resetBtn = adForm.querySelector('.ad-form__reset');
const sliderElement = document.querySelector('.ad-form__slider');

const capacityOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const minPriceHouse = {
  'bungalow': '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000',
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help',
}, true);

const validatePrice = (value) => {
  const type = adForm.querySelector('#type');
  return parseInt(value, 10) >= minPriceHouse[type.value];
};

const getPriceErrorMessage = () => {
  const type = adForm.querySelector('#type');
  return `Минимальная цена ${minPriceHouse[type.value]}`;
};

pristine.addValidator(priceField, validatePrice, getPriceErrorMessage);

const onTypeChange = () => {
  priceField.placeholder = minPriceHouse[adFormType.value];
  priceField.min = minPriceHouse[adFormType.value];
  priceField.dataset.pristineMinMessage = `минимальная цена ${minPriceHouse[adFormType.value]}`;
};

adForm.querySelector('#type').addEventListener('change', onTypeChange);

// Слайдер
noUiSlider.create(sliderElement, {
  range : {
    min : SLIDER_MIN,
    max : SLIDER_MAX,
  },
  start : SLIDER_START,
  step: SLIDER_STEP,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
    },
    from: function (value) {
      return parseFloat(value);
    },
  }
});

sliderElement.noUiSlider.on('update', () => {
  priceField.value = sliderElement.noUiSlider.get();
});

adFormType.addEventListener('change', ()=> {
  onTypeChange();
  sliderElement.noUiSlider.set(priceField.placeholder);
});

priceField.addEventListener('change', onTypeChange);

const validateCapacity = () => capacityOption[roomsField.value].includes(capacityField.value);

pristine.addValidator(roomsField, validateCapacity, 'Комнат недостаточно');
pristine.addValidator(capacityField, validateCapacity, 'Слишком много гостей');

const onCapacityChange = () => pristine.validate(roomsField);
const onRoomsChange = () => pristine.validate(capacityField);

roomsField.addEventListener('change', onRoomsChange);
capacityField.addEventListener('change', onCapacityChange);

const onCheckinChange = () => {
  checkoutTime.value = checkinTime.value;
};
const onCheckoutChange = () => {
  checkinTime.value = checkoutTime.value;
};

checkinTime.addEventListener('change', onCheckinChange);
checkoutTime.addEventListener('change', onCheckoutChange);

// Валидация
capacityField.addEventListener('change', () => {
  pristine.validate(capacityField);
  pristine.validate(roomsField);
});

roomsField.addEventListener('change', () => {
  pristine.validate(roomsField);
  pristine.validate(capacityField);
});

const blockSubmitButton = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = 'Сохранение';
};

const unblockSubmitButton = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = 'Сохранить';
};

const resetForm = () => {
  pristine.reset();
  adForm.reset();
  resetMainMark();
  previewPhoto.innerHTML = '';
  previewAvatar.src = DEFAULT_AVATAR;
  priceField.placeholder = minPriceHouse[adFormType.value];
  sliderElement.noUiSlider.set(minPriceHouse[adFormType.value]);
};

resetBtn.addEventListener('click', (evt)=> {
  evt.preventDefault();
  resetForm();
  resetFilter();
});

const sendUserFormSubmit = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          onFail('Не удалось отправить форму. Попробуйте ещё раз');
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {sendUserFormSubmit};
