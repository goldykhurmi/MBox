function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(function () {


    var mouldtable = $('#mould');
    var powerusagetable = $('#power_usage');
    var cycletypetable = $('#cycle_time');
    var configtypetable = $('#config_type');
    var materialneedtable = $('#material_need');
    var machineid = getParameterByName('machineid');

    var RecordID = localStorage.getItem("RecordID");
    var LocationFilter = localStorage.getItem("LocationFilter");
    var DepartmentFilter = localStorage.getItem("DepartmentFilter");
    var EquipmentTypeFilter = localStorage.getItem("EquipmentTypeFilter");
    var server = localStorage.getItem("server");

    $.ajax({
        type: 'POST',
        url: 'http://erp.mgc.tm/appservices/MouldCurrentStatusDetails.ashx?RecordID=' + RecordID + '&LocationID=' + LocationFilter + '&departmentID=' + DepartmentFilter + '&equipmenttype=' + EquipmentTypeFilter + '&server=' + server,

        data: '{}',
        success: function (data) {
            if (machineid != "") {

                for (i = 0; i < data.data.length; i++) {
                    if (data.data[i].machineid == machineid) {
                        if (data.data[i].cooleron.indexOf('Off') == 0) {
                            mouldtable.append("<tr><td>" + data.data[i].machinenumber + "</td><td>" + data.data[i].cooleron + "-" + data.data[i].Description + "</td><td>" + data.data[i].offsecond + "</td><td>" + data.data[i].speccode + "</td><td>" + data.data[i].NeedHour + "</td></tr>");
                        }
                        else {
                            mouldtable.append("<tr><td>" + data.data[i].machinenumber + "</td><td>" + data.data[i].cooleron + "</td><td>" + data.data[i].offsecond + "</td><td>" + data.data[i].speccode + "</td><td>" + data.data[i].NeedHour + "</td></tr>");
                        }

                        powerusagetable.append("<tr><td>" + Math.round(data.data[i].KWH) + "</td><td>" + Math.round(data.data[i].Total) + "</td><td>" + Math.round(data.data[i].totalkwh) + "</td><td>" + Math.round(Math.round(data.data[i].totalkwh) / Math.round(data.data[i].Total) * 100) + "</td></tr>");
                        cycletypetable.append("<tr><td>" + Math.round(data.data[i].interval) + "</td><td>" + Math.round(data.data[i].BudgetCycleTime) + "</td><td>" + Math.round(data.data[i].efficiency) + "</td><td>" + Math.round(data.data[i].offtimes) + "</td><td>" + Math.round(data.data[i].sumstop) + "</td></tr>");
                        configtypetable.append("<tr><td>" + data.data[i].mouldkey + "</td><td>" + data.data[i].dmoulding + "</td><td>" + data.data[i].balanceshot + "</td></tr>");
                        materialneedtable.append("<tr><td>" + data.data[i].material + "</td><td>" + data.data[i].masterbatch + "</td><td>" + data.data[i].color + "</td><td>" + Math.round(data.data[i].needmaterial) + "</td><td>" + Math.round(data.data[i].needmasterbatch) + "</td></tr>");
                    }
                }


            }
            else {
                for (i = 0; i < data.data.length; i++) {
                    if (data.data[i].cooleron.indexOf('Off') == 0) {
                        mouldtable.append("<tr><td>" + data.data[i].machinenumber + "</td><td>" + data.data[i].cooleron + "-" + data.data[i].Description + "</td><td>" + data.data[i].offsecond + "</td><td>" + data.data[i].speccode + "</td><td>" + data.data[i].NeedHour + "</td></tr>");
                    }
                    else {
                        mouldtable.append("<tr><td>" + data.data[i].machinenumber + "</td><td>" + data.data[i].cooleron + "</td><td>" + data.data[i].offsecond + "</td><td>" + data.data[i].speccode + "</td><td>" + data.data[i].NeedHour + "</td></tr>");
                    }

                    powerusagetable.append("<tr><td>" + Math.round(data.data[i].KWH) + "</td><td>" + Math.round(data.data[i].Total) + "</td><td>" + Math.round(data.data[i].totalkwh) + "</td><td>" + Math.round(Math.round(data.data[i].totalkwh) / Math.round(data.data[i].Total) * 100) + "</td></tr>");
                    cycletypetable.append("<tr><td>" + Math.round(data.data[i].interval) + "</td><td>" + Math.round(data.data[i].BudgetCycleTime) + "</td><td>" + Math.round(data.data[i].efficiency) + "</td><td>" + Math.round(data.data[i].offtimes) + "</td><td>" + Math.round(data.data[i].sumstop) + "</td></tr>");
                    configtypetable.append("<tr><td>" + data.data[i].mouldkey + "</td><td>" + data.data[i].dmoulding + "</td><td>" + data.data[i].balanceshot + "</td></tr>");
                    materialneedtable.append("<tr><td>" + data.data[i].material + "</td><td>" + data.data[i].masterbatch + "</td><td>" + data.data[i].color + "</td><td>" + Math.round(data.data[i].needmaterial) + "</td><td>" + Math.round(data.data[i].needmasterbatch) + "</td></tr>");
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