//
//  MCDevSettingController.m
//  HelloWorld
//
//  Created by bear on 2018/7/18.
//  Copyright © 2018年 bear. All rights reserved.
//

#import "MCDevSettingController.h"
#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <objc/message.h>
#import "BridgeManager.h"
#define IS_SERVER_KEY @"isServer"
#define KRCT_jsPort   @"RCT_jsPort"
#define KRCT_jsBranch @"RCT_jsBranch"
#import <RNZASSZipArchive.h>
#import "GiFHUD.h"
#import "MCRNConfig.h"

#define KIsiPhoneX ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(1125, 2436), [[UIScreen mainScreen] currentMode].size) : NO)

#define kiphoneX_margin  (KIsiPhoneX ? 24 : 0)


@interface MCDevSettingController ()
@property (nonatomic, strong) NSMutableArray *tfs;
@property (nonatomic, strong) UISwitch *sW;
@property (nonatomic, strong) UISwitch *bW;
@property (nonatomic, assign) Boolean isServer;
@end

@implementation MCDevSettingController

- (instancetype)init
{
    self = [super init];
    if (self) {
        self.title = @"Bundle配置";
        [self setUI];
    }
    return self;
}

-(void)setUI{
    self.isServer = [[NSUserDefaults standardUserDefaults] boolForKey:IS_SERVER_KEY];
    NSInteger SW = self.view.bounds.size.width;
    NSMutableArray *ips = [NSMutableArray arrayWithCapacity:4];
    NSArray *lefttext = @[@"ip:", @"端口:", @"分支:"];
    NSArray *phtext = @[@"请输入环境ip", @"请输入端口号", @"请输入分支名称"];
    NSString *portStr = [[NSUserDefaults standardUserDefaults] objectForKey:KRCT_jsPort];
    NSString *branchStr = [[NSUserDefaults standardUserDefaults] objectForKey:KRCT_jsBranch];
    NSString *jsLocation = [RCTBundleURLProvider sharedSettings].jsLocation;
    NSLog(@"%@", branchStr);
    NSArray *dftext = @[ jsLocation ? jsLocation :  @"127.0.0.1" ,portStr ? portStr : @ "8081", branchStr ? branchStr: DEFAULT_BRANCH];
    for (NSInteger i = 0; i < 4; i++) {
        if (i == 3) {
            UISwitch * switchSever = [[UISwitch alloc] init];
            switchSever.frame = CGRectMake(30, 90 + 60*i + kiphoneX_margin, 50, 30);
            self.sW = switchSever;
            [switchSever setOn:_isServer];
            [self.view addSubview:switchSever];
            [switchSever addTarget:self action:@selector(serverChange:) forControlEvents:UIControlEventTouchUpInside];
            
            UILabel *serverLabel = [[UILabel alloc] initWithFrame:CGRectMake(85,  90 + 60*i + kiphoneX_margin, 90, 30)];
            serverLabel.font = [UIFont systemFontOfSize:14];
            serverLabel.textAlignment = NSTextAlignmentLeft;
            serverLabel.text = @"LOCAL";
            serverLabel.layer.cornerRadius = 5;
            [serverLabel.layer masksToBounds];
            [self.view addSubview:serverLabel];
            
            
            UISwitch * switchbranch = [[UISwitch alloc] init];
            switchbranch.frame = CGRectMake(180, 90 + 60*i + kiphoneX_margin, 50, 30);
            self.bW = switchbranch;
            [switchbranch setOn:!_isServer];
            [switchbranch addTarget:self action:@selector(bundleChange:) forControlEvents:UIControlEventTouchUpInside];
            [self.view addSubview:switchbranch];
            
            
            UILabel *branchLabel = [[UILabel alloc] initWithFrame:CGRectMake(240,  90 + 60*i + kiphoneX_margin, 75, 30)];
            branchLabel.font = [UIFont systemFontOfSize:14];
            branchLabel.textAlignment = NSTextAlignmentLeft;
            branchLabel.text = @"BETA";
            branchLabel.layer.cornerRadius = 5;
            [branchLabel.layer masksToBounds];
            [self.view addSubview:branchLabel];
            
            
            UIButton *saveBtn = [[UIButton alloc] initWithFrame:CGRectMake(30,  150 + 60*i + kiphoneX_margin, SW-60, 40)];
            saveBtn.backgroundColor = [UIColor brownColor];
            [saveBtn setTitle: @"保存并刷新" forState:UIControlStateNormal];
            [saveBtn setTitleColor:[UIColor whiteColor] forState:UIControlStateNormal];
            [saveBtn addTarget:self action:@selector(saveAndReLoad) forControlEvents:UIControlEventTouchUpInside];
            [self.view addSubview:saveBtn];
            break;
        }
        
        UITextField *tf = [[UITextField alloc]initWithFrame:CGRectMake(100, 80 + 60*i + kiphoneX_margin, SW-130, 35)];
        tf.placeholder = phtext[i];
        tf.text = dftext[i];
        tf.layer.cornerRadius = 5;
        [tf clipsToBounds];
        tf.textAlignment = NSTextAlignmentCenter;
        tf.backgroundColor = [UIColor lightGrayColor];
        [self.view addSubview:tf];
        [ips addObject:tf];
        
        UILabel *leftLabel = [[UILabel alloc] initWithFrame:CGRectMake(30, 80 + 60*i + kiphoneX_margin, 75, 35)];
        leftLabel.backgroundColor = [UIColor brownColor];
        leftLabel.font = [UIFont systemFontOfSize:12];
        leftLabel.textColor =[UIColor whiteColor];
        leftLabel.textAlignment = NSTextAlignmentCenter;
        leftLabel.text = lefttext[i];
        leftLabel.layer.cornerRadius = 5;
        [leftLabel.layer masksToBounds];
        [self.view addSubview:leftLabel];
        
    };
    self.tfs = ips;
    
}

-(void)saveAndReLoad {
    [[NSUserDefaults standardUserDefaults] setObject:[self trimString:[self.tfs[0] text]] forKey:@"RCT_jsLocation"];
    [[NSUserDefaults standardUserDefaults] setObject:[self trimString:[self.tfs[1] text]] forKey:KRCT_jsPort];
    [[NSUserDefaults standardUserDefaults] setObject:[self trimString:[self.tfs[2] text]] forKey:KRCT_jsBranch];
    
    if (![[NSUserDefaults standardUserDefaults] boolForKey:IS_SERVER_KEY]) {
        [GiFHUD setGifWithImageName:@"2.gif"];
        [GiFHUD showWithOverlay];
        NSString *branchName = [[NSUserDefaults standardUserDefaults] objectForKey:@"RCT_jsBranch"];
        NSString *urlStr = [NSString stringWithFormat:@"http://%@/%@/origin/%@/bundle_ios.zip",BRANCH_HOST,[PROJECT_KEY lowercaseString], branchName ? branchName : DEFAULT_BRANCH];
        NSURL *url = [NSURL URLWithString:urlStr];
        // 让这里来处理分支的事情
        
        dispatch_async(dispatch_get_global_queue(0, 0), ^{
            NSData *data = [NSData dataWithContentsOfURL:url];
            NSString *documentDirectory = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES).firstObject;
            NSString *zipName=[documentDirectory stringByAppendingPathComponent:@"bundle.zip"];
            NSFileManager *fm = [NSFileManager defaultManager];
            [fm removeItemAtPath:zipName error:nil];
            [data writeToFile:zipName atomically:YES];
            __weak typeof(self) weakSelf = self;
            [RNZASSZipArchive unzipFileAtPath:zipName toDestination:documentDirectory overwrite:YES password:nil progressHandler:^(NSString * _Nonnull entry, unz_file_info zipInfo, long entryNumber, long total) {
            } completionHandler:^(NSString * _Nonnull path, BOOL succeeded, NSError * _Nullable error) {
                dispatch_async(dispatch_get_main_queue(), ^{
                    [[BridgeManager shareInstance].bridge reload];
                    [weakSelf.navigationController popViewControllerAnimated:NO];
                    [GiFHUD dismiss];
                });
            }];
        });
    } else {
        [[BridgeManager shareInstance].bridge reload];
        [self.navigationController popViewControllerAnimated:NO];
    }
    

}

-(NSString *)trimString:(NSString *) str {
    return  [str stringByTrimmingCharactersInSet:
                               [NSCharacterSet whitespaceAndNewlineCharacterSet]];
}


-(void)serverChange:(id)sender
{
    UISwitch *switchButton = (UISwitch*)sender;
    BOOL isButtonOn = [switchButton isOn];
    [self.bW setOn:!isButtonOn animated: YES];
    [[NSUserDefaults standardUserDefaults] setBool:isButtonOn forKey:IS_SERVER_KEY];
    [[NSUserDefaults standardUserDefaults] synchronize];
   
}

-(void)bundleChange:(id)sender
{
    UISwitch *switchButton = (UISwitch*)sender;
    BOOL isButtonOn = [switchButton isOn];
    [self.sW setOn:!isButtonOn animated: YES];
    [[NSUserDefaults standardUserDefaults] setBool:!isButtonOn forKey:IS_SERVER_KEY];
    [[NSUserDefaults standardUserDefaults] synchronize];
    
}


-(void)viewWillAppear:(BOOL)animated{
    [self.navigationController setNavigationBarHidden:NO];
    [super viewWillAppear:animated];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor colorWithRed:.97 green:.97 blue:.97 alpha:1];
}

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    [self.navigationController setNavigationBarHidden:YES animated:YES];
}

@end
