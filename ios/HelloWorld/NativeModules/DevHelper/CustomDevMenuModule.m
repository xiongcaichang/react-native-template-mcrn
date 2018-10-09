//
//  CustomDevMenuModule.m
//  HelloWorld
//
//  Created by bear on 2018/7/18.
//  Copyright © 2018年 bear. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "CustomDevMenuModule.h"

@implementation CustomDevMenuModule

@synthesize bridge = _bridge;

#if __has_include(<React/RCTDevMenu.h>)

RCTDevMenuItem *_devBundleMenuItem;
RCTDevMenuItem *_devEnvMenuItem;

#endif

RCT_EXPORT_MODULE();

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup
{
  return YES;
}

- (instancetype)init
{
  return [super init];
}

- (void)setBridge:(RCTBridge *)bridge
{
  _bridge = bridge;
#if __has_include(<React/RCTDevMenu.h>)
  [_bridge.devMenu addItem:self.devBundleMenuItem];
  [_bridge.devMenu addItem:self.devEnvMenuItem];
#endif
}

#if __has_include(<React/RCTDevMenu.h>)

- (RCTDevMenuItem *)devBundleMenuItem
{
  if (!_devBundleMenuItem) {
    _devBundleMenuItem =
    [RCTDevMenuItem buttonItemWithTitleBlock:^NSString *{
      return @"MCRN-BundleSetting";
    } handler:^{
      [[NSNotificationCenter defaultCenter] postNotificationName:@"OPEN_DEV_SETTING" object:nil];
    }];
  }
  return _devBundleMenuItem;
}

- (RCTDevMenuItem *)devEnvMenuItem
{
    if (!_devEnvMenuItem) {
        _devEnvMenuItem =
        [RCTDevMenuItem buttonItemWithTitleBlock:^NSString *{
            return @"MCRN-EnvironmentSetting";
        } handler:^{
            [[NSNotificationCenter defaultCenter] postNotificationName:@"OPEN_ENV_SETTING" object:nil];
        }];
    }
    return _devEnvMenuItem;
}
#endif

@end
