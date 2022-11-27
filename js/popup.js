import {isEscEvent} from './util.js';
import {resetFilter} from './filters.js';

const showAlert = (message) => {
  const errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  const errorPopupMessage = errorPopup.querySelector('.error__message');
  const closeErrorButton = errorPopup.querySelector('.error__button');

  errorPopupMessage.textContent = message;
  document.body.appendChild(errorPopup);

  closeErrorButton.addEventListener('click', () => {
    errorPopup.remove();
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      errorPopup.remove();
    }
  });

  document.addEventListener('click', () => {
    errorPopup.remove();
  });
};

const showSuccess = () => {
  const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

  document.body.appendChild(successPopup);
  document.querySelector('.ad-form').reset();
  resetFilter();

  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      successPopup.remove();
    }
  });

  document.addEventListener('click', () => {
    successPopup.remove();
  });
};

const showError = (message) => {
  const errorWarning = document.createElement('div');
  errorWarning.style.zIndex = '100';
  errorWarning.style.position = 'absolute';
  errorWarning.style.left = '0';
  errorWarning.style.top = '0';
  errorWarning.style.right = '0';
  errorWarning.style.padding = '10px 3px';
  errorWarning.style.fontSize = '30px';
  errorWarning.style.textAlign = 'center';
  errorWarning.style.backgroundColor = 'red';
  errorWarning.textContent = message;

  document.body.append(errorWarning);
  document.addEventListener('keydown', (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      errorWarning.remove();
    }
  });

  document.addEventListener('click', () => {
    errorWarning.remove();
  });
};

export {showAlert, showSuccess, showError};
