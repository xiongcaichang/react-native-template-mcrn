import React, { Component } from 'react';
import {
    Image,
    Text,
    View,
    Modal,
    Platform,
    TextInput,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import formatDate from 'MCUtil/time'
/**
 * markingType:Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
 * selectDays：要选中的日期['2018-05-09','2018-05-20']，可以传一个最多两个
 * confirmDate:function
 */
LocaleConfig.locales['fr'] = {
  dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
  dayNamesShort: ['日','一','二','三','四','五','六']
}
LocaleConfig.defaultLocale = 'fr'
export default class DatePicker extends Component{
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      selectDays:[]
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
        visible: nextProps.visible,
    })
  }

  showModal=(selectDays)=>{
    var tempMarkedDate = {};
    var markingDates;
    if(selectDays && selectDays.length > 0){
      var start = selectDays[0]
      tempMarkedDate[start] = {startingDay: true,endingDay:true, color: '#EA5D4F',textColor: '#fff'};
      markingDates = selectDays.length==2 ? this.getMarkedDates(selectDays):tempMarkedDate;
    }else{
      selectDays = []
    }
    this.setState({
      visible: true,
      markedDates:markingDates,
      selectDays:selectDays,
    })
  }

  closeModal=()=>{
    this.setState({
      visible: false
    })
  }

  onDayPress=({dateString})=>{
    var temp = [].concat(this.state.selectDays);
    temp = temp.length==2?[]:temp;
    temp.push(dateString)
    var tempMarkedDate = {};
    tempMarkedDate[dateString] = {startingDay: true,endingDay:true, color: '#EA5D4F',textColor: '#fff'};
    if(this.props.markingType != 'period'){
      this.setState({
        selectDays:temp,
        markedDates:tempMarkedDate
      },()=>{
        this.props.confirmDate(temp);
        this.closeModal();
      })
    }

    if(this.props.markingType === 'period'){
      if(new Date(temp[0]) > new Date(temp[1]))temp.reverse();
      var markingDates = temp.length==2 ? this.getMarkedDates(temp):tempMarkedDate;
      this.setState({
        selectDays:temp,
        markedDates:markingDates
      },()=>{
        if(temp.length==2){
            this.props.confirmDate(temp);
            this.closeModal();
        }
      })
    }

  }

  getMarkedDates=(selectDays)=>{
    var markedDates={};
    var startDate = (new Date(selectDays[0]));
    var endDate = (new Date(selectDays[1]))
    while(startDate <= endDate){
      var dateStr = formatDate(startDate);
      var sty = {selected: true, color: '#EA5D4F',textColor: '#fff'};
      if(selectDays[0]==dateStr)sty = {startingDay: true, color: '#EA5D4F', textColor:'#fff'};
      if(selectDays[1]==dateStr)sty = {endingDay: true, color: '#EA5D4F', textColor:'#fff'};
      markedDates[dateStr]= sty;
      startDate.setDate(startDate.getDate()+1);
    }
    return markedDates;
  }

  render(){
    return(
      <Modal
        animationType='fade'
        transparent={true}
        onRequestClose={this.closeModal}
        visible={this.state.visible}>
        <View style={styles.modalBackgroundStyle}>
          <TouchableOpacity style={{flex: 1}} onPress={this.closeModal}/>
          <View style={styles.container}>
            <Calendar
              style={styles.calendar}
              monthFormat={'yyyy年MM月'}
              onDayPress={this.onDayPress}
              markedDates={this.state.markedDates}
              markingType={this.props.markingType}
              maxDate={this.props.maxDate}/>
          </View>
        </View>
      </Modal>
    )
  }
}

DatePicker.defaultProps = {
    confirmDate: (data) => { console.log(JSON.stringify(data))},
    visible: false,
}



const styles = EStyleSheet.create({
  modalBackgroundStyle: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  container: {
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    paddingBottom:20
  },
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
});