package com.HelloWorld.reactnative;

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.HelloWorld.base.MainApplication;
import com.HelloWorld.service.DownloadService;
import com.HelloWorld.utils.AppUtil;
import com.HelloWorld.utils.SharedPreferencesUtil;

import static com.HelloWorld.service.DownloadService.KEY_TYPE;
import static com.HelloWorld.service.DownloadService.KEY_URL;
import static com.HelloWorld.service.DownloadService.TYPE_DEBUG_HOTFIX;
import static com.HelloWorld.service.DownloadService.TYPE_PROD_APK;

/**
 * Created by bobsha on 2018/7/27.
 */

public class NativeHandlerModule extends ReactContextBaseJavaModule {
    public NativeHandlerModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return this.getClass().getSimpleName();
    }

    @ReactMethod
    public void downloadApk(String url) {
        getReactApplicationContext().startService(new Intent(MainApplication.getInstance(), DownloadService.class)
                .putExtra(KEY_TYPE, TYPE_PROD_APK)
                .putExtra(KEY_URL, url));
    }

    @ReactMethod
    public void restartApp() {
        AppUtil.restartApp();
    }
}
