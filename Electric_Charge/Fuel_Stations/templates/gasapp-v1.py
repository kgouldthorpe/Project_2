import sqlite3
import pandas as pd

# load data from csv file to sqlite database

df = pd.read_csv('cities.csv')

df.columns = df.columns.str.strip()
conn = sqlite3.connect("citiesdb.sqlite")

df.to_sql ("cities", conn)

conn.close()

