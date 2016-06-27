/*
 * Name: BaiduPush.js
 * Author: xishiyi7
 * Date: 2015/10/14
*/

var exec = require('cordova/exec');

var BaiduPush = function(){};

// load into BaiduPush plugin
BaiduPush.prototype.run = function(success,error){
	exec(success,error,'BaiduPush','runService',[]);
};

// start push service
BaiduPush.prototype.start = function(success,error){
	exec(success,error,'BaiduPush','startPushService',[]);
};

// stop push service
BaiduPush.prototype.stop = function(success,error){
	exec(success,error,'BaiduPush','stopPushService',[]);
};

// resume push service
BaiduPush.prototype.resume = function(success,error){
	exec(success,error,'BaiduPush','resumePushService',[]);
};

var baiduPush = new BaiduPush();

module.exports = baiduPush;