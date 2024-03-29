from flask import Flask, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from flask_cors import CORS
from sqlalchemy.ext.automap import automap_base

#Create an app, being sure to pass __name__
#################################################
# Flask Setup
################################################# 
app = Flask(__name__)
CORS(app)
# Define a dictionary of routes and their descriptions
routes_dict = {
    "/api/v1.0/": "Return a JSON list of routes.",
    "/api/v1.0/allcountries": "Get a list of all available countries in the database.",
    "/api/v1.0/<country_name>": "Get data for a specific country by providing the country name in the database.",
}


#################################################
# Flask Routes
#################################################
# 1. Define static routes
@app.route("/")
def get_routes():
    return jsonify(routes_dict)

# Define a route to get data for a specific country
@app.route("/api/v1.0/<country_name>")
def get_country(country_name):
    # Create an SQLAlchemy engine to connect to the 'countiesdata.sqlite' database
    engine = create_engine(f"sqlite:///../database/output/countiesdata.sqlite")
    conn = engine.connect()
    # Create a session to work with the database
    session = Session(bind=engine)
    # reflect an existing database into a new model
    Base = automap_base()

    # reflect the tables
    Base.prepare(autoload_with=engine)

    # View all of the classes that automap found
    Base.classes.keys()

    # Save references to each table
    CountryData = Base.classes.country_data

    # Query the database to retrieve country data based on the provided country_name
    country_data = session.query(CountryData).filter_by(country_name=country_name).first()

    
        # Convert the data to a dictionary for easy JSON serialization
    country_data_dict = {
        "country_name": country_data.country_name,
        "gdp_2015": country_data.gdp_2015,
        "gdp_2016": country_data.gdp_2016,
        "gdp_2017": country_data.gdp_2017,
        "gdp_2018": country_data.gdp_2018,
        "gdp_2019": country_data.gdp_2019,
        "booster_doses_per_100people": country_data.booster_doses_per_100people,
        "total_vaccine_doses_administered_per_100population": country_data.total_vaccine_doses_administered_per_100population,
        "total_confirmed_cases": country_data.total_confirmed_cases,
        "newly_confirmed_cases": country_data.newly_confirmed_cases,
        "total_deaths": country_data.total_deaths,
        "new_deaths": country_data.new_deaths,
        "total_recovered_cases": country_data.total_recovered_cases,
        "newly_recovered_cases": country_data.newly_recovered_cases,
        "lat": country_data.lat,
        "lon": country_data.lon
    }
    session.close()
    return jsonify(country_data_dict)

# Define a route to get a list of all available countries
@app.route("/api/v1.0/allcountries")
def allcountries():
    
    # Create an SQLAlchemy engine to connect to the 'countiesdata.sqlite' database
    engine = create_engine(f"sqlite:///../database/output/countiesdata.sqlite")
    conn = engine.connect()
    # Create a session to work with the database
    session = Session(bind=engine)
    # # reflect an existing database into a new model
    Base = automap_base()

    # # reflect the tables
    Base.prepare(autoload_with=engine)

    # View all of the classes that automap found
    # return("this is my countries")
    # return(Base.classes.keys())
    
    # Save references to each table
    CountryData = Base.classes.country_data

    # Query the database to retrieve distinct country names
    all_countries = session.query(CountryData.country_name).distinct().all()

    # Extract the country names from the query results
    # allcountries = [row.country_name for row in all_countries]
    # Initialize an empty dictionary to store country data
    country_data_dict = {}

    # Create a list of all country names
    country_names = [row[0] for row in all_countries]

    # Add the list of country names to the dictionary
    country_data_dict['names'] = country_names

    # Iterate through the country data and add it to the dictionary
    for row in all_countries:
        country_name = row[0]
        country_data = session.query(CountryData).filter_by(country_name=country_name).first()

        if country_data:
            country_data_dict[country_name] = {
                "country_name": country_data.country_name,
                "gdp_2015": country_data.gdp_2015,
                "gdp_2016": country_data.gdp_2016,
                "gdp_2017": country_data.gdp_2017,
                "gdp_2018": country_data.gdp_2018,
                "gdp_2019": country_data.gdp_2019,
                "booster_doses_per_100people": country_data.booster_doses_per_100people,
                "total_vaccine_doses_administered_per_100population": country_data.total_vaccine_doses_administered_per_100population,
                "total_confirmed_cases": country_data.total_confirmed_cases,
                "newly_confirmed_cases": country_data.newly_confirmed_cases,
                "total_deaths": country_data.total_deaths,
                "new_deaths": country_data.new_deaths,
                "total_recovered_cases": country_data.total_recovered_cases,
                "newly_recovered_cases": country_data.newly_recovered_cases,
                "lat": country_data.lat,
                "lon": country_data.lon
            }

    # Close the session to release resources
    session.close()

    # Return the list of all distinct country names as a JSON response
    return jsonify(country_data_dict)

# Main behavior
if __name__ == "__main__":
    app.run(debug=True)