// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Common
import { Navigation } from '../../common/index';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

class ChartDetail extends Component {

  _back=()=>{
    const { goBack } = this.props.navigation;
    goBack();
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <Navigation 
          text={'图表详情'}
          leftIcon={require('../../assets/images/nav_back_n.png')}
          leftText={'返回'}
          leftClick={this._back}
        />
        <TouchableOpacity onPress={()=>{
          const { navigate } = this.props.navigation;
          navigate('Detail');
        }}>
          <Text>跳转到详情</Text>
        </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChartDetail);