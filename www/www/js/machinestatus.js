$(document).ready(function () {

    var totaltable = $('#totalefficiency');
    var deptable = $('#department_efficiency');
    var machtable = $('#machineefficiency');
    var grouptable = $('#group_efficiency');
    var totalalltable = $('#totalefficiencyall');
    var server = localStorage.getItem("server");
    

    var RecordID = localStorage.getItem("RecordID");
    var LocationFilter = localStorage.getItem("LocationFilter");
    var DepartmentFilter = localStorage.getItem("DepartmentFilter");
    var EquipmentTypeFilter = localStorage.getItem("EquipmentTypeFilter");
    var TimePeriodFilter = localStorage.getItem("TimePeriodFilter");
    var machinegroupfilter = localStorage.getItem("machinegroupfilter");
    //  alert(RecordID);
    $.ajax({
        type: 'POST',
        url: 'http://erp.mgc.tm/appservices/MachineStatus.ashx?Type=Total&RecordID=' + RecordID + '&LocationID=' + LocationFilter + '&departmentID=' + DepartmentFilter + '&equipmenttype=' + EquipmentTypeFilter + '&TimePeriodFilter=' + TimePeriodFilter + '&machinegroupfilter=' + machinegroupfilter + '&server=' + server,
        data: '{}',
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            var totaleff = parseFloat(data.data.totalefficiency * 100);
            totaltable.append("<tr><td>Total eff:</td><td>" + totaleff.toFixed(0) + "%" + "</td></tr>");
        }
    });


    $.ajax({
        type: 'POST',
        url: 'http://erp.mgc.tm/appservices/MachineStatus.ashx?Type=Department&RecordID=' + RecordID + '&LocationID=' + LocationFilter + '&departmentID=' + DepartmentFilter + '&equipmenttype=' + EquipmentTypeFilter + '&TimePeriodFilter=' + TimePeriodFilter + '&machinegroupfilter=' + machinegroupfilter + '&server=' + server,
        data: '{}',
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {

            for (i = 0; i < data.data.length; i++) {
                var depeff = parseFloat(data.data[i].efficiency * 100);
                deptable.append("<tr onclick='FilterTotalEfficency(" + data.data[i].DepartmentID + ")'><td>" + data.data[i].Department + "</td><td>" + depeff.toFixed(0) + "%" + "</td></tr>");
            }
        }
    });

    $.ajax({
        type: 'POST',
        url: 'http://erp.mgc.tm/appservices/MachineStatus.ashx?Type=Machine&RecordID=' + RecordID + '&LocationID=' + LocationFilter + '&departmentID=' + DepartmentFilter + '&equipmenttype=' + EquipmentTypeFilter + '&TimePeriodFilter=' + TimePeriodFilter + '&machinegroupfilter=' + machinegroupfilter + '&server=' + server,
        data: '{}',
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {

            for (i = 0; i < data.data.length; i++) {
                var machineff = parseFloat(data.data[i].efficiency * 100);
                machtable.append("<tr onclick='FilterTotalEfficencyMachine(" + data.data[i].EquipmentType + ")'><td>" + data.data[i].Material + "</td><td>" + machineff.toFixed(0) + "%" + "</td></tr>");
            }
            // $("#test").load("machine_efficiency");
        }
    });

    $.ajax({
        type: 'POST',
        url: 'http://erp.mgc.tm/appservices/MachineStatus.ashx?Type=MachineGroup&RecordID=' + RecordID + '&LocationID=' + LocationFilter + '&departmentID=' + DepartmentFilter + '&equipmenttype=' + EquipmentTypeFilter + '&TimePeriodFilter=' + TimePeriodFilter + '&machinegroupfilter=' + machinegroupfilter + '&server=' + server,
        data: '{}',
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {

            for (i = 0; i < data.data.length; i++) {
                var machingrpeff = parseFloat(data.data[i].efficiency * 100);
                grouptable.append("<tr onclick='FilterTotalEfficencyGroup(" + data.data[i].ID + ")'><td>" + data.data[i].MachineGroupName + "</td><td>" + machingrpeff.toFixed(0) + "%" + "</td></tr>");
            }
        }
    });

    $.ajax({
        type: 'POST',
        url: 'http://erp.mgc.tm/appservices/MachineStatus.ashx?Type=TotalEfficencyAll&RecordID=' + RecordID + '&LocationID=' + LocationFilter + '&departmentID=' + DepartmentFilter + '&equipmenttype=' + EquipmentTypeFilter + '&TimePeriodFilter=' + TimePeriodFilter + '&machinegroupfilter=' + machinegroupfilter + '&server=' + server,
        data: '{}',
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {

            for (i = 0; i < data.data.length; i++) {
                var totalalleff = parseFloat(data.data[i].efficiency * 100);
                totalalltable.append("<tr onclick='MouldMachineDetails(" + data.data[i].machineid + ")'><td>" + data.data[i].MachineName + "</td><td>" + totalalleff.toFixed(0) + "%" + "</td><td>" + data.data[i].cooleron + "</td><td>" + data.data[i].LastStopTime + "</td></tr>");
            }
        }

    });
});
function FilterTotalEfficency(DepartmentID) {
    var totalalltable = $('#total_efficiency_all');

    var RecordID = localStorage.getItem("RecordID");
    var LocationFilter = localStorage.getItem("LocationFilter");
    var DepartmentFilter = localStorage.getItem("DepartmentFilter");
    var EquipmentTypeFilter = localStorage.getItem("EquipmentTypeFilter");
    $("#total_efficiency_all").find("tr:not(:first)").remove();
    $.ajax({
        type: 'POST',
        url: 'http://erp.mgc.tm/appservices/MachineStatus.ashx?Type=TotalEfficencyAll&RecordID=' + RecordID + '&LocationID=' + LocationFilter + '&departmentID=' + DepartmentFilter + '&equipmenttype=' + EquipmentTypeFilter + '&TimePeriodFilter=' + TimePeriodFilter + '&machinegroupfilter=' + machinegroupfilter + '&server=' + server,
        data: '{}',
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {

            for (i = 0; i < data.data.length; i++) {
                if (data.data[i].DepartmentID == DepartmentID) {

                    var totalalleff = parseFloat(data.data[i].efficiency * 100);
                    totalalltable.append("<tr><td>" + data.data[i].MachineName + "</td><td>" + totalalleff.toFixed(0) + "%" + "</td><td>" + data.data[i].cooleron + "</td><td>" + data.data[i].LastStopTime + "</td></tr>");
                }
            }
        }

    });
}

function FilterTotalEfficencyMachine(EquipmentType) {
    var totalalltable = $('#total_efficiency_all');

    var RecordID = localStorage.getItem("RecordID");
    var LocationFilter = localStorage.getItem("LocationFilter");
    var DepartmentFilter = localStorage.getItem("DepartmentFilter");
    var EquipmentTypeFilter = localStorage.getItem("EquipmentTypeFilter");
    $("#total_efficiency_all").find("tr:not(:first)").remove();
    $.ajax({
        type: 'POST',
        url: 'http://erp.mgc.tm/appservices/MachineStatus.ashx?Type=TotalEfficencyAll&RecordID=' + RecordID + '&LocationID=' + LocationFilter + '&departmentID=' + DepartmentFilter + '&equipmenttype=' + EquipmentTypeFilter + '&TimePeriodFilter=' + TimePeriodFilter + '&machinegroupfilter=' + machinegroupfilter + '&server=' + server,
        data: '{}',
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {

            for (i = 0; i < data.data.length; i++) {
                if (data.data[i].EquipmentType == EquipmentType) {

                    var totalalleff = parseFloat(data.data[i].efficiency * 100);
                    totalalltable.append("<tr><td>" + data.data[i].MachineName + "</td><td>" + totalalleff.toFixed(0) + "%" + "</td><td>" + data.data[i].cooleron + "</td><td>" + data.data[i].LastStopTime + "</td></tr>");
                }
            }
        }

    });
}

function FilterTotalEfficencyGroup(ID) {
    var totalalltable = $('#total_efficiency_all');

    var RecordID = localStorage.getItem("RecordID");
    var LocationFilter = localStorage.getItem("LocationFilter");
    var DepartmentFilter = localStorage.getItem("DepartmentFilter");
    var EquipmentTypeFilter = localStorage.getItem("EquipmentTypeFilter");
    $("#total_efficiency_all").find("tr:not(:first)").remove();
    $.ajax({
        type: 'POST',
        url: 'http://erp.mgc.tm/appservices/MachineStatus.ashx?Type=TotalEfficencyAll&RecordID=' + RecordID + '&LocationID=' + LocationFilter + '&departmentID=' + DepartmentFilter + '&equipmenttype=' + EquipmentTypeFilter + '&TimePeriodFilter=' + TimePeriodFilter + '&machinegroupfilter=' + machinegroupfilter + '&server=' + server,
        data: '{}',
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {

            for (i = 0; i < data.data.length; i++) {
                if (data.data[i].MachineGroupID == ID) {

                    var totalalleff = parseFloat(data.data[i].efficiency * 100);
                    totalalltable.append("<tr><td>" + data.data[i].MachineName + "</td><td>" + totalalleff.toFixed(0) + "%" + "</td><td>" + data.data[i].cooleron + "</td><td>" + data.data[i].LastStopTime + "</td></tr>");
                }
            }
        }

    });
}

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