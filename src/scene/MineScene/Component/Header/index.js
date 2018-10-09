import React  from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import style from './style';
import { AVATAR_DEFAULT } from 'MCImage';


function Header(props) {
    const { accountData } = props;
  return (
    <View style={style.container}>
        <Image style={style.avatar} source={AVATAR_DEFAULT}/>
        <View style={style.rightWrapper} >
            <Text style={style.userName}>{accountData.userName}</Text>
            <Text style={style.account}>账号: {accountData.account}</Text>
        </View>
    </View>
  );
}

Header.propTypes = {
  accountData: PropTypes.object
};
Header.defaultProps = {
  accountData: {}
};

export default Header;
                                                           