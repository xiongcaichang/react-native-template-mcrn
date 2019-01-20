package com.HelloWorld.utils;

import android.content.Context;
import android.content.SharedPreferences;
import android.text.TextUtils;

import com.HelloWorld.BuildConfig;
import com.HelloWorld.base.MainApplication;
import com.HelloWorld.bean.EnvBean;

import java.util.ArrayList;
import java.util.List;

import timber.log.Timber;

/**
 * Created by bobsha on 20/03/2018.
 */

public class SharedPreferencesUtil {
    private static final String PREFERENCE_NAME = "share_preferences";
    private static final String PREF_ENV_LIST = "PREF_ENV_LIST";
    private static final String PREF_ENV_SELECTED = "PREF_ENV_SELECTED";
    private static final String PREF_APP_VERSION_CODE = "PREF_APP_VERSION_CODE";
    private SharedPreferences sharedPreferences = null;
    private static SharedPreferencesUtil s_instance;

    private SharedPreferencesUtil(Context context) {
        sharedPreferences = context.getSharedPreferences(PREFERENCE_NAME, Context.MODE_PRIVATE);
    }

    public synchronized static void initialize(Context context) {
        if (s_instance == null) {
            if (context == null) {
                context = MainApplication.getInstance();
            }
            if (context != null) {
                s_instance = new SharedPreferencesUtil(context);
            }
        }
    }

    private synchronized static SharedPreferencesUtil getInstance() {
        if (s_instance == null) {
            initialize(MainApplication.getInstance());
        }
        return s_instance;
    }

    private static <T> void saveClassTool(T object, String shareName) {
        String jsonString = GsonUtil.toJson(object);
        if (jsonString != null) {
            s_instance.sharedPreferences.edit().putString(shareName, jsonString).apply();
        }
    }

    private static <T> T getClassTool(Class<T> clazz, String shareName) {
        return GsonUtil.fromJson(s_instance.sharedPreferences.getString(shareName, null), clazz);
    }

    public static void saveEnvList(List envList) {
        if (envList == null || getInstance() == null) return;
        try {
            List<EnvBean.EnvDataBean> beans = new ArrayList<>();
            String envStr = getEnvSelected();
            for (int i = 0; i < envList.size(); i++) {
                Object env = envList.get(i);
                if (env instanceof String) {
                    boolean isChecked;
                    if (TextUtils.isEmpty(envStr)) {
                        isChecked = BuildConfig.FLAVOR.equals(env);
                        if (isChecked) {
//                            Timber.e("env ininin :" + env + ", isChecked:" + isChecked);
                            setEnvSelected((String) env);
                        }
                    } else {
                        isChecked = envStr.equals(env);
                    }
//                    Timber.e("env:" + env + ", isChecked:" + isChecked);
                    beans.add(new EnvBean.EnvDataBean((String) env, isChecked));
                }
            }
            saveClassTool(new EnvBean(beans), PREF_ENV_LIST);
        } catch (Exception e) {
            SentryUtil.sendSentryExcepiton(GsonUtil.class.getClass().getName(), e);
            Timber.e(e);
        }
    }

    public static void saveEnvBean(EnvBean envBean) {
        if (envBean == null || getInstance() == null) return;
        saveClassTool(envBean, PREF_ENV_LIST);
    }

    public static EnvBean getEnvList() {
        if (getInstance() == null) return null;
        return getClassTool(EnvBean.class, PREF_ENV_LIST);
    }

    public static void setEnvSelected(String env) {
        if (getInstance() == null) return;
        s_instance.sharedPreferences.edit().putString(PREF_ENV_SELECTED, env).apply();
    }

    public static String getEnvSelected() {
        if (getInstance() == null) return "";
        return s_instance.sharedPreferences.getString(PREF_ENV_SELECTED, "");
    }

    public static void setVersionCode(int code) {
        if (getInstance() == null) return;
        s_instance.sharedPreferences.edit().putInt(PREF_APP_VERSION_CODE, code).apply();
    }

    public static int getVersionCode() {
        if (getInstance() == null) return 0;
        return s_instance.sharedPreferences.getInt(PREF_APP_VERSION_CODE, 0);
    }
}
