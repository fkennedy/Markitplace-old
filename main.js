L.mapbox.accessToken = 'pk.eyJ1Ijoibnd0c2FpIiwiYSI6ImNqMHhkZnJoajAwN3Uyd3FkZGh6Yjg0YWwifQ.xjVvrwXc_XQuc7hnWO4YXw';
var map = L.mapbox.map('map-leaflet', 'mapbox.streets').setView([34.068921, -118.44518110000001], 15);

var markers = {features: []};

var featureLayer = L.mapbox.featureLayer(markers).addTo(map);
featureLayer.setGeoJSON(markers);
map.scrollWheelZoom.disable();

// Global Category Objects
var categories = {
  'Furniture': {
    'color': 'blue',
    'marker_color': '#03A9F4',
    'marker_size': 'medium',
    'marker_symbol': 'lodging' 
  },
  'Technology': {
    'color': 'orange',
    'marker_color': '#FF9800',
    'marker_size': 'medium',
    'marker_symbol': 'rocket'
  },
  'Clothing': {
    'color': 'purple',
    'marker_color': '#673AB7',
    'marker_size': 'medium',
    'marker_symbol': 'clothing-store'
  },
  'Transportation': {
    'color': 'yellow',
    'marker_color': '#FFEB3B',
    'marker_size': 'medium',
    'marker_symbol': 'car'
  },
  'Household': {
    'color': 'teal',
    'marker_color': '#26A69A',
    'marker_size': 'medium',
    'marker_symbol': 'village'
  },
  'Food': {
    'color': 'red',
    'marker_color': '#F44336',
    'marker_size': 'medium',
    'marker_symbol': 'restaurant'
  },
  'Pets': {
    'color': 'brown',
    'marker_color': '#795548',
    'marker_size': 'medium',
    'marker_symbol': 'dog-park'
  },
  'Other': {
    'color': 'grey',
    'marker_color': '#9E9E9E',
    'marker_size': 'medium',
    'marker_symbol': 'embassy'
  }
}

var checkboxes = {
  'category': [],
  'price': []
}

var userId, userName;
var intervalID;

function onAuth() {
  document.getElementById("authorize-button").innerHTML = "Switch account";
  loadItems();
  intervalID = setInterval(loadItems, 10000);
  userinfo(function onSuccess(response) {
    console.log("User info: " + JSON.stringify(response, null, 2));
    userId = response.id, userName = response.name;
    document.getElementById("userName").innerHTML = userName;
  });
}
function loadItems() {
  getValues(function onSuccess(response) {
    $('#authorize').hide();
    var welcomeText = document.getElementById('welcome');
    welcomeText.style.display = "";
    markers = {features: []};
    for (let row = 1; row < response.length; row++) {
      waitingMarkers++;
      createMarker(response[row][0], response[row][1], response[row][2], response[row][3], response[row][4], response[row][5]);
    }
  });
}
function addItem() {
  appendRow(userId, [
    userName,
    document.getElementById("item").value,
    document.getElementById("price").value
  ], function onSuccess(response) {
    loadItems();
  });
}
function deleteItem() {
  deleteRow(userId, document.getElementById("toDelete").value,
    function onSuccess(response) {
    if (response)
      loadItems();
    else
      alert("Unauthorized");
  });
}

// Have a static JSON. Need to make this a dynamic object
/*var markers = { 
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-118.437918, 34.050486]
      },
      properties: {
        title: '<h1 style="font-family: Pacifico, cursive; font-size: large;">Earphones</h1>',
        description: '<h1 style="font-family: Lato; font-size: small">1777 Westwood Blvd Los Angeles, CA 90024</h1>',
        'category': 'Technology',
        'price': '5.67',
        'color': 'orange',
        'marker-color': '#ff5722',
        'marker-size': 'medium',
        'marker-symbol': 'rocket'
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
        'category': 'Technology',
        'price': '5.67',
        'color': 'orange',
        'marker-color': '#ff5722',
        'marker-size': 'medium',
        'marker-symbol': 'rocket'
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
        'category': 'Clothing',
        'price': '5.67',
        'color': 'purple',
        'marker-color': '#ca41f4',
        'marker-size': 'medium',
        'marker-symbol': 'clothing-store'
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
        'category': 'Technology',
        'price': '5.67',
        'color': 'orange',
        'marker-color': '#ff5722',
        'marker-size': 'medium',
        'marker-symbol': 'rocket'      
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
        'category': 'Residential',
        'price': '5.67',
        'color': 'green',
        'marker-color': '#58f441',
        'marker-size': 'medium',
        'marker-symbol': 'city'
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
        'category': 'Technology',
        'price': '5.67',
        'color': 'orange',
        'marker-color': '#ff5722',
        'marker-size': 'medium',
        'marker-symbol': 'rocket'
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
        'category': 'Furniture',
        'price': '5.67',
        'color': 'blue',
        'marker-color': '#4283f4',
        'marker-size': 'medium',
        'marker-symbol': 'lodging'
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
        'category': 'Furniture',
        'price': '5.67',
        'color': 'blue',
        'marker-color': '#4283f4',
        'marker-size': 'medium',
        'marker-symbol': 'lodging'
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
        'category': 'Furniture',
        'price': '5.67',
        'color': 'blue',
        'marker-color': '#4283f4',
        'marker-size': 'medium',
        'marker-symbol': 'lodging'
      }
    },
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-118.44168, 34.059013]
      },
      properties: {
        title: '<h1 style="font-family: Pacifico, cursive; font-size: large;">Honda Civic</h1>',
        description: '<h1 style="font-family: Lato; font-size: small">10850 Wilshire Blvd, Los Angeles, CA 90024</h1>',
        'category': 'Transportation',
        'price': '5.67',
        'color': 'yellow',
        'marker-color': '#f4eb41',
        'marker-size': 'medium',
        'marker-symbol': 'car'
      }
    }
  ]
};*/

// When the window loads
window.onload = function() {
  // Interface with the button
  var listButton = document.getElementById('ListItButton');
  listButton.onclick = function() {
    // GO TO FORM PAGE
  }

  // Load the checkbox filter menus
  loadCheckboxes('categoryFilter', 'category');
  loadCheckboxes('priceFilter', 'price');
}

// Initialize dom objects
$(document).ready(function() {
  $('select').material_select();
});

// Initially load the filter checkbox list
function loadCheckboxes(filter_id ,filter_type) {
  // Find and store a variable reference to the list of filters
  var filters = document.getElementById(filter_id);
  var my_filter = {};
  var labels = [];
  filters.innerHTML = "";
  if (filter_type == 'price')
    for (let range of priceranges)
      labels.push("$" + range[0] + " to $" + range[1]);
  else if (filter_type == 'category') {
    for (let key in categories) {
      labels.push(key);
    }
  }
  for (var i = 0; i < labels.length; i++) {
    var item = filters.appendChild(document.createElement('form'));
    var checkbox = item.appendChild(document.createElement('input'));
    var label = item.appendChild(document.createElement('label'));
    checkbox.type = 'checkbox';
    setCheckboxFormat();
    checkbox.id = labels[i];
    checkbox.checked = true;
    label.innerHTML = labels[i];
    label.setAttribute('for', labels[i]);
    checkbox.addEventListener('change', update);
    checkboxes[filter_type].push(checkbox);
  }
};

var priceranges = [
  [0, 10],
  [10, 25],
  [25, 100],
  [100, 9999]
];

class PriceRange {
  // ranges = array of pairs
  constructor(ranges) {
    this._ranges = ranges;
  }
  check(price) {
    for (let range of this._ranges)
      if (parseFloat(price) >= parseFloat(range[0]) && parseFloat(price) <= parseFloat(range[1]))
        return true;
    return false;
  }
}

// Update the checkbox from event listener
function update() {
  var enabled = {};
  for (var i = 0; i < checkboxes["category"].length; i++) {
      enabled[checkboxes["category"][i].id] = checkboxes["category"][i].checked;
  }

  ranges = [];
  for (var i = 0; i < checkboxes["price"].length; i++) {
      if (checkboxes["price"][i].checked) 
          ranges.push(priceranges[i]);
  }
  let pricerange = new PriceRange(ranges);

  featureLayer.setFilter(function(feature) { 
    return (enabled[feature.properties["category"]] && pricerange.check(feature.properties["price"])); 
  });
}

// Make the checkbox style to be filled in
function setCheckboxFormat() { $('input').addClass('filled-in checkbox-default'); }

// Create a marker with the specified details, and add it to the current JSON Object
function createMarker(userName, location, title, price, description, category) {
  // Find latitude, longitude from the given address
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': location}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();
      markers.features.push(
      {
        type: 'Feature',  
        geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        properties: {
          title: '<b><h1 style="font-family: Roboto; font-size: large;">' + title + ' ($' + price + ')' + '</h1></b>',
          description: '<h1 style="font-family: Roboto; font-size: small">' + description + '</h1>',
          'category': category,
          'price': price,
          'color': categories[category].color,
          'marker-color': categories[category].marker_color,
          'marker-size': categories[category].marker_size,
          'marker-symbol': categories[category].marker_symbol
        }
      });
      drawMarkers();
    }
  }); 
}

var waitingMarkers = 0;
function drawMarkers() {
  if (waitingMarkers > 0)
    waitingMarkers--;
  if (waitingMarkers == 0)
    featureLayer.setGeoJSON(markers);
}

function changeFunc() {
  var selectedOption = document.getElementById("filterDropdown");
  var selectedValue = selectedOption.options[selectedOption.selectedIndex].value;
  var categoryFilter = document.getElementById("categoryFilter");
  var priceFilter = document.getElementById("priceFilter");

  // By Category
  if (selectedValue == 1) {
    categoryFilter.style.display = "";
    priceFilter.style.display = "none";
  } else if (selectedValue == 2) {
    categoryFilter.style.display = "none";
    priceFilter.style.display = "";
  } else if (selectedValue == 3) {
    categoryFilter.style.display = "none";
    priceFilter.style.display = "none";
  }
}

// A filter button is pressed
function filterButtonPressed(filter_type) {
  var categoryFilter = document.getElementById("categoryFilter");
  var priceFilter = document.getElementById("priceFilter");
  if (filter_type == 'category') {
    categoryFilter.style.display = "";
    priceFilter.style.display = "none";
  } else if (filter_type == 'price') {
    categoryFilter.style.display = "none";
    priceFilter.style.display = "";
  } 
}

function burgerToggle() {
  categoryFilter.style.display = "none";
  priceFilter.style.display = "none";
}
