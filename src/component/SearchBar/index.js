import React from 'react';
import { Text, View, TouchableWithoutFeedback, Image } from 'react-native';
import PropTypes from 'prop-types';
import { SEARCH_ICON } from "MCImage"
import styles from './style';


function SearchBar({ onPress, disabled, placeholder }) {
  return (
    <TouchableWithoutFeedback
      onPress={onPress}
    >
      <View style={[styles.bar, disabled ? styles.barDisabled : null]}>
        <Image source={SEARCH_ICON} style={styles.icon} />
        <Text style={styles.placeholder}>{placeholder}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

SearchBar.propTypes = {
  // 点击事件
  onPress: PropTypes.func,
  // 禁用效果
  disabled: PropTypes.bool,
  // 默认显示文本
  placeholder: PropTypes.string,
};

SearchBar.defaultProps = {
  onPress: () => {},
  disabled: false,
  placeholder: '',
};

export default SearchBar;
