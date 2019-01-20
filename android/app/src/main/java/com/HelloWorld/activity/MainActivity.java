package com.HelloWorld.activity;

import android.app.Activity;
import android.os.Bundle;
import android.os.Handler;
import android.support.annotation.Nullable;

import com.facebook.react.ReactActivityDelegate;
import com.HelloWorld.R;
import com.HelloWorld.base.ReactBaseActivity;
import com.HelloWorld.utils.SharedPreferencesUtil;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactBaseActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "HelloWorld";
    }



    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        SplashScreen.show(this, R.style.SplashScreenTheme);
        super.onCreate(savedInstanceState);
        new Handler().postDelayed(new Runnable(){
            public void run() {
                SplashScreen.hide(null);
            }
        }, 3000);

    }

    @Override
    protected ReactActivityDelegate createReactActivityDelegate() {
        return new MyReactDelegate(this,getMainComponentName());
    }

    class MyReactDelegate extends ReactActivityDelegate {

        MyReactDelegate(Activity activity, @Nullable String mainComponentName) {
            super(activity, mainComponentName);
        }

        //js页面初始化参数在这里添加
        @Nullable
        @Override
        protected Bundle getLaunchOptions() {
            Bundle bundle = new Bundle();
//            ToastUtils.showToast(SharedPreferencesUtil.getEnvSelected());
            bundle.putString("envKey", SharedPreferencesUtil.getEnvSelected());//注 key 这个关键字 js会过滤掉  这个是大坑
            return bundle;
        }
    }
}
