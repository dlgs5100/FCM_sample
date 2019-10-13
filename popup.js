// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback called when the URL of the current tab
 *   is found.
 */
var registrationId = "";
document.addEventListener('DOMContentLoaded', restoreOptions);
document.addEventListener('DOMContentLoaded', checkPort);
window.onload =  function() { 
	document.getElementById('myButton').addEventListener('click', register);
}

function register() {
	var senderId = document.getElementById('SenderID').value;
	// var senderId = '205327172524';
	chrome.gcm.register([senderId], registerCallback);
}

function registerCallback(regId) {
	registrationId = regId;
	
	if (chrome.runtime.lastError) {
		// When the registration fails, handle the error and retry the
		// registration later.
		console.log("Registration failed: " + chrome.runtime.lastError.message);
		return;
	}
	else{
		document.getElementById('myButton').style.visibility = "hidden";
		saveRegisterOptions();
	}

	// Format and show the curl command that can be used to post a message.
	updateCurlCommand();
}

function updateCurlCommand() {
  
	apiKey = "YOUR_API_KEY";
	msgKey = "YOUR_MESSAGE_KEY";
	msgValue = "YOUR_MESSAGE_VALUE";

	var command = 'curl' +
      ' -H "Content-Type:application/x-www-form-urlencoded;charset=UTF-8"' +
      ' -H "Authorization: key=' + apiKey + '"' +
      ' -d "registration_id=' + registrationId + '"' +
      ' -d data.' + msgKey + '=' + msgValue +
      ' https://android.googleapis.com/gcm/send';
	console.log(command)
	alert(registrationId);
}

function checkPort() {
	
	var target = '伺服器IP';
	var port = 8081;
	var timeout=1000;
	
	var img=new Image();
	img.onerror=function ()
	{
		if (!img) return;
		img=undefined;
		document.getElementById("imageMotion").src = 'http://'+target+':'+port;
	}
	
	img.onload=img.onerror;
	img.src='http://'+target+':'+port;
		
	setTimeout(function() {
		if (!img) return;
        img = undefined;
		document.getElementById("imageMotion").src = "error.png";
	},timeout);
}

function saveRegisterOptions() {
	chrome.storage.sync.set({
		registerValue: "hidden"
	}, function() {
	});
}

function restoreOptions() {
    chrome.storage.sync.get({
		registerValue: "visible"
	}, function(items) {
		document.getElementsByClassName('registration')[0].style.visibility = items.registerValue;
	});
}