import {similarOffer} from './data.js';
// import {createCardElement} from './card.js';
import {deactivatePage, deactivateMapFilters, activatePage, activateMapFilters, setAdress} from './form.js';
import {initMap, setOnMapLoad, setOnMainPinMove, setAdPins} from './map.js';


const startCoordinate = {
  lat: 35.66023,
  lng: 139.73007,
};

const offers = similarOffer;

setOnMapLoad(()=> {
  setOnMainPinMove(setAdress);
  setAdress(startCoordinate);
  activatePage();
  activateMapFilters();
  setAdPins(offers);
});

deactivatePage();
deactivateMapFilters();
initMap(startCoordinate);
