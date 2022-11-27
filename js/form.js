import './form-validator.js';

const NUMBER_POINT = 5;
const adForm = document.querySelector('.ad-form');
const fieldset = adForm.querySelectorAll('fieldset');
const adress = adForm.querySelector('#address');
// const MapFilters = document.querySelector('.map__filters');
// const select = MapFilters.querySelectorAll('select');

// const deactivatePage = () => {
//   adForm.classList.add('ad-form--disabled');
//   fieldset.forEach((element) => {
//     element.disabled = true;
//   });
// };

// const deactivateMapFilters = () => {
//   MapFilters.classList.add('map__filters--disabled');
//   select.forEach((element) => {
//     element.disabled = true;
//   });
// };

// deactivatePage();
// deactivateMapFilters();

// const activatePage = () => {
//   adForm.classList.remove('ad-form--disabled');
//   fieldset.forEach((element) => {
//     element.disabled = false;
//   });
// };

// const activateMapFilters = () => {
//   MapFilters.classList.remove('map__filters--disabled');
//   select.forEach((element) => {
//     element.disabled = false;
//   });
// };

// activatePage();
// activateMapFilters();

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

// export {deactivatePage, deactivateMapFilters, activatePage, activateMapFilters, setAddress};
export {deactivatePage, activatePage, setAddress};
