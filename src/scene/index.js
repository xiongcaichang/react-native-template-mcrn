/*
 * 路由自动配置页 
 */

// Tab 配置 一定要取名 TabConfig  对应 TabScene
export const TabConfig = {
    HomeScene:{
      tabBarLabel: '功能菜单',
      normalImage: require('MCImage/tabbar/menuIcon.png'),
      selectedImage: require('MCImage/tabbar/menuIcon_selected.png')
    },
    MineScene:{
      tabBarLabel: '我的',
      normalImage: require('MCImage/tabbar/mineIcon.png'),
      selectedImage: require('MCImage/tabbar/mineIcon_selected.png')
    }
}

 // stack 配置
export { default as HomeScene } from './HomeScene';
export { default as MineScene } from './MineScene';
export { default as LaunchScene } from './LaunchScene';
export { default as LoginScene } from './LoginScene';
export { default as TenantSwitch } from './TenantSwitch';
