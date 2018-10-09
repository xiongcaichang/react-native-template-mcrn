import React, { Component } from 'react';
import { View, StatusBar } from 'react-native';
import { navigation } from '@MCRN'
import style from './style';
import SplashScreen from 'react-native-mc-splash-screen'

export default class LaunchScene extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
   
    setTimeout(() => {
      SplashScreen.hide();
      navigation.resetRoute('LoginScene')
    }, 2000);
  }

  render() {
    return (
      <View style={style.container}>
        <StatusBar hidden animated={false}/>
      </View>
    );
  }
}
