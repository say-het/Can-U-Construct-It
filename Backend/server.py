# app.py
import ee
import json
from flask import Flask, request, jsonify
from flask_cors import cross_origin

app = Flask(__name__)
# CORS(app)

projectid = 'ee-jays7'

# Initialize Earth Engine API
ee.Initialize(project=projectid)

# Load Hansen Global Forest Change dataset
forest_dataset = ee.Image("UMD/hansen/global_forest_change_2023_v1_11")

# Function to count trees in a polygon
def count_trees(polygon_coords):
    # Convert coordinates to Earth Engine polygon geometry
    polygon = ee.Geometry.Polygon(polygon_coords)

    # Tree cover (forest) is classified where 'treecover2000' > 0 (meaning any tree cover)
    tree_cover = forest_dataset.select(['treecover2000']).gt(1)  # Lower threshold to include more tree cover

    # Get total area of tree cover within the polygon (in square meters)
    forest_area = tree_cover.multiply(ee.Image.pixelArea()).reduceRegion(
        reducer=ee.Reducer.sum(),
        geometry=polygon,
        scale=30,  # 30m per pixel scale (same as the resolution of the dataset)
        maxPixels=1e9
    )

    # Get tree cover info (debugging/logging)
    print("Forest area info:", forest_area.getInfo())

    # Check if 'treecover2000' key exists in the forest_area (it might be missing in areas with no trees)
    forest_area_value = forest_area.get('treecover2000')
    if forest_area_value is None:
        return 0  # No tree cover in the area

    # Convert forest area from square meters to hectares (1 hectare = 10,000 square meters)
    forest_area_hectares = forest_area_value.getInfo() / 10000

    # Estimate the number of trees based on an average density (e.g., 200 trees per hectare)
    tree_density_per_hectare = 200  # Adjust this based on the type of forest or region
    estimated_tree_count = forest_area_hectares * tree_density_per_hectare

    return estimated_tree_count

# API endpoint to receive coordinates and count trees
# @app.route('/count-trees', methods=['POST'])
@app.route('/count-trees', methods=['POST'])
@cross_origin()
def count_trees_in_area():
    data = request.get_json()

    # Get the polygon coordinates from the frontend
    polygon_coords = data['coordinates']

    # Count trees in the provided polygon
    estimated_tree_count = count_trees(polygon_coords)

    return jsonify({'estimated_tree_count': estimated_tree_count})

if __name__ == "__main__":
    app.run(debug=True,port=5000,host='0.0.0.0')
