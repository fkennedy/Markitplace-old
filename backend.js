/*
Markitplace
backend.js

Kevin Hsieh
1 April 2017
LA Hacks 2017
*/

// -----------------------------------------------------------------------------
// GOOGLE API AUTHORIZATION
// -----------------------------------------------------------------------------

const CLIENT_ID = "127586888994-75ecbcuv81qd8g4i3480tt512b7iulhe.apps.googleusercontent.com";
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

// Check if current user has authorized this application.
function checkAuth() {
	gapi.auth.authorize({
		client_id: CLIENT_ID,
		scope: SCOPES,
		immediate: true
	}, handleAuthResult);
}

// Initiate auth flow in response to user clicking authorize button.
function handleAuthClick(event) {
	gapi.auth.authorize({
		client_id: CLIENT_ID,
		scope: SCOPES, 
		immediate: false
	}, handleAuthResult);
}

// Hide or show auth UI.
function handleAuthResult(response) {
	if (response && !response.error) {
		// Hide auth UI
		document.getElementById("authorize").style.display = "none";
		document.getElementById("authorized").style.display = "";
		load_items();
	} 
	else {
		// Show auth UI
		document.getElementById("authorize").style.display = "";
		document.getElementById("authorized").style.display = "none";
	}
}

// -----------------------------------------------------------------------------
// BACKEND INTERFACE
// -----------------------------------------------------------------------------

const scriptId = "Mp2ZVT-Mdv0w0H3VnXtfCmouI75eCkdR7";

function getValues(onSuccess) {
	let op = gapi.client.request({
		"root": "https://script.googleapis.com",
		"path": "v1/scripts/" + scriptId + ":run",
		"method": "POST",
		"body": {
			"function": "getValues",
			"parameters": []
		}
	});
	op.execute(function onReturn(response) {
		if (response.error && response.error.status) {
			// The API encountered a problem before the script started executing.
			alert('Error calling API: ' + JSON.stringify(resp, null, 2));
		} 
		else if (response.error) {
			// The API executed, but the script returned an error.
			var error = response.error.details[0];
			alert('Script error! Message: ' + error.errorMessage);
		} 
		else 
			onSuccess(response.response.result);
	});
}

function appendRow(row, onSuccess) {
	let op = gapi.client.request({
		"root": "https://script.googleapis.com",
		"path": "v1/scripts/" + scriptId + ":run",
		"method": "POST",
		"body": {
			"function": "appendRow",
			"parameters": [row]
		}
	});
	op.execute(function onReturn(response) {
		if (response.error && response.error.status) {
			// The API encountered a problem before the script started executing.
			alert("Error calling API: " + JSON.stringify(response, null, 2));
		} 
		else if (response.error) {
			// The API executed, but the script returned an error.
			var error = response.error.details[0];
			alert("Script error! Message: " + response.errorMessage);
		} 
		else
			onSuccess(response.response.result);
	});
}
