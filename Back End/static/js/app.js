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
    d3.json(url).then(data => {("Fetched data:", data);
        // Extract the list of OTU IDs
        let ctrylist = data;
        console.log(ctrylist)
        
    //     // Select the OTU dropdown element
    //     let otuDropdown = d3.select("#selDataset");

    //     // Populate the dropdown options with OTU values
    //     for (let i = 0; i < otuIds.length; i++) {
    //         let otuId = otuIds[i];
    //         let option = otuDropdown.append("option");
    //         option.property("value", otuId);
    //         option.text(`OTU ${otuId}`);
    //     }

    //     // Define event for dropdown change and call the function to update charts
    //     otuDropdown.on("change", function() {
    //         let selectedOTU = otuDropdown.property("value");
    //         dropdownChange(data, selectedOTU); 
    //     });

    //     // Create the initial bar chart and bubble chart with the first OTU
    //     top10recoverepie(data, otuIds[0]);
    //     top10death(data, otuIds[0]);
    //     SNHameshphiermostdeath(data, otuIds[0]);
    //     top10vaccination(data, otuIds[0]);
    });
}

// Call the initialization function
init();