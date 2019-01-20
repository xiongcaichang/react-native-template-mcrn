package com.HelloWorld.utils;

import android.content.Intent;

import com.HelloWorld.activity.MainActivity;
import com.HelloWorld.base.MainApplication;

/**
 * Created by bobsha on 2018/7/31.
 */
public class AppUtil {
    /**
     * 重新启动App -> 杀进程,会短暂黑屏,启动慢
     */
    public static void restartApp() {
        //启动页
        Intent intent = new Intent(MainApplication.getInstance(), MainActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        MainApplication.getInstance().startActivity(intent);
        android.os.Process.killProcess(android.os.Process.myPid());
    }

    /**
     * 重新启动App -> 不杀进程,缓存的东西不清除,启动快
     */
    public static void restartApp2() {
        final Intent intent = MainApplication.getInstance().getPackageManager()
                .getLaunchIntentForPackage(MainApplication.getInstance().getPackageName());
        if (intent != null) {
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
            MainApplication.getInstance().startActivity(intent);
        }
    }
}
