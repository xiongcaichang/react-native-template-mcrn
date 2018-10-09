import React  from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import PropTypes from 'prop-types';
import style from './style';
import { SELECTED, UNSELECTED } from 'MCImage';



function TenantItem(props) {
  return (
    <TouchableWithoutFeedback onPress={() => props.onItemClick(props.item)}>
      <View style={style.container}>
            <Text style={style.tenantName}>{props.item.tenantName} </Text>
            <Text style={style.invitationCode}>邀请码:  {props.item.invitationCode}</Text>
            <View style={style.cbWrapper}>
             <Image style={style.icon} source={props.item.default ? SELECTED : UNSELECTED}/>
             <Text style={style.default}>{props.item.default} 设为默认登录商户</Text>
            </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

TenantItem.propTypes = {
  item: PropTypes.object,
  onItemClick: PropTypes.func,
};
TenantItem.defaultProps = {
  item: {},
  onItemClick: () => {}
};

export default TenantItem;
