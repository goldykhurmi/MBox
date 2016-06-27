$(document).ready(function () {


    var notifitable = $('#notificatoion');


    var RecordID = localStorage.getItem("RecordID");
    var LocationFilter = localStorage.getItem("LocationFilter");
    var DepartmentFilter = localStorage.getItem("DepartmentFilter");
    var EquipmentTypeFilter = localStorage.getItem("EquipmentTypeFilter");
    var server = localStorage.getItem("server");


    $.ajax({
        type: 'POST',

        url: 'http://erp.mgc.tm/appservices/Notificationashx.ashx?RecordID=' + RecordID + '&LocationID=' + LocationFilter + '&departmentID=' + DepartmentFilter + '&equipmenttype=' + EquipmentTypeFilter + '&server=' + server,

        data: '{}',
        success: function (data) {

            for (i = 0; i < data.data.length; i++) {
                if (data.data[i].Description.indexOf("Off") == 0) {
                    notifitable.append("<tr><td>" + data.data[i].RecordDate.split("T")[0] + ' ' + data.data[i].RecordDate.split("T")[1] + "</td><td>" + data.data[i].MachineNumber + "</td><td>" + data.data[i].Description + "</td><td>" + data.data[i].KWh.toFixed(2) + "</td><td>" + data.data[i].SolutionUser + "</td></tr>");

                }
                else {
                    notifitable.append("<tr><td>" + data.data[0].RecordDate.split("T")[0] + ' ' + data.data[0].RecordDate.split("T")[1] + "</td><td>" + data.data[i].MachineNumber + "</td><td>" + data.data[i].Description + "</td><td>" + " " + "</td><td>" + " " + "</td></tr>");

                }
            }

        }
    });



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
