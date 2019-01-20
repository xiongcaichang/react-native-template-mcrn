package com.HelloWorld.utils;

import com.HelloWorld.BuildConfig;
import com.HelloWorld.base.MainApplication;

import io.sentry.SentryClient;
import io.sentry.SentryClientFactory;
import io.sentry.android.AndroidSentryClientFactory;
import io.sentry.event.Event;
import io.sentry.event.EventBuilder;
import io.sentry.event.interfaces.ExceptionInterface;

/**
 * 原生sentry接如类，主要修改dsn.
 */

public class SentryUtil {
    private static SentryClient sentryClient;

    public static void init() {
        sentryClient = SentryClientFactory.sentryClient(BuildConfig.SENTRY_DSN, new AndroidSentryClientFactory(MainApplication.getInstance()));
    }

    public static void sendSentryExcepiton(Throwable throwable) {
        if (sentryClient != null) {
            sentryClient.sendException(throwable);
        }
    }

    public static void sendSentryExcepiton(Event throwable) {
        if (sentryClient != null) {
            sentryClient.sendEvent(throwable);
        }
    }

    public static void sendSentryExcepiton(EventBuilder throwable) {
        if (sentryClient != null) {
            sentryClient.sendEvent(throwable);
        }
    }
    public static void sendSentryExcepiton(String logger, Throwable throwable) {
        SentryUtil.sendSentryExcepiton(new EventBuilder()
                .withMessage("try catch msg")
                .withLevel(Event.Level.WARNING)
                .withLogger(logger)
                .withSentryInterface(new ExceptionInterface(throwable)));
    }
}
