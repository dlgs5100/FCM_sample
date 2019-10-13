function messageReceived(message) {
	console.log("get");
	var messageString = "";
		for (var key in message.data) {
			if (messageString != "")
				messageString += ", "
				messageString += key + ":" + message.data[key];
	}
	console.log("Message received: " + messageString);
	createNotification(messageString)
}
function createNotification(messageString){
	chrome.notifications.create(Math.floor(Date.now() / 1000).toString(), {
		iconUrl: 'notification.png',
		type: 'basic',
		title: 'Warning',
		message: messageString,
		priority: 2,
	}, function() {});
}

chrome.gcm.onMessage.addListener(messageReceived);