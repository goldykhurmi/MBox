$(document).ready(function () {
    $('#test').change(function () {
        var langchange = "";
        if ($(this).val() == "Chinese") {
            langchange = "Ch";
        }
        else {
            langchange = "en";
        }
        if (typeof (Storage) !== "undefined") {
            localStorage.setItem("LanguageHtml", langchange)
            window.location.href = 'index.html';
        }

    });

});


function gohome() {
    window.location.replace("home.html")
}

