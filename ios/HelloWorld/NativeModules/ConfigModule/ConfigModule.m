//
//  ConfigModule.m
//  HelloWorld
//
//  Created by bear on 2018/7/23.
//  Copyright © 2018年 bear. All rights reserved.
//

#import "ConfigModule.h"
#import <React/RCTConvert.h>
#define KENV_OPS @"env_options"

@implementation ConfigModule
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(setEnvOptions:(NSArray *)options)
{
    [[NSUserDefaults standardUserDefaults] setObject:options forKey:KENV_OPS];
    [[NSUserDefaults standardUserDefaults]  synchronize];
}

+(NSArray *)getEnvOptions {
    return [[NSUserDefaults standardUserDefaults] objectForKey:KENV_OPS];
}



@end
