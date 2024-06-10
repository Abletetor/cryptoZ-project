// navigation menu  
const menuBtn = document.getElementById("menu");
const navbarLinks = document.getElementById("navbar-links");
const navbarBtn = document.getElementById("navbar-btn");

menuBtn.addEventListener("click", function () {
     navbarLinks.classList.toggle("active");
     navbarBtn.classList.toggle("active");
});


//select elements from html
const flagOne = document.getElementById('flag-one');
const flagTwo = document.getElementById('flag-two');
const currencyOne = document.getElementById('currency-one');
const currencyTwo = document.getElementById('currency-two');
const amountOne = document.getElementById('amount-one');
const amountTwo = document.getElementById('amount-two');

//set country flag to empty array and populate it by API 
let currencyToFlag = {};

// Function to fetch currency codes and country data
const fetchCurrenciesAndFlags = async () => {
     try {
          // currencies API call
          const currencyResponse = await fetch('https://v6.exchangerate-api.com/v6/89a4679a0ac323035520a8aa/codes');
          const currencyData = await currencyResponse.json();

          // country currencies flag API call
          const countryResponse = await fetch('https://restcountries.com/v3.1/all');
          const countryData = await countryResponse.json();

          countryData.forEach(country => {
               const currencies = country.currencies;
               for (const code in currencies) {
                    if (currencies.hasOwnProperty(code)) {
                         // Manual override for common currencies
                         if (code === 'USD') {
                              currencyToFlag[code] = 'https://flagcdn.com/w320/us.png';
                         } else {
                              currencyToFlag[code] = country.flags.png;
                         }
                    }
               }
          });

          // console.log(currencyToFlag); // Inspect the mapping
          populateCurrencyOptions(currencyData.supported_codes);
     } catch (error) {
          console.error('Error fetching currency or country data:', error);
     }
};

// Function to populate currency select options
const populateCurrencyOptions = (currencies) => {
     currencies.forEach(currency => {
          const optionOne = document.createElement('option');
          const optionTwo = document.createElement('option');
          optionOne.value = currency[0];
          optionOne.textContent = currency[0];
          optionTwo.value = currency[0];
          optionTwo.textContent = currency[0];

          currencyOne.appendChild(optionOne);
          currencyTwo.appendChild(optionTwo);
     });

     updateFlag(currencyOne, flagOne);
     updateFlag(currencyTwo, flagTwo);
     calculateAndUpdate();
};

// Function to update flag for selected currency
const updateFlag = (selectElement, flagElement) => {
     const currencyCode = selectElement.value;
     flagElement.src = currencyToFlag[currencyCode];
     flagElement.alt = currencyCode;
};

// Function to calculate and update currency conversion
const calculateAndUpdate = async () => {
     const currency_1 = currencyOne.value;
     const currency_2 = currencyTwo.value;
     const apiURL = ` https://v6.exchangerate-api.com/v6/89a4679a0ac323035520a8aa/latest/${currency_1}`;

     try {
          const response = await fetch(apiURL);
          const data = await response.json();
          const conversionRate = data.conversion_rates[currency_2];
          amountTwo.value = (amountOne.value * conversionRate).toFixed(2);
     } catch (error) {
          console.error('Error fetching exchange rates:', error);
     }
};

// Event listeners for currency and amount changes
currencyOne.addEventListener('change', () => {
     updateFlag(currencyOne, flagOne);
     calculateAndUpdate();
});

currencyTwo.addEventListener('change', () => {
     updateFlag(currencyTwo, flagTwo);
     calculateAndUpdate();
});

amountOne.addEventListener('input', calculateAndUpdate);
amountTwo.addEventListener('input', calculateAndUpdate);

// Initial setup on page load
document.addEventListener('DOMContentLoaded', fetchCurrenciesAndFlags);
