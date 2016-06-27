cordova.define("cordova-plugin-chrome-apps-alarms.Alarms", function(require, exports, module) {
// Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var exports = module.exports;
var exec = require('cordova/exec');
var storage = require('cordova-plugin-chrome-apps-storage.Storage');
var helpers = require('cordova-plugin-chrome-apps-common.helpers');
var platform = require('cordova/platform');
var channel = require('cordova/channel');
var Event = require('cordova-plugin-chrome-apps-common.events');
var useNativeAlarms = platform.id == 'android';
var alarms = Object.create(null);
var alarmsToFireOnStartUp = [];

function makeAlarm(name, scheduledTime, periodInMinutes, timeoutId) {
    var alarm = { };
    alarm.name = name;
    alarm.scheduledTime = scheduledTime;
    alarm.periodInMinutes = periodInMinutes;
    alarm.timeoutId = timeoutId;
    return alarm;
}

function triggerAlarm(name) {
    if (!(name in alarms)) {
        return;
    }
    alarm = alarms[name];
    if (alarm.periodInMinutes) {
        alarm.scheduledTime += alarm.periodInMinutes*60000;
        if (!useNativeAlarms) {
            alarm.timeoutId = setTimeout(function() { triggerAlarm(name); }, alarm.scheduledTime - Date.now());
        }
    } else {
        delete alarms[name];
    }
    saveAlarms(function() {
        exports.onAlarm.fire(alarm);
    });
}

function saveAlarms(callback) {
    storage.internal.set({'alarms':alarms}, callback && function() {
        callback();
    });
}

exports.create = function(name, alarmInfo) {
    if (typeof alarmInfo == 'undefined') {
        alarmInfo = name;
        name = '';
    }

    if ('delayInMinutes' in alarmInfo) {
        if(alarmInfo.delayInMinutes < .0042) { // about 0.25 seconds
            console.error('Error during alarms.create: delayInMinutes too small, using .0042');
            alarmInfo.delayInMinutes = .0042;
        }
    }
    if ('periodInMinutes' in alarmInfo) {
        if(alarmInfo.periodInMinutes < .0042) { // about 0.25 seconds
            console.error('Error during alarms.create: periodInMinutes too small, using .0042');
            alarmInfo.periodInMinutes = .0042;
        }
    }

    var when;
    if ('when' in alarmInfo) {
        when = alarmInfo.when;
        if ('delayInMinutes' in alarmInfo) {
            throw new Error('Error during alarms.create: Cannot set both when and delayInMinutes.');
        }
    } else if ('delayInMinutes' in alarmInfo) {
        when = Date.now() + alarmInfo.delayInMinutes*60000;
    } else if ('periodInMinutes' in alarmInfo) {
        when = Date.now() + alarmInfo.periodInMinutes*60000;
    } else {
        console.error('Error during alarms.create: Must set at least one of when, delayInMinutes, or periodInMinutes');
        return;
    }

    if (useNativeAlarms) {
        alarms[name] = makeAlarm(name, when, alarmInfo.periodInMinutes);
        exec(undefined, undefined, 'ChromeAlarms', 'create', [name, when, alarmInfo.periodInMinutes]);
    } else {
        if (name in alarms) {
            clearTimeout(alarms[name].timeoutId);
        }
        var timeoutId = setTimeout(function() { triggerAlarm(name); }, when - Date.now());
        alarms[name] = makeAlarm(name, when, alarmInfo.periodInMinutes, timeoutId);
    }
    saveAlarms();
}

exports.get = function(name, callback) {
    if (typeof callback == 'undefined') {
        callback = name;
        name = '';
    }
    if (!(name in alarms)) {
        console.error('Error during alarms.get: No alarm named \'' + name + '\' exists.');
        callback();
        return;
    }
    setTimeout(function() {
        callback(alarms[name]);
    }, 0);
};

exports.getAll = function(callback) {
    var ret = [];
    for (var name in alarms) {
        ret.push(alarms[name]);
    }
    setTimeout(function() {
       callback(ret);
    }, 0);
};

exports.clear = function clear(name, callback) {
    if (typeof name == 'undefined') {
        name = '';
    }
    if (!(name in alarms)) {
        console.error('Error during alarms.clear: No alarm named \'' + name + '\' exists.');
        return;
    }

    delete alarms[name];
    if (useNativeAlarms) {
        exec(function() {
            saveAlarms(callback)
        }, undefined, 'ChromeAlarms', 'clear', [[name]]);
    } else {
        clearTimeout(alarms[name].timeoutId);
        saveAlarms(callback);
    }
};

exports.clearAll = function(callback) {
    var names = Object.keys(alarms);
    if (useNativeAlarms) {
        alarms = Object.create(null);
        exec(function() {
            saveAlarms(callback);
        }, undefined, 'ChromeAlarms', 'clear', [names]);
    } else {
        names.forEach(function(name) {
            exports.clear(name);
        });
        saveAlarms(callback);
    }
};

exports.onAlarm = new Event('onAlarm');

function reregisterAlarms() {
    // Iterate over Object.keys(alarms) rather than using a normal
    // for (var name in alarms) loop because alarms can be deleted as we are
    // iterating in the case where a non-repeating alarm gets fired.
    Object.keys(alarms).forEach(function(name) {
        var scheduledTime = alarms[name].scheduledTime;
        if (Date.now() > scheduledTime) {
            // The behavior of desktop chrome if we missed firing an alarm at the scheduled time is to fire
            // the alarm initially and if periodInMinutes is set, then schedule so that the firing points
            // are aligned with what they originally were when the alarm was previously created. We try to
            // emulate this behavior here.
            alarmsToFireOnStartUp.push(name);
            if (!(name in alarms)) {
                return;
            }
            clearTimeout(alarms[name].timeoutId);
            var periodInMillis = alarms[name].periodInMinutes*60000;
            scheduledTime += Math.ceil((Date.now() - scheduledTime)/periodInMillis)*periodInMillis;
        }
        var alarmCreateInfo = {'when':scheduledTime};
        if ('periodInMinutes' in alarms[name]) {
            alarmCreateInfo.periodInMinutes = alarms[name].periodInMinutes;
        }
        delete alarms[name];
        exports.create(name, alarmCreateInfo);
    });
}

function firePendingAlarms() {
    var alarmId;
    while (alarmId = alarmsToFireOnStartUp.shift()) {
        triggerAlarm(alarmId);
    }
    alarmsToFireOnStartUp = null;
}

function onMessageFromNative(msg) {
    if (msg.id) {
        var alarmId = msg.id;
        if (alarmsToFireOnStartUp) {
            alarmsToFireOnStartUp.push(alarmId);
        } else {
            triggerAlarm(alarmId);
        }
    } else {
        throw new Error('alarms unknown message: ' + msg);
    }
}

channel.createSticky('onChromeAlarmsReady');
channel.waitForInitialization('onChromeAlarmsReady');
channel.onCordovaReady.subscribe(function() {
    storage.internal.get('alarms', function(values) {
        alarms = values.alarms || {};
        alarms.__proto__ = null;

        if (useNativeAlarms) {
            exec(onMessageFromNative, undefined, 'ChromeAlarms', 'messageChannel', []);
        } else {
            reregisterAlarms();
        }

        helpers.runAtStartUp(function() {
            if (alarmsToFireOnStartUp.length) {
                helpers.queueLifeCycleEvent(firePendingAlarms);
            } else {
                alarmsToFireOnStartUp = null;
            }
        });
        channel.initializationComplete('onChromeAlarmsReady');
    });
});

});
