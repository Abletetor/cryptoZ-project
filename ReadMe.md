## FULL PROJECT DOCUMENTATIONS ##

## API DOCUMENTATION
API Choice:
1. ExchangeRate-API: Chosen for fetching currency exchange rates and supported currency codes.
2. Rest Countries API: Chosen for fetching country data, including flag URLs, to dynamically associate flags with currency codes.

How It Works:
1. ExchangeRate-API: Provides real-time exchange rate data and supported currency codes.
2. Rest Countries API: Provides detailed information about countries, including their flags, which are used to visually represent currencies.

How to Use It:
1. Fetching Currency Codes and Rates:
- Endpoint: https://v6.exchangerate-api.com/v6/YOUR_API_KEY/codes
- Method: GET
- Response: JSON object containing supported currency codes
- Example Call:

fetch('https://v6.exchangerate-api.com/v6/YOUR_API_KEY/codes')
  .then(response => response.json())
  .then(data => {
      // Use data.supported_codes to populate currency options
  });

2. Fetching Latest Exchange Rates:
- Endpoint: https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/{currency_code}
- Method: GET
- Response: JSON object containing exchange rates relative to the provided currency code.
- Example Call:

fetch(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD`)
  .then(response => response.json())
  .then(data => {
      // Use data.conversion_rates to get rates for converting currencies
  });

3. Fetching Country Data:
- Endpoint: https://restcountries.com/v3.1/all
- Method: GET
- Response: JSON array of country objects with various details including flags and currencies.
- Example Call:
fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(data => {
      // Process country data to map currency codes to flag URLs
  });


## TESTING REPORT
Overview:
Testing was conducted to ensure that the CryptoZ landing page and realtime currency converter is responsiveness and is functionality across various devices and browsers.

1. Desktop:
- Chrome (v90+)
- Firefox (v88+)
- Edge (v90+)
- Brave (v14+)

2. Mobile:
- iOS Safari (iPhone 14, Pro Max)
- Android Chrome (Samsung Galaxy S10, Android 11)
- Android Firefox (Samsung Galaxy ultra S20, Android 12)

3. Tablets:
- iPad Safari (iPad Pro, iPadOS 14.5)
- Android Chrome (Samsung Galaxy Tab S6, Android 10)

## TEST PERFORMED:
1. Responsiveness:
- Verified layout adapts to different screen sizes using responsive design tools in browser developer tools.
- Checked element alignment, font sizes, and usability on small (450px), medium (860px), and large (991px) screens.

2. Functionality:
- Ensured currency dropdowns are populated correctly with currency abbreviations.
- Verified flag images update correctly when different currencies are selected.
- Tested currency conversion calculations to ensure accurate results based on current exchange rates.
- Confirmed that input fields for amounts respond to user input and dynamically update the conversion result.

3. Performance:
- Checked for any JavaScript errors or CSS inconsistencies.
- Ensured API calls are made efficiently and data is fetched and displayed promptly.
- Checked page load times and interaction delays to ensure a smooth user experience.