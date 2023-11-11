![Illustration of the COVID-19 pandemic's impact](https://www.cgdev.org/sites/default/files/styles/large/public/evans-acosta-covid-roundup-may4-wordcloud.png?itok=7wbZIaib)
# Country readiness and global implication of the Covid-19 Pandemic

# Tools
- Flask
- Python
- JavaScript
- HTML
- CSS
- Plotly

# Collaboraters
- Kavish Naran
- Hossein Falsafi
- Rachel Tran
- Steve Ramasamy

# Content:
### 1-Data Cleaning
### 2-SQLite Database development 
### 3-Flask Description
### 4-Web Scrapping
### 5-Back End coding that used Javascript/ HTML to develop dropdown and visualisation on a dashboard
### 6-A new JavaScript library not shown in class


## 1-Data Cleaning
The COVID-19 data was retrieved from this API: **`https://coronavirus-smartable.p.rapidapi.com/stats/v1/global/`** . This endpoint returns a JSON that contains COVID-related information for more than 240 regions across the world. The information provided by this JSON object includes:
1. **`countryOrregion`**
2. **`location`**: **`lon`** and **`lat`**
3. **`provinceOrState`**
4. **`county`**
5. **`isoCode`**
6. **`totalConfirmedCases`**
7. **`newlyConfirmedCases`**
8. **`totalDeaths`**
9. **`newDeaths`**
10. **`totalRecoveredCases`**
11. **`newlyRecoveredCases`**
## 2-SQLite Database development 

This database is named countiesdata.sqlite, contains information about COVID-19 and economic indicators for various countries.

### Database Development

### Loading Data
- The data is loaded from "final_sorted_df.csv", which was created in data cleaning step into a Pandas DataFrame.

### Database Connection
- An SQLite database engine named "countiesdata.sqlite" is created using SQLAlchemy.

### Schema Definition
- The `CountryData` class defines the structure of the "country_data" table.

### Table Creation
- The "country_data" table is created in the SQLite database.

### Data Insertion
- Data from the DataFrame is inserted into the "country_data" table.

### Database Inspection
- The SQLAlchemy Inspector is used to check the existence of the "country_data" table.

### Cleanup
- The database session is closed to release resources.



## 3-Flask Description

The Flask app is designed to provide COVID-19-related data for various countries through an API. It utilises Flask for web services, SQLAlchemy for database interaction, and Flask-CORS for cross-origin support. The app offers dynamic routes to fetch information for specific countries and a route to retrieve a list of all available countries. The code establishes a connection to a SQLite database, maps its structure using SQLAlchemy, and responds with JSON data for API requests.


### Instruction on how to make API available for Javascript
1. Clone the repository to your local machine.
2. Ensure you have Python and Flask installed.
3. Install the required dependencies using `pip install -r requirements.txt`.
4. Run the app using `python app.py`.
Note: Ensure you are on the same path as the app.py is stored.
5. Access the API routes as described below.

### API Routes
- **`/`**: Returns a JSON list of available routes and their descriptions.
- **`/api/v1.0/<country_name>`**: Get data for a specific country by providing the country name.
- **`/api/v1.0/allcountries`**: Get a list of all available countries in the database.

### Example Usage
- To get data for a specific country: `/api/v1.0/CountryName`
- To get a list of all available countries: `/api/v1.0/allcountries`

### Note
- The database file is connected to the database created in previous steps (`countiesdata.sqlite`) and it should be placed in the appropriate location.



## 5-Back End coding that used Javascript/ HTML to develop dropdown and visualisation on a dashboard

### Country readiness and global implication of Covid-19 Pandemic

This interactive dashboard visualises COVID-19 data, including country map, recovered cases, deaths, GDP, and vaccine doses.

#### Features:

- **Dropdown Interaction:** Users can select a country to view detailed information and visualisations will be updated to provide comparison between the selected country and other data availabe on the other graphs.

- **Data Fetching:** Utilizes D3.js to fetch JSON data from a Flask API endpoint.
- **Visualization Types:**
  - **Pie Chart:** Displays the percentage of recovered cases for the selected country.
  - **Bar Chart:** Illustrates the top 10 countries with the most deaths compared to a selected country's (from the drop-down menu).
  - **Line Chart:** Compares the total GDP over five years for countries with the highest deaths or recovered cases.
  - **Grouped Bar Chart:** Highlights the COVID-19 vaccine doses and additional doses per 100 people for selected countries.
  - **Leaflet Map:** Provides a geographical representation of COVID-19 confirmed cases for different countries.

### Code Structure:

- **URL Definition:** Specifies the Flask API endpoint for data retrieval.
- **Mapping:** Maps backend data attributes to user-friendly names for display.
- **Visualisation Functions:**
  - `createCovidVaccineDoses`: Generates a grouped bar chart for vaccine doses per 100 people.
  - `createlinechartGDP`: Creates a line chart comparing GDP for countries with high deaths or recoveries.
  - `createBarchartMostDeaths`: Displays a bar chart of the top 10 countries with the most deaths.
  - `createCountryMap`: Renders a Leaflet map showing confirmed cases geographically.
- **Dropdown Change Event Handling:** Calls various visualisation functions on dropdown selection.
- **Initialization Function (`init`):** Fetches initial data, populates dropdown and creates initial visualisations.



## 6-A new JavaScript library not shown in class

This JavaScript code utilises the Highcharts library to generate an interactive pie chart that visualises recovered cases in the top 10 countries, including the selected country. The code is structured as a function and invoked by the init() function and HTML.


