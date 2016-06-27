/*
 * Name: BaiduPush.java
 * Author: xishiyi7
 * Date: 2015/10/14
 * Attention: @��������һ��key��Ҫ�����滻 @
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
        	PushManager.startWork(this.activity.getApplicationContext(),PushConstants.LOGIN_TYPE_API_KEY,"***");	// *** �����������baidu push key, ���ڴ��ǰ�����滻
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
	 * �˴�ע���BroadcastPushAction����������Ϣ�����֪ͨjs����ȥִ����Ӧ�Ļص����˴���sendPushResult
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
	 * �˴�ע���PushBackgroundAction�������ڵ����Ϣ��֪ͨjs����ȥִ����Ӧ�Ļص����˴���sendBackgroundPushResult
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
	 * �˴�ע���BroadcastPushBind�������ڰ���baidupush��֪ͨjs����ִ����ԵĻص����˴���bindPush
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