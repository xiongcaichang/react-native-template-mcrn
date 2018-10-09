//
//  BridgeManager.m
//  HelloWorld
//
//  Created by bear on 2018/7/18.
//  Copyright © 2018年 bear. All rights reserved.
//

#import "BridgeManager.h"
#import <RNZipArchive.h>
#import "BundleManager.h"
#if RCT_DEV
#import <React/RCTDevLoadingView.h>
#endif
#define KbuildVersion @"KbuildVersion"

@implementation BridgeManager

+ (BridgeManager*)shareInstance
{
    static BridgeManager * manager = nil;
    static dispatch_once_t onceToken;
    
    dispatch_once(&onceToken,^{
        manager = [[BridgeManager alloc] init];
    });
    
    return manager ;
}

- (instancetype)init {
    if (self = [super init]) {
        _bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:nil];
#if DEBUG
        [_bridge moduleForClass:[RCTDevLoadingView class]];
#endif
    }
    return self;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
    return [BundleManager bundle];
}


@end

