
const apiKey = 'YOUR_API_KEY';


document.getElementById('currency-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission

    // Get input values
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    
    if (!amount || isNaN(amount)) {
        alert('Please enter a valid amount.');
        return;
    }

    
    if (fromCurrency === toCurrency) {
        alert('Please select different currencies.');
        return;
    }

    document.getElementById('result').innerHTML = 'Loading...';

    // Construct the API URL for fetching conversion rates
 const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;


    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            
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
});
fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data); 
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

