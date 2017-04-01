function getID() {
    var list = "availability-list";
    var availabilities = $("#"+list).find("select");
    var id = availabilities.length+1;
    return id;
}

// -----------------------------------------------------------------------------
// "Other" category
// -----------------------------------------------------------------------------
// document.getElementById("myDIV").style.display = "none";

$("#category").change(function() {
    if ($("#category") == "information")
        ;
});

// -----------------------------------------------------------------------------
// Add availabilities
// -----------------------------------------------------------------------------

function addAvailability(){
    var id = getID();
    addSelect(list, id);
    addTimeFrom(list, id);
    addTimeTo(list, id);
    addLocation(list, id);
    $('select').material_select(true);
}

function addSelect(divname, n) {
    var newDiv = document.createElement("div");
    newDiv.className = "input-field col s12 l2";
    newDiv.id = "item"+n;

    var html = "<select id=day'"+n+"'>";
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    html += "<option value='' selected disabled>Day of Week</option>";
    for (var i = 1; i < 8; i++) {
        html += "<option value='"+i+"'>"+days[i-1]+"</option>"; 
    }
    html += "</select>";
    html += "<label>Day</label>";
    html += "</div>";
    
    newDiv.innerHTML = html;
    
    document.getElementById(divname).appendChild(newDiv);
}

function addTimeFrom(divname, n) {
    var newDiv = document.createElement("div");
    newDiv.className = "input-field col s12 l2";
    newDiv.id = "item"+n;

    var html = "<input id='timeFrom"+n+"' type='text' value='00:00'>";
    html += "<label for='timeFrom"+n+"'>Time From</label>";

    newDiv.innerHTML = html;

    document.getElementById(divname).appendChild(newDiv);
}

function addTimeTo(divname, n) {
    var newDiv = document.createElement("div");
    newDiv.className = "input-field col s12 l2";
    newDiv.id = "item"+n;

    var html = "<input id='timeTo"+n+"' type='text' value='00:00'>";
    html += "<label for='timeTo"+n+"'>Time From</label>";

    newDiv.innerHTML = html;

    document.getElementById(divname).appendChild(newDiv);
}

function addLocation(divname, n) {
    var newDiv = document.createElement("div");
    newDiv.className = "input-field col s7 l5";
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
}

// -----------------------------------------------------------------------------
// Remove availabilities
// -----------------------------------------------------------------------------

function removeAvailability() {
    // var element = this;
    var id = this.parentNode.id;
    // var id = parentDiv.prop("id");
    alert(id);
}