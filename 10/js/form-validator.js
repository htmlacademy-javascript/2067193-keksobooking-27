import {sendData} from './api.js';

const adForm = document.querySelector('.ad-form');

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help',
});

const priceField = adForm.querySelector('#price');

const minPriceHouse = {
  'bungalow': 0,
  'flat' : 1000,
  'hotel' : 3000,
  'house' : 5000,
  'palace' : 10000,
};

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
  const type = adForm.querySelector('#type');
  priceField.placeholder = minPriceHouse[this.value];
  // pristine.validate(priceField);
  priceField.min = minPriceHouse[type.value];
  priceField.dataset.pristineMinMessage = `минимальное значение ${minPriceHouse[type.value]}`;
};

adForm.querySelector('#type').addEventListener('change', onTypeChange);

const sliderElement = document.querySelector('.ad-form__slider');
const adFormType = document.querySelector('#type');

const sliderElementConfig = {
  min: 0,
  max: 100000,
  start : priceField.placeholder,
  step: 1,
};

noUiSlider.create(sliderElement, {
  range : {
    min : sliderElementConfig.min,
    max : sliderElementConfig.max,
  },
  start : sliderElementConfig.start,
  step: sliderElementConfig.step,
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


const roomsField = adForm.querySelector('#room_number');
const capacityField = adForm.querySelector('#capacity');

const capacityOption = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

const validateCapacity = () => capacityOption[roomsField.value].includes(capacityField.value);

pristine.addValidator(roomsField, validateCapacity, 'Комнат недостаточно');
pristine.addValidator(capacityField, validateCapacity, 'Слишком много гостей');

const onCapacityChange = () => pristine.validate(roomsField);
const onRoomsChange = () => pristine.validate(capacityField);

roomsField.addEventListener('change', onRoomsChange);
capacityField.addEventListener('change', onCapacityChange);


const checkinTime = adForm.querySelector('#timein');
const checkoutTime = adForm.querySelector('#timeout');

const onCheckinChange = () => {
  checkoutTime.value = checkinTime.value;
};
const onCheckoutChange = () => {
  checkinTime.value = checkoutTime.value;
};

checkinTime.addEventListener('change', onCheckinChange);
checkoutTime.addEventListener('change', onCheckoutChange);

capacityField.addEventListener('change', () => {
  pristine.validate(capacityField);
  pristine.validate(roomsField);
});

roomsField.addEventListener('change', () => {
  pristine.validate(roomsField);
  pristine.validate(capacityField);
});

// adForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();

//   const isValid = pristine.validate();
//   if (isValid) {
//     adForm.submit();
//   } else {
//     // eslint-disable-next-line no-console
//     console.log('Неверное значение');
//   }
// });

const submitBtn = adForm.querySelector('.ad-form__submit');

const blockSubmitButton = () => {
  submitBtn.disabled = true;
  submitBtn.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = 'Сохранить';
};

const setUserFormSubmit = (onSuccess, onFail) => {
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

export {setUserFormSubmit};
