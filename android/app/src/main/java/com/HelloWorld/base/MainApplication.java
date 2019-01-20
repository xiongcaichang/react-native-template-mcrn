package com.HelloWorld.base;

import android.app.Application;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import com.beefe.picker.PickerViewPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.devsupport.interfaces.DevOptionHandler;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.rnfs.RNFSPackage;
import com.rnziparchive.RNZipArchivePackage;
import com.HelloWorld.BuildConfig;
import com.HelloWorld.activity.BundleSettingActivity;
import com.HelloWorld.activity.EnvironmentSettingActivity;
import com.HelloWorld.reactnative.MCRNReactPackage;
import com.HelloWorld.umeng.DplusReactPackage;
import com.HelloWorld.umeng.RNUMConfigure;
import com.HelloWorld.utils.FileUtil;
import com.HelloWorld.utils.SentryUtil;
import com.HelloWorld.utils.SharedPreferencesUtil;
import com.HelloWorld.utils.ToastUtils;
import com.umeng.analytics.MobclickAgent;
import com.umeng.commonsdk.UMConfigure;

import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.Nullable;

import io.sentry.RNSentryPackage;
import timber.log.Timber;

import static com.HelloWorld.service.DownloadService.FILE_PATH;

public class MainApplication extends Application implements ReactApplication {
    private static MainApplication myApp;

    public static MainApplication getInstance() {
        return myApp;
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {

        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            ArrayList<ReactPackage> list = new ArrayList<ReactPackage>();
            list.add(new MainReactPackage());
            list.add(new MCRNReactPackage());
            list.add(new RNSentryPackage());
            list.add(new RNFSPackage());
            list.add(new RNZipArchivePackage());
            list.add(new RNDeviceInfo());
            list.add(new SplashScreenReactPackage());
            list.add(new PickerViewPackage());
            list.add(new DplusReactPackage());
            return list;
        }

        //返回本地js编译结果路径
        @Nullable
        @Override
        protected String getBundleAssetName() {
            return "index.jsbundle";
        }


        @Nullable
        @Override
        protected String getJSBundleFile() {
            Timber.i("app getJSBundleFile");
            String path = getInstance().getFilesDir().getAbsolutePath();
            String jsPath = path + (path.endsWith("/") ? "" : "/") + "bundle/index.jsbundle";

            File file = new File(jsPath);

            if (file.exists()) {
                return jsPath;
            } else {
                File file2 = MainApplication.getInstance().getExternalFilesDir(FILE_PATH);
                if (file2 != null && file2.exists()) {
                    String index = file2.getPath() + (file2.getPath().endsWith("/") ? "" : "/") + "index.jsbundle";
                    if (new File(index).exists()) {
                        return index;
                    }
                }
                return null;
            }
        }

        @Override
        protected String getJSMainModuleName() {
            return "index";
        }

        @Override
        protected ReactInstanceManager createReactInstanceManager() {
            ReactInstanceManager manager = super.createReactInstanceManager();
            manager.getDevSupportManager().addCustomDevOption("MCRN-BundleSetting", new DevOptionHandler() {

                @Override
                public void onOptionSelected() {
                    Intent intent = new Intent(myApp, BundleSettingActivity.class);
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    myApp.startActivity(intent);
                }
            });
            manager.getDevSupportManager().addCustomDevOption("MCRN-EnvironmentSetting", new DevOptionHandler() {

                @Override
                public void onOptionSelected() {
                    Intent intent = new Intent(myApp, EnvironmentSettingActivity.class);
                    intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    myApp.startActivity(intent);
                }
            });
            return manager;
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        //线上版本不打log
        if (!"prod".equals(BuildConfig.FLAVOR)) {
            Timber.plant(new Timber.DebugTree());
        }
        Timber.i("app onCreate");
        myApp = this;
        SentryUtil.init();
        PackageInfo packageInfo = null;
        try {
            packageInfo = getPackageManager().getPackageInfo(getPackageName(), 0);
            int versionCode = packageInfo.versionCode;
            if (versionCode > SharedPreferencesUtil.getVersionCode()) {
                String path = getInstance().getFilesDir().getAbsolutePath();
                String jsPath = path + (path.endsWith("/") ? "" : "/") + "bundle";
                File file = new File(jsPath);
                if (file.exists()) {
                    FileUtil.deleteDirWihtFile(file);
                }
                File file2 = MainApplication.getInstance().getExternalFilesDir(FILE_PATH);
                if (file2 != null && file2.exists()) {
                    FileUtil.deleteDirWihtFile(file);
                }
                SharedPreferencesUtil.setVersionCode(versionCode);
            }
        } catch (PackageManager.NameNotFoundException e) {
            SentryUtil.sendSentryExcepiton("MainApplication", e);
        }


        SoLoader.init(this, /* native exopackage */ false);
        ToastUtils.init();
        CrashHandler.getInstance().init(this);
//        RNUMConfigure.init(this, "友盟id", "office", UMConfigure.DEVICE_TYPE_PHONE, "");
//        UMConfigure.init(this, UMConfigure.DEVICE_TYPE_PHONE, "");
//        UMConfigure.setLogEnabled(true);
//        UMConfigure.setEncryptEnabled(true);
//        MobclickAgent.setCatchUncaughtExceptions(true);
//        MobclickAgent.setScenarioType(this, MobclickAgent.EScenarioType.E_UM_NORMAL);
//        MobclickAgent.setSessionContinueMillis(60000);
    }

}
