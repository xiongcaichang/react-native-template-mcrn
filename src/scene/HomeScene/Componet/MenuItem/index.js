import React  from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
} from 'react-native';
import PropTypes from 'prop-types';
import styles from './style';
import { AVATAR_DEFAULT } from 'MCImage';


function MenuItem(props) {
  const { item } = props;
  return (
    <TouchableHighlight onPress={item.action} underlayColor="transparent">
    <View>
      <View style={styles.row}>
        <Image style={styles.thumb} source={item.icon} />
        <Text style={styles.text}>
          {item.title}
        </Text>
      </View>
    </View>
  </TouchableHighlight>
  );
}

MenuItem.propTypes = {
  item: PropTypes.object
};
MenuItem.defaultProps = {
  item: {
    icon: '',
    title: '',
    action: () => {}
  }
};

export default MenuItem;
                                                           