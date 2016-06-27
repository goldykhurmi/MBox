// Copyright (c) 2013 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

var SINGLE_ALARM_NAME_PREFIX = 'AlarmManualTests-OneTime';
var REPEATING_ALARM_NAME = 'AlarmManualTests-Repeating1';
var numAlarms = 0;

function createAlarm(delaySeconds, repeatSeconds) {
  var alarmName = SINGLE_ALARM_NAME_PREFIX + numAlarms;
  numAlarms++;

  var expectedFireTime = Date.now() + (delaySeconds * 1000);
  var alarm = { when:expectedFireTime };
  if (repeatSeconds) {
    alarmName = REPEATING_ALARM_NAME;
    alarm.periodInMinutes = repeatSeconds / 60;
  }
  chrome.alarms.create(alarmName, alarm);
}

// As this file is run at app startup, wait for deviceready before
// using any plugin APIs
document.addEventListener("deviceready", function() {
  console.log('Alarms test registered for alarms');

  chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === REPEATING_ALARM_NAME ||
      alarm.name.indexOf(SINGLE_ALARM_NAME_PREFIX) > -1) {
      console.log("Received alarm: " + alarm.name);
    }
  });
});

exports.defineManualTests = function(rootEl, addButton) {
  addButton('One-time alarm', function() {
    createAlarm(5);
  });

  addButton('Repeating alarm', function() {
    createAlarm(5, 60);
  });

  addButton('Cancel repeating alarm', function() {
      chrome.alarms.clear(REPEATING_ALARM_NAME);
  });

};

exports.defineAutoTests = function() {
  'use strict';

  require('cordova-plugin-chrome-apps-test-framework.jasmine_helpers').addJasmineHelpers();

  var sliceLowerLimit=300; // chrome production is 60000 ms, can get away with as low as 300ms for mobile (not spec)
  var alarmEarlyTolerance = sliceLowerLimit;
  var alarmLateTolerance = 5000;
  var scheduledEarlyTolerance = sliceLowerLimit;
  var scheduledLateTolerance = 5000;
  var testTimeout = sliceLowerLimit*1.5;
  var minTestTime=sliceLowerLimit;
//  jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000 //testTimeout;

  var isWithinDelta = function(actual, expected, lowerDelta, upperDelta) {
        return expected - lowerDelta <= actual && expected + upperDelta >= actual;
  };
  var customMatchers = {
       toBeWithinDelta: function(util,customEqualityTesters){
          return {
             compare: function(actual, expected, lowerDelta, upperDelta) {
                 var result={};
                 result.pass = isWithinDelta(actual, expected, lowerDelta, upperDelta);
                 return result;
             }
          };
       },
       toMatchAlarm:function(util,customEqualityTesters){
          return {
             compare:  function(actual,expectedAlarm) {
               var result ={};
               result.pass = expectedAlarm.name == actual.name &&
                      isWithinDelta(actual.scheduledTime, expectedAlarm.scheduledTime,
                               scheduledEarlyTolerance, scheduledLateTolerance) &&
                 expectedAlarm.periodInMinutes == actual.periodInMinutes;
               return result;
             }
          };
       }
  };

  it('should contain definitions', function() {
    expect(chrome.alarms).toBeDefined();
    expect(chrome.alarms.create).toBeDefined();
    expect(chrome.alarms.get).toBeDefined();
    expect(chrome.alarms.getAll).toBeDefined();
    expect(chrome.alarms.clear).toBeDefined();
    expect(chrome.alarms.clearAll).toBeDefined();
    expect(chrome.alarms.onAlarm).toBeDefined();
  });

  function clearAndVerify(callback) {
    chrome.alarms.clearAll(function() {
      chrome.alarms.getAll(function(alarms) {
        expect(alarms.length).toBe(0);
        callback();
      });
    });
  }

// this next bit is to figure out if we are on real production Chrome. If it is, then
// alarms will have a minimum granularity of one minute. This makes the tests take
// about 25 minutes to run if you adjust for that, so we just skip them. It hurts less.

  var probeAlarmHandler=function(alarm){
    prodCallback(0);
  };

  var runOnce=false;
  var prodCallback = function(result){
    if(!runOnce){
      runOnce=true;
      chrome.alarms.onAlarm.removeListener(probeAlarmHandler);
      clearAndVerify(function(){
        console.log('got alarm',result, Date.now());
        if (result == 0){ // tests are running with short minimums (debug mode)
          runtests();
        } else {
         console.log('Skipping alarm tests due to 60 second minimums');
        }
      });
   }
  };

  console.log('setting alarm',Date.now());
  var gotime=Date.now()+100;
  chrome.alarms.create('testalarm',{when:gotime});
  chrome.alarms.onAlarm.addListener(probeAlarmHandler);
  setTimeout( function(){
    prodCallback(1);
    }, 1500);

  function runtests(){
   describe('testing alarms', function() {

    beforeEach(function() {
      jasmine.addMatchers(customMatchers);
    });

    describe('testing create', function() {
      beforeEach(function(done) {
        clearAndVerify(done);
      });
      afterEach(function(done) {
        clearAndVerify(done);
      });

      it('when set only', function(done) {
        var expectedFireTime = Date.now() + minTestTime;

        chrome.alarms.onAlarm.addListener(function alarmHandler(alarm) {
          expect(Date.now()).toBeWithinDelta(expectedFireTime, alarmEarlyTolerance, alarmLateTolerance);
          expect(alarm.name).toBe('myalarm');
          expect(alarm.scheduledTime).toBeWithinDelta(expectedFireTime, alarmEarlyTolerance, alarmLateTolerance);
          expect(alarm.periodInMinutes).not.toBeDefined();
          chrome.alarms.onAlarm.removeListener(alarmHandler);
          done();
        });
        chrome.alarms.create('myalarm', { when:expectedFireTime });
      });

      it('delayInMinutes set only', function(done) {
        var expectedFireTime = Date.now() + minTestTime;

        chrome.alarms.onAlarm.addListener(function alarmHandler(alarm) {
          expect(Date.now()).toBeWithinDelta(expectedFireTime, alarmEarlyTolerance, alarmLateTolerance);
          expect(alarm.name).toBe('myalarm');
          expect(alarm.scheduledTime).toBeWithinDelta(expectedFireTime, scheduledEarlyTolerance, scheduledLateTolerance);
          expect(alarm.periodInMinutes).not.toBeDefined();
          chrome.alarms.onAlarm.removeListener(alarmHandler);
          setTimeout(function() {
            chrome.alarms.getAll(function(alarms) {
              expect(alarms.length).toBe(0);
              done();
            });
          }, 0);
        });

        chrome.alarms.create('myalarm', { delayInMinutes: minTestTime/60000 });
      });

      it('periodInMinutes set only', function(done) {
        var expectedFireTime = Date.now() + minTestTime;
        var callNumber = 0;

        chrome.alarms.onAlarm.addListener(function alarmHandler(alarm) {
          callNumber++;
          expect(Date.now()).toBeWithinDelta(expectedFireTime, alarmEarlyTolerance, alarmLateTolerance);
          expect(alarm.name).toBe('myalarm');
          expect(alarm.scheduledTime).toBeWithinDelta(expectedFireTime, scheduledEarlyTolerance, scheduledLateTolerance);
          expect(alarm.periodInMinutes).toBe(minTestTime/60000);
          if (callNumber < 3) {
            expectedFireTime += minTestTime;
          } else {
            chrome.alarms.onAlarm.removeListener(alarmHandler);
            done();
          }
        });

        chrome.alarms.create('myalarm', { periodInMinutes:minTestTime/60000 });
      }, testTimeout*3);

      it('periodInMinutes and delayInMinutes set', function(done) {
        var callNumber = 0;
        var expectedFireTime = Date.now() + minTestTime;

        chrome.alarms.onAlarm.addListener(function alarmHandler(alarm) {
          callNumber++;
          expect(Date.now()).toBeWithinDelta(expectedFireTime, alarmEarlyTolerance, alarmLateTolerance);
          expect(alarm.name).toBe('myalarm');
          expect(alarm.scheduledTime).toBeWithinDelta(expectedFireTime, scheduledEarlyTolerance, scheduledLateTolerance);
          expect(alarm.periodInMinutes).toBe(minTestTime/60000);
          if (callNumber < 3) {
            expectedFireTime += minTestTime;
          } else {
            chrome.alarms.onAlarm.removeListener(alarmHandler);
            done();
          }
        });

        chrome.alarms.create('myalarm', { delayInMinutes:minTestTime/60000, periodInMinutes:minTestTime/60000 });
      }, testTimeout*3);

      it('multiple alarms', function(done) {
        var expectedAlarms = { alarm1:{ name:'alarm1', scheduledTime:Date.now() + minTestTime },
                               alarm2:{ name:'alarm2', scheduledTime:Date.now() + 2*minTestTime },
                               alarm3:{ name:'alarm3', scheduledTime:Date.now() + 3*minTestTime } };
        chrome.alarms.onAlarm.addListener(function alarmHandler(alarm) {
          expect(alarm.name).toBe(expectedAlarms[alarm.name].name);
          expect(alarm.scheduledTime).toBeWithinDelta(expectedAlarms[alarm.name].scheduledTime, scheduledEarlyTolerance,
                                                      scheduledLateTolerance);
          expect(alarm.periodInMinutes).not.toBeDefined();
          delete expectedAlarms[alarm.name];
          if (Object.keys(expectedAlarms).length == 0) {
            chrome.alarms.onAlarm.removeListener(alarmHandler);
            done();
          }
        });

        for (var name in expectedAlarms) {
          chrome.alarms.create(name, { when:expectedAlarms[name].scheduledTime });
        }
      }, testTimeout*3);
    });

    describe('testing get', function() {
      var future = Date.now() + 100000;
      var inputAlarmInfo = { alarm1:{ when:future }, alarm2:{ delayInMinutes:2 }, alarm3:{ periodInMinutes:3 } };
      var expectedAlarms;
      beforeEach(function(done) {
        clearAndVerify(function() {
          expectedAlarms = { alarm1:{ name:'alarm1', scheduledTime:future },
                             alarm2:{ name:'alarm2', scheduledTime:Date.now() + 120000 },
                             alarm3:{ name:'alarm3', scheduledTime:Date.now() + 180000,
                                      periodInMinutes:3 } };
          for (var name in inputAlarmInfo) {
            chrome.alarms.create(name, inputAlarmInfo[name]);
          }
          done();
        });
      });
      afterEach(function(done) {
        clearAndVerify(done);
      });

      it('get one', function(done) {
        var numCalls = 0;
        function verifyAlarm(alarm) {
          numCalls++;
          expect(alarm).toMatchAlarm(expectedAlarms[alarm.name]);
          if (numCalls >= Object.keys(expectedAlarms).length) {
            done();
          }
        }
        for (var name in inputAlarmInfo) {
          chrome.alarms.get(name, verifyAlarm);
        }
      }, testTimeout);

      it('get all', function(done) {
        chrome.alarms.getAll(function(alarms) {
          for(var i = 0; i < alarms.length; i++) {
            expect(alarms[i]).toMatchAlarm(expectedAlarms[alarms[i].name]);
          }
          done();
        });
      }, testTimeout);
    });

    describe('testing clear', function() {
      var createAlarms;
      var alarmHandler;
      var nameSpy =jasmine.createSpy('nameSpy');

      beforeEach(function(done) {
        var inputAlarmInfo = { alarm1:{ when:Date.now() + minTestTime }, alarm2:{ delayInMinutes:minTestTime/60000 },
                               alarm3:{ periodInMinutes:minTestTime/60000 } };
        clearAndVerify(function() {
          nameSpy =jasmine.createSpy('nameSpy');
          chrome.alarms.onAlarm.addListener(function alarmHandler(alarm) {
            nameSpy(alarm.name);
          });
          createAlarms = function() {
            for (var name in inputAlarmInfo) {
              chrome.alarms.create(name, inputAlarmInfo[name]);
            }
          };
          done();
        });
      });
      afterEach(function(done) {
        chrome.alarms.onAlarm.removeListener(alarmHandler);
        clearAndVerify(done);
      });

      it('clear one', function(done) {
        // Create alarms here rather than in beforeEach to be extra sure that no alarm fires
        // before clearing it within the actual test.
        createAlarms();
        chrome.alarms.clear('alarm3', function() {
          expect(nameSpy).toHaveBeenCalledWith('alarm1');
          expect(nameSpy).toHaveBeenCalledWith('alarm2');
          expect(nameSpy).not.toHaveBeenCalledWith('alarm3');
          done();
        });
      });

      it('clear all', function(done) {
        createAlarms();
        chrome.alarms.clearAll(function() {
          expect(nameSpy).not.toHaveBeenCalled();
          done();
        });
      });

      it('clear unknown name', function(done) {
        createAlarms();
        chrome.alarms.clear('unknownName', function() {
          expect(nameSpy).toHaveBeenCalledWith('alarm1');
          expect(nameSpy).toHaveBeenCalledWith('alarm2');
          expect(nameSpy).toHaveBeenCalledWith('alarm3');
          done();
        });
      });
    });
  });
 }
};
