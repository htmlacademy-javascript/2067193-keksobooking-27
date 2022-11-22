const adForm = document.querySelector('.ad-form');

// Напишите код для валидации формы добавления объявления, используя библиотеку Pristine (/vendor/pristine). Список полей для валидации: Заголовок объявления, Цена за ночь (слайдер пока реализовывать не нужно), Количество комнат и количество мест
//Скрипт из примера
const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextClass: 'text-help',
});

// Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:

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

// А ещё мы добавим альтернативную возможность указать цену за ночь:
// С помощью библиотеки noUiSlider (/vendor/nouislider) реализуйте указание цены за ночь.
const sliderElement = document.querySelector('.ad-form__slider');
const adFormType = document.querySelector('#type');

const sliderElementConfig = {
  min: 0,
  max: 100000,
  start : priceField.placeholder,
  step: 1,
};

//код из примера
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


// Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом, что при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества гостей:

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

// Поля «Время заезда» и «Время выезда» синхронизированы:
// при изменении значения одного поля во втором выделяется соответствующее ему значение.
// Например, если время заезда указано «после 14», то время выезда
// будет равно «до 14» и наоборот.

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


adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    adForm.submit();
  } else {
    // eslint-disable-next-line no-console
    console.log('Неверное значение');
  }
});
