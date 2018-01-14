// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Common
import { ICON_JSON } from '../../assets/json/AccountJson';
import { Navigation, BottomButton } from '../../common/index';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor } from '../../utils/index';

let TableComponent = null;
class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentSelect: 0,
      needsComponent: false,
    }
  }
  componentDidMount() {
    this.timer = setTimeout(()=>{
      if (TableComponent == null) {
        TableComponent = require('./Table').default;
      }
      this.setState(() => ({
        needsComponent: true,
      }));
    },300);
  }
  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }
  _back=()=>{
    const { goBack } = this.props.navigation;
    goBack();
  }
  _onRight=()=>{
    const { navigate } = this.props.navigation;
    navigate('Flaunt', {title: '晒单', type: 2});
  }
  _onFooterPress=(index)=>{
    if (index == 0) {
      const { navigate } = this.props.navigation;
      navigate('Account');
    } else {

    }
  }
  nav() {
    return (
      <Navigation 
        style={{height: 140, justifyContent: 'space-between', flexDirection: 'column'}}
        textView={this.header()}
        leftIcon={require('../../assets/images/nav_back_n.png')}
        leftText={'返回'}
        leftClick={this._back}
        rightText={'分享'}
        rightClick={this._onRight}
      />
    )
  }
  header=()=>{
    let item = this.props.navigation.state.params.item;
    return (
      <View style={styles.header}>
        <Image style={styles.icon} source={ICON_JSON[item.id].iconL}/>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    )
  }
  table() {
    return (
      <TableComponent item={this.props.navigation.state.params.item}/>
    )
  }
  bottom() {
    return (
      <BottomButton texts={['编辑','删除']} onPress={this._onFooterPress}/>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        {this.nav()}
        {this.state.needsComponent ? this.table() : null}
        {this.state.needsComponent ? this.bottom() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(244,244,244,1)',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 70,
    height: 70,
    marginTop: 10,
  },
  name: {
    fontSize: 15,
    color: TitleColor,
    fontWeight: '300',
    marginTop: 10,
    textAlign: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(Detail);