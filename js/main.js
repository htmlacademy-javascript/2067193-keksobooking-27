import {deactivatePage, deactivateMapFilters, activatePage, activateMapFilters, setAddress} from './form.js';
import {initMap, setOnMapLoad, setOnMainPinMove, setAdPins, startCoordinate} from './map.js';
import {getData} from './api.js';
import {sendUserFormSubmit} from './form-validator.js';
import {showAlert, showSuccess, showError} from './popup.js';
import {setChangeEventOnFilter, getFilterOffers } from './filters.js';
import {debounce} from './util.js';
import './pictures.js';


setOnMapLoad(()=> {
  setOnMainPinMove(setAddress);
  setAddress(startCoordinate);
  activatePage();
  activateMapFilters();
});

deactivatePage();
deactivateMapFilters();
initMap(startCoordinate);

sendUserFormSubmit(showSuccess, showAlert);

getData((offers) => {
  setAdPins(offers);
  setChangeEventOnFilter(
    debounce(() => {
      setAdPins(getFilterOffers(offers));
      // setAdPins(offers.filter(getFilterOffers));
    })
  );
}, () => {
  showError('Не удалось получить похожие объявления. Попробуй еще раз!');
});
