chrome.runtime.onMessage.addListener(function(data) {
	if(data && data.popout_url) {
		chrome.windows.create({
			url: data.popout_url,
			width: 640 + 16,
			height: 360 + 39,
			top: 0,
			left: 0,
			type: "popup"
		});
	}
});