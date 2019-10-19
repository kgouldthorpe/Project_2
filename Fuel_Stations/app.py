import os

import pandas as pd
import numpy as np
import sys
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from sqlalchemy import func



#################################################
# Database Setup
#################################################

engine = create_engine("sqlite:///db/citiesdb.sqlite",echo=False)
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)
print(Base.classes.keys(),file=sys.stdout)
# Save references to each table
#Cities_Metadata = Base.classes.cities_metadata

#Cities = Base.classes.cities



# @app.route("/names")
# def names():
#     """Return a list of sample names."""
#
#     # Use Pandas to perform the sql query
#     stmt = db.session.query(Cities).statement
#     df = pd.read_sql_query(stmt, db.session.bind)
#
#     # Return a list of the column names (sample names)
#     return jsonify(list(df.columns)[2:])


# reflect an existing database into a new model
#if __name__ == "__main__":
#    app.run()
