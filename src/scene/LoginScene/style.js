import EStyleSheet from 'react-native-extended-stylesheet';
import { PixelRatio } from 'react-native'
import { fixSize } from '@MCRN/device';

console.log(`PixelRatio${PixelRatio.get()}`)
const styles = EStyleSheet.create({
    container: {
      height:'$DEVICE_HEIGHT',
      backgroundColor: '#F5FCFF',
    },
    logo:{
      flex:1/2,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoImage:{
      width: 80,
      height: 80
    },
    form:{
      flex:1,
      paddingHorizontal:20
    },
    form_row:{
      marginTop: 20,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    icon:{
      width:22,
      height:22,
      alignSelf:'center'
    },
    input_text:{
      flex:1,
      height: fixSize(44),
      marginLeft: 15,
      borderBottomColor: '#666',
      borderBottomWidth: fixSize(0.5)
    },
    loginBtn:{
      height:44,
      marginTop:40,
      justifyContent:'center',
      backgroundColor:'#f06959',
    },
    loginTxt:{
      textAlign:'center',
      color:'#FFF',
      fontSize:16
    }
  });


  export default styles;
