// Define the URL to fetch the data
let url = "http://127.0.0.1:5000/api/v1.0/allcountries";


// Create a function to plot top 10 countries w/ most deaths
// 1. Extract data from Flask app using D3
function createBarchartMostDeaths(data,selectedCountryName) {
    // Create an array of objects with country names and recovered cases
    console.log(data);
    let countryObjects = [];
    console.log(countryObjects);

    for (let countryName in data) {
        console.log(countryName);

        countryObjects.push({
            country_name: countryName,
            total_deaths: data[countryName].total_deaths
        });
    }

    // 2. Filter data for plotting
    // Sort "countryObjects" in descending order using .sort() function based on the "Total Deaths" column
    let sortedArray = countryObjects.sort((a,b) => b.total_deaths - a.total_deaths);
    console.log(sortedArray);

    // If the selected country is found, include it in the top 10
    let selectedCountryDeathsData = countryObjects.find(country => country.country_name === selectedCountryName);
    if (selectedCountryDeathsData) {
        countryObjects.unshift(selectedCountryDeathsData);
    }

    // Slice the first 10 countries/objects using .slice() function and save them in the array "top10Countries"
    let slicedArray = sortedArray.slice(0,11);
    console.log(slicedArray);

    // Extract the country name for each country in "top10Countries" using .map() and arrow functions and save them in "namesTop10"    
    let namesTop10 = slicedArray.map(object => object.country_name);
    console.log(namesTop10);

    // Extract the number of "Total Deaths" for each country in "top10Countries" using .map() and arrow functions and save them in "deathsTop10"
    let deathsTop10 = slicedArray.map(object => object.total_deaths)
    console.log(deathsTop10);

    // 3. Plot the data
    let x_values = namesTop10;
    let y_values = deathsTop10;

    const plotData = [{
        x: x_values,
        y: y_values,
        type: 'bar',
    }];

    let layout = {
        title: `Top 10 Countries with the Most Deaths in COVID-19 Compared to ${selectedCountryName}`
    };
    // Update the bar chart
    Plotly.newPlot('bar', plotData, layout);
};


// function createlinechartGDP(data, selectedCountryName) {


// }


// function createCountryMap(data, selectedCountryName) {


// }




function createpichartWithMostRecovered(data, selectedCountryName) {
    console.log("Creating pie chart with most recovered cases for country:", selectedCountryName);

    // Create an array of objects with country names and recovered cases
    let countriesWithRecovered = [];
    console.log(countriesWithRecovered);

    for (let countryName in data) {
        console.log(countryName);

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
    createBarchartMostDeaths(data,selectedCountryName);
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
        createBarchartMostDeaths(data, initialCountryName);
        // createlinechartGDP(data, initialCountryName);
        // createCountryMap(data, initialCountryName);
    });
}

// Call the initialization function
init();