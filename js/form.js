import './form-validator.js';

const NUMBER_POINT = 5;
const adForm = document.querySelector('.ad-form');
const fieldset = adForm.querySelectorAll('fieldset');
const adress = adForm.querySelector('#address');

const deactivatePage = () => {
  adForm.classList.add('ad-form--disabled');
  fieldset.forEach((elem)=>{
    elem.disabled = true;
  });
};

deactivatePage();

const activatePage = () => {
  adForm.classList.remove('ad-form--disabled');
  fieldset.forEach((elem)=>{
    elem.disabled = false;
  });
};

activatePage();

const setAddress = (coordinates) => {
  adress.value = `${coordinates.lat.toFixed(NUMBER_POINT)}, ${coordinates.lng.toFixed(NUMBER_POINT)}`;
};

export {deactivatePage, activatePage, setAddress};
