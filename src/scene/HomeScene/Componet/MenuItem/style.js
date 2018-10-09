import EStyleSheet from 'react-native-extended-stylesheet';
import { fixSize } from '@MCRN/device';

export default styles = EStyleSheet.create({
    row: {
      justifyContent: 'center',
      padding: 5,
      margin: 3,
      width: fixSize (60),
      height: fixSize (80),
      margin: fixSize(16),
      backgroundColor: '#F6F6F6',
      alignItems: 'center',
    },
    thumb: {
      width: fixSize(50),
      height: fixSize(50),
    },
    text: {
      flex: 1,
      color: '#2F2C2C',
      fontSize: fixSize(12),
      marginTop: 5,
      fontWeight: 'bold'
    },
  });