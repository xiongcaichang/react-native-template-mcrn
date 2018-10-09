//
//  AppDelegate.m
//  HelloWorld
//
//  Created by xiongcaichang on 2018/9/29.
//  Copyright © 2018年 xiongcaichang. All rights reserved.
//

#import "AppDelegate.h"
#import "BridgeManager.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import "RNUMConfigure.h"
#import <UMAnalytics/MobClick.h>
#import "MCDevSettingController.h"
#import "MCEnvController.h"
#import "MCRNController.h"
#import "RNSplashScreen.h"
#import "MCRNConfig.h"


@interface AppDelegate ()

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    
    [UMConfigure setLogEnabled:YES];
    [RNUMConfigure initWithAppkey:KUmeng_key channel:@"test"];
    [MobClick setScenarioType:E_UM_NORMAL];
    
    self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    MCRNController *rnViewController = [MCRNController new];
    UINavigationController *rootNav = [[UINavigationController alloc] initWithRootViewController:rnViewController];
    [rootNav setNavigationBarHidden:YES];
    self.window.rootViewController = rootNav;
    
    [self.window makeKeyAndVisible];
#if DEBUG
    [[NSNotificationCenter defaultCenter] addObserverForName:@"OPEN_DEV_SETTING" object:nil queue:nil usingBlock:^(NSNotification * _Nonnull note) {
        [rootNav pushViewController:[[MCDevSettingController alloc] init] animated:YES];
    }];
    [[NSNotificationCenter defaultCenter] addObserverForName:@"OPEN_ENV_SETTING" object:nil queue:nil usingBlock:^(NSNotification * _Nonnull note) {
        [rootNav pushViewController:[[MCEnvController alloc] init] animated:YES];
    }];
#else
    [RNSplashScreen show];
#endif
    return YES;
}


- (void)applicationWillResignActive:(UIApplication *)application {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and invalidate graphics rendering callbacks. Games should use this method to pause the game.
}


- (void)applicationDidEnterBackground:(UIApplication *)application {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}


- (void)applicationWillEnterForeground:(UIApplication *)application {
    // Called as part of the transition from the background to the active state; here you can undo many of the changes made on entering the background.
}


- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}


- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}


@end
