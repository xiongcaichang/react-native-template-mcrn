import { StyleSheet } from 'react-native';
import { fixSize, DEVICE_WIDTH } from '@MCRN/device'

export default StyleSheet.create({
  bar: {
    flex: 0,
    width: DEVICE_WIDTH - 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    margin: 10,
    borderWidth: fixSize(1),
    borderColor: '#EFEDED',
    borderRadius: 4,
    backgroundColor: '#FFF',
  },
  barDisable: {
    backgroundColor: '#EFEDED',
  },
  icon: {
    width: fixSize(14),
    height: fixSize(14),
  },
  placeholder: {
    fontSize: 14,
    color: '#CCC',
  },
});
