package com.HelloWorld.base;

import android.accounts.NetworkErrorException;
import android.content.Context;
import android.os.Looper;
import android.util.Log;

import com.HelloWorld.BuildConfig;
import com.HelloWorld.utils.SentryUtil;
import com.HelloWorld.utils.ToastUtils;
import com.umeng.analytics.MobclickAgent;

import java.io.File;
import java.lang.Thread.UncaughtExceptionHandler;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Map;

import timber.log.Timber;

/**
 * Created by bobsha on 18/4/30.
 */
public class CrashHandler implements UncaughtExceptionHandler {

    public static final String TAG = "CrashHandler";
    private static final int ERROR_STACK = 1;
    private static final int ERROR_ID = 0;
    private static final String TOO_LARGE_IMAGE = "Canvas: trying to draw too large";
    //CrashHandler实例
    private static CrashHandler INSTANCE = new CrashHandler();
    //系统默认的UncaughtException处理类
    private UncaughtExceptionHandler mDefaultHandler;
    //程序的Context对象
    private Context mContext;
    //用来存储设备信息和异常信息
    private Map<String, String> infos;

    //用于格式化日期,作为日志文件名的一部分
    private DateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
    private File crashDir;

    private CrashHandler() {
    }


    public static CrashHandler getInstance() {
        return INSTANCE;
    }

    /**
     * 初始化
     *
     * @param context
     */
    public void init(Context context) {
        mContext = context;
        //获取系统默认的UncaughtException处理器
        mDefaultHandler = Thread.getDefaultUncaughtExceptionHandler();
        //设置该CrashHandler为程序的默认处理器
        Thread.setDefaultUncaughtExceptionHandler(this);
    }

    /**
     * 当UncaughtException发生时会转入该函数来处理
     */
    @Override
    public void uncaughtException(Thread thread, Throwable ex) {
        Timber.e(ex);
        handleException(ex);
    }

    /**
     * 自定义错误处理,收集错误信息 发送错误报告等操作均在此完成.
     *
     * @param ex
     * @return true:如果处理了该异常信息;否则返回false.
     */
    private void handleException(final Throwable ex) {
        if (ex == null) {
            return;
        }
        if ((ex instanceof NetworkErrorException)) {
            Log.e(TAG, "网络层出现异常：" + ex.getMessage());
        }

        if ((ex instanceof NullPointerException)) {
            Log.e(TAG, "空指针异常：" + ex.getMessage());
        }
        //使用Toast来显示异常信息
        new Thread() {
            @Override
            public void run() {
                Looper.prepare();
                ToastUtils.showToast("抱歉，程序运行异常，将自动重启");
                Looper.loop();
            }
        }.start();
        MobclickAgent.reportError(mContext, ex);
        SentryUtil.sendSentryExcepiton(ex);
        try {
            Thread.sleep(6000);
        } catch (InterruptedException e) {
            SentryUtil.sendSentryExcepiton(this.getClass().getName(), e);
        }
        if(!BuildConfig.DEBUG) {
            //退出程序
            android.os.Process.killProcess(android.os.Process.myPid());
            System.exit(1);
        }
    }
}

