package com.HelloWorld.activity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.preference.PreferenceManager;
import android.support.annotation.Nullable;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
import android.util.Log;
import android.view.View;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.Switch;

import com.facebook.react.devsupport.interfaces.DevSupportManager;
import com.HelloWorld.R;
import com.HelloWorld.base.BaseActivity;
import com.HelloWorld.base.MainApplication;
import com.HelloWorld.service.DownloadService;
import com.HelloWorld.utils.ToastUtils;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;
import timber.log.Timber;

import static com.HelloWorld.service.DownloadService.KEY_TYPE;
import static com.HelloWorld.service.DownloadService.KEY_URL;
import static com.HelloWorld.service.DownloadService.TYPE_DEBUG_HOTFIX;
import static com.HelloWorld.utils.NetworkUtil.isIP;

/**
 * Created by bobsha on 2018/7/26.
 */

public class BundleSettingActivity extends BaseActivity implements View.OnClickListener {
    private static final String PREFS_DEBUG_SERVER_HOST_KEY = "debug_http_host";
    @BindView(R.id.toolbar)
    Toolbar toolBar;
    @BindView(R.id.switch_local)
    Switch switch_local;
    @BindView(R.id.port_ll)
    LinearLayout port_ll;
    @BindView(R.id.ip_ll)
    LinearLayout ip_ll;
    @BindView(R.id.branch_ll)
    LinearLayout branch_ll;

    @BindView(R.id.ip_et)
    EditText ip_et;
    @BindView(R.id.port_et)
    EditText port_et;
    @BindView(R.id.branch_et)
    EditText branch_et;

    boolean isLocal = true;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bundle_setting);
        ButterKnife.bind(this);
        toolBar.setNavigationIcon(R.mipmap.arrow_light_green_middle);
        toolBar.setNavigationOnClickListener(this);
        switch_local.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {
                isLocal = isChecked;
                setState(isLocal);
            }
        });
        SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(MainApplication.getInstance());
        String defaultStr = sharedPreferences.getString(PREFS_DEBUG_SERVER_HOST_KEY, "");
        if (!TextUtils.isEmpty(defaultStr)) {
            String[] defaultStrs = defaultStr.split(":");
            if (defaultStrs.length > 1) {
                ip_et.setText(defaultStrs[0]);
                port_et.setText(defaultStrs[1]);
            }
        }
    }

    private void setState(boolean isLocal) {
        port_ll.setVisibility(isLocal ? View.VISIBLE : View.GONE);
        ip_ll.setVisibility(isLocal ? View.VISIBLE : View.GONE);
        branch_ll.setVisibility(isLocal ? View.GONE : View.VISIBLE);
    }

    @OnClick(R.id.save_btn)
    public void clickSave() {
        if (isLocal) {
            SharedPreferences sharedPreferences = PreferenceManager.getDefaultSharedPreferences(MainApplication.getInstance());
            String ipInput = ip_et.getText().toString().trim();
            String portInput = port_et.getText().toString().trim();
            if (!isIP(ipInput)) {
                ToastUtils.showToast("IP不合法！");
            } else if (TextUtils.isEmpty(portInput)) {
                ToastUtils.showToast("端口不能为空！");
            } else if ((ipInput + ":" + portInput).equals(sharedPreferences.getString(PREFS_DEBUG_SERVER_HOST_KEY, ""))) {
                ToastUtils.showToast("与原值相同");
            } else {
                sharedPreferences.edit().putString(PREFS_DEBUG_SERVER_HOST_KEY, ipInput + ":" + portInput).apply();
                finish();
            }
        } else {
            ToastUtils.showToast("下载开始请稍后!");
            startService(new Intent(this, DownloadService.class)
                    .putExtra(KEY_TYPE, TYPE_DEBUG_HOTFIX)
                    .putExtra(KEY_URL, "http://192.168.248.112:8082/HelloWorld/origin/v.react-native/bundle_android.zip"));
        }
    }

    @Override
    public void onClick(View v) {
        onBackPressed();
    }
}
