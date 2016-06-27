/*
 * Name: BaiduPush.java
 * Author: xishiyi7
 * Date: 2015/10/14
*/

package com.xishiyi7.plugins;

import java.util.List;

import android.app.ActivityManager;
import android.app.ActivityManager.RunningTaskInfo;
import android.content.Context;

import com.baidu.android.pushservice.PushMessageReceiver;

import java.io.File;
import java.io.FileOutputStream;
import android.os.Environment;


import android.widget.Toast;
import android.app.PendingIntent;
import android.content.Intent;

//import com.xishiyi7.***.CordovaApp;  此处需要替换成你项目的CordovaApp

import android.app.Notification;
import android.app.NotificationManager;
import android.R;
import android.widget.Toast;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONTokener;


public class PushReceiver extends PushMessageReceiver{

	/*
     * 绑定baidupush
     * params：arg2:appid; arg3:userid; arg4:channelid  `` 详细请查阅百度云推送官方文档各参数介绍
     * return：void
     * 
	*/
	@Override
	public void onBind(Context arg0, int arg1, String arg2, String arg3,
			String arg4, String arg5) {
		// TODO Auto-generated method stub
		
		Toast.makeText(arg0, "bind baidu push success", Toast.LENGTH_LONG).show();
		
		/* 此处我将绑定好的设备信息存储在设备的文件夹中 方便前端js读取 */
		String appId = "\"" + arg2 + "\"";
		String userId = "\""+arg3+"\"";
		String channelId = "\""+arg4+"\"";
		String rtnStr = "{\"appId\":" + appId + "," + "\"userId\":" + userId + ","+ "\"channelId\":" + channelId + "}";
		String sdCardDir = Environment.getExternalStorageDirectory().getAbsolutePath();
		String path = Environment.getExternalStorageDirectory().getAbsolutePath()+"/com.xishiyi7"+"/Files/";

		File tmpDir = new File(path);
		if (!tmpDir.exists()) {
			tmpDir.mkdirs();
		}

		try{
			File saveFile = new File(path,"pushInfo.txt");
			FileOutputStream fos = new FileOutputStream(saveFile);
			fos.write((rtnStr).getBytes());
			fos.close();
		}
		catch(Exception e){
			Toast.makeText(arg0, e.getMessage(), Toast.LENGTH_LONG).show();
		}
		
		Intent bindintent = new Intent("com.xishiyi7.action.BroadcastPushBind");
		// 把消息信息当成广播参数传递 触发BroadcastPushBind 
		arg0.getApplicationContext().sendBroadcast(bindintent);
		
	}

	@Override
	public void onDelTags(Context arg0, int arg1, List<String> arg2,
			List<String> arg3, String arg4) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onListTags(Context arg0, int arg1, List<String> arg2,
			String arg3) {
		// TODO Auto-generated method stub
		
	}

	@Override
	// 透传消息
	public void onMessage(Context arg0, String arg1, String arg2) {
		// TODO Auto-generated method stub

		// 在前台运行
		if(isRunFront(arg0)){
			// 透传操作
			Toast.makeText(arg0, "onMessage in front", Toast.LENGTH_LONG).show();
			Intent intent = new Intent("com.xishiyi7.action.BroadcastPushAction");
			// 把消息信息当成广播参数传递 触发BroadcastPushAction
			intent.putExtra("params", arg1);
			arg0.getApplicationContext().sendBroadcast(intent);
		}
		// 如果在后台运行 模拟通知形式 自定义消息
		else{
			Toast.makeText(arg0, "onMessage in background", Toast.LENGTH_LONG).show();
			int id = (int)(Math.random() * 10000);
			//定义NotificationManager
	        NotificationManager mNotificationManager = (NotificationManager) arg0.getSystemService(Context.NOTIFICATION_SERVICE);
	        //定义通知栏展现的内容信息
	        CharSequence tickerText = arg.getPackageName()+"有新通知";
	        long when = System.currentTimeMillis();
	        Notification notification2 = new Notification(R.drawable.arrow_up_float, tickerText, when);
			notification2.flags = Notification.FLAG_AUTO_CANCEL;
	        //定义下拉通知栏时要展现的内容信息
	        CharSequence contentTitle = "通知";
	        CharSequence contentText = arg1.split("\\|")[0];
	        Intent notificationIntent = new Intent(arg0, CordovaApp.class);
	        notificationIntent.putExtra("params", arg1);
	        notificationIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

	        PendingIntent contentIntent = PendingIntent.getActivity(arg0, 0,
	                notificationIntent, 0);
	        notification2.setLatestEventInfo(arg0, contentTitle, contentText,
	                contentIntent);
	        //用mNotificationManager的notify方法通知用户生成标题栏消息通知
	        mNotificationManager.notify(id, notification2);
		}
	}

	@Override
	public void onNotificationArrived(Context arg0, String arg1, String arg2,
			String arg3) {
		// TODO Auto-generated method stub
		Toast.makeText(arg0, "onNotificationArrived", Toast.LENGTH_LONG).show();

		JSONObject argJson = new JSONObject();
		JSONTokener jsonParser = new JSONTokener(arg3);
		String argStr = "";
		try {
			argJson = (JSONObject) jsonParser.nextValue();
			argStr = argJson.getString("key");
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		Intent pushintent = new Intent("com.xishiyi7.action.BroadcastPushAction");

		// 把消息信息当成广播参数传递 触发BroadcastPushAction
		pushintent.putExtra("params", argStr);
		arg0.getApplicationContext().sendBroadcast(pushintent);
	}

	@Override
	public void onNotificationClicked(Context arg0, String arg1, String arg2,
			String arg3) {
		Toast.makeText(arg0, "onNotificationClicked", Toast.LENGTH_LONG).show();

		JSONObject argJson = new JSONObject();
		JSONTokener jsonParser = new JSONTokener(arg3);
		String argStr = "";
		try {
			argJson = (JSONObject) jsonParser.nextValue();
			argStr = argJson.getString("key");
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		Intent notificationIntent = new Intent(arg0, CordovaApp.class);
		notificationIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);

		Intent pushintent = new Intent("com.xishiyi7.action.PushBackgroundAction");

		// 把消息信息当成广播参数传递 触发PushBackgroundAction
		pushintent.putExtra("params", argStr);
		arg0.getApplicationContext().sendBroadcast(pushintent);


	}

	@Override
	public void onSetTags(Context arg0, int arg1, List<String> arg2,
			List<String> arg3, String arg4) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void onUnbind(Context arg0, int arg1, String arg2) {
		// TODO Auto-generated method stub
		
	}

	/*
	 *	判断应用是否在前台运行
	 *	params：context
	 *	return：true/false
	 */
	public boolean isRunFront(Context context) {
		ActivityManager am = (ActivityManager)context.getSystemService(Context.ACTIVITY_SERVICE);
	    List<RunningTaskInfo> list = am.getRunningTasks(1);
	    String runningInfo = "";
	    if(null!=list){
	    	runningInfo = list.get(0).topActivity.getPackageName().toString();
	    }
	    return runningInfo.equals(context.getPackageName());
	}

}
