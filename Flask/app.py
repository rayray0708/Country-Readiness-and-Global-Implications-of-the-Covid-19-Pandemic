from flask import Flask, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.ext.automap import automap_base

#Create an app, being sure to pass __name__
#################################################
# Flask Setup
################################################# 
app = Flask(__name__)

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
        "total_confirmed_cases": country_data.total_confirmed_cases,
        "newly_confirmed_cases": country_data.newly_confirmed_cases,
        "total_deaths": country_data.total_deaths,
        "new_deaths": country_data.new_deaths,
        "total_recovered_cases": country_data.total_recovered_cases,
        "newly_recovered_cases": country_data.newly_recovered_cases,
        "iso_code": country_data.iso_code,
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
    allcountries = [row.country_name for row in all_countries]

    # Close the session to release resources
    session.close()

    # Return the list of all distinct country names as a JSON response
    return jsonify(allcountries)

# Main behavior
if __name__ == "__main__":
    app.run(debug=True)