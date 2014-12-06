(function($) {
	
	$(document).on("mouseover", "span", function(e) {
		var a;
		if(e.currentTarget.classList.contains("yt-thumb-default")) {
			a = e.currentTarget.parentElement.parentElement;
		} else {
			return;
		}
		
		if(a.getElementsByClassName("pop-thumb-btn").length == 0) {
			if(a.getAttribute("href") == null) {
				a = a.parentElement;
			}
			
			var href = a.getAttribute("href");
			var match = href.match(/v=[^\&]*/);
			if(match != null && match.length > 0) {
				match = match[0];
			} else {
				return;
			}
			
			var vcode = match.substr(2);
			var btn = CreatePopoutBtn(vcode);
			e.currentTarget.parentElement.parentElement.appendChild(btn);
		}
		
		
	});

	function CreatePopoutBtn(vcode) {
		var btn = document.createElement("button");
		btn.className = "pop-thumb-btn addto-button video-actions spf-nolink n yt-uix-button yt-uix-button-default yt-uix-button-size-small yt-uix-tooltip";
		btn.type = "button";
		btn.role = "button";
		btn.setAttribute("data-tooltip-text", "Popout");
		btn.innerHTML = '<span class="pp-button-content"><img src="' + chrome.extension.getURL("icon16.png") + '" alt="Popout"></span>';
		
		btn.style.right = "26px";
		
		btn.setAttribute("data-vcode", vcode);
		
		btn.onclick = function(e) {
			//window.open("https://www.youtube.com/embed/" + this.getAttribute("data-vcode"), "", "width=640,height=360,toolbar=0");
			
			e.stopPropagation();
			e.preventDefault();
			
			this.blur();
			
			chrome.extension.sendMessage({
				"popout_url": "https://www.youtube.com/embed/" + this.getAttribute("data-vcode")
			});
		};
		
		return btn;
	}

}(jQuery));
