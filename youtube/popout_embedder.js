var player = document.getElementById("player");
var playerApi = document.getElementById("player-api");
var videoStream = document.querySelector(".video-stream");
var html = {
	progressBar: document.querySelector(".html5-video-controls .html5-progress-bar"),
	videoPlayer: document.querySelector("#player-api > .html5-video-player")
};


var sideBar = document.querySelector("#watch7-sidebar");

var watchContent = document.querySelector("#watch7-content");

sideBar.style.padding = "0px";
sideBar.style.margin = "0px";
sideBar.style.width = "100%";
playerApi.style.margin = "0";
playerApi.style.padding = "0";
playerApi.style.top = "0";
playerApi.style.left = "0";
playerApi.style.position = "fixed";

player.style.position = "fixed";
player.style.zIndex = "999";

watchContent.style.position = "relative";
watchContent.style.zIndex = "998";
watchContent.style.width = "100%";

for(var item in html) {
	if(!html[item]) {
		html = null;
		break;
	}
}

//html5-video-player el-embedded autohide-controls-aspect autohide-controls-fullscreen autominimize-progress-bar-non-aspect ad-created iv-module-created iv-module-loaded endscreen-created captions-created cc-international playing-mode ideal-aspect



player.style.top = "0";
//document.body.innerHTML = "";
document.body.appendChild(player);
document.body.appendChild(watchContent);
document.body.appendChild(sideBar);
sideBar.style.display = "none";
document.documentElement.className = "";
document.body.style.overflow = "hidden";

playerApi.style.width = "100%";

function resizePlayer() {
	var wWidth = window.innerWidth;
	var wHeight = window.innerHeight;

	var bShowChat = wWidth / wHeight < 1.25;

	var playerHeight =  bShowChat ? wWidth * (9/16) : wHeight;

	playerApi.style.height = playerHeight + "px";
	videoStream.style.width = "100%";
	videoStream.style.height = playerHeight + "px";

	if(html) {
		html.videoPlayer.classList.add("ideal-aspect");
		html.videoPlayer.classList.add("el-embedded");
	}

	if(watchContent) {
		watchContent.style.top = playerHeight + 10 + "px";


		if(bShowChat) {
			watchContent.style.display = "";
		} else {
			watchContent.style.display = "none";
		}

	}

	if(sideBar) {
		sideBar.style.top = playerHeight + 10 + "px";

		if(bShowChat) {
			sideBar.style.display = "";
		} else {
			sideBar.style.display = "none";
		}
	}

	if(bShowChat) {
		document.body.style.overflowY = "scroll";
		document.body.style.overflowX = "hidden";
	} else {
		document.body.style.overflowY = "hidden";
		document.body.style.overflowX = "hidden";
		document.body.style.overflow = "hidden";
	}

}

resizePlayer();
window.addEventListener("resize", resizePlayer);

document.querySelector("#body-container").style.display = "none";
