//
//  MCRNController.m
//  HelloWorld
//
//  Created by xiongcaichang on 2018/8/7.
//  Copyright © 2018年 bear. All rights reserved.
//

#import "MCRNController.h"
#import <React/RCTRootView.h>
#import "BridgeManager.h"
#import <RNSentry.h>
#import "MCRNConfig.h"

@interface MCRNController ()

@end

@implementation MCRNController

- (instancetype)init
{
    self = [super init];
    if (self) {
        NSString *envKey = [[NSUserDefaults standardUserDefaults] objectForKey:@"envKey"];
        if(!envKey) envKey = @"prod";
        NSDictionary *initialProperties = @{ @"envKey": envKey };
        RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:[BridgeManager shareInstance].bridge moduleName:PROJECT_KEY initialProperties:initialProperties];
        rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
        [RNSentry installWithRootView:rootView];
        self.view = rootView;
    }
    return self;
}

@end
