//
//  ConfigModule.h
//  HelloWorld
//
//  Created by bear on 2018/7/23.
//  Copyright © 2018年 bear. All rights reserved.
//
#import <React/RCTBridgeModule.h>
#import <Foundation/Foundation.h>

@interface ConfigModule : NSObject <RCTBridgeModule>

+(NSArray *)getEnvOptions;
@end
