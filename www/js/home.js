$(document).ready(function () {
    $('.drawer').drawer();
    $('#machinestatus').click(function () {
        location.replace('machinestatus.html');
    });

    $('#notification').click(function () {
        location.replace('notification.html');
    });

    $('#powerusage').click(function () {
        location.replace('powerusage.html');
    });

    $('#staffpremises').click(function () {
        location.replace('staffonpromises.html');
    });

    $('#moulding').click(function () {
        location.replace('moulding.html');
    });

    $('#systemstatus').click(function () {
        location.replace('systemstatus.html');
    });

});

function LogOut() {
    localStorage.clear();
    window.location.replace("index.html?log=1");
}

$(document).ready(function () {
    //localStorage.clear();
    if (localStorage.getItem("LanguageHtml") !== "en") {
        if (localStorage.getItem("LanguageHtml") == "Ch")
        { }
    }
});

$(document).ajaxStart(function () {
    $('#notifications').addClass("opacity");

}).ajaxStop(function () {
    $('#notifications').removeClass("opacity");
    $('#inTurnFadingTextG').hide();
});

function exitapp() {
    navigator.app.exitApp();
}





//document.addEventListener("backbutton", function () {
//    if ($('.ui-page-active').attr('id') == 'main') {
//        exitAppPopup();
//    } else {
//        history.back();
//    }
//}, false);


//function exitAppPopup() {
//    navigator.notification.confirm(
//          'Exit PhoneGap ' + device.cordova + ' Demo?'
//        , function (button) {
//            if (button == 2) {
//                navigator.app.exitApp();
//            }
//        }
//        , 'Exit'
//        , 'No,Yes'
//    );
//    return false;
//}