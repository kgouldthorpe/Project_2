CREATE TABLE data(
city VARCHAR(50),
state_id VARCHAR(10),
state_name VARCHAR(50),
lat FLOAT,
lng FLOAT)

COPY data (city, state_id, state_name, lat, lng)
FROM 'C:\Users\kenda\OneDrive\Documents\GitHub\Project_2\city_data.csv'
WITH DELIMITER ',';
