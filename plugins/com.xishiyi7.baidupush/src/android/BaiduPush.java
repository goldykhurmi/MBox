/*
 * Name: BaiduPush.java
 * Author: xishiyi7
 * Date: 2015/10/14
 * Attention: @代码中有一个key需要自行替换 @
*/

package com.xishiyi7.plugins;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.PluginResult;
import org.apache.cordova.PluginResult.Status;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;

import android.content.Intent;
import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.IntentFilter;
import android.widget.Toast;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaWebView;

import com.baidu.android.pushservice.PushManager;
import com.baidu.android.pushservice.PushConstants;

public class BaiduPush extends CordovaPlugin {

	private static CordovaWebView webView;
	private static Activity activity;

    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

		webView = this.webView;

        if (action.equals("runService")) {
        	callBind();
			callBackJs();
			callBackground();
            return true;
        }
        else if(action.equals("startPushService")){
        	PushManager.startWork(this.activity.getApplicationContext(),PushConstants.LOGIN_TYPE_API_KEY,"***");	// *** 代表你申请的baidu push key, 请在打包前自行替换
         	return true;
        }
        else if(action.equals("stopPushService")){
        	PushManager.stopWork(this.activity.getApplicationContext());
        	return true;
        }
        else if(action.equals("resumePushService")){
        	PushManager.resumeWork(this.activity.getApplicationContext());
			return true;
		}

        return false;
    }

	@Override
	public void initialize(CordovaInterface cordova, CordovaWebView webView) {
		super.initialize(cordova, webView);
		this.activity = cordova.getActivity();
		this.webView = webView;
	}

	/*
	 * 此处注册的BroadcastPushAction可以用于消息到达后，通知js可以去执行相应的回调，此处是sendPushResult
	*/
	private void callBackJs(){
		BroadcastReceiver pushReceiver = new BroadcastReceiver(){
			@Override
			public void onReceive(Context context, Intent intent) {
				String params = intent.getStringExtra("params");				
				String jsStr = "sendPushResult('"+ params +"')";
				webView.sendJavascript("javascript:"+jsStr);
			}
		};

		IntentFilter filter = new IntentFilter();
		filter.addAction("com.xishiyi7.action.BroadcastPushAction");
		filter.setPriority(Integer.MAX_VALUE);
		activity.registerReceiver(pushReceiver, filter);
	}

	/*
	 * 此处注册的PushBackgroundAction可以用于点击消息后，通知js可以去执行相应的回调，此处是sendBackgroundPushResult
	*/	
	private void callBackground(){
		BroadcastReceiver backgroundReceiver = new BroadcastReceiver(){
			@Override
			public void onReceive(Context context, Intent intent) {
				String params = intent.getStringExtra("params");
				String jsStr = "sendBackgroundPushResult('"+ params +"',1)";
				webView.sendJavascript("javascript:"+jsStr);
			}
		};

		IntentFilter filter = new IntentFilter();
		filter.addAction("com.xishiyi7.action.PushBackgroundAction");
		filter.setPriority(Integer.MAX_VALUE);
		activity.registerReceiver(backgroundReceiver, filter);
	}

	/*
	 * 此处注册的BroadcastPushBind可以用于绑定上baidupush后，通知js可以执行相对的回调，此处是bindPush
	*/
	private void callBind(){
		if(bindTag>0){
			return;
		}
		bindTag++;
		BroadcastReceiver bindReceiver = new BroadcastReceiver(){
			@Override
			public void onReceive(Context context, Intent intent) {
				String jsStr = "bindPush()";
				webView.sendJavascript("javascript:"+jsStr);
			}
		};
		IntentFilter filter = new IntentFilter();
		filter.addAction("com.xishiyi7.action.BroadcastPushBind");
		filter.setPriority(Integer.MAX_VALUE);
		activity.registerReceiver(bindReceiver, filter);

	}
}