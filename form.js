// -----------------------------------------------------------------------------
// Add availabilities
// -----------------------------------------------------------------------------

function addAvailability(){
    var list = "availability-list";
    id++;
    addSelect(list, id);
    addTimeFrom(list, id);
    addTimeTo(list, id);
    addLocation(list, id);
    addRemoveButton(list, id);
    $('select').material_select(true);
    Materialize.updateTextFields();
}

function addSelect(divname, n) {
    var newDiv = document.createElement("div");
    newDiv.className = "input-field col s12 l3";
    newDiv.id = "item"+n;

    var html = "<select id=day'"+n+"' class='validate'>";
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    html += "<option value='' selected disabled>Day of Week</option>";
    for (var i = 0; i < 7; i++) {
        html += "<option value='"+i+"'>"+days[i]+"</option>"; 
    }
    html += "</select>";
    html += "<label>Day</label>";
    html += "</div>";
    
    newDiv.innerHTML = html;
    
    document.getElementById(divname).appendChild(newDiv);
}

function addTimeFrom(divname, n) {
    var newDiv = document.createElement("div");
    newDiv.className = "input-field col s6 l2";
    newDiv.id = "item"+n;

    var html = "<input id='timeFrom"+n+"' type='text' class='validate' placeholder='00:00' />";
    html += "<label for='timeFrom"+n+"'>Time From</label>";

    newDiv.innerHTML = html;

    document.getElementById(divname).appendChild(newDiv);
}

function addTimeTo(divname, n) {
    var newDiv = document.createElement("div");
    newDiv.className = "input-field col s6 l2";
    newDiv.id = "item"+n;

    var html = "<input id='timeTo"+n+"' type='text' class='validate' placeholder='00:00' />";
    html += "<label for='timeTo"+n+"'>Time From</label>";

    newDiv.innerHTML = html;

    document.getElementById(divname).appendChild(newDiv);
}

function addLocation(divname, n) {
    var newDiv = document.createElement("div");
    newDiv.className = "input-field col s7 l4";
    newDiv.id = "item"+n;

    var html = "<input id='location"+n+"' type='text' class='validate' />";
    html += "<label for='location"+n+"'>Location</label>";

    newDiv.innerHTML = html;

    document.getElementById(divname).appendChild(newDiv);
}

function addRemoveButton(divname, n) {
    var newDiv = document.createElement("div");
    newDiv.className = "input-field col s5 l1";
    newDiv.id = "item"+n;

    var html="<a class='waves-effect waves-teal btn-flat' onClick='removeAvailability(this.parentNode.id);'>Remove</a>";
    newDiv.innerHTML = html;

    document.getElementById(divname).appendChild(newDiv);
}

// -----------------------------------------------------------------------------
// Remove availabilities
// -----------------------------------------------------------------------------

function removeAvailability(clickedID) {
    var id = "#"+clickedID;
    $(document).ready(function(){
        $("div").remove(id);
    });
}

// -----------------------------------------------------------------------------
// Toggle functions
// -----------------------------------------------------------------------------

function selectItemType(){
    $("#item").toggle();
    $("#service").toggle();
}

// -----------------------------------------------------------------------------
// Load image upload preview
// -----------------------------------------------------------------------------

$(document).ready(function() {
    $("#imageUpload").on('change', function () {
        if (typeof (FileReader) != "undefined") {

            var imageHolder = $("#imageHolder");
            imageHolder.empty();

            var reader = new FileReader();
            reader.onload = function (e) {
                $("<img />", {
                    "src": e.target.result,
                    "class": "thumb-image",
                    "width": "100%",
                    "height": "auto",
                    "border": "5px solid #000"
                }).appendTo(imageHolder);

            }
            imageHolder.show();
            reader.readAsDataURL($(this)[0].files[0]);
        } else {
            alert("This browser does not support FileReader.");
        }
    });
});

// -----------------------------------------------------------------------------
// Validate Form
// -----------------------------------------------------------------------------

function validateForm() {
                var availabilities = $("#availability-list").find("select");
                var numOfAvailabilities = availabilities.length;

                // Contact
                var contactType = document.getElementById("contactType");
                var contactTypeValue = contactType.options[contactType.selectedIndex].value;
                if (contactTypeValue == "") {
                    alert("Please choose a contact type");
                    return false;
                }
                var contactInformation = document.getElementById("contactInformation").value;
                if (contactInformation == "") {
                    alert("Please input contact information");
                    return false;
                }
                if (contactTypeValue == "phone") {
                    if (contactInformation.length != 12) {
                        alert("Please input phone number in the format of 000-000-0000");
                        return false;
                    }
                }

                // Item
                var product = document.getElementById("product").value;
                if (product == "") {
                    alert("Please input item name");
                    return false;
                }
                var price = document.getElementById("price").value;
                if (price == "") {
                    alert("Please input price");
                    return false;
                }
                else if (isNaN(price)) {
                    alert("Please input valid price (must be a number)");
                    return false;
                }
                var category = document.getElementById("category");
                var categoryValue = category.options[category.selectedIndex].value;
                if (category == "") {
                    alert("Please select a category");
                    return false;
                }
                var category = document.getElementById("category");
                var categoryValue = category.options[category.selectedIndex].value;
                if (category == "") {
                    alert("Please select a category");
                    return false;
                }

                var availability = 0;
                // Availibility inputs
                for (var i = 1; i < id+1; i++) {
                    var select = document.getElementById("day"+i);
                    if (select !== undefined) {
                        availability++;
                        var timeFrom = document.getElementById("timeFrom"+i).value;
                        var timeTo = document.getElementById("timeTo"+i).value;
                        var location = document.getElementById("location"+i).value;
                        
                        var selectValue = select.options[select.selectedIndex].value;
                        
                        if (selectValue == "") {
                            alert("Please fill out 'Day of Week' for Availability " + availability);
                            return false;
                        }
                        if (timeFrom == "") {
                            alert("Please fill out 'Time From' for Availability " + availability);
                            return false;
                        }
                        if (timeTo == "") {
                            alert("Please fill out 'Time To' for Availability " + availability);
                            return false;
                        }
                        if (location == "") {
                            alert("Please fill out 'Location' for Availability " + availability);
                            return false;
                        }
                    }
                }
            }