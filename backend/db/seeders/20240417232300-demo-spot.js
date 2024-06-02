'use strict';
const { Spot } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Spots';
options.validate = true;




const demoSpots = [
  {
    "ownerId": 1,
    "address": "123 Disney Lane",
    "city": "San Francisco",
    "state": "California",
    "country": "United States of America",
    "lat": 37.764535,
    "lng": -122.473032,
    "name": "Mickey's Meadow",
    "description": "Open field perfect for camping or family gatherings",
    "price": 123,
  },
  {
    "ownerId": 1,
    "address": "123 Sand Street",
    "city": "Fort Lauderdale",
    "state": "Florida",
    "country": "United States of America",
    "lat": 39.764535,
    "lng": -90.473032,
    "name": "Sandy Shores",
    "description": "Ideal for beach camping and recreational activities",
    "price": 159,
  },
  {
    "ownerId": 2,
    "address": "123 River Road",
    "city": "Biloxi",
    "state": "Mississippi",
    "country": "United States of America",
    "lat": 39.764535,
    "lng": -101.473032,
    "name": "Riverfront Retreat",
    "description": "Perfect spot for fishing and riverside camping",
    "price": 89,
  },
  {
    "ownerId": 3,
    "address": "123 Deep Forest Way",
    "city": "Seattle",
    "state": "Washington",
    "country": "United States of America",
    "lat": 33.764535,
    "lng": -123.473032,
    "name": "Forest Clearing",
    "description": "Secluded woodland area for camping and nature retreats",
    "price": 189,
  },
  {
    "ownerId": 3,
    "address": "123 Dead End Street",
    "city": "Wichita",
    "state": "Kansas",
    "country": "United States of America",
    "lat": 42.764535,
    "lng": -110.473032,
    "name": "Prairie Pasture",
    "description": "Quiet pasture land, great for RVs and livestock grazing",
    "price": 225,
  },
  {
    "ownerId": 4,
    "address": "456 Sunset Blvd",
    "city": "Los Angeles",
    "state": "California",
    "country": "United States of America",
    "lat": 34.052235,
    "lng": -118.243683,
    "name": "Sunset Acres",
    "description": "Spacious land with stunning sunset views, perfect for weddings",
    "price": 200,
  },
  {
    "ownerId": 5,
    "address": "789 Broadway",
    "city": "New York",
    "state": "New York",
    "country": "United States of America",
    "lat": 40.712776,
    "lng": -74.005974,
    "name": "Broadway Fields",
    "description": "Open space in the countryside, ideal for events and gatherings",
    "price": 275,
  },
  {
    "ownerId": 6,
    "address": "101 Main Street",
    "city": "Chicago",
    "state": "Illinois",
    "country": "United States of America",
    "lat": 41.878113,
    "lng": -87.629799,
    "name": "Windy Plains",
    "description": "Flat open land, great for camping or agricultural use",
    "price": 150,
  },
  {
    "ownerId": 7,
    "address": "202 Ocean Drive",
    "city": "Miami",
    "state": "Florida",
    "country": "United States of America",
    "lat": 25.761680,
    "lng": -80.191790,
    "name": "Oceanfront Lot",
    "description": "Beachfront land perfect for camping and water activities",
    "price": 300,
  },
  {
    "ownerId": 8,
    "address": "303 Pine Street",
    "city": "Denver",
    "state": "Colorado",
    "country": "United States of America",
    "lat": 39.739236,
    "lng": -104.990251,
    "name": "Mountain Meadow",
    "description": "Scenic mountain land for camping and hiking",
    "price": 175,
  },
  {
    "ownerId": 9,
    "address": "404 Elm Street",
    "city": "Dallas",
    "state": "Texas",
    "country": "United States of America",
    "lat": 32.776665,
    "lng": -96.796989,
    "name": "Lone Star Lot",
    "description": "Spacious land perfect for RVs and camping",
    "price": 140,
  },
  {
    "ownerId": 10,
    "address": "505 Bay Street",
    "city": "San Francisco",
    "state": "California",
    "country": "United States of America",
    "lat": 37.774929,
    "lng": -122.419418,
    "name": "Golden Gate Field",
    "description": "Land with views of the Golden Gate Bridge, ideal for gatherings",
    "price": 260,
  },
  {
    "ownerId": 11,
    "address": "606 Maple Avenue",
    "city": "Portland",
    "state": "Oregon",
    "country": "United States of America",
    "lat": 45.505106,
    "lng": -122.675026,
    "name": "Urban Land",
    "description": "Open urban space for pop-up events and markets",
    "price": 210,
  },
  {
    "ownerId": 12,
    "address": "707 Cedar Street",
    "city": "Nashville",
    "state": "Tennessee",
    "country": "United States of America",
    "lat": 36.162663,
    "lng": -86.781601,
    "name": "Music City Land",
    "description": "Versatile land ideal for concerts and gatherings",
    "price": 195,
  },
  {
    "ownerId": 13,
    "address": "808 Oak Lane",
    "city": "Austin",
    "state": "Texas",
    "country": "United States of America",
    "lat": 30.267153,
    "lng": -97.743057,
    "name": "Austin Acres",
    "description": "Open land in vibrant Austin, perfect for events",
    "price": 170,
  },
  {
    "ownerId": 14,
    "address": "909 Birch Road",
    "city": "Salt Lake City",
    "state": "Utah",
    "country": "United States of America",
    "lat": 40.760780,
    "lng": -111.891045,
    "name": "Ski Land",
    "description": "Land ideal for winter sports and camping",
    "price": 250,
  },
  {
    "ownerId": 15,
    "address": "1010 Aspen Drive",
    "city": "Boulder",
    "state": "Colorado",
    "country": "United States of America",
    "lat": 40.015000,
    "lng": -105.270546,
    "name": "Nature Land",
    "description": "Land surrounded by nature, perfect for camping",
    "price": 220,
  },
  {
    "ownerId": 16,
    "address": "1111 Cypress Lane",
    "city": "Phoenix",
    "state": "Arizona",
    "country": "United States of America",
    "lat": 33.448376,
    "lng": -112.074036,
    "name": "Desert Land",
    "description": "Serene desert land ideal for RVs and camping",
    "price": 145,
  },
  {
    "ownerId": 17,
    "address": "1212 Redwood Street",
    "city": "Sacramento",
    "state": "California",
    "country": "United States of America",
    "lat": 38.581573,
    "lng": -121.494400,
    "name": "Capitol Land",
    "description": "Land near downtown, perfect for events",
    "price": 130,
  },
  {
    "ownerId": 18,
    "address": "1313 Willow Road",
    "city": "Minneapolis",
    "state": "Minnesota",
    "country": "United States of America",
    "lat": 44.977753,
    "lng": -93.265015,
    "name": "Lakeside Land",
    "description": "Land by the lake, great for camping and water activities",
    "price": 185,
  },
  {
    "ownerId": 19,
    "address": "1414 Fir Lane",
    "city": "Charlotte",
    "state": "North Carolina",
    "country": "United States of America",
    "lat": 35.227085,
    "lng": -80.843124,
    "name": "Southern Land",
    "description": "Land with southern charm, perfect for events",
    "price": 160,
  },
  {
    "ownerId": 20,
    "address": "1515 Spruce Street",
    "city": "Savannah",
    "state": "Georgia",
    "country": "United States of America",
    "lat": 32.080898,
    "lng": -81.091203,
    "name": "Historic Land",
    "description": "Land in historic Savannah, great for weddings and gatherings",
    "price": 180,
  },
  {
    "ownerId": 1,
    "address": "1616 Dogwood Lane",
    "city": "New Orleans",
    "state": "Louisiana",
    "country": "United States of America",
    "lat": 29.951065,
    "lng": -90.071533,
    "name": "Bayou Land",
    "description": "Scenic land by the bayou, perfect for fishing and camping",
    "price": 140,
  },
  {
    "ownerId": 2,
    "address": "1717 Magnolia Street",
    "city": "Houston",
    "state": "Texas",
    "country": "United States of America",
    "lat": 29.760427,
    "lng": -95.369804,
    "name": "Urban Land",
    "description": "Versatile urban land ideal for pop-up markets and events",
    "price": 190,
  },
  {
    "ownerId": 3,
    "address": "1818 Juniper Avenue",
    "city": "Atlanta",
    "state": "Georgia",
    "country": "United States of America",
    "lat": 33.748995,
    "lng": -84.387982,
    "name": "Peach Orchard",
    "description": "Beautiful land with peach trees, great for picnics and gatherings",
    "price": 175,
  },
  {
    "ownerId": 4,
    "address": "1919 Cherry Street",
    "city": "Orlando",
    "state": "Florida",
    "country": "United States of America",
    "lat": 28.538336,
    "lng": -81.379234,
    "name": "Theme Park Land",
    "description": "Spacious land near theme parks, ideal for RVs and camping",
    "price": 160,
  },
  {
    "ownerId": 5,
    "address": "2020 Cedar Lane",
    "city": "Las Vegas",
    "state": "Nevada",
    "country": "United States of America",
    "lat": 36.169941,
    "lng": -115.139832,
    "name": "Desert Retreat",
    "description": "Open desert land perfect for camping and star gazing",
    "price": 180,
  },
  {
    "ownerId": 6,
    "address": "2121 Birch Road",
    "city": "San Diego",
    "state": "California",
    "country": "United States of America",
    "lat": 32.715736,
    "lng": -117.161087,
    "name": "Coastal Land",
    "description": "Coastal land ideal for beach camping and water activities",
    "price": 220,
  },
  {
    "ownerId": 7,
    "address": "2222 Elm Street",
    "city": "Seattle",
    "state": "Washington",
    "country": "United States of America",
    "lat": 47.606209,
    "lng": -122.332069,
    "name": "Evergreen Land",
    "description": "Forest land perfect for camping and hiking",
    "price": 170,
  },
  {
    "ownerId": 8,
    "address": "2323 Pine Street",
    "city": "Denver",
    "state": "Colorado",
    "country": "United States of America",
    "lat": 39.739236,
    "lng": -104.990251,
    "name": "Rocky Mountain Land",
    "description": "Mountain land ideal for outdoor activities and camping",
    "price": 190,
  },
  {
    "ownerId": 9,
    "address": "2424 Oak Lane",
    "city": "Chicago",
    "state": "Illinois",
    "country": "United States of America",
    "lat": 41.878113,
    "lng": -87.629799,
    "name": "Lakeshore Land",
    "description": "Land by the lake, perfect for fishing and camping",
    "price": 150,
  },
  {
    "ownerId": 10,
    "address": "2525 Maple Avenue",
    "city": "Portland",
    "state": "Oregon",
    "country": "United States of America",
    "lat": 45.505106,
    "lng": -122.675026,
    "name": "Urban Farm",
    "description": "Open land ideal for urban farming and events",
    "price": 230,
  },
  {
    "ownerId": 11,
    "address": "2626 Cedar Street",
    "city": "Nashville",
    "state": "Tennessee",
    "country": "United States of America",
    "lat": 36.162663,
    "lng": -86.781601,
    "name": "Music Land",
    "description": "Land perfect for outdoor concerts and gatherings",
    "price": 195,
  },
  {
    "ownerId": 12,
    "address": "2727 Dogwood Lane",
    "city": "Austin",
    "state": "Texas",
    "country": "United States of America",
    "lat": 30.267153,
    "lng": -97.743057,
    "name": "Hill Country Land",
    "description": "Scenic hill country land, ideal for camping and events",
    "price": 210,
  },
  {
    "ownerId": 13,
    "address": "2828 Redwood Street",
    "city": "Salt Lake City",
    "state": "Utah",
    "country": "United States of America",
    "lat": 40.760780,
    "lng": -111.891045,
    "name": "Salt Flats",
    "description": "Unique land near salt flats, great for photography and camping",
    "price": 180,
  },
  {
    "ownerId": 14,
    "address": "2929 Willow Road",
    "city": "San Francisco",
    "state": "California",
    "country": "United States of America",
    "lat": 37.774929,
    "lng": -122.419418,
    "name": "Bay Area Land",
    "description": "Open land with views of the bay, perfect for events",
    "price": 260,
  },
  {
    "ownerId": 15,
    "address": "3030 Fir Lane",
    "city": "Phoenix",
    "state": "Arizona",
    "country": "United States of America",
    "lat": 33.448376,
    "lng": -112.074036,
    "name": "Cactus Land",
    "description": "Desert land with cacti, great for camping and RVs",
    "price": 145,
  },
  {
    "ownerId": 16,
    "address": "3131 Spruce Street",
    "city": "Minneapolis",
    "state": "Minnesota",
    "country": "United States of America",
    "lat": 44.977753,
    "lng": -93.265015,
    "name": "Lakefront Land",
    "description": "Land by the lake, ideal for fishing and camping",
    "price": 185,
  },
  {
    "ownerId": 17,
    "address": "3232 Cypress Lane",
    "city": "Charlotte",
    "state": "North Carolina",
    "country": "United States of America",
    "lat": 35.227085,
    "lng": -80.843124,
    "name": "Southern Pasture",
    "description": "Pasture land great for events and livestock grazing",
    "price": 160,
  },
  {
    "ownerId": 18,
    "address": "3333 Juniper Avenue",
    "city": "New Orleans",
    "state": "Louisiana",
    "country": "United States of America",
    "lat": 29.951065,
    "lng": -90.071533,
    "name": "Jazz Land",
    "description": "Land in the heart of New Orleans, ideal for events and gatherings",
    "price": 190,
  },
  {
    "ownerId": 19,
    "address": "3434 Birch Road",
    "city": "Savannah",
    "state": "Georgia",
    "country": "United States of America",
    "lat": 32.080898,
    "lng": -81.091203,
    "name": "Historic Fields",
    "description": "Land in historic Savannah, perfect for weddings and events",
    "price": 180,
  },
  {
    "ownerId": 20,
    "address": "3535 Cherry Street",
    "city": "Houston",
    "state": "Texas",
    "country": "United States of America",
    "lat": 29.760427,
    "lng": -95.369804,
    "name": "Lone Star Field",
    "description": "Open field great for events and livestock grazing",
    "price": 140,
  },
  {
    "ownerId": 1,
    "address": "3636 Cedar Lane",
    "city": "San Diego",
    "state": "California",
    "country": "United States of America",
    "lat": 32.715736,
    "lng": -117.161087,
    "name": "Seaside Land",
    "description": "Coastal land ideal for beach camping and events",
    "price": 220,
  },
  {
    "ownerId": 2,
    "address": "3737 Oak Lane",
    "city": "Los Angeles",
    "state": "California",
    "country": "United States of America",
    "lat": 34.052235,
    "lng": -118.243683,
    "name": "Hollywood Hills Land",
    "description": "Scenic land in Hollywood Hills, great for events and camping",
    "price": 250,
  },
  {
    "ownerId": 3,
    "address": "3838 Maple Avenue",
    "city": "Seattle",
    "state": "Washington",
    "country": "United States of America",
    "lat": 47.606209,
    "lng": -122.332069,
    "name": "Rainy Day Land",
    "description": "Forest land in Seattle, ideal for camping and hiking",
    "price": 170,
  },
  {
    "ownerId": 4,
    "address": "3939 Elm Street",
    "city": "Denver",
    "state": "Colorado",
    "country": "United States of America",
    "lat": 39.739236,
    "lng": -104.990251,
    "name": "Rockies Land",
    "description": "Mountain land perfect for outdoor activities and camping",
    "price": 210,
  },
  {
    "ownerId": 5,
    "address": "4040 Pine Street",
    "city": "Chicago",
    "state": "Illinois",
    "country": "United States of America",
    "lat": 41.878113,
    "lng": -87.629799,
    "name": "Windy City Land",
    "description": "Open land in Chicago, ideal for events and camping",
    "price": 150,
  },
  {
    "ownerId": 6,
    "address": "4141 Fir Lane",
    "city": "Nashville",
    "state": "Tennessee",
    "country": "United States of America",
    "lat": 36.162663,
    "lng": -86.781601,
    "name": "Country Music Land",
    "description": "Land perfect for outdoor concerts and events",
    "price": 195,
  },
  {
    "ownerId": 7,
    "address": "4242 Cedar Street",
    "city": "Austin",
    "state": "Texas",
    "country": "United States of America",
    "lat": 30.267153,
    "lng": -97.743057,
    "name": "Live Music Land",
    "description": "Scenic land in Austin, great for camping and events",
    "price": 170,
  },
  {
    "ownerId": 8,
    "address": "4343 Dogwood Lane",
    "city": "Salt Lake City",
    "state": "Utah",
    "country": "United States of America",
    "lat": 40.760780,
    "lng": -111.891045,
    "name": "Salt Lake Land",
    "description": "Land near Salt Lake, ideal for camping and outdoor activities",
    "price": 180,
  },
  {
    "ownerId": 9,
    "address": "4444 Redwood Street",
    "city": "San Francisco",
    "state": "California",
    "country": "United States of America",
    "lat": 37.774929,
    "lng": -122.419418,
    "name": "Bay View Land",
    "description": "Land with bay views, perfect for gatherings and events",
    "price": 260,
  },
  {
    "ownerId": 10,
    "address": "4545 Willow Road",
    "city": "Phoenix",
    "state": "Arizona",
    "country": "United States of America",
    "lat": 33.448376,
    "lng": -112.074036,
    "name": "Desert Oasis",
    "description": "Desert land perfect for RVs and camping",
    "price": 145,
  },
  {
    "ownerId": 11,
    "address": "4646 Fir Lane",
    "city": "Minneapolis",
    "state": "Minnesota",
    "country": "United States of America",
    "lat": 44.977753,
    "lng": -93.265015,
    "name": "Twin Cities Land",
    "description": "Land near Minneapolis, ideal for events and camping",
    "price": 185,
  },
  {
    "ownerId": 12,
    "address": "4747 Spruce Street",
    "city": "Charlotte",
    "state": "North Carolina",
    "country": "United States of America",
    "lat": 35.227085,
    "lng": -80.843124,
    "name": "Queen City Land",
    "description": "Land with southern charm, perfect for events",
    "price": 160,
  },
  {
    "ownerId": 13,
    "address": "4848 Cypress Lane",
    "city": "New Orleans",
    "state": "Louisiana",
    "country": "United States of America",
    "lat": 29.951065,
    "lng": -90.071533,
    "name": "Mardi Gras Land",
    "description": "Land in New Orleans, ideal for events and gatherings",
    "price": 190,
  },
  {
    "ownerId": 14,
    "address": "4949 Juniper Avenue",
    "city": "Savannah",
    "state": "Georgia",
    "country": "United States of America",
    "lat": 32.080898,
    "lng": -81.091203,
    "name": "Savannah Fields",
    "description": "Land in historic Savannah, perfect for weddings and events",
    "price": 180,
  },
  {
    "ownerId": 15,
    "address": "5050 Birch Road",
    "city": "Houston",
    "state": "Texas",
    "country": "United States of America",
    "lat": 29.760427,
    "lng": -95.369804,
    "name": "Texas Land",
    "description": "Open land ideal for events and livestock grazing",
    "price": 140,
  },
  {
    "ownerId": 16,
    "address": "5151 Cherry Street",
    "city": "San Diego",
    "state": "California",
    "country": "United States of America",
    "lat": 32.715736,
    "lng": -117.161087,
    "name": "Coastal Retreat",
    "description": "Coastal land perfect for beach camping and events",
    "price": 220,
  },
  {
    "ownerId": 17,
    "address": "5252 Cedar Lane",
    "city": "Los Angeles",
    "state": "California",
    "country": "United States of America",
    "lat": 34.052235,
    "lng": -118.243683,
    "name": "LA Land",
    "description": "Scenic land in Los Angeles, great for events and camping",
    "price": 250,
  },
  {
    "ownerId": 18,
    "address": "5353 Oak Lane",
    "city": "Seattle",
    "state": "Washington",
    "country": "United States of America",
    "lat": 47.606209,
    "lng": -122.332069,
    "name": "Rainy City Land",
    "description": "Forest land in Seattle, ideal for camping and hiking",
    "price": 170,
  },
  {
    "ownerId": 19,
    "address": "5454 Maple Avenue",
    "city": "Denver",
    "state": "Colorado",
    "country": "United States of America",
    "lat": 39.739236,
    "lng": -104.990251,
    "name": "Rocky Land",
    "description": "Mountain land perfect for outdoor activities and camping",
    "price": 210,
  },
  {
    "ownerId": 20,
    "address": "5555 Elm Street",
    "city": "Chicago",
    "state": "Illinois",
    "country": "United States of America",
    "lat": 41.878113,
    "lng": -87.629799,
    "name": "City Land",
    "description": "Open land in Chicago, ideal for events and camping",
    "price": 150,
  },
  {
    "ownerId": 1,
    "address": "5656 Pine Street",
    "city": "Nashville",
    "state": "Tennessee",
    "country": "United States of America",
    "lat": 36.162663,
    "lng": -86.781601,
    "name": "Country Land",
    "description": "Land perfect for outdoor concerts and events",
    "price": 195,
  },
  {
    "ownerId": 2,
    "address": "5757 Fir Lane",
    "city": "Austin",
    "state": "Texas",
    "country": "United States of America",
    "lat": 30.267153,
    "lng": -97.743057,
    "name": "Hill Land",
    "description": "Scenic hill country land, great for camping and events",
    "price": 210,
  },
  {
    "ownerId": 3,
    "address": "5858 Spruce Street",
    "city": "Salt Lake City",
    "state": "Utah",
    "country": "United States of America",
    "lat": 40.760780,
    "lng": -111.891045,
    "name": "Salt Land",
    "description": "Land near salt flats, great for photography and camping",
    "price": 180,
  },
  {
    "ownerId": 4,
    "address": "5959 Dogwood Lane",
    "city": "San Francisco",
    "state": "California",
    "country": "United States of America",
    "lat": 37.774929,
    "lng": -122.419418,
    "name": "Bay Area Land",
    "description": "Open land with views of the bay, perfect for events",
    "price": 260,
  },
  {
    "ownerId": 5,
    "address": "6060 Birch Road",
    "city": "Phoenix",
    "state": "Arizona",
    "country": "United States of America",
    "lat": 33.448376,
    "lng": -112.074036,
    "name": "Desert Land",
    "description": "Desert land perfect for RVs and camping",
    "price": 145,
  },
  {
    "ownerId": 6,
    "address": "6161 Cedar Street",
    "city": "Minneapolis",
    "state": "Minnesota",
    "country": "United States of America",
    "lat": 44.977753,
    "lng": -93.265015,
    "name": "Twin Cities",
    "description": "Land near Minneapolis, ideal for events and camping",
    "price": 185,
  },
  {
    "ownerId": 7,
    "address": "6262 Cypress Lane",
    "city": "Charlotte",
    "state": "North Carolina",
    "country": "United States of America",
    "lat": 35.227085,
    "lng": -80.843124,
    "name": "Queen City",
    "description": "Land with southern charm, perfect for events",
    "price": 160,
  },
  {
    "ownerId": 8,
    "address": "6363 Juniper Avenue",
    "city": "New Orleans",
    "state": "Louisiana",
    "country": "United States of America",
    "lat": 29.951065,
    "lng": -90.071533,
    "name": "Bayou Land",
    "description": "Land in the heart of New Orleans, ideal for events and gatherings",
    "price": 190,
  },
  {
    "ownerId": 9,
    "address": "6464 Birch Road",
    "city": "Savannah",
    "state": "Georgia",
    "country": "United States of America",
    "lat": 32.080898,
    "lng": -81.091203,
    "name": "Historic Land",
    "description": "Land in historic Savannah, perfect for weddings and events",
    "price": 180,
  },
  {
    "ownerId": 10,
    "address": "6565 Cherry Street",
    "city": "Houston",
    "state": "Texas",
    "country": "United States of America",
    "lat": 29.760427,
    "lng": -95.369804,
    "name": "Lone Star",
    "description": "Open field great for events and livestock grazing",
    "price": 140,
  },
  {
    "ownerId": 11,
    "address": "6666 Cedar Lane",
    "city": "San Diego",
    "state": "California",
    "country": "United States of America",
    "lat": 32.715736,
    "lng": -117.161087,
    "name": "Coastal Land",
    "description": "Coastal land ideal for beach camping and events",
    "price": 220,
  },
  {
    "ownerId": 12,
    "address": "6767 Oak Lane",
    "city": "Los Angeles",
    "state": "California",
    "country": "United States of America",
    "lat": 34.052235,
    "lng": -118.243683,
    "name": "Hollywood Hills",
    "description": "Scenic land in Hollywood Hills, great for events and camping",
    "price": 250,
  },
  {
    "ownerId": 13,
    "address": "6868 Maple Avenue",
    "city": "Seattle",
    "state": "Washington",
    "country": "United States of America",
    "lat": 47.606209,
    "lng": -122.332069,
    "name": "Rainy Land",
    "description": "Forest land in Seattle, ideal for camping and hiking",
    "price": 170,
  },
  {
    "ownerId": 14,
    "address": "6969 Elm Street",
    "city": "Denver",
    "state": "Colorado",
    "country": "United States of America",
    "lat": 39.739236,
    "lng": -104.990251,
    "name": "Rockies",
    "description": "Mountain land perfect for outdoor activities and camping",
    "price": 210,
  },
  {
    "ownerId": 15,
    "address": "7070 Pine Street",
    "city": "Chicago",
    "state": "Illinois",
    "country": "United States of America",
    "lat": 41.878113,
    "lng": -87.629799,
    "name": "Windy Land",
    "description": "Open land in Chicago, ideal for events and camping",
    "price": 150,
  },
  {
    "ownerId": 16,
    "address": "7171 Fir Lane",
    "city": "Nashville",
    "state": "Tennessee",
    "country": "United States of America",
    "lat": 36.162663,
    "lng": -86.781601,
    "name": "Music City",
    "description": "Land perfect for outdoor concerts and events",
    "price": 195,
  },
  {
    "ownerId": 17,
    "address": "7272 Cedar Street",
    "city": "Austin",
    "state": "Texas",
    "country": "United States of America",
    "lat": 30.267153,
    "lng": -97.743057,
    "name": "Hill Country",
    "description": "Scenic hill country land, great for camping and events",
    "price": 210,
  },
  {
    "ownerId": 18,
    "address": "7373 Dogwood Lane",
    "city": "Salt Lake City",
    "state": "Utah",
    "country": "United States of America",
    "lat": 40.760780,
    "lng": -111.891045,
    "name": "Salt Flats",
    "description": "Land near salt flats, great for photography and camping",
    "price": 180,
  },
  {
    "ownerId": 19,
    "address": "7474 Redwood Street",
    "city": "San Francisco",
    "state": "California",
    "country": "United States of America",
    "lat": 37.774929,
    "lng": -122.419418,
    "name": "Bay View",
    "description": "Land with bay views, perfect for gatherings and events",
    "price": 260,
  },
  {
    "ownerId": 20,
    "address": "7575 Willow Road",
    "city": "Phoenix",
    "state": "Arizona",
    "country": "United States of America",
    "lat": 33.448376,
    "lng": -112.074036,
    "name": "Desert Retreat",
    "description": "Desert land perfect for RVs and camping",
    "price": 145,
  }
];



/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await Spot.bulkCreate(demoSpots, options);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async down (queryInterface, Sequelize) {
    //options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      ownerId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
