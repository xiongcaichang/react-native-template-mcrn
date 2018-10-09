var { NativeModules } = require('react-native');

const log =  NativeModules.UMAnalyticsModule;

// 获取路由信息
const  getActiveRoute = (navigationState) => {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
      return getActiveRoute(route);
    }
    return route;
  }


export const routeLogger = (prevState, currentState) => {
    const currentScreen = getActiveRoute(currentState);
    const prevScreen = getActiveRoute(prevState);
      console.log(currentScreen)//  在这里接入友盟
      log.onEvent("route");
  }


export default log;