// Function to create the Pie chart- top 10 recovered
// function top10recoverepie(data, selectedOTU) {
    
// }


// Function to create the Pie chart- top 10 death
// function top10death(data, selectedOTU) {
    
// }

// Function to create the death breakdown per Southern Northern Hemisphere
// function SNHameshphiermostdeath(data, selectedOTU) {
    
// }

// Function to create the top 10 vaccination-bar chart
// function top10vaccination(data, selectedOTU) {
    
// }


// // Function to handle dropdown change
// function dropdownChange(data, selectedOTU) {
//     top10vaccination(data, selectedOTU);
//     SNHameshphiermostdeath(data, selectedOTU);
//     top10death(data, selectedOTU);
//     top10recoverepie(data, selectedOTU);
// }

// // Function to display sample metadata for the displayDemographicInfo
// function displayDemographicInfo(data, selectedOTU) {
//     console.log("Selected OTU data:", data); 
//  // Find the selected OTU data from the samples array using filter
//     let metadata = data.metadata.filter(item => item.id == selectedOTU)[0];
//     console.log("Selected metadata:", metadata);

//     let sampleMetadata = d3.select("#sample-metadata");

//     // Clear any existing metadata
//     sampleMetadata.html("");

//     // Iterate through the metadata and append each key-value pair
//     for (let [key, value] of Object.entries(metadata)) {
//         sampleMetadata
//             .append("p")
//             .text(`${key}: ${value}`);
//     }
// }

// Define the URL to fetch the data
let url = "http://127.0.0.1:5000/api/v1.0/allcountries";

// Initialize the page
function init() {
    // Fetch the JSON data from the above URL
    d3.json(url).then(data => {
        // Extract the list of country data
        let countryData = data;

        // Iterate through the country data and create a dictionary
        let countryInfo = {};
        for (let countryName in countryData) {
            let country = countryData[countryName];
            countryInfo[countryName] = {
                "booster_doses_per_100people": country.booster_doses_per_100people,
                "country_name": country.country_name,
                "gdp_2015": country.gdp_2015,
                "gdp_2016": country.gdp_2016,
                "gdp_2017": country.gdp_2017,
                "gdp_2018": country.gdp_2018,
                "gdp_2019": country.gdp_2019,
                "lat": country.lat,
                "lon": country.lon,
                "new_deaths": country.new_deaths,
                "newly_confirmed_cases": country.newly_confirmed_cases,
                "newly_recovered_cases": country.newly_recovered_cases,
                "total_confirmed_cases": country.total_confirmed_cases,
                "total_deaths": country.total_deaths,
                "total_recovered_cases": country.total_recovered_cases,
                "total_vaccine_doses_administered_per_100population": country.total_vaccine_doses_administered_per_100population
            };
        }
        let countryNames = data.names;
        
        // Now, countryNames contains the list of country names
        console.log(countryNames);

        // You can now access country information like this:
        let afghanistanInfo = countryInfo["Albania"];
        console.log(afghanistanInfo);
    });
}


// Call the initialization function
init();