$(document).ready(function () {
    //localStorage.clear();
    if (localStorage.getItem("savepassword") == "yes") {
        location.replace('home.html');
    }
    else {
        localStorage.clear();
    }
});

$(document).ajaxStart(function () {
    $('#notification').addClass("opacity");

}).ajaxStop(function () {
    $('#notification').removeClass("opacity");
    $('#inTurnFadingTextG').hide();
});

$(document).ready(function () {
    //localStorage.clear();
    // if (window.location.search.split('?')[1] == "log=1") {
    //     $('#splashscreen').hide();
    //     $('#en-index').removeClass("hide_body");
    // }
    // else {
    //     $("#splashscreen").fadeOut(3000, function () {
    //         $('#en-index').removeClass("hide_body");
    //     });
    // }
    if (localStorage.getItem("LanguageHtml") != "") {
        if (localStorage.getItem("LanguageHtml") == "Ch") {


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
                            $("." + id).html(text);
                        });
                    }
                });
            });
        }
    }


});


$(document).ready(function () {
    //localStorage.clear();
    if (localStorage.getItem("LanguageHtml") != "") {
        if (localStorage.getItem("LanguageHtml") == "Ch") {
            $(function () {
                var language = 'chinese';
                $.ajax({
                    type: "GET",
                    url: 'http://erp.mgc.tm/appservices/translation.xml',
                    dataType: "xml",
                    success: function (xml) {
                        $(xml).find('loginbutton').each(function () {
                            var id = $(this).attr('id');
                            var text = $(this).find(language).text();
                            $("." + id).html(text);
                        });
                    }
                });
            });
        }
        else {
            $(function () {
                var language = 'english';
                $.ajax({
                    type: "GET",
                    url: 'http://erp.mgc.tm/appservices/translation.xml',
                    dataType: "xml",
                    success: function (xml) {
                        $(xml).find('translation').each(function () {
                            var id = $(this).attr('id');
                            var text = $(this).find(language).text();
                            $("." + id).html(text);
                        });
                    }
                });
            });

        }
    }
});

$(document).ready(function () {
    var server = $('#drpserver option:selected').val();

    $('#btnsubmit').click(function () {
        if ($("#remember_me").prop('checked') == true) {
            var username = $('#exampleInputEmail1').val();
            var password = $('#exampleInputPassword1').val();
            alertify.confirm('You Want to save Password or Not?').set('labels', { ok: 'Yes', cancel: 'No' }).set('oncancel', function (closeEvents) {
                alertify.error('Cancel');

                $.ajax({
                    type: 'POST',
                    url: 'http://erp.mgc.tm/AppServices/LoginService.ashx?Username=' + username + '&password=' + password + '&type=' + '&server=' + server,
                    data: '{}',
                    success: function (data) {

                        //alert('data: ' + JSON.stringify(data.data));
                        if (typeof (Storage) !== "undefined") {
                            // Store
                            // Retrieve
                            localStorage.setItem("CompanyLanguage", JSON.stringify(data.data.CompanyLanguage));

                            localStorage.setItem("LocationFilter", JSON.stringify(data.data.LocationFilter).toString().replace(/"/g, ""));
                            localStorage.setItem("EquipmentTypeFilter", JSON.stringify(data.data.EquipmentTypeFilter).toString().replace(/"/g, ""));
                            localStorage.setItem("DepartmentFilter", JSON.stringify(data.data.DepartmentFilter).toString().replace(/"/g, ""));
                            localStorage.setItem("FirstName", JSON.stringify(data.data.FirstName).toString().replace(/"/g, ""));
                            localStorage.setItem("RecordID", JSON.stringify(data.data.RecordID));
                            localStorage.setItem("Language", JSON.stringify(data.data.Language).toString().replace(/"/g, ""));
                            localStorage.setItem("MenuLanguageID", JSON.stringify(data.data.MenuLanguageID));
                            localStorage.setItem("BelongToTableID", JSON.stringify(data.data.BelongToTableID));
                            localStorage.setItem("TInitials", JSON.stringify(data.data.TInitials).toString().replace(/"/g, ""));
                            localStorage.setItem("Title", JSON.stringify(data.data.Title).toString().replace(/"/g, ""));
                            localStorage.setItem("UserGroup", JSON.stringify(data.data.UserGroup).toString().replace(/"/g, ""));
                            localStorage.setItem("TimePeriodFilter", JSON.stringify(data.data.TimePeriodFilter).toString().replace(/"/g, ""));
                            localStorage.setItem("machinegroupfilter", JSON.stringify(data.data.machinegroupfilter).toString().replace(/"/g, ""));
                            localStorage.setItem("server", server);
                        }
                        if (username != "" && password != "" && data.data.RecordID > 0) {
                            location.replace('home.html');
                        }
                        else {
                            alertify.alert("Invalid UserName Or Password");
                        }
                        //console.log(data);
                    },
                    error: function (data) {
                        alertify.alert("Invalid UserName Or Password");
                    },
                    contentType: "application/json",
                    dataType: 'json'
                });

            }).set('onok',
                             function (closeEvent) {
                                 $.ajax({
                                     type: 'POST',
                                     url: 'http://erp.mgc.tm/AppServices/LoginService.ashx?Username=' + username + '&password=' + password + '&type=' + '&server=' + server,
                                     data: '{}',
                                     success: function (data) {
                                         //alert('data: ' + JSON.stringify(data.data));
                                         if (typeof (Storage) !== "undefined") {
                                             // Store
                                             // Retrieve
                                             localStorage.setItem("CompanyLanguage", JSON.stringify(data.data.CompanyLanguage));
                                             localStorage.setItem("savepassword", "yes");

                                             localStorage.setItem("LocationFilter", JSON.stringify(data.data.LocationFilter).toString().replace(/"/g, ""));
                                             localStorage.setItem("EquipmentTypeFilter", JSON.stringify(data.data.EquipmentTypeFilter).toString().replace(/"/g, ""));
                                             localStorage.setItem("DepartmentFilter", JSON.stringify(data.data.DepartmentFilter).toString().replace(/"/g, ""));
                                             localStorage.setItem("FirstName", JSON.stringify(data.data.FirstName).toString().replace(/"/g, ""));
                                             localStorage.setItem("RecordID", JSON.stringify(data.data.RecordID));
                                             localStorage.setItem("Language", JSON.stringify(data.data.Language).toString().replace(/"/g, ""));
                                             localStorage.setItem("MenuLanguageID", JSON.stringify(data.data.MenuLanguageID));
                                             localStorage.setItem("BelongToTableID", JSON.stringify(data.data.BelongToTableID));
                                             localStorage.setItem("TInitials", JSON.stringify(data.data.TInitials).toString().replace(/"/g, ""));
                                             localStorage.setItem("Title", JSON.stringify(data.data.Title).toString().replace(/"/g, ""));
                                             localStorage.setItem("UserGroup", JSON.stringify(data.data.UserGroup).toString().replace(/"/g, ""));
                                             localStorage.setItem("TimePeriodFilter", JSON.stringify(data.data.TimePeriodFilter).toString().replace(/"/g, ""));
                                             localStorage.setItem("machinegroupfilter", JSON.stringify(data.data.machinegroupfilter).toString().replace(/"/g, ""));
                                             localStorage.setItem("server", server);
                                         }
                                         if (username != "" && password != "" && data.data.RecordID > 0) {
                                             location.replace('home.html');
                                         }
                                         else {
                                             alertify.alert("Invalid UserName Or Password");
                                         }
                                         //console.log(data);
                                     },
                                     error: function (data) {
                                         alertify.alert("Invalid UserName Or Password");
                                     },
                                     contentType: "application/json",
                                     dataType: 'json'
                                 });
                             });
        };
        return false;
    });
});


