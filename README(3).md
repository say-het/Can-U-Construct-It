# Xtreme Mappers

**Xtreme Mappers** is dedicated to minimizing the environmental impact of new construction projects by analyzing and calculating the effects that building structures have on their surrounding environment. Our platform helps stakeholders make informed decisions to promote sustainable building practices and reduce harm to ecosystems.

We analyze multiple factors to assess how construction influences the local environment, such as:
- **Air Quality Index**: Measuring air pollution levels before and after construction.
- **Excavation Impact**: Quantifying PM-10 particle release due to earth digging.
- **Building Height**: Assessing changes in wind speed patterns caused by tall structures.
- **Post-construction Vehicle Density**: Estimating traffic congestion and its contribution to pollution.
- **And more**: Including noise pollution, waste management, and water resource effects.

## Key Features

- **Interactive Map Input**  
  Easily input construction coordinates via an intuitive, interactive map. Analyze potential environmental impacts before the project begins.  
  ![Interactive Map](https://github.com/Jay-1409/Storage/blob/main/maps.png?raw=true)

- **Environmental Sustainability Score (ESS)**  
  Display the current environmental conditions of a selected area through the ESS, which factors in air quality, pollution levels, and more.

- **Construction Type Selection**  
  Choose between various construction categories such as Commercial, Factory, Apartment, or Tenement. Tailored insights and recommendations based on your project type.

- **Carbon Emissions Calculator**  
  Estimate total carbon emissions across different fuel types using a comprehensive dataset.  
  ![Emissions Dataset](https://github.com/Jay-1409/Storage/blob/main/Screenshot%202024-10-06%20170132.png?raw=true)

- **Real-Time Environmental Conditions**  
  Monitor real-time data on the area’s environmental status, including air and water quality, to make more informed decisions.  
  ![Current Environmental Conditions](https://github.com/Jay-1409/Storage/blob/main/curre.png?raw=true)

- **Comprehensive Impact Assessment**  
  Analyze how your construction project affects multiple environmental factors, and categorize the project based on its environmental footprint.  
  ![Impact Report](https://github.com/Jay-1409/Storage/blob/main/minireport.png?raw=true)

- **Long-Term Impact Analysis**  
  Visualize the long-term environmental changes that could occur post-construction, helping you plan better for future sustainability.  
  ![Long-Term Impact](https://github.com/Jay-1409/Storage/blob/main/aftercons.png?raw=true)

- **Environmental Sustainability Report**  
  Generate detailed, data-driven sustainability reports to understand your construction’s impact and receive actionable insights to mitigate or compensate for the damage.  
  - [Sample Report 1](https://github.com/Jay-1409/Storage/blob/ca19018f0f0f54c1c1f5eb7a57b037a0b4e065fe/ESS_Report%20(6).pdf)  
  - [Sample Report 2](https://github.com/Jay-1409/Storage/blob/bacf1ff2bfc9526685900996c717b15b4b9fa53f/Environmental_Sustainability_Report_(12)%5B1%5D.pdf)

These reports guide stakeholders in taking steps to mitigate environmental impacts, ensuring a greener and more sustainable future for urban development.

# Website Workflow for Environmental Sustainability Analysis

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

## Environmental Sustainability Score (ESS)
The ESS report generates a score between *0 and 100*, which represents the sustainability of the construction. 

- *Low Scores* trigger the need for *remedies* to mitigate environmental impacts.
- These recommendations include methods to improve *air quality, reduce **pollution*, and more.

## Final Report and Mitigation Measures
The final report outlines:
- *Environmental Aspects* affected by construction.
- *Mitigation Measures* that help reduce the impact.

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

## Conclusion
Our platform enables users to make *environmentally conscious decisions* about construction. It provides *data-driven insights* and *recommendations* to help users reduce the environmental impact of their buildings.

---

This project supports sustainable construction by offering real-time environmental data and actionable insights for building design and planning.
