/**
 * 多选标签组件
 */

 import React, { Component } from 'react';
 import { Text, View, TouchableOpacity, ViewPropTypes } from 'react-native';
 import PropTypes from 'prop-types';

 import styles from './styles';

 export default class MultipleTags extends Component {

   onPressTags = (code) => {
     const { checkedList, onPress } = this.props;
     const currentIndex = checkedList.indexOf(code);

     if (currentIndex < 0) {
       checkedList.push(code);
     } else {
       checkedList.splice(currentIndex, 1);
     }

     if (this.props.single) {
       onPress(code);
     } else {
       onPress(checkedList);
     }
    
   }

   handleDataSource = () => {
     const { dataSource, codeKey, nameKey, checkedList } = this.props;
     const tempSource = [];

     dataSource.forEach((item) => {
       const code = typeof item !== 'object' ? item : item[codeKey];
       const name = typeof item !== 'object' ? item : item[nameKey];
       tempSource.push({
         code,
         name,
         checked: checkedList.indexOf(code) > -1,
       });
     });

     return tempSource;
   }

   renderTags(item, index) {
     if (!item) return null;

     const itemStyle = [
       styles.item,
       item.checked && styles.selectedItem,
       item.checked ? this.props.checkedStyle : this.props.defaultStyle,
     ];

     const textStyle = [
       styles.itemText,
       item.checked && styles.selectedText,
       item.checked ? this.props.checkedTextStyle : this.props.textStyle,
     ];
     return (
       <View key={`item_${index}`} style={styles.itemWrapper}>
         <TouchableOpacity
           key={`code_${index}`}
           style={itemStyle}
           onPress={() => this.onPressTags(item.code)}
         >
           <View style={styles.itemInner}>
             <Text style={textStyle} numberOfLines={1}>{item.name}</Text>
           </View>
         </TouchableOpacity>
       </View>
     );
   }

   render() {
     const dataSource = this.handleDataSource();

     return (
       <View style={styles.tagsWrapper}>
         <Text style={styles.tagsHeader}>{this.props.headerText}</Text>
         <View style={[styles.container, this.props.containerStyle]}>
           {
             dataSource.map((item, index) => this.renderTags(item, index))
           }
         </View>
       </View>
     );
   }
 }

 MultipleTags.propTypes = {
   dataSource: PropTypes.arrayOf(
     PropTypes.oneOfType([
       PropTypes.string,
       PropTypes.number,
       PropTypes.object,
     ])).isRequired,

   codeKey: PropTypes.string,
   nameKey: PropTypes.string,
   checkedList: PropTypes.arrayOf(
     PropTypes.oneOfType([
       PropTypes.string,
       PropTypes.number,
     ])
   ),
   headerText: PropTypes.string,

   // 自定义样式
   containerStyle: ViewPropTypes.style,
   defaultStyle: ViewPropTypes.style,
   checkedStyle: ViewPropTypes.style,
   textStyle: Text.propTypes.style,
   checkedTextStyle: Text.propTypes.style,
   single: PropTypes.bool,
   onPress: PropTypes.func,
 };

 MultipleTags.defaultProps = {
   codeKey: 'id',
   nameKey: 'name',
   checkedList: [],
   single: false,
   onPress: () => null,
 };
