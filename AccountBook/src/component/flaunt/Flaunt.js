// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Common
import { Navigation } from '../../common/index';
// Utils
import Share from './Share';
import Bottom from './Bottom';
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

class Flaunt extends Component {

  static navigationOptions = {
    mode: 'modal',
    gesturesEnabled: true,
  };
  componentDidMount() {
    this.props.navigation.setParams({
        rightPress: this.rightPress,
    });
  }
  _back=()=>{
    const { goBack } = this.props.navigation;
    goBack();
  }
  _onShareClick=(i)=>{

  }
  render() {
    return (
      <View style={styles.container}>
        <Navigation 
          text={this.props.navigation.state.params.title}
          rightText={'取消'}
          rightClick={this._back}
        />
        <Share type={this.props.navigation.state.params.type}/>
        <Bottom onPress={this._onShareClick}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Flaunt);