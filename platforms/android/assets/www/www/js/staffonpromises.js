$(document).ready(function () {


    var stafftable = $('#staff');
    var staffnametable = $('#staff_name');


    var RecordID = localStorage.getItem("RecordID");
    var LocationFilter = localStorage.getItem("LocationFilter");
    var DepartmentFilter = localStorage.getItem("DepartmentFilter");
    var EquipmentTypeFilter = localStorage.getItem("EquipmentTypeFilter");
    var server = localStorage.getItem("server");

    $.ajax({
        type: 'POST',

        url: 'http://erp.mgc.tm/appservices/StaffonPremesis.ashx?Type=Staff&RecordID=' + RecordID + '&server=' + server,

        data: '{}',
        success: function (data) {
            if (data.data.length > 1) {
                for (i = 0; i < data.data.length; i++) {
                    stafftable.append("<tr><td>" + data.data[i].Department + "</td><td>" + data.data[i].NeedOperator + "</td><td>" + data.data[i].EquipmentOn + "</td><td>" + data.data[i].UserCount + "</td></tr>");
                }
            }
            else if (data.data.length > 0) {
                stafftable.append("<tr><td>" + data.data[0].Department + "</td><td>" + data.data[0].NeedOperator + "</td><td>" + data.data[0].EquipmentOn + "</td><td>" + data.data[0].UserCount + "</td></tr>");
            }
        }
    });

    $.ajax({
        type: 'POST',

        url: 'http://erp.mgc.tm/appservices/StaffonPremesis.ashx?Type=&RecordID=' + RecordID + '&server=' + server,

        data: '{}',
        success: function (data) {
            if (data.data.length > 1) {
                for (i = 0; i < data.data.length; i++) {
                    staffnametable.append("<tr><td>" + data.data[i].FirstName + "</td><td>" + data.data[i].LastName + "</td><td>" + data.data[i].RegisteredMin + "</td></tr>");
                }
            }
            else if (data.data.length > 0) {
                staffnametable.append("<tr onclick='Opendetails();'><td>" + data.data[0].FirstName + "</td><td>" + data.data[0].LastName + "</td><td>" + data.data[0].RegisteredMin + "</td></tr>");
            }
        }
    });
});

function Opendetails() {
    window.location.replace("staffdetails.html")
}
function gohome() {

    window.location.replace("home.html")
}


$(document).ajaxStart(function () {
    $('#notification').addClass("opacity");

}).ajaxStop(function () {
    $('#notification').removeClass("opacity");
    $('#inTurnFadingTextG').hide();
});
