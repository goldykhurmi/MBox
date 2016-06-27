$(document).ready(function () {


    var currentstatustable = $('#CurrentStatus');


    var RecordID = localStorage.getItem("RecordID");
    var LocationFilter = localStorage.getItem("LocationFilter");
    var DepartmentFilter = localStorage.getItem("DepartmentFilter");
    var EquipmentTypeFilter = localStorage.getItem("EquipmentTypeFilter");
    var server = localStorage.getItem("server");

    $.ajax({
        type: 'POST',

        url: 'http://erp.mgc.tm/appservices/filterservice.ashx?type=DepartmentFilter&DepartmentFilterID=' + LocationFilter + '&recordid=' + RecordID + '' + '&server=' + server,

        data: '{}',
        success: function (data) {

            for (i = 0; i < data.data.length; i++) {

                currentstatustable.append("<label>" + data.data[i].Senttocompany + "</label>");
            }
        }
    });

});


$(document).ready(function () {
    //localStorage.clear();
    if (localStorage.getItem("LanguageHtml") != "") {
        if (localStorage.getItem("LanguageHtml") == "Ch") {

            // alert('yes chinese');

            $(function () {
                var language = 'chinese';
                $.ajax({
                    type: "GET",
                    url: 'http://erp.mgc.tm/appservices/translation.xml',
                    dataType: "xml",
                    success: function (xml) {
                        $(xml).find('translation').each(function () {
                            var id = $(this).attr('id');
                            var text = $(this).find(language).text();
                            //alert(text);
                            $("." + id).html(text);
                        });
                    }
                });
            });

        }
    }


});
function gohome() {
    window.location.replace("home.html")
}

$(document).ajaxStart(function () {
    $('#notification').addClass("opacity");

}).ajaxStop(function () {
    $('#notification').removeClass("opacity");
    $('#inTurnFadingTextG').hide();
});