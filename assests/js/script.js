// const require = createRequire(import.meta.url)
window.addEventListener('DOMContentLoaded', () => {
    // const { app, BrowserWindow } = require("electron");
    const {
        remote
    } = require('electron')
    // import { remote } from "electron";

    document.getElementById('option-close').addEventListener('click', closeWindow);
    document.getElementById('option-maximize').addEventListener('click', maximizeWindow);
    document.getElementById('option-minimize').addEventListener('click', minimizeWindow);

    function closeWindow() {
        var window = remote.getCurrentWindow()
        window.close()
    }

    function maximizeWindow() {
        var window = remote.getCurrentWindow()
        window.isMaximized() ? window.unmaximize() : window.maximize()
    }

    function minimizeWindow() {
        var window = remote.getCurrentWindow()
        window.minimize()
    }

    var todayContainer = document.querySelector(".today");

    var d = new Date();

    var weekday = new Array(7);
    weekday[0] = "Sunday 🖖";
    weekday[1] = "Monday 💪😀";
    weekday[2] = "Tuesday 😜";
    weekday[3] = "Wednesday 😌☕️";
    weekday[4] = "Thursday 🤗";
    weekday[5] = "Friday 🍻";
    weekday[6] = "Saturday 🙌";

    var n = weekday[d.getDay()];

    var randomWordArray = Array(
        "Oh my, it's ",
        "Whoop, it's ",
        "Happy ",
        "Seems it's ",
        "Awesome, it's ",
        "Have a nice ",
        "Happy fabulous ",
        "Enjoy your "
    );

    var randomWord = randomWordArray[Math.floor(Math.random() * randomWordArray.length)];

    todayContainer.innerHTML = randomWord + n;

})