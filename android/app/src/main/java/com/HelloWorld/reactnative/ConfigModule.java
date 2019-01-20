package com.HelloWorld.reactnative;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.HelloWorld.utils.SharedPreferencesUtil;

/**
 * Created by bobsha on 2018/7/27.
 */

public class ConfigModule extends ReactContextBaseJavaModule {
    public ConfigModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return this.getClass().getSimpleName();
    }

    @ReactMethod
    public void setEnvOptions(ReadableArray list) {
        if (list != null) {
            SharedPreferencesUtil.saveEnvList(list.toArrayList());
        }
    }
}
