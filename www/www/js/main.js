
var app = {


    /*findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
},*/





    /*renderHomeView: function() {
    var html =
            "<div class='header'><h1>Home</h1></div>" +
            "<div class='search-view'>" +
            "<input class='search-key'/>" +
            "<ul class='employee-list'></ul>" +
            "</div>"
    $('body').html(html);
    $('.search-key').on('keyup', $.proxy(this.findByName, this));
},*/


    registerEvents: function () {


        document.addEventListener('deviceready', this.onDeviceReady, false);

        var self = this;
        // Check of browser supports touch events...
        if (document.documentElement.hasOwnProperty('ontouchstart')) {
            // ... if yes: register touch event listener to change the "selected" state of the item
            $('body').on('touchstart', 'a', function (event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('touchend', 'a', function (event) {
                $(event.target).removeClass('tappable-active');
            });
        } else {
            // ... if not: register mouse events instead
            $('body').on('mousedown', 'a', function (event) {
                $(event.target).addClass('tappable-active');
            });
            $('body').on('mouseup', 'a', function (event) {
                $(event.target).removeClass('tappable-active');
            });
        }

        $(window).on('hashchange', $.proxy(this.route, this));



    },

    onDeviceReady: function () {
        var self = this;
        //alert('testning', 'Info1');
         alert("tetsg");
        document.addEventListener("pause", onPause, false);
        // alert("tetsg2");
        try {
            //Start work, bind the ids app id 7733258 

           


            window.baidupush.startWork("etKEdklEG1iyFGOim3w0dQvB", function (info) {
                // alert(JSON.stringify(info), 'InfoStart');
                //alert(JSON.stringify(info.data.channelId), 'InfoStart');
                //alert(JSON.stringify(info.data.userId), 'InfoStart');
                var test = (JSON.stringify(info.data.channelId), 'InfoStart');
                //obj1 = JSON.stringify(info.data.channelId);
                //this.cID = JSON.stringify(info.data.channelId);
                alert(test);
                console.log(device.cordova);
                var model = device.model;
                var platform = device.platform;

               

                //alert(JSON.stringify(info.data.channelId));
                //alert(JSON.stringify(info.data.userId));
                //alert(model);

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
                                            $.ajax({
                                                type: "POST",
                                                url: 'http://erp.mgc.tm/appservices/DeviceInfo.ashx?RecordId=' + data.data.RecordID + '&channelID=' + JSON.stringify(info.data.channelId) + '&channelUserID=' + JSON.stringify(info.data.userId) + '&DeviceName=' + model + '&DevicePlatform=' + platform + '&server=' + server,
                                                data: '{}',
                                                contentType: "application/json",
                                                dataType: 'json',
                                                success: function (data) {
                                                    // alert(data + "sucess");
                                                },
                                                error: function (data) {
                                                    //alert(JSON.stringify(data));
                                                    //alert(data.data);
                                                }
                                            });
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
                                                             // alert(data.data.RecordID);
                                                             // alert(JSON.stringify(info.data.channelId));
                                                             // alert(JSON.stringify(info.data.userId));
                                                             // alert(model);
                                                             $.ajax({
                                                                 type: "POST",
                                                                 url: 'http://erp.mgc.tm/appservices/DeviceInfo.ashx?RecordId=' + data.data.RecordID + '&channelID=' + JSON.stringify(info.data.channelId) + '&channelUserID=' + JSON.stringify(info.data.userId) + '&DeviceName=' + model + '&DevicePlatform=' + platform + '&server=' + server,
                                                                 data: '{}',
                                                                 contentType: "application/json",
                                                                 dataType: 'json',
                                                                 success: function (data) {
                                                                     // alert(data + "sucess");
                                                                 },
                                                                 error: function (data) {
                                                                     //  alert(JSON.stringify(data));
                                                                     //alert(data.data);
                                                                 }
                                                             });
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


                //alert(model);
                //$.ajax({
                //    type: "POST",
                //    url: 'http://erp.mgc.tm/appservices/DeviceInfo.ashx?RecordId=' + RecordID + '&channelID=' + JSON.stringify(info.data.channelId) + '&channelUserID=' + JSON.stringify(info.data.userId) + '&DeviceName=' + model,
                //    data: '{}',
                //    contentType: "application/json",
                //    dataType: 'json',
                //    success: function (data) {
                //        alert(data + "sucess");
                //    },
                //    error: function (data) {
                //        alert(JSON.stringify(data));
                //        //alert(data.data);
                //    }
                //});
                //success callback
                //your code here
            });
        } catch (e) {

            alert(e.message, 'InfoStartWork');
        }

        window.baidupush.listenNotificationArrived(function (info) {
            //your code here
            alert(JSON.stringify(info), 'Info Receive Notification');
        });


        window.baidupush.listenNotificationClicked(function (info) {
            //your code here
            // cordova.backgroundapp.show();
            alert("test11");
            log('App started: ' + new Date());


            //window.open("index.html");
            //alert(info);
        });


        function onPause() {
            //Listen notification arrived event, when a notification arrived, the callback function will be called
            window.baidupush.listenNotificationArrived(function (info) {
                //your code here
                // alert("test1");
                //window.open("index.html");
                //alert(info);
            });

            //Listen notification clicked event, when a notification is clicked, the callback function will be called
            window.baidupush.listenNotificationClicked(function (info) {
                //your code here
                // alert("test11");
                //window.open("index.html");
                //alert(info);
            });

            //Only for android
            //Listen message arrived event, when a message arrived, the callback function will be called	
            window.baidupush.listenMessage(function (info) {
                //your code here
                //alert("test111");
                //window.open("index.html");
                //alert(JSON.stringify(info));
            });
        }
        // alert("tetsg4");
    },

    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },
    /*    initialize: function() {
        this.store = new MemoryStore();
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    } */
    /*initialize: function() {
      var self = this;
      this.store = new MemoryStore(function() {
          self.showAlert('Store Initialized', 'Info');
        });
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    }*/
    slidePage: function (page) {

        var currentPageDest,
        self = this;

        // If there is no current page (app just started) -> No transition: Position new page in the view port
        if (!this.currentPage) {
            $(page.el).attr('class', 'page stage-center');
            $('body').append(page.el);
            this.currentPage = page;
            return;
        }

        // Cleaning up: remove old pages that were moved out of the viewport
        $('.stage-right, .stage-left').not('.homePage').remove();

        if (page === app.homePage) {
            // Always apply a Back transition (slide from left) when we go back to the search page
            $(page.el).attr('class', 'page stage-left');
            currentPageDest = "stage-right";
        } else {
            // Forward transition (slide from right)
            $(page.el).attr('class', 'page stage-right');
            currentPageDest = "stage-left";
        }

        $('body').append(page.el);

        // Wait until the new page has been added to the DOM...
        setTimeout(function () {
            // Slide out the current page: If new page slides from the right -> slide current page to the left, and vice versa
            $(self.currentPage.el).attr('class', 'page transition ' + currentPageDest);
            // Slide in the new page
            $(page.el).attr('class', 'page stage-center transition');
            self.currentPage = page;
        });

    },






    route: function () {
        var self = this;
        var hash = window.location.hash;
        if (!hash) {
            if (this.homePage) {
                this.slidePage(this.homePage);
            } else {
                this.homePage = new HomeView(this.store).render();
                this.slidePage(this.homePage);
            }
            return;
        }
        var match = hash.match(this.detailsURL);
        if (match) {
            this.store.findById(Number(match[1]), function (employee) {
                self.slidePage(new EmployeeView(employee).render());
            });
        }
    },

    initialize: function () {

        var self = this;

        //this.cID = "";

        this.detailsURL = /^#employees\/(\d{1,})/;
        self.registerEvents();

        this.store = new MemoryStore(function () {
            self.route();
        });


        /*document.addEventListener("deviceready", onDeviceReady, false);*/



    }
};


/*function onDeviceReady() {
    console.log(navigator.contacts);
}*/

app.initialize();