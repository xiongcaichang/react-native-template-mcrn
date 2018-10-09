import EStyleSheet from 'react-native-extended-stylesheet';
import { fixSize } from '@MCRN/device'


const styles = EStyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
    },
    navRight: {
      width: fixSize(18),
      height: fixSize(15),
    },
    list: {
      justifyContent: 'flex-start',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start'
    },
  });


  export default styles;
  