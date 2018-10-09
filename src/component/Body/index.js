/**
 * 适配 iPhone X 的容器组件（包含了 HomeIndicator 的控制策略）
 */

import React  from 'react';
import {
  View,
  ScrollView,
  ViewPropTypes
} from 'react-native';
import PropTypes from 'prop-types';
import { isIphoneX } from '@MCRN/device';
import style from './style';

function Body(props) {
  const BodyTag = props.scroll ? ScrollView : View
  return (
    <View style={[style.container, props.style,props.noPadding&&{paddingLeft: 0, paddingRight: 0}]}>
      <BodyTag
        keyboardShouldPersistTaps="always"
        style={style.children}
      >
        {props.children}
      </BodyTag>
      {
        props.showHomeIndicator ? (
          <View
            style={[style.homeIndicator, props.homeIndicatorStyle,
              props.showBorder && isIphoneX ? style.border : null]}
          />
        ) : null
      }
    </View>
  );
}

Body.propTypes = {
  // 子元素
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  // 自定义样式
  style: ViewPropTypes.style,
  // 是否展示底部占位元素（只在 iPhone X 中生效）
  showHomeIndicator: PropTypes.bool,
  // 底部占位元素样式（只在 iPhone X 中生效）
  homeIndicatorStyle: ViewPropTypes.style,
  // 是否展示底部占位元素的Border（只在 iPhone X 中生效）
  showBorder: PropTypes.bool,
  // 是否有左右边距
  noPadding: PropTypes.bool,
  // 是否可滚动
  scroll: PropTypes.bool,
};
Body.defaultProps = {
  children: null,
  style: null,
  showHomeIndicator: false,
  homeIndicatorStyle: null,
  showBorder: false,
  noPadding: false,
  scroll: false,
};

export default Body;
