import { topHeight } from '@MCRN/css';
import EStyleSheet from 'react-native-extended-stylesheet';
import { DEVICE_WIDTH, fixSize, DEVICE_HEIGHT } from '@MCRN/device';

const styles = EStyleSheet.create({
    container: {
      flex: 0,
      height: fixSize(140) + topHeight,
      backgroundColor: '#FA7062',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: topHeight + fixSize(51),
      paddingLeft: fixSize(30),
      paddingRight: fixSize(30),
      paddingBottom: fixSize(25),
      marginBottom: fixSize(10),
    },
    avatar: {
        width: fixSize(64),
        height: fixSize(64)
    },
    rightWrapper: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        height: fixSize(64),
        paddingTop: fixSize(10),
        paddingLeft: fixSize(10),
    },
    userName: {
        flex: 1,
        fontSize: fixSize(18),
        color: '#FFF',
        fontWeight: '800',
        textAlign: 'left',
    },
    account: {
        flex: 1,
        fontSize: fixSize(14),
        paddingTop: fixSize(10),
        color: '#FFF',
        textAlign: 'left',
    }
  });


  export default styles;
  