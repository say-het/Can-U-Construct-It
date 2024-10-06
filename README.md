## Introduction
Our website focuses on environmental sustainability by using a map-based interface to collect user input. It allows users to analyze the environmental conditions of a selected area through an *Environmental Sustainability Score (ESS)* system. The system factors in:

- Air Quality
- Pollution Levels
- Humidity
- Number of Trees
- Temperature
- Wind Speed
- Soil Type
- Number of Buildings


## Environmental Sustainability Score (ESS)
The ESS report generates a score between *0 and 100*, which represents the sustainability of the construction. 

- *Low Scores* trigger the need for *remedies* to mitigate environmental impacts.
- These recommendations include methods to improve *air quality, reduce **pollution*, and more.

## Final Report and Mitigation Measures
The final report outlines:
- *Environmental Aspects* affected by construction.

- Demo: https://github.com/Jay-1409/Storage/blob/ca19018f0f0f54c1c1f5eb7a57b037a0b4e065fe/ESS_Report%20(6).pdf

- *Mitigation Measures* that help reduce the impact.

- Demo: https://github.com/Jay-1409/Storage/blob/bacf1ff2bfc9526685900996c717b15b4b9fa53f/Environmental_Sustainability_Report_(12)%5B1%5D.pdf

These measures focus on reducing pollution, improving air quality, and other environmental factors based on the selected building type and its associated data.

## Frontend Output
Our website generates the following output for users after data collection and ESS analysis:

- Fuel Emissions
- Impact Category
- Material Usage
- Overall Impact
- PM10 Emissions
- Total Emissions

These outputs provide a comprehensive analysis of the environmental effects of the construction and possible ways to mitigate negative impacts.


## Roadmap

- Additional browser support

- Add more integrations

## User Interaction Flow
1. *Map Selection (Leaflet):*
   - Users select a location on a map.
   - The map displays the current environmental conditions of the area through the ESS system.

2. *Building Type Selection:*
   - Users can choose from four types of buildings to construct:
     - *Factory*
     - *Flat*
     - *Tenement*
     - *Commercial Building*

## Data Collection Forms
Once a building type is selected, the user is prompted to fill out specific forms for each building type:

- *Factory*:
  - Floors
  - Depth
  - Fuel
  - Product

- *Flat*:
  - Floors
  - Depth
  - Number of Apartments

- *Tenement*:
  - Floors
  - Depth
  - Number of Vehicles

- *Commercial Building*:
  - Floors
  - Depth (Parking)
  - Number of Stores
  - Number of Vehicles

## Screenshots / Demo

- Select Area
![App Screenshot](https://github.com/Jay-1409/Storage/blob/main/maps.png?raw=true)

- View the current condition
![App Screenshot](https://github.com/Jay-1409/Storage/blob/main/curre.png?raw=true)

- Environmental changes
![App Screenshot](https://github.com/Jay-1409/Storage/blob/main/aftercons.png?raw=true)

Earth Engine Dataset for Tree Counting (Forest Cover)
https://developers.google.com/earth-engine/datasets/catalog/UMD_hansen_global_forest_change_2023_v1_11

Earthquake Risk Data (Random Forest AI model)
https://www.kaggle.com/datasets/parulpandey/indian-earthquakes-dataset2018-onwards

Flood Risk Data (Random Forest AI model)
https://www.kaggle.com/datasets/s3programmer/flood-risk-in-india




