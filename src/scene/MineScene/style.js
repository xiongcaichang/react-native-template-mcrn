import EStyleSheet from 'react-native-extended-stylesheet';
import { DEVICE_WIDTH, fixSize, DEVICE_HEIGHT } from '@MCRN/device';


const styles = EStyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    underlineStyle:{
      backgroundColor:'#0092FD',
      height:2
    },
    itemWrapper: {
      flex:1,
      height: fixSize(50),
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: fixSize(1),
      backgroundColor: '#FFF',
    },
    itemLeft: {
      flex: 1,
      height: fixSize(50),
      justifyContent: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemIcon: {
      width: fixSize(16),
      height: fixSize(16),
      marginLeft: fixSize(15),
      marginTop: fixSize(17),
      marginBottom: fixSize(17),
    },
    itemTitle: {
      color: '#2F2C2C',
      fontSize: fixSize(16),
      marginLeft: fixSize(15),
    },
    itemRight: {
      flex: 1,
      height: fixSize(50),
      justifyContent: 'flex-end',
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemDesc: {
      color: '#847F7E',
      fontSize: fixSize(12),
      marginRight: fixSize(15),
    },
    itemArrow: {
      width: fixSize(6.41),
      height: fixSize(12),
      marginRight: fixSize(15),
      marginTop: fixSize(17),
      marginBottom: fixSize(17),
    },
    logOut: {
      marginTop: fixSize(10),
      backgroundColor: '#FFF',
    },
    logOutTextStyle: {
      color: '#EA5D4F',
      fontSize: fixSize(16),
    }

  });


  export default styles;
  