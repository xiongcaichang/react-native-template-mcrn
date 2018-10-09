import { StyleSheet } from 'react-native';
import {
  STYLE_FC_VC_HC,
  STYLE_FR_VC_HFS,
  DP_FROM_1PX,
} from '@MCRN/css';

const COLOR_MAIN = '#EA5D4F'

const itemStyle = {
  ...STYLE_FC_VC_HC,
  height: 30,
  maxWidth: 160,
  minWidth: 75,
  paddingHorizontal: 2,
  backgroundColor: '#FFF',
  borderWidth: DP_FROM_1PX,
  borderRadius: 2,
};

const itemTextStyle = {
  fontSize: 14,
  textAlign: 'center',
};

export default StyleSheet.create({
  tagsWrapper: {
    paddingTop: 15,
  },
  tagsHeader: {
    fontSize: 14,
    color: '#CFCFCF',
  },
  container: {
    ...STYLE_FR_VC_HFS,
    flexWrap: 'wrap',
    marginRight: -15,
  },
  itemWrapper: {
    ...STYLE_FR_VC_HFS,
    paddingTop: 15,
    paddingRight: 15,
  },
  itemInner: {
    alignSelf: 'center',
    maxWidth: 158,
  },
  item: {
    ...itemStyle,
    borderColor: '#999',
    borderWidth: 1,
    borderColor: COLOR_MAIN,
  },
  itemText: {
    ...itemTextStyle,
    color: '#666',
    color: COLOR_MAIN,
    borderColor: COLOR_MAIN,
  },
  selectedItem: {
    ...itemStyle,
    borderWidth: 1,
    backgroundColor:COLOR_MAIN,
    borderColor: COLOR_MAIN,
  },
  selectedText: {
    ...itemTextStyle,
    color: '#FFF',
  },
});
