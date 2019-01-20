/**
 * 导航栏组件
 */
import React, { Component } from 'react';
import All from 'mcrn-ui/All';

class Page extends Component {
  render() {
    return (
      <All  {...this.props}>
      
      </All>

    );
  }
}

Page.defaultProps = {
  ...All.defaultProps,
  statusBarBgColor: '#000'
};

export default Page;
