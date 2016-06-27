
$(document).ready(function () {


    var System_Status = $('#System_Status');
    var System_Status1 = $('#System_Status1');
    var System_Status2 = $('#System_Status2');



    var RecordID = localStorage.getItem("RecordID");
    var LocationFilter = localStorage.getItem("LocationFilter");
    var DepartmentFilter = localStorage.getItem("DepartmentFilter");
    var EquipmentTypeFilter = localStorage.getItem("EquipmentTypeFilter");
    var CompanyID = localStorage.getItem("BelongToTableID");
    var server = localStorage.getItem("server");


    $.ajax({
        type: 'POST',

        url: 'http://erp.mgc.tm/appservices/SystemStatus.ashx?Type=DataSum&CompanyID=' + CompanyID + '&server=' + server,

        data: '{}',
        success: function (data) {
            var totaluptime = 0;
            for (j = 0; j < data.data.length; j++) {
                totaluptime += Math.round(data.data[j].uptime);
            }
            var AverageUptime = (totaluptime / data.data.length); //* 100;
            System_Status.append("<tr><td>" + Math.round(AverageUptime) + "%" + "</td></tr>")

            if (data.data.length > 1) {
                for (i = 0; i < data.data.length; i++) {
                    System_Status1.append("<tr><td>" + data.data[i].masterid + "</td><td>" + Math.round(data.data[i].uptime) + "%" + "</td></tr>");
                }
            }
            else {
                System_Status1.append("<tr><td>" + data.data[0].masterid + "</td><td>" + Math.round(data.data[0].uptime) + "%" + "</td></tr>");
            }
        }
    });

    $.ajax({
        type: 'POST',

        url: 'http://erp.mgc.tm/appservices/SystemStatus.ashx?Type=Data&CompanyID=' + CompanyID + '&server=' + server,

        data: '{}',
        success: function (data) {
            if (data.data.length > 1) {
                for (i = 0; i < data.data.length; i++) {
                    System_Status2.append("<tr><td>" + data.data[i].MasterID + "</td><td>" + data.data[i].MachineNumber + "</td><td>" + Math.round(data.data[i].uptime) + "%" + "</td></tr>");
                }
            }
            else {
                System_Status2.append("<tr><td>" + data.data[0].MasterID + "</td><td>" + data.data[0].MachineNumber + "</td><td>" + Math.round(data.data[0].uptime) + "%" + "</td></tr>");
            }
        }
    }

    );





    $(document).ajaxStart(function () {
        $('#notification').addClass("opacity");

    }).ajaxStop(function () {
        $('#notification').removeClass("opacity");
        $('#inTurnFadingTextG').hide();
    });

});
function gohome() {
    window.location.replace("home.html")
}