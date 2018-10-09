//
//  BundleManager.m
//  HelloWorld
//
//  Created by xiongcaichang on 2018/9/20.
//  Copyright © 2018年 bear. All rights reserved.
//

#import "BundleManager.h"
#import <React/RCTBundleURLProvider.h>
#define KbuildVersion @"KbuildVersion"

@implementation BundleManager

+(NSURL *) bundle{
#if DEBUG
    bool isUseSever = [[NSUserDefaults standardUserDefaults] boolForKey:@"isServer"];
    
    if (isUseSever) {
        NSString *host = [[NSUserDefaults standardUserDefaults] objectForKey:@"RCT_jsLocation"];
        NSString *port = [[NSUserDefaults standardUserDefaults] objectForKey:@"RCT_jsPort"];
        if (host && port) {
            NSString *query = @"platform=ios&dev=true&minify=false";
            NSString *urlStr = [NSString stringWithFormat:@"http://%@:%@/index.bundle?%@",host,port,query];
            return [NSURL URLWithString:urlStr];
        } else {
            return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];;
            
        }
    } else {
        NSString *documentDirectory = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES).firstObject;
        
        return [NSURL URLWithString:[documentDirectory stringByAppendingPathComponent:@"index.jsbundle"]];
    }
#else
    //在这里处理线上 的 bundle
    NSString *bulid = [[[NSBundle mainBundle] infoDictionary] objectForKey:@"CFBundleVersion"];
    
    NSString *storebulid =  [[NSUserDefaults standardUserDefaults] objectForKey:KbuildVersion];
    
    NSString *bundlePath = [[NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask,YES) firstObject] stringByAppendingPathComponent:@"index.jsbundle"];
    
    NSFileManager *fm = [NSFileManager defaultManager];
    
    if (storebulid && ![storebulid isEqualToString:bulid]) {
        [fm removeItemAtPath:bundlePath error:nil];
    }
    
    [[NSUserDefaults standardUserDefaults] setObject:bulid forKey:KbuildVersion];
    
    if([fm fileExistsAtPath:bundlePath]) {
        return [NSURL URLWithString:bundlePath];
    } else {
        return [NSURL URLWithString:[[NSBundle mainBundle] pathForResource:@"main" ofType:@"jsbundle"]];
    }
    
#endif
}

@end
