chrome.runtime.onMessage.addListener(function(data) {
	if(data && data.popout_url) {
		chrome.windows.create({
			url: data.popout_url,
			width: 640 + 16,
			height: 360 + 39,
			top: 0,
			left: 0,
			type: "popup"
		}, function(window) {
			
			var tabIds = [];
			
			for(var tabIndex in window.tabs) {
				var tab = window.tabs[tabIndex];
				tabIds.push(tab.id);
			}
			
			chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
				
				for(var tabIdIndex in tabIds) {
					var tabId = tabIds[tabIdIndex];
					
					if(tabId == tab.id) {
						
						if(changeInfo.url) {
							if(changeInfo.url.indexOf("youtube.com/watch?v=") > -1 && changeInfo.url.indexOf("&ytpp") == -1) {
								var url = changeInfo.url + "&ytpp=true";
								//url = url.replace("&", "?");
								chrome.tabs.update(tab.id, {url: url});
							}
						}
						
						break;
					}
				}
				
				
			});
		});
		
		
	}
});