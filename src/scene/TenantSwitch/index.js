import React, { Component } from 'react';
import { FlatList} from 'react-native';
import { screen, mconnect } from '@MCRN'
import { fixSize } from '@MCRN/device';
import actions from 'MCAction';
import { Page, NavBar, Body } from 'MCComponent'

import style from './style';
import TenantItem  from './Component/TenantItem'

const { changeSelectedItem } = actions.TenantList;

@mconnect({ tenantList: 'TenantList.listData' },{changeSelectedItem}) @screen
export default class TenantSwitch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData:[]
    };
  }

  renderItem = (item) => {
    return <TenantItem onItemClick={this.props.changeSelectedItem} {...item} />
  }

  onListRefresh = (item) => {
  }
  
  render() {
    return ( 
    <Page style={style.container}>
      <NavBar title="切换商户" leftEvent={this.goBack} />
      <Body noPadding style={{paddingTop: fixSize(10),}}>
        <FlatList
          refreshing={false}
          style={{flex: 1}}
          data={this.props.tenantList}
          onRefresh={()=> {}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
        />
      </Body>
    </Page>
    );
  }
}
