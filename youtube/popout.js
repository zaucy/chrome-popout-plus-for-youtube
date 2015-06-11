

function checkAndAdd(addedNode) {
	if(addedNode.nodeType == 1) {
		if(addedNode.classList.contains("thumb-wrapper")
		|| addedNode.classList.contains("contains-addto")) {
			
			if(addedNode.classList.contains("contains-pplus")) return;
			
			var refNode = addedNode.querySelector("button.addto-watch-later-button");
			
			if(refNode) {
				addedNode.classList.add("contains-pplus");
				addedNode.appendChild(CreatePopoutBtn(refNode));
			}
		}
	}
}

function recursiveAddChild(node) {
	for(var i=0; node.children.length > i; i++) {
		var child = node.children[i];
		checkAndAdd(child);
		recursiveAddChild(child);
	}
}

var popoutPlusIconMutationObserver = new MutationObserver(function(records) {
	for(var n=0; records.length > n; n++) {
		var record = records[n];
		
		checkAndAdd(record.target);
		recursiveAddChild(record.target);
	}
});

popoutPlusIconMutationObserver.observe(document, {
	childList: true,
	subtree: true
});

function CreatePopoutBtn(el) {
	
	var btn = el.cloneNode(true);
	btn.classList.add("pop-thumb-btn");
	btn.setAttribute("data-tooltip-text", "Popout");
	//btn.innerHTML = '<span class="pp-button-content"><img src="' + chrome.extension.getURL("icon16.png") + '" alt="Popout"></span>';
	
	btn.style.right = "26px";
	
	btn.onclick = function(e) {
		//window.open("https://www.youtube.com/embed/" + this.getAttribute("data-video-ids"), "", "width=640,height=360,toolbar=0");
		
		e.stopPropagation();
		e.preventDefault();
		
		this.blur();
		
		chrome.extension.sendMessage({
			//"popout_url": "https://www.youtube.com/embed/" + this.getAttribute("data-video-ids")
			"popout_url": "https://www.youtube.com/watch?v=" + this.getAttribute("data-video-ids") + "&ytpp=true"
		});
	};
	
	return btn;
}