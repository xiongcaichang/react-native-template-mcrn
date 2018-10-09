
import { StyleSheet } from 'react-native';
import { fixSize } from '@MCRN/device';
import { bottomHeight } from '@MCRN/css';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: fixSize(10),
    paddingRight: fixSize(10),
    position: 'relative',
  },
  homeIndicator: {
    height: bottomHeight,
  },
  children: {
    position: 'relative',
    flex: 1,
  },
  border: {
    borderWidth: 1,
    borderColor: '#DDD',
  },
});
