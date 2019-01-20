package com.HelloWorld.base;

import android.support.v7.app.AppCompatActivity;

import com.umeng.analytics.MobclickAgent;

/**
 * Created by bobsha on 2018/7/26.
 */

public abstract class BaseActivity extends AppCompatActivity {
    private final String MY_NAME = getClass().getName();

    @Override
    protected void onResume() {
        super.onResume();

        MobclickAgent.onResume(this);
        MobclickAgent.onPageStart(MY_NAME);
    }

    @Override
    protected void onPause() {
        super.onPause();
        MobclickAgent.onPageEnd(MY_NAME);
        MobclickAgent.onPause(this);

    }
}
