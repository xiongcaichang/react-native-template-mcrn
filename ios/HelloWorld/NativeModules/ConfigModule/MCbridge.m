//
//  MCNative.m
//  HelloWorld
//
//  Created by xiongcaichang on 2018/8/23.
//  Copyright © 2018年 bear. All rights reserved.
//

#import "MCbridge.h"
#import "BridgeManager.h"
@implementation MCbridge

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(reload)
{
    [[BridgeManager shareInstance].bridge reload];
}

@end
