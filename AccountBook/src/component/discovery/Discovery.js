// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// action
import { dataAction } from '../../redux/action/index';
// Common
import { Navigation } from '../../common/index';
// Utils
import Top from './Top';
import Bottom from './Bottom';
import { DISCOVER_JSON } from '../../assets/json/AccountJson';
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

class Discovery extends Component {

  _toBill=()=>{
    const { navigate } = this.props.navigation;
    const { DataReducer } = this.props;
    navigate('Bill', {item: DataReducer.homeData});
  }
  _toWeb=(i)=>{
    const { navigate } = this.props.navigation;
    navigate('Web', {
      name: DISCOVER_JSON[i].name,
      url: 'http://www.baidu.com'
    });
  }
  nav() {
    return (
      <Navigation 
        text={'发现'}
      />
    )
  }
  render() {
    const { DataReducer } = this.props;
    return (
      <View style={styles.container}>
        {this.nav()}
        <ScrollView style={{flex: 1}}>
          <Top item={DataReducer.homeData.param['本月']} onPress={this._toBill}/>
          <Bottom onPress={this._toWeb}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});

// reducer
const mapStateToProps = state => ({
  DataReducer: state.DataReducer,
});
// action
const mapDispatchToProps = dispatch => ({
  DataAction: bindActionCreators(dataAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Discovery);