//
//  MCRNConfig.h
//  HelloWorld
//
//  Created by xiongcaichang on 2018/9/20.
//  Copyright © 2018年 bear. All rights reserved.
//

#ifndef MCRNConfig_h
#define MCRNConfig_h

#if DEBUG
    #define KUmeng_key  @"这是友盟统计Debug的key"
#else
    #define KUmeng_key  @"这是友盟统计线上的key"
#endif

// 根试图注册名称
#define PROJECT_KEY @"HelloWorld"

// 这里是分支加载的服务host
#define BRANCH_HOST @"192.168.248.112:8082"

// 默认分支名称
#define DEFAULT_BRANCH @"v.react-native"


#endif /* MCRNConfig_h */
