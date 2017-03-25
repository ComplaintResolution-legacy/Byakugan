function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady() {
    document.addEventListener("back", backKeyDown, false);
}

function back() {
	navigator.app.backHistory();
}