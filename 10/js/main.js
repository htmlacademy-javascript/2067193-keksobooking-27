import {deactivatePage, deactivateMapFilters, activatePage, activateMapFilters, setAdress} from './form.js';
import {initMap, setOnMapLoad, setOnMainPinMove, startCoordinate} from './map.js';
import './api.js';
import {setAdPins} from './map.js';
import {getData} from './api.js';
import {setUserFormSubmit} from './form-validate.js';
import {showAlert, showSuccess, showError} from './popup.js';


setOnMapLoad(()=> {
  setOnMainPinMove(setAdress);
  setAdress(startCoordinate);
  activatePage();
  activateMapFilters();
});

deactivatePage();
deactivateMapFilters();
initMap(startCoordinate);

getData(setAdPins, showError);

setUserFormSubmit(showSuccess, showAlert);
