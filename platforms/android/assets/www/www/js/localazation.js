$(document).ready(function () {
    //localStorage.clear();
    if (localStorage.getItem("LanguageHtml") != "") {
        if (localStorage.getItem("LanguageHtml") == "Ch") {

            // alert('yes chinese');

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
                            //alert(text);
                            $("." + id).html(text);
                        });
                    }
                });
            });

        }
    }


});