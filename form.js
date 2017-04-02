// -----------------------------------------------------------------------------
// Add availabilities
// -----------------------------------------------------------------------------

function addAvailability(){
    var list = "availability-list";
    var availabilities = $("#"+list).find("select");
    id++;
    addSelect(list, id);
    addTimeFrom(list, id);
    addTimeTo(list, id);
    addLocation(list, id);
    addRemoveButton(list, id);
    $('select').material_select(true);
}

function addSelect(divname, n) {
    var newDiv = document.createElement("div");
    newDiv.className = "input-field col s12 l3";
    newDiv.id = "item"+n;

    var html = "<select id=day'"+n+"'>";
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

    var html = "<input id='timeFrom"+n+"' type='text' value='00:00'>";
    html += "<label for='timeFrom"+n+"'>Time From</label>";

    newDiv.innerHTML = html;

    document.getElementById(divname).appendChild(newDiv);
}

function addTimeTo(divname, n) {
    var newDiv = document.createElement("div");
    newDiv.className = "input-field col s6 l2";
    newDiv.id = "item"+n;

    var html = "<input id='timeTo"+n+"' type='text' value='00:00'>";
    html += "<label for='timeTo"+n+"'>Time From</label>";

    newDiv.innerHTML = html;

    document.getElementById(divname).appendChild(newDiv);
}

function addLocation(divname, n) {
    var newDiv = document.createElement("div");
    newDiv.className = "input-field col s7 l4";
    newDiv.id = "item"+n;

    var html = "<input id='location"+n+"' type='text'>";
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
// Change item type
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
                    "width": "250px",
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