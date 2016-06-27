$(document).ready(function () {
    var currentstatustable = $('#CurrentStatus');
    var RecordID = localStorage.getItem("RecordID");
    var LocationFilter = localStorage.getItem("LocationFilter");
    var DepartmentFilter = localStorage.getItem("DepartmentFilter");
    var EquipmentTypeFilter = localStorage.getItem("EquipmentTypeFilter");
    var server = localStorage.getItem("server");
    $.ajax({
        type: 'POST',
        url: 'http://erp.mgc.tm/appservices/CurrentStatus.ashx?RecordID=' + RecordID + '&LocationID=' + LocationFilter + '&departmentID=' + DepartmentFilter + '&equipmenttype=' + EquipmentTypeFilter + '&server=' + server,
        data: '{}',
        success: function (data) {
            for (i = 0; i < data.data.length; i++) {
                currentstatustable.append("<tr class='CurrentStatus'><td onclick='MouldMachineDetails(" + data.data[i].machineid + ")'>" + data.data[i].MachineName + "</td><td class='status'>" + data.data[i].cooleron + "</td><td>" + data.data[i].offsecond + "</td><td>" + data.data[i].speccode + "</td><td class='error'>" + data.data[i].Needhour + "</td></tr>");
            }
        }
    });
});
$(document).ready(function () {
    $('#on').click(function () {
        var price = "on";
        $('#CurrentStatus').show();
        $(this).parent('div').children('table').children('tbody').children('tr.CurrentStatus').children('td.status').each(function () {
            var test = $(this).text().toLowerCase().indexOf(price);
            if (test == 0) {
                $(this).parent("tr.CurrentStatus").show();
            }
            else {
                $(this).parent("tr.CurrentStatus").hide();
            }
        });
    });
});
$(document).ready(function () {
    $('#off').click(function () {
        var price = "off";
        $('#CurrentStatus').show();
        $(this).parent('div').children('table').children('tbody').children('tr.CurrentStatus').children('td.status').each(function () {
            var test = $(this).text().toLowerCase().indexOf(price);
            if (test == 0) {
                $(this).parent("tr.CurrentStatus").show();
            }
            else {
                $(this).parent("tr.CurrentStatus").hide();
            }
        });
    });
});
$(document).ready(function () {
    $('#error').click(function () {
        var price = "Error";
        $('#CurrentStatus').show();
        $(this).parent('div').children('table').children('tbody').children('tr.CurrentStatus').children('td.error').each(function () {
            var test = $(this).text();
            if (test != null || test != "") {
                $(this).parent("tr.CurrentStatus").hide();
            }


        });
    });
});
$(document).ready(function () {
    $('#all').click(function () {
        var price = "all";
        $('#CurrentStatus').show();
        $(this).parent('div').children('table').children('tbody').children('tr').removeAttr('style');
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
