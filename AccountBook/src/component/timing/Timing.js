// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Common
import { Navigation, BottomButton } from '../../common/index';
// Utils
import Table from './Table';
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

class Timing extends Component {

  _back=()=>{
    const { goBack } = this.props.navigation;
    goBack();
  }
  _onFooterPress=(i)=>{
    
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigation 
          text={'定时提醒'}
          leftIcon={require('../../assets/images/nav_back_n.png')}
          leftText={'返回'}
          leftClick={this._back}
        />
        <Table/>
        <BottomButton texts={['+ 添加提醒']} onPress={(i)=>this._onFooterPress(i)}/>
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

// reducer
const mapStateToProps = state => ({
  // MainReducer: state.MainReducer,
});
// action
const mapDispatchToProps = dispatch => ({
  // MainAction: bindActionCreators(mainAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Timing);