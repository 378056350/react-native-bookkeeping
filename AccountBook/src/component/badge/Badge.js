// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, InteractionManager } from 'react-native';
// Common
import { Navigation } from '../../common/index';
// Utils
import Shadow from './Shadow';
import { BADGE_JSON } from '../../assets/json/AccountJson';
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

let TableComponent = null;
class Badge extends Component {

  constructor(props) {
    super(props);
    this.state = {
      needsTable: false,
    }
  }
  componentDidMount() {
    if (TableComponent == null) {
      TableComponent = require('./Table').default;
    }
    this.timer = setTimeout(()=>{
      this.setState(() => ({
        needsTable: true,
      }));
    },100);
    
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
  }

  _back=()=>{
    const { goBack } = this.props.navigation;
    goBack();
  }
  _onPress=(item)=>{
    // console.log(item);
    this.refs.Shadow.show();
  }
  _onShow=()=>{
    this.timer = setTimeout(()=>{
      const { navigate } = this.props.navigation;
      navigate('Flaunt',{title: '晒徽章', type: 1});
    },200);
  }
  table() {
    return (
      <TableComponent 
        data={BADGE_JSON}
        onPress={this._onPress}
      />
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Navigation 
          text={'徽章'}
          leftIcon={require('../../assets/images/nav_back_n.png')}
          leftText={'返回'}
          leftClick={this._back}
        />
        {this.state.needsTable ? this.table() : null}
        <Shadow 
          ref={'Shadow'}
          onShow={this._onShow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(244,244,244,1)',
  }
});

export default Badge