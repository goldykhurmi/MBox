document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    var exit = 1;
    document.addEventListener("backbutton", function (e) {
        exit++;
        if (exit == 2) {
            $('body').cftoaster({
                content: "Press again to exit",
                animationTime: 150,
                showTime: 3000,
                maxWidth: 250,
                backgroundColor: "#1a1a1a",
                fontColor: "#eaeaea",
                bottomMargin: 75,
            });
        }
        if (exit == 3) {
            navigator.app.exitApp();
        }
    }, false);
}