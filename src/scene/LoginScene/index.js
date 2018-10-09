import React, {Component} from 'react';
import {Text, TextInput, View, KeyboardAvoidingView, Image, TouchableOpacity} from 'react-native';
import Toast from 'react-native-root-toast'; 
import { navigation, screen, mconnect } from '@MCRN'
import { Page } from 'MCComponent'
import actions from 'MCAction';
import { LOGO_IMG, PWD_IMG, USR_IMG } from 'MCImage';
import style from './style';

const { login } = actions.UserAccount;

@mconnect(null, {login}) @screen
export default class LoginScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account:'',
      password:''
    };
  }

  onPressLogin = () => {
    this.props.login({ account: this.state.account, password: this.state.password })
    .then((res) => {
      navigation.resetRoute('TabScene')
    }).catch(() => {
      Toast.show('retry later!!!',{
        duration:200,
        position: Toast.positions.CENTER,
      });
    });
  }

  render() {
    return (
      <Page style={style.container}>
        <View style={style.logo}>
          <Image source={LOGO_IMG} style={style.logoImage} />
        </View>
        <KeyboardAvoidingView behavior="padding" style={style.form}>
          <View style={style.form_row}>
            <Image source={USR_IMG} style={style.icon} />
            <TextInput
               underlineColorAndroid="transparent"
               style={style.input_text}
               autoCapitalize='none'
               placeholder='请输入手机号'
               clearButtonMode='while-editing'
               keyboardType='email-address'
               value={this.state.account}
               onChangeText={(text)=> this.setState({account:text})}/>
          </View>
          <View style={style.form_row}>
            <Image source={PWD_IMG} style={style.icon} />
            <TextInput
               underlineColorAndroid="transparent"
               style={style.input_text}
               autoCapitalize='none'
               placeholder='请输入密码'
               clearButtonMode='while-editing'
               keyboardType='email-address'
               value={this.state.password}
               onChangeText={(text)=> this.setState({password:text})}/>
          </View>
          <TouchableOpacity onPress={this.onPressLogin} style={style.loginBtn}>
            <Text style={style.loginTxt}>登录</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Page>
    );
  }
}
