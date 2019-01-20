import React, {Component} from 'react';
import {Image, View, ListView} from 'react-native';
import { Page, NavBar, Body } from 'MCComponent'
import style from './style';
import { navigation, screen, mconnect, env } from '@MCRN'
import MenuItem from './Componet/MenuItem'
import { PRICE_LIST, MESSAGE_NAV } from 'MCImage'

@mconnect({accountData: 'UserAccount'}) @screen
export default class HomeScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuConfig: [
        {
          icon: PRICE_LIST,
          title: '报价',
          action: () => {
            navigation.push('PriceList');
          }
        }
      ]
    }
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    console.log(env);
  }

  componentDidActive(params) {
    console.log(this.name,'componentDidActive',params)
  }
  componentWillDeactive(params) {
    console.log(this.name,'componentWillDeactive',params)
  }

  _renderRow = (rowData) =>  {
    return <MenuItem item={rowData}/>
  }

  render() {
    const rows = this.dataSource.cloneWithRows(this.state.menuConfig || [])
    return (
      <Page style={style.container}>
       <NavBar
         title="XXX商户"
         leftBtn={<View/>} 
         rightBtn={<Image style={style.navRight} source={MESSAGE_NAV}/>}
         />
        <Body>
          <ListView
            contentContainerStyle={style.list}
            dataSource={rows}
            initialListSize={this.state.menuConfig.lenght}
            pageSize={4}
            scrollRenderAheadDistance={500}
            renderRow={this._renderRow}
          />
        </Body>
      </Page>
    );
  }
}
