import {deactivatePage, deactivateMapFilters, activatePage, activateMapFilters, setAddress} from './form.js';
import {initMap, setOnMapLoad, setOnMainPinMove, startCoordinate} from './map.js';
import './api.js';
import {setAdPins} from './map.js';
import {getData} from './api.js';
import {setUserFormSubmit} from './form-validate.js';
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

getData((offers) => {
  setAdPins(offers);
  setChangeEventOnFilter(
    debounce(() => {
      setAdPins(getFilterOffers(offers));
    })
  );
}, () => {
  showError('Не удалось получить похожие объявления. Попробуй еще раз!');
});

setUserFormSubmit(showSuccess, showAlert);
