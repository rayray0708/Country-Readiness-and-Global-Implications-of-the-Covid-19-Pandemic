from flask import Flask, jsonify
#Create an app, being sure to pass __name__
#################################################
# Flask Setup
################################################# 
app = Flask(__name__)

# Define a dictionary of routes and their descriptions
routes_dic = {
    "/api/v1.0/country/<country_name>": "Get data for a specific country by providing the country name in the URL.",
    "/api/v1.0/all_countries": "Get a list of all available countries in the database.",
}

#################################################
# Flask Routes
#################################################
# 1. Define static routes
@app.route("/")
def get_routes():
    return jsonify(routes_dic)

# Define a route to get data for a specific country
@app.route("/api/v1.0/country/<country_name>")
def get_country_data(country_name):
    # Implement your code to fetch data for the specific country based on the provided country_name
    # You can query your SQLite database or use any other data source to get the data
    # Then return the data as a JSON response

    # Example:
    country_data = {
        "country_name": country_name,
        "total_confirmed_cases": 1000,
        "total_deaths": 100,
        "total_recovered_cases": 900,
        # Add other data fields as needed
    }

    return jsonify(country_data)

# Define a route to get a list of all available countries
@app.route("/api/v1.0/all_countries")
def get_all_countries():
    # Implement your code to fetch a list of all available countries from your database
    # You can query your SQLite database or use any other data source
    # Then return the list of countries as a JSON response

    # Example:
    all_countries = ["Country1", "Country2", "Country3"]  # Replace with your actual data

    return jsonify(all_countries)

# 1. Define main behaviour
if __name__ == "__main__":
    app.run(debug=True)
