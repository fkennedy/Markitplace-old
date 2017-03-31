L.mapbox.accessToken = 'pk.eyJ1Ijoibnd0c2FpIiwiYSI6ImNqMHhkZnJoajAwN3Uyd3FkZGh6Yjg0YWwifQ.xjVvrwXc_XQuc7hnWO4YXw';
var map = L.mapbox.map('map-leaflet', 'mapbox.streets').setView([34.04048, -118.43791], 12);

var featureLayer = L.mapbox.featureLayer(markers).addTo(map);

var markers = 
{ "type": "FeatureCollection",
  "features": 
  [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-118.437918, 34.050486]
      },
      properties: {
        title: '<h1 style="font-family: Pacifico, cursive; font-size: large;">Earphones</h1>',
        description: '<h1 style="font-family: Lato; font-size: small">1777 Westwood Blvd Los Angeles, CA 90024</h1>',
        'marker-color': '#ff5722',
        'marker-size': 'medium',
        'marker-symbol': 'restaurant'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-118.469198, 33.991676]
      },
      properties: {
        title: '<h1 style="font-family: Pacifico, cursive; font-size: large;">iPhone</h1>',
        description: '<h1 style="font-family: Lato; font-size: small">1205 Abbot Kinney Blvd, Venice, CA 90291</h1>',
        'marker-color': '#ff5722',
        'marker-size': 'medium',
        'marker-symbol': 'shop'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-118.443019, 34.048465]
      },
      properties: {
        title: '<h1 style="font-family: Pacifico, cursive; font-size: large;">Ultra Boosts</h1>',
        description: '<h1 style="font-family: Lato; font-size: small">11043 California Route 2, Los Angeles, CA 90025</h1>',
        'marker-color': '#ff5722',
        'marker-size': 'medium',
        'marker-symbol': 'restaurant'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-118.452521, 34.020999]
      },
      properties: {
        title: '<h1 style="font-family: Pacifico, cursive; font-size: large;">iPad</h1>',
        description: '<h1 style="font-family: Lato; font-size: small">3117 Ocean Park Blvd, Santa Monica, CA 90405</h1>',
        'marker-color': '#ff5722',
        'marker-size': 'medium',
        'marker-symbol': 'restaurant'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-118.435131, 34.047372]
      },
      properties: {
        title: '<h1 style="font-family: Pacifico, cursive; font-size: large;">Sub Lease</h1>',
        description: '<h1 style="font-family: Lato; font-size: small">1915 Westwood Blvd, Los Angeles, CA 90025</h1>',
        'marker-color': '#ff5722',
        'marker-size': 'medium',
        'marker-symbol': 'museum'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-118.384070, 34.085233]
      },
      properties: {
        title: '<h1 style="font-family: Pacifico, cursive; font-size: large;">Macbook</h1>',
        description: '<h1 style="font-family: Lato; font-size: small">8871 Santa Monica Blvd West Hollywood, CA 90069</h1>',
        'marker-color': '#ff5722',
        'marker-size': 'medium',
        'marker-symbol': 'grocery'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-118.380393, 34.08736]
      },
      properties: {
        title: '<h1 style="font-family: Pacifico, cursive; font-size: large;">Shelf</h1>',
        description: '<h1 style="font-family: Lato; font-size: small">8709 CA-2, West Hollywood, CA 90069</h1>',
        'marker-color': '#ff5722',
        'marker-size': 'medium',
        'marker-symbol': 'playground'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-118.442454, 34.040153]
      },
      properties: {
        title: '<h1 style="font-family: Pacifico, cursive; font-size: large;">Desk</h1>',
        description: '<h1 style="font-family: Lato; font-size: small">2208 Sawtelle Blvd, Los Angeles, CA 90025</h1>',
        'marker-color': '#4286f4',
        'marker-size': 'medium',
        'marker-symbol': 'shop'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-118.413198, 34.081403]
      },
      properties: {
        title: '<h1 style="font-family: Pacifico, cursive; font-size: large;">Shoe Rack</h1>',
        description: '<h1 style="font-family: Lato; font-size: small">9641 Sunset Blvd, Beverly Hills, CA 90210</h1>',
        'marker-color': '#ff5722',
        'marker-size': 'medium',
        'marker-symbol': 'scooter'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-118.44168, 34.059013]
      },
      properties: {
        title: '<h1 style="font-family: Pacifico, cursive; font-size: large;">Fish Tank</h1>',
        description: '<h1 style="font-family: Lato; font-size: small">10850 Wilshire Blvd, Los Angeles, CA 90024</h1>',
        'marker-color': '#f72825',
        'marker-size': 'medium',
        'marker-symbol': 'rail-metro'
      }
    }
  ]
}

featureLayer.setGeoJSON(markers);
map.scrollWheelZoom.disable();

// Find and store a variable reference to the list of filters.
var filters = document.getElementById('filters');

$(document).ready(function() {
   loadFilters();
});

function loadFilters() {
  // Collect the types of symbols in this layer. you can also just
  // hardcode an array of types if you know what you want to filter on,
  // like var types = ['foo', 'bar'];
  var typesObj = {}, types = [];
  var features = featureLayer.getGeoJSON().features;
  for (var i = 0; i < features.length; i++) {
    typesObj[features[i].properties['marker-symbol']] = true;
  }
  for (var k in typesObj) types.push(k);

  var checkboxes = [];
  // Create a filter interface.
  for (var i = 0; i < types.length; i++) {
    // Create an an input checkbox and label inside.
    var item = filters.appendChild(document.createElement('div'));
    var checkbox = item.appendChild(document.createElement('input'));
    var label = item.appendChild(document.createElement('label'));
    checkbox.type = 'checkbox';
    checkbox.id = types[i];
    checkbox.checked = true;
    // create a label to the right of the checkbox with explanatory text
    label.innerHTML = types[i];
    label.setAttribute('for', types[i]);
    // Whenever a person clicks on this checkbox, call the update().
    checkbox.addEventListener('change', update);
    checkboxes.push(checkbox);
  }

  // This function is called whenever someone clicks on a checkbox and changes
  // the selection of markers to be displayed.
  function update() {
    var enabled = {};
    // Run through each checkbox and record whether it is checked. If it is,
    // add it to the object of types to display, otherwise do not.
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) enabled[checkboxes[i].id] = true;
    }
    featureLayer.setFilter(function(feature) {
      // If this symbol is in the list, return true. if not, return false.
      // The 'in' operator in javascript does exactly that: given a string
      // or number, it says if that is in a object.
      // 2 in { 2: true } // true
      // 2 in { } // false
      return (feature.properties['marker-symbol'] in enabled);
    });
  }
};