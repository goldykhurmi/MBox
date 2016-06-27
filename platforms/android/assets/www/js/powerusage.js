$(document).ready(function () {


    var powerusagetable = $('#power_usage');
    var areasumtable = $('#areasum');
    var powerservicetable = $('#powerusageservice');
    var departmentAlltable = $('#departmentAll');


    var RecordID = localStorage.getItem("RecordID");
    var LocationFilter = localStorage.getItem("LocationFilter");
    var DepartmentFilter = localStorage.getItem("DepartmentFilter");
    var EquipmentTypeFilter = localStorage.getItem("EquipmentTypeFilter");
    var server = localStorage.getItem("server");


    $.ajax({
        type: 'POST',

        url: 'http://erp.mgc.tm/appservices/powerusageservice.ashx?Type=KWH&RecordID=' + RecordID + '&LocationID=' + LocationFilter + '&departmentID=' + DepartmentFilter + '&equipmenttype=' + EquipmentTypeFilter + '&server=' + server,

        data: '{}',
        success: function (data) {
            if (data.data.length > 1) {
                for (i = 0; i < data.data.length; i++) {
                    powerusagetable.append("<tr><td>" + Math.round(data.data[i].kwh) + "</td><td>" + Math.round(data.data[i].total) + "</td><td>" + Math.round(data.data[i].NoDetails) + "</td><td>" + Math.round(data.data[i].totalkwh) + "</td><td>" + Math.round(data.data[i].PowerPer) * 100 + "%" + "</td></tr>");
                }
            }
            else {
                powerusagetable.append("<tr><td>" + Math.round(data.data[0].kwh) + "</td><td>" + Math.round(data.data[0].total) + "</td><td>" + Math.round(data.data[0].NoDetails) + "</td><td>" + Math.round(data.data[0].totalkwh) + "</td><td>" + Math.round(data.data[0].PowerPer) * 100 + "%" + "</td></tr>");
            }
        }
    });

    $.ajax({
        type: 'POST',

        url: 'http://erp.mgc.tm/appservices/powerusageservice.ashx?Type=AreaSum&RecordID=' + RecordID + '&LocationID=' + LocationFilter + '&departmentID=' + DepartmentFilter + '&equipmenttype=' + EquipmentTypeFilter + '&server=' + server,

        data: '{}',
        success: function (data) {

            for (i = 0; i < data.data.length; i++) {
                areasumtable.append("<tr><td>" + Math.round(data.data[i].RecordDate) + "</td><td>" + Math.round(data.data[i]).MachineNumber + "</td><td>" + Math.round(data.data[i]).Description + "</td><td>" + Math.round(data.data[i]).kwh + "</td><td>" + Math.round(data.data[i]).SolutionUser + "</td></tr>");
            }
        }
    });


    $.ajax({
        type: 'POST',

        url: 'http://erp.mgc.tm/appservices/powerusageservice.ashx?Type=DepartmentSum&RecordID=' + RecordID + '&LocationID=' + LocationFilter + '&departmentID=' + DepartmentFilter + '&equipmenttype=' + EquipmentTypeFilter + '&server=' + server,

        data: '{}',
        success: function (data) {

            for (i = 0; i < data.data.length; i++) {
                powerservicetable.append("<tr><td>" + data.data[i].Department + "</td><td>" + Math.round(data.data[i].total) + "</td><td>" + Math.round(data.data[i].total) + "</td><td>" + Math.round(data.data[i].kwh) + "</td><td>" + Math.round(data.data[i].totalkwh) + "%" + "</td></tr>");
            }
        }
    });

    $.ajax({
        type: 'POST',

        url: 'http://erp.mgc.tm/appservices/powerusageservice.ashx?Type=DepartmentAll&RecordID=' + RecordID + '&LocationID=' + LocationFilter + '&departmentID=' + DepartmentFilter + '&equipmenttype=' + EquipmentTypeFilter + '&server=' + server,

        data: '{}',
        success: function (data) {

            for (i = 0; i < data.data.length; i++) {
                departmentAlltable.append("<tr><td onclick='MouldMachineDetails(" + data.data[i].MachineID + ")'>" + data.data[i].MachineNumber + "</td><td>" + data.data[i].Status + "</td><td>" + Math.round(data.data[i].KWH) + "</td><td>" + Math.round(data.data[i].Total) + "</td><td>" + Math.round(data.data[i].totalkwh) + "</td></tr>");
            }
        }
    });


});
function MouldMachineDetails(MachineID) {
    window.location.replace("moulding_details.html?MachineID=" + MachineID);
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