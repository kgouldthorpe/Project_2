import os

import pandas as pd
import numpy as np

import sqlalchemy
import sqlite3
import pandas as pd
import sys
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine

from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///db/background.db"
db = SQLAlchemy(app)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# Save references to each table
geo_states = Base.classes.geo_states



#################################################
# Database Setup
#################################################

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index2.html")

@app.route("/getstates")
def getstates():

    sel = [
        geo_states.name,
        geo_states.abv]

    results = db.session.query(*sel).all()
    df = pd.DataFrame(results, columns=['name', 'abv'])
    return jsonify(df.to_dict(orient="list"))

    # Create a dictionary entry for each row of metadata information
    # sample_metadata = {}
    # print(results, file=sys.stdout)
    # for result in results:
    #     sample_metadata["name"] = result[0]
    #     sample_metadata["abv"] = result[1]
    #
    # print(sample_metadata,file=sys.stdout)
    # return jsonify(sample_metadata)

@app.route("/getMapData/<selectedstate>")
def getMapData(selectedstate):
    print(selectedstate, file=sys.stdout)
    sel = [
        geo_states.name,
        geo_states.abv,
        geo_states.latitude,
        geo_states.longitude]

    results = db.session.query(*sel).filter(geo_states.name == selectedstate).all()
    df = pd.DataFrame(results, columns=['name','abv','latitude','longitude'])
    state_name = df.iloc[0, 0]
    print(state_name, file=sys.stdout)
    state_abv = df.iloc[0, 1]
    print(state_abv, file=sys.stdout)
    state_lat = str(df.iloc[0, 2])
    print(state_lat, file=sys.stdout)
    state_lon = str(df.iloc[0, 3])
    print(state_lon, file=sys.stdout)
    data = {
        "state_name": state_name,
        "state_abv" : state_abv,
        "state_lat" : state_lat,
        "state_lon" : state_lon
    }
    return jsonify(data)

@app.route("/buildPlot/<selectedstate>")
def buildPlot(selectedstate):
    print(selectedstate, file=sys.stdout)
    sel = [
        geo_states.name,
        geo_states.abv,
        geo_states.latitude,
        geo_states.longitude]

    results = db.session.query(*sel).filter(geo_states.name == selectedstate).all()
    df = pd.DataFrame(results, columns=['name','abv','latitude','longitude'])
    state_name = df.iloc[0, 0]
    print(state_name, file=sys.stdout)
    state_abv = df.iloc[0, 1]
    print(state_abv, file=sys.stdout)
    state_lat = str(df.iloc[0, 2])
    print(state_lat, file=sys.stdout)
    state_lon = str(df.iloc[0, 3])
    print(state_lon, file=sys.stdout)
    data = {
        "state_name": state_name,
        "state_abv" : state_abv,
        "state_lat" : state_lat,
        "state_lon" : state_lon
    }
    return jsonify(data)

if __name__ == "__main__":
    app.run()

