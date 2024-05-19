// navigation menu  
const menuBtn = document.getElementById("menu");
const navbarLinks = document.getElementById("navbar-links");
const navbarBtn = document.getElementById("navbar-btn");

menuBtn.addEventListener("click", function () {
     navbarLinks.classList.toggle("active");
     navbarBtn.classList.toggle("active");
});

//make sure the DOM is fulled loaded before JS code runs
document.addEventListener('DOMContentLoaded', () => {

     //select elements from html
     const flagOne = document.getElementById('flag-one');
     const flagTwo = document.getElementById('flag-two');
     const currencyOne = document.getElementById('currency-one');
     const currencyTwo = document.getElementById('currency-two');
     const amountOne = document.getElementById('amount-one');
     const amountTwo = document.getElementById('amount-two');

     // function to update flag for currency selected
     const updateFlag = (selectElement, flagElement) => {
          const currencyCode = selectElement.value;
          flagElement.src = `https://flagcdn.com/48x36/${currencyToFlag[currencyCode]}`;
          flagElement.alt = currencyCode;
     };


     // function to calculare and update currency conversion
     const calculateAndUpdate = () => {
          const currency_1 = currencyOne.value;
          const currency_2 = currencyTwo.value;
          const apiURL = `https://v6.exchangerate-api.com/v6/a51f48ffd6463910c59ba035/latest/${currency_1}`;

          fetch(apiURL)
               .then(response => response.json())
               .then(data => {
                    const conversionRate = data.conversion_rates[currency_2];
                    amountTwo.value = (amountOne.value * conversionRate).toFixed(2);
               });
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
     updateFlag(currencyOne, flagOne);
     updateFlag(currencyTwo, flagTwo);
     calculateAndUpdate();
});
