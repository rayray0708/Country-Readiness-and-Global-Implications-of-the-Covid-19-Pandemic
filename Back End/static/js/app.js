// Define the URL to fetch the data
let url = "http://127.0.0.1:5000/api/v1.0/allcountries";

function createCountryMap(data, selectedCountryName) {
    console.log("Creating stacked chart with most vaccinated per 100 population for country:", selectedCountryName);
    
      // Create an array of objects with country names and vaccine per 100 people
      let countriesWithVaccine = [];
      for (let countryName in data) {
          countriesWithVaccine.push({
              country_name: countryName,
              Vaccine_per100: data[countryName].total_vaccine_doses_administered_per_100population,
              
          });   
      }
      // Create an array of objects with country names and addtional dozes per 100 people
      let countriesWithDose = [];
      for (let countryName in data) {
          countriesWithDose.push({
              country_name: countryName,
              Dose_per100: data[countryName].booster_doses_per_100people,
              
          });
          
      }
      // Sort the array based on total vaccines per in descending order
    countriesWithVaccine.sort((a, b) => b.Vaccine_per100 - a.Vaccine_per100);
    console.table(`This the mesagae ${countriesWithVaccine}`)
    // Extract data for the selected country
    let selectedCountryVaccineData = countriesWithVaccine.find(country => country.country_name === selectedCountryName);

     // Sort the array based on addtional vaccine doses per in descending order
     countriesWithDose.sort((a, b) => b.Dose_per100 - a.Dose_per100);
     console.table(`This the mesagae ${countriesWithVaccine}`)
     // Extract data for the selected country
     let selectedCountryDoseData = countriesWithVaccine.find(country => country.country_name === selectedCountryName);

    // If the selected country is found, include it in the top 10
    if (selectedCountryVaccineData) {
        countriesWithVaccine.unshift(selectedCountryVaccineData);
    }
    // If the selected country is found, include it in the top 10
    if (selectedCountryDoseData) {
        countriesWithDose.unshift(selectedCountryDoseData);
    }
    // Extract the label (country names) and values (vaccine per 100) for the top 10 
    let labels = countriesWithVaccine.slice(0, 11).map(country => country.country_name);
    let values = countriesWithVaccine.slice(0, 11).map(country => country.Vaccine_per100);
    
        // Extract the label (country names) and values (additional doses per 100) for the top 10 
        let labels2 = countriesWithDose.slice(0, 11).map(country => country.country_name);
        let values2 = countriesWithDose.slice(0, 11).map(country => country.Dose_per100);
    
    // Create the bar chart for vaccine per 100
    let BarData = {
         y: values,
         x: labels,
         name: 'Total Vaccine Doses Per 100 People',
        type: 'bar'
    };

    // Create the bar chart for additional doses per 100
    let addtionalDose = {
        y: values2,
        x: labels2,
        name: 'Additional Does Per 100 People',
       type: 'bar'
   };

    var data = [BarData, addtionalDose]
    let Layout = {barmode: 'group'};

    // Plot Chart
    Plotly.newPlot('bar-chart2', data, Layout);
   
 }

 
function createlinechartGDP(data, selectedCountryName) {
    console.log("Creating line chart of GDP for the most recovered cases country:", selectedCountryName);

    // Create an array of objects with country names and recovered cases
    let GDP = [];
    for (let countryName in data) {
        GDP.push({
            country_name: countryName,
            total_recovered_cases: data[countryName].total_recovered_cases,
            GDPall: (data[countryName].gdp_2015+data[countryName].gdp_2016+data[countryName].gdp_2017+data[countryName].gdp_2018+data[countryName].gdp_2019)
        });
    }

    // Sort the array based on total recovered cases in descending order
    GDP.sort((a, b) => b.total_recovered_cases - a.total_recovered_cases);

    // Extract data for the selected country
    let selectedCountryGDP = GDP.find(country => country.country_name === selectedCountryName);

    // If the selected country is found, include it in the top 10
    if (selectedCountryGDP) {
        GDP.unshift(selectedCountryGDP);
    }
    // console.log("selectedCountryGDP:", selectedCountryGDP);
    // Extract labels (country names) and values (recovered cases) for the top 10 or 11 countries
    let labels = GDP.slice(0, 11).map(country => country.country_name);
    let values = GDP.slice(0, 11).map(country => country.GDPall);
    console.log("line chart label:",labels);
    console.log("Line chart Values:",values);

    // Create the pie chart
    let lineData = [{
        x: labels,
        y: values,
        type: 'line'
    }];

    let lineLayout = {
        title: `Total 5 years GDP of Top 10 Country Recovered Cases Comparison with ${selectedCountryName}`
        
    };

    Plotly.newPlot('line-chart', lineData, lineLayout);

}




// function createCountryMap(data, selectedCountryName) {


// }


// Function to handle dropdown change event
function dropdownChange(data, selectedCountryName) {
    displayCountryInfo(data, selectedCountryName);
    createpichartWithMostRecovered(data, selectedCountryName);
    // createBarchartMostDeaths(data,selectedCountryName);
    createlinechartGDP(data,selectedCountryName);
    createCountryMap(data,selectedCountryName);
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
        createlinechartGDP(data, initialCountryName);
        createCountryMap(data, initialCountryName);
    });
}

// Call the initialisation function
init();