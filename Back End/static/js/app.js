// Define the URL to fetch the data
let url = "http://127.0.0.1:5000/api/v1.0/allcountries";

// function createBarchartMostDeaths(data, selectedCountryName) {

// }



// function createlinechartGDP(data, selectedCountryName) {


// }


// function createCountryMap(data, selectedCountryName) {


// }




function createpichartWithMostRecovered(data, selectedCountryName) {
    console.log("Creating pie chart with most recovered cases for country:", selectedCountryName);

    // Create an array of objects with country names and recovered cases
    let countriesWithRecovered = [];
    for (let countryName in data) {
        countriesWithRecovered.push({
            country_name: countryName,
            total_recovered_cases: data[countryName].total_recovered_cases
        });
    }

    // Sort the array based on total recovered cases in descending order
    countriesWithRecovered.sort((a, b) => b.total_recovered_cases - a.total_recovered_cases);

    // Extract data for the selected country
    let selectedCountryRecoveredData = countriesWithRecovered.find(country => country.country_name === selectedCountryName);

    // If the selected country is found, include it in the top 10
    if (selectedCountryRecoveredData) {
        countriesWithRecovered.unshift(selectedCountryRecoveredData);
    }

    // Extract labels (country names) and values (recovered cases) for the top 10 or 11 countries
    let labels = countriesWithRecovered.slice(0, 11).map(country => country.country_name);
    let values = countriesWithRecovered.slice(0, 11).map(country => country.total_recovered_cases);
    console.log(labels);
    console.log(values);

    // Create the pie chart
    let pieData = [{
        values: values,
        labels: labels,
        type: 'pie'
    }];

    let pieLayout = {
        title: `Top 10 Country Recovered Cases Comparison with ${selectedCountryName}`
    };

    Plotly.newPlot('pie', pieData, pieLayout);
}

// Function to handle dropdown change event
function dropdownChange(data, selectedCountryName) {
    displayCountryInfo(data, selectedCountryName);
    createpichartWithMostRecovered(data, selectedCountryName);
    // createBarchartMostDeaths(data,selectedCountryName);
    // createlinechartGDP(data,selectedCountryName);
    // createCountryMap(data,selectedCountryName);
}

// Function to display country info
function displayCountryInfo(data, selectedCountryName) {
    // Find the selected country data using the provided country name
    let countryInfo = data[selectedCountryName];

    // Clear any existing metadata
    let sampleMetadata = d3.select("#sample-metadata");
    sampleMetadata.html("");

    // Iterate through the country information and append each key-value pair
    for (let [key, value] of Object.entries(countryInfo)) {
        sampleMetadata
            .append("p")
            .text(`${key}: ${value}`);
    }
}

// Initialize the page
function init() {
    // Fetch the JSON data from the above URL
    d3.json(url).then(data => {
        console.log("Fetched JSON data:", data);
        countryNames=data.names;

        // Select the dropdown element
        let cdrdownn = d3.select("#selDataset");

        // Populate the dropdown options with country names
        for (let i = 0; i < countryNames.length; i++) {
            let countryName = countryNames[i];
            let option = cdrdownn.append("option");
            option.property("value", countryName);
            option.text(countryName);
        }

        // Define event for dropdown change and call the dropdownChange function
        cdrdownn.on("change", function () {
            // Get the selected country value
            let selectedCountryName = cdrdownn.property("value");
            dropdownChange(data, selectedCountryName);
        });

        // Create the initial data and visualizations
        let initialCountryName = Object.keys(data)[0];
        displayCountryInfo(data, initialCountryName);
        createpichartWithMostRecovered(data, initialCountryName);
        // createBarchartMostDeaths(data, initialCountryName);
        // createlinechartGDP(data, initialCountryName);
        // createCountryMap(data, initialCountryName);
    });
}

// Call the initialization function
init();