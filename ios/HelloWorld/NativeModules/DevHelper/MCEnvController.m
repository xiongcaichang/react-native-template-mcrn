//
//  MCEnvController.m
//  HelloWorld
//
//  Created by bear on 2018/7/23.
//  Copyright © 2018年 bear. All rights reserved.
//

#import "MCEnvController.h"
#import "DLRadioButton.h"
#import "ConfigModule.h"
#define KIsiPhoneX ([UIScreen instancesRespondToSelector:@selector(currentMode)] ? CGSizeEqualToSize(CGSizeMake(1125, 2436), [[UIScreen mainScreen] currentMode].size) : NO)

#define kiphoneX_margin  (KIsiPhoneX ? 24 : 0)

@implementation MCEnvController

-(void)viewWillAppear:(BOOL)animated{
    [self.navigationController setNavigationBarHidden:NO];
    [super viewWillAppear:animated];
}

- (void)viewDidLoad {
    [super viewDidLoad];
    self.title = @"环境设置";
    self.view.backgroundColor = [UIColor colorWithRed:.97 green:.97 blue:.97 alpha:1];
    
    CGRect frame = CGRectMake(0, 0, 0, 0);
    DLRadioButton *firstRadioButton = [self createRadioButtonWithFrame:frame Title:@"" Color: [UIColor redColor]];
    firstRadioButton.hidden = YES;

    NSArray *EnvOptions = [ConfigModule getEnvOptions];

    NSInteger i = 0;
    NSMutableArray *otherButtons = [NSMutableArray new];
    for (NSString *envKey in EnvOptions) {
        CGRect frame = CGRectMake(self.view.frame.size.width / 2 - 131, kiphoneX_margin+ 80 + 35 * i, 262, 24);
        DLRadioButton *radioButton = [self createRadioButtonWithFrame:frame
                                                                Title:envKey
                                                                Color:[UIColor brownColor]];
        radioButton.iconSize = 24;
        [otherButtons addObject:radioButton];
        i++;
    }
    firstRadioButton.otherButtons = otherButtons;
    NSString *envKey = [[NSUserDefaults standardUserDefaults] objectForKey:@"envKey"];
    NSInteger index = [EnvOptions indexOfObject:envKey ? envKey : @"prod"];
    
    firstRadioButton.otherButtons[index ? index : 0].selected = YES;
    
}

#pragma mark - Helper

- (DLRadioButton *)createRadioButtonWithFrame:(CGRect) frame Title:(NSString *)title Color:(UIColor *)color
{
    DLRadioButton *radioButton = [[DLRadioButton alloc] initWithFrame:frame];
    radioButton.titleLabel.font = [UIFont systemFontOfSize:14];
    [radioButton setTitle:title forState:UIControlStateNormal];
    [radioButton setTitleColor:color forState:UIControlStateNormal];
    radioButton.iconColor = color;
    radioButton.indicatorColor = color;
    radioButton.contentHorizontalAlignment = UIControlContentHorizontalAlignmentLeft;
    [radioButton addTarget:self action:@selector(logSelectedButton:) forControlEvents:UIControlEventTouchUpInside];
    [self.view addSubview:radioButton];
    
    return radioButton;
}

- (void)logSelectedButton:(DLRadioButton *)radioButton {
    [[NSUserDefaults standardUserDefaults] setObject:radioButton.selectedButton.titleLabel.text forKey:@"envKey"];
    [[NSUserDefaults standardUserDefaults] synchronize];
    
    UIAlertController * alertController = [UIAlertController alertControllerWithTitle:@"" message:[NSString stringWithFormat:@"您选择了%@环境，想要立即生效吗 ？",radioButton.selectedButton.titleLabel.text] preferredStyle:UIAlertControllerStyleAlert];
    
    UIAlertAction *cancelAction = [UIAlertAction actionWithTitle:@"下次" style:UIAlertActionStyleCancel handler:nil];
    
    UIAlertAction *okAction = [UIAlertAction actionWithTitle:@"好的" style:UIAlertActionStyleDefault handler:^(UIAlertAction * _Nonnull action) {
        exit(0);
    }];
    [alertController addAction:cancelAction];
    [alertController addAction:okAction];
    [self presentViewController:alertController animated:YES completion:nil];
}

- (void)viewWillDisappear:(BOOL)animated {
    [super viewWillDisappear:animated];
    [self.navigationController setNavigationBarHidden:YES animated:YES];
}
@end
