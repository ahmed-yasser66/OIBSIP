/*
===================================
  handling choosing unit
===================================
*/
let userChoise = 'celsius';
const userInput = document.getElementById('userInput');
const units = document.querySelectorAll('#units li');

function chooseUnit(e, choice) {
  // remove all active styles
  units.forEach((li) => {
    li.classList.remove('active');
  });
  // add active to the clicked one
  e.classList.add('active');
  // set our choice
  userChoise = choice;

  converterHandler(userInput.value);
}

/*
===================================
  handling Converting
===================================
*/

const celsiusCard = document.getElementById('celsiusCard');
const fahrenheitCard = document.getElementById('fahrenheitCard');
const kelvinCard = document.getElementById('kelvinCard');

const convertCelsiusToFahrenheit = (value) => Number(value) * (9 / 5) + 32;
const convertCelsiusToKelvin = (value) => Number(value) + 273.15;

const convertFahrenheitToCelsius = (value) => (Number(value) - 32) * (5 / 9);
const convertFahrenheitToKelvin = (value) =>
  (Number(value) - 32) * (5 / 9) + 273.15;

const convetKelvinToCelsius = (value) => Number(value) - 273.15;
const convetKelvinToFahernheit = (value) =>
  (Number(value) - 273.15) * (9 / 5) + 32;

userInput.oninput = (e) => converterHandler(e.target.value);

function converterHandler(value) {
  const unit = userChoise;
  // empty input
  if (value == '') {
    resettingValues();
    return;
  }

  // if the value is not a number
  const isValidNumber = isNumber(value);
  const errorCard = document.getElementById('errorCard');

  if (isValidNumber) {
    errorCard.classList.remove('show-error');
  } else {
    showRelatedError('nan');
    return;
  }

  if (value < -273.15) {
    showRelatedError('low-value');
    return;
  }

  switch (unit) {
    case 'celsius':
      celsiusCard.textContent = formatNumber(value);
      celsiusCard.title = value;

      fahrenheitCard.textContent = formatNumber(
        convertCelsiusToFahrenheit(value),
      );
      fahrenheitCard.title = convertCelsiusToFahrenheit(value);

      kelvinCard.textContent = formatNumber(convertCelsiusToKelvin(value));
      kelvinCard.title = convertCelsiusToKelvin(value);
      break;
    case 'fahrenheit':
      celsiusCard.textContent = formatNumber(convertFahrenheitToCelsius(value));
      celsiusCard.title = convertFahrenheitToCelsius(value);

      fahrenheitCard.textContent = formatNumber(value);
      fahrenheitCard.title = value;

      kelvinCard.textContent = formatNumber(convertFahrenheitToKelvin(value));
      kelvinCard.title = convertFahrenheitToKelvin(value);

      break;
    case 'kelvin':
      celsiusCard.textContent = formatNumber(convetKelvinToCelsius(value));
      fahrenheitCard.title = convetKelvinToCelsius(value);

      fahrenheitCard.textContent = formatNumber(
        convetKelvinToFahernheit(value),
      );
      fahrenheitCard.title = convetKelvinToFahernheit(value);

      kelvinCard.textContent = formatNumber(value);
      kelvinCard.title = value;
  }
}
converterHandler(100);

function isNumber(input) {
  return !isNaN(input);
}
function showRelatedError(type) {
  const header = document.getElementById('errorHeader');
  const content = document.getElementById('errorContent');

  switch (type) {
    case 'nan':
      header.textContent = 'Non-numeric format';
      content.textContent =
        'The input must be a valid integer or floating point number.';
      break;
    case 'low-value':
      header.textContent = 'Thermodynamic limit violated';
      content.textContent =
        'Physical temperature cannot drop below absolute zero (-273.15°C).';
      break;
  }
  errorCard.classList.add('show-error');
}
function formatNumber(num) {
  return String(Number(num).toFixed(2)).length > 8
    ? String(Number(num).toFixed(2)).slice(0, 6) + '...'
    : Number(num).toFixed(2);
}
function resettingValues() {
  userInput.value = '';
  celsiusCard.textContent = '--';
  fahrenheitCard.textContent = '--';
  kelvinCard.textContent = '--';
}

/*
===================================
  handling keydown
===================================
*/

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    resettingValues();
  }
});
