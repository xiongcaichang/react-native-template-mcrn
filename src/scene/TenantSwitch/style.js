import EStyleSheet from 'react-native-extended-stylesheet';
import { STYLE_FR_VC_HC }  from '@MCRN/css'
import { DEVICE_WIDTH }  from '@MCRN/device'

const styles = EStyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    submite:{
      width: DEVICE_WIDTH - 50,
      height: 30,
      borderRadius: 3,
    },
    accessoryWapper: {
      width:'$DEVICE_WIDTH',
      ...STYLE_FR_VC_HC,
      flex: 1,
      backgroundColor: '#FFF'
    }
  });

  export default styles;
  