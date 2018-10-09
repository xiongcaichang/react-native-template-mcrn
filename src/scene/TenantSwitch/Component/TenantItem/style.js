import EStyleSheet from 'react-native-extended-stylesheet';
import { fixSize } from '@MCRN/device';

const styles = EStyleSheet.create({
    container: {
      flex: 1,
      height: fixSize(95),
      backgroundColor: '#FFF',
      paddingLeft: fixSize(15),
      paddingRight: fixSize(15),
      paddingTop: fixSize(15),
      paddingBottom: fixSize(15),
      marginBottom: fixSize(1),
    },
    tenantName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#2F2C2C',
    },
    invitationCode: {
      paddingTop: fixSize(7),
      paddingBottom: fixSize(7),
      fontSize: fixSize(14),
      color: '#847F7E',
    },
    cbWrapper: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    icon: {
      width: fixSize(14),
      height: fixSize(14),
      marginRight: fixSize(5)
    },
    default: {
      fontSize: 14,
      color: '#847F7E',
    },

  });


  export default styles;
  