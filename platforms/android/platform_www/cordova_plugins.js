cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.hutchind.cordova.plugins.launcher/www/Launcher.js",
        "id": "com.hutchind.cordova.plugins.launcher.Launcher",
        "clobbers": [
            "plugins.launcher"
        ]
    },
    {
        "file": "plugins/cordova-plugin-background-app/backgroundapp.js",
        "id": "cordova-plugin-background-app.backgroundapp",
        "clobbers": [
            "cordova.backgroundapp"
        ]
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-common/events.js",
        "id": "cordova-plugin-chrome-apps-common.events",
        "clobbers": [
            "chrome.Event"
        ]
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-common/errors.js",
        "id": "cordova-plugin-chrome-apps-common.errors"
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-common/stubs.js",
        "id": "cordova-plugin-chrome-apps-common.stubs"
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-common/helpers.js",
        "id": "cordova-plugin-chrome-apps-common.helpers"
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-storage/storage.js",
        "id": "cordova-plugin-chrome-apps-storage.Storage",
        "clobbers": [
            "chrome.storage"
        ]
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-alarms/alarms.js",
        "id": "cordova-plugin-chrome-apps-alarms.Alarms",
        "clobbers": [
            "chrome.alarms"
        ]
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-runtime/api/app/runtime.js",
        "id": "cordova-plugin-chrome-apps-runtime.app.runtime",
        "clobbers": [
            "chrome.app.runtime"
        ]
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-runtime/api/runtime.js",
        "id": "cordova-plugin-chrome-apps-runtime.runtime",
        "clobbers": [
            "chrome.runtime"
        ]
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-runtime/lib/CryptoJS/sha256.js",
        "id": "cordova-plugin-chrome-apps-runtime.CryptoJS-sha256"
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-runtime/lib/CryptoJS/enc-base64-min.js",
        "id": "cordova-plugin-chrome-apps-runtime.CryptoJS-enc-base64-min"
    },
    {
        "file": "plugins/cordova-plugin-chrome-apps-notifications/notifications.js",
        "id": "cordova-plugin-chrome-apps-notifications.notifications",
        "clobbers": [
            "chrome.notifications"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.pgUtils/www/pgUtils.js",
        "id": "org.apache.cordova.pgUtils.PGUtils",
        "merges": [
            "navigator.PGUtils"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "com.hutchind.cordova.plugins.launcher": "0.2.2",
    "cordova-plugin-background-app": "2.0.2",
    "cordova-plugin-chrome-apps-common": "1.0.7",
    "cordova-plugin-chrome-apps-storage": "1.0.4",
    "cordova-plugin-chrome-apps-alarms": "1.3.3",
    "cordova-plugin-chrome-apps-runtime": "1.1.1",
    "cordova-plugin-chrome-apps-notifications": "1.3.1",
    "org.apache.cordova.pgUtils": "0.1.0"
};
// BOTTOM OF METADATA
});