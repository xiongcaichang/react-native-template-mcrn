//
//  AppDelegate.h
//  HelloWorld
//
//  Created by xiongcaichang on 2018/9/29.
//  Copyright © 2018年 xiongcaichang. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <React/RCTBridge.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (strong, nonatomic) UIWindow *window;


@property (nonatomic, readonly, strong) RCTBridge *bridge;
@end

