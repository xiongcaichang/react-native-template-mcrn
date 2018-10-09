//
//  BridgeManager.h
//  HelloWorld
//
//  Created by bear on 2018/7/18.
//  Copyright © 2018年 bear. All rights reserved.
//

#import <React/RCTBridge.h>

@interface BridgeManager: NSObject <RCTBridgeDelegate>

@property (nonatomic, readonly, strong) RCTBridge *bridge;

+ (BridgeManager*)shareInstance;

@end

