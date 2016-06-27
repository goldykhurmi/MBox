$(document).ready(function () {
    var recordid = "";
    var alterid = "";
    var solution = $('#text_solution').val();
    var server = localStorage.getItem("server");
    $('#savesolution').click(function () {
        $.ajax({
            type: 'POST',
            url: 'http://erp.mgc.tm/AppServices/LoginService.ashx?Type=UpdateSolution&EID=' + recordid + '&ID=' + alterid + '&Solution=' + solution + '&server=' + server,
            data: '{}',
            success: function (data) {
                alertify.alert('Saved Successfully')
            }
        });
    });


});