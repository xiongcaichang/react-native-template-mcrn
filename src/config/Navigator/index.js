import React from 'react';
import { Easing, Animated, Platform } from 'react-native'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { TabBarItem } from 'MCComponent';
import * as Scenes from 'MCScene';
import { fixSize } from '@MCRN/device';
import { initialRouteName } from 'MCConfig/app.json'
const { TabConfig } = Scenes;

const tabscenes = {};
 Object.keys(TabConfig).map(key => tabscenes[key] = Scenes[key])

const Tab = createBottomTabNavigator(tabscenes,{
    navigationOptions: ({ navigation }) => ({
      tabBarLabel: TabConfig[navigation.state.routeName]['tabBarLabel'],
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        return <TabBarItem
            tintColor={tintColor}
            focused={focused}
            normalImage={TabConfig[routeName]['normalImage']}
            selectedImage={TabConfig[routeName]['selectedImage']}/>
      },
    }),
    tabBarOptions: {
      showLabel: true,
      activeTintColor: '#EA5D4F',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: '#fff',
        paddingBottom: 0,
        borderTopWidth: fixSize(0.5),
        borderTopColor: '#CCC',
      },
      indicatorStyle:{ height: 0 },
    },
  }
)
/**
 * Navigation 的通用设置
 */

export function fadeIn(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({ position, scene }) => {
      const { index } = scene;

      const opacity = position.interpolate({
        inputRange: [index - 1, index],
        outputRange: [0, 1],
      });

      return { opacity };
    },
  };
}


export function fromTop(duration = 300) {
  return {
    transitionSpec: {
      duration,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: ({ layout, position, scene }) => {
      const { index } = scene;
      const { initHeight } = layout;

      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [-initHeight, 0, 0],
      });

      const opacity = position.interpolate({
          inputRange: [index - 1, index - 0.99, index],
          outputRange: [0, 1, 1],
        });

      return { opacity, transform: [{ translateY }],
       backgroundColor: '#E9E9EF',
      shadowColor: 'black',
      shadowOffset: { width: 5, height: 5 },
      shadowOpacity: 0.2,
      shadowRadius: 5, 
      elevation:-20 };
    },
  };
}

export const navigatorConfig = {
  headerMode: 'none',
  mode: 'card',
  initialRouteName,
  navigationOptions: {
    gesturesEnabled: true,
  },
  cardStyle: {
    backgroundColor: '#FFF',
  },
  ...Platform.OS === 'android' ? {transitionConfig: () =>fadeIn()} : {}
};

const Route = {
  ...Scenes,
  TabScene: Tab,
};
delete Route.TabConfig;

export default createStackNavigator(Route, navigatorConfig);