import React, {Component} from 'react';
import { ScrollView, RefreshControl, View, Image, Text, TouchableOpacity } from 'react-native'
import { Page, Body } from 'MCComponent'
import { navigation, screen, mconnect } from '@MCRN'
import { fixSize } from '@MCRN/device';
import style from './style';
import Header from './Component/Header'


import { ABOUT, MINE, PRINTER, SHIELD, LG_ARROW } from 'MCImage';
import Btn from 'rnx-ui/Btn';

@mconnect({accountData: 'UserAccount'}) @screen
export default class MineScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidActive(params) {
    console.log(this.name,'componentDidActive',params)
  }

  componentWillDeactive(params) {
    console.log(this.name,'componentWillDeactive',params)
  }

  _onRefresh = () => {
    this.setState({refreshing: true});

    //mock
    setTimeout(() => {
      this.setState({refreshing: false});
    }, 2000);
  }

  render() {
    const { accountData } = this.props;
    const menuConfig = [
      {
        icon: MINE,
        title: '我的商户',
        desc: 'XXX商户(TRGB)',
        action: () => {navigation.push('TenantSwitch')},
        break: true,
      },
      {
        icon: PRINTER,
        title: '更改打印机',
        desc: '',
        action: () => {},
        break: false,
      },
      {
        icon: SHIELD,
        title: '账户安全',
        desc: '修改手机号 | 密码',
        action: () => {},
        break: false,
      },
      {
        icon: ABOUT,
        title: '关于',
        desc: 'v1.0',
        action: () => {},
        break: false,
      }
    ]

    return (
      <Page style={style.container}>
        <Body noPadding >
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }
           >
            <Header accountData={accountData}/>
            {
              menuConfig.map((item, index) =>(
                <TouchableOpacity key={index} onPress={item.action}>
                <View  style={[style.itemWrapper, {marginBottom: item.break ? fixSize(10): fixSize(1)}]}>
                    <View style={style.itemLeft}>
                     <Image style={style.itemIcon} source={item.icon}/>
                     <Text style={style.itemTitle}>{item.title}</Text>
                    </View>
                    <View style={style.itemRight}>
                     <Text style={style.itemDesc}>{item.desc}</Text>
                     <Image style={style.itemArrow} source={LG_ARROW}/>
                    </View>
                </View>
                </TouchableOpacity>
              ))
            }
            <Btn onPress={() => navigation.resetRoute('LoginScene')} style={style.logOut} textStyle={style.logOutTextStyle}> 退出登录 </Btn>
          </ScrollView>
         </Body>

      </Page>
    );
  }
}
