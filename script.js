// Replace 'YOUR_API_KEY' with the API key you get after signing up
const apiKey = 'YOUR_API_KEY';

// Event listener for form submission
document.getElementById('currency-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    // Check for valid amount
    if (!amount || isNaN(amount)) {
        alert('Please enter a valid amount.');
        return;
    }

    // Prevent conversion if the same currency is selected
    if (fromCurrency === toCurrency) {
        alert('Please select different currencies.');
        return;
    }

    // Show loading message while waiting for the API response
    document.getElementById('result').innerHTML = 'Loading...';

    // Construct the API URL for fetching conversion rates
 const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;


    // Make API call to get conversion rates
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Check if the API call was successful
            if (data.result === "success") {
                // Get the exchange rate for the selected 'to' currency
                const conversionRate = data.conversion_rates[toCurrency];

                // Calculate the converted amount
                const convertedAmount = (amount * conversionRate).toFixed(2);

                // Display the conversion result
                document.getElementById('result').innerHTML = 
                    `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            } else {
                // Handle error if API call was unsuccessful
                document.getElementById('result').innerHTML = 'Error: Unable to fetch conversion rates.';
            }
        })
        .catch(error => {
            // Handle any errors in the API request
            console.error('Error fetching data:', error);
            document.getElementById('result').innerHTML = 
                'Error: Unable to fetch conversion rates. Please try again later.';
        });
});
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the API response to see what it returns
        if (data.result === "success") {
            const conversionRate = data.conversion_rates[toCurrency];
            const convertedAmount = (amount * conversionRate).toFixed(2);
            document.getElementById('result').innerHTML = 
                `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        } else {
            document.getElementById('result').innerHTML = 'Error: Unable to fetch conversion rates.';
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('result').innerHTML = 
            'Error: Unable to fetch conversion rates. Please try again later.';
    });

