//var exec = require('cordova/exec');

//exports.coolMethod = function(arg0, success, error) {
//    exec(success, error, "ShowNotification", "coolMethod", [arg0]);
//};


shownotification.prototype.coolMethod = function (successCallback) {
    exec(onSucess, onError, "ShowNotification", "coolMethod",[]);
};