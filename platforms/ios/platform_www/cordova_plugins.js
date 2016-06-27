cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.hutchind.cordova.plugins.launcher/www/Launcher.js",
        "id": "com.hutchind.cordova.plugins.launcher.Launcher",
        "pluginId": "com.hutchind.cordova.plugins.launcher",
        "clobbers": [
            "plugins.launcher"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.pgUtils/www/pgUtils.js",
        "id": "org.apache.cordova.pgUtils.PGUtils",
        "pluginId": "org.apache.cordova.pgUtils",
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
    "org.apache.cordova.pgUtils": "0.1.0"
}
// BOTTOM OF METADATA
});