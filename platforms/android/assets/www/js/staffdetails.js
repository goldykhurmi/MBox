$(document).ready(function () {


    var staffdetailtable = $('#Staff_Details');
    var staffdetailtable2 = $('#Staff_Details2');
    var staffdetailtable3 = $('#Staff_Details3');
    var staffdetailtable4 = $('#Staff_Details4');


    var RecordID = localStorage.getItem("RecordID");
    var LocationFilter = localStorage.getItem("LocationFilter");
    var DepartmentFilter = localStorage.getItem("DepartmentFilter");
    var EquipmentTypeFilter = localStorage.getItem("EquipmentTypeFilter");
    var server = localStorage.getItem("server");



    $.ajax({
        type: 'POST',



        url: 'http://erp.mgc.tm/Appservices/StaffonPremesis.ashx?Type=&RecordID=' + RecordID + '&server=' + server,

        data: '{}',
        success: function (data) {

            for (i = 0; i < data.data.length; i++) {
                staffdetailtable.append("<tr><td>" + data.data[i].FirstName + "</td><td>" + data.data[i].LastName + "</td><td>" + data.data[i].RegisteredMin + "</td></tr>");
                staffdetailtable2.append("<tr><td>" + data.data[i].CompanyTitle + "</td></tr>");
                staffdetailtable3.append("<tr><td>" + data.data[i].SentToCompany + "</td><td>" + data.data[i].Department + "</td></tr>");
                staffdetailtable4.append("<tr onclick='OpenDialer(" + data.data[i].Mobile + ")'><td>" + data.data[i].Mobile + "</td></tr>");
            }
        }
    });


});
function OpenDialer(mobile) {
    document.location.href = "tel:+" + mobile + "";
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