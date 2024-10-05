# app.py
import ee
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
projectid = 'ee-jays7'

# Initialize Earth Engine API
ee.Initialize(project=projectid)

# Load Hansen Global Forest Change dataset
forest_dataset = ee.Image("UMD/hansen/global_forest_change_2020_v1_8")

# Function to count trees in a polygon
def count_trees(polygon_coords):
    # Convert coordinates to Earth Engine polygon geometry
    polygon = ee.Geometry.Polygon(polygon_coords)

    # Tree cover (forest) is classified in the dataset where 'treecover2000' > 0
    tree_cover = forest_dataset.select(['treecover2000']).gt(10)

    # Get total area of forest within the polygon (in hectares)
    forest_area = tree_cover.multiply(ee.Image.pixelArea()).reduceRegion(
        reducer=ee.Reducer.sum(),
        geometry=polygon,
        scale=30,
        maxPixels=1e9
    )

    # Convert forest area from square meters to hectares
    tree_count_hectares = forest_area.get('treecover2000').getInfo() / 10000
    return tree_count_hectares

# API endpoint to receive coordinates and count trees
@app.route('/count-trees', methods=['POST'])
def count_trees_in_area():
    data = request.get_json()

    # Get the polygon coordinates from the frontend
    polygon_coords = data['coordinates']

    # Count trees in the provided polygon
    tree_count = count_trees(polygon_coords)

    return jsonify({'tree_count_hectares': tree_count})

if __name__ == "__main__":
    app.run(debug=True)
