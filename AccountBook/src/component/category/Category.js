// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// action
import { dataAction } from '../../redux/action/index';
// Common
import { Navigation, BottomButton, Toast } from '../../common/index';
// Utils
import Header from './Header';
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

let TableComponent = null;
class Category extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentSelect: 0,
      needsComponent: false,
    }
  }
  componentDidMount() {
    if (TableComponent == null) {
      TableComponent = require('./Table').default;
    }
    this.timer = setTimeout(()=>{
      this.setState(() => ({
        needsComponent: true,
      }));
    },300);
    
  }
  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
    this.setState(() => ({
      needsComponent: false,
    }));
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.currentSelect != nextProps.currentSelect) {
      return false;
    }
    return true;
  }
  _back=()=>{
    const { goBack } = this.props.navigation;
    goBack();
  }
  _onHeaderPress=(i)=>{
    this.refs.toast.show()
    this.timer = setTimeout(()=>{
      this.setState({
        currentSelect: i
      })
      this.refs.toast.hide()
    },100);
  }
  _onFooterPress=(i)=>{
    const { navigate } = this.props.navigation;
    navigate('AddCategory');
  }

  header() {
    return (
      <Header onPress={(i)=>this._onHeaderPress(i)}/>
    )
  }
  table() {
    const { DataReducer } = this.props;
    return (
      <TableComponent 
        data={DataReducer.category} 
        currentSelect={this.state.currentSelect}
      />
    )
  }
  bottom() {
    return (
      <BottomButton texts={['+ 添加类别']} onPress={(i)=>this._onFooterPress(i)}/>
    )
  }
  toast() {
    return (
      <Toast ref={'toast'} text={'切换中...'}/>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Navigation 
          text={'类别设置'}
          leftIcon={require('../../assets/images/nav_back_n.png')}
          leftText={'返回'}
          leftClick={this._back}
        />
        {this.header()}
        {this.state.needsComponent ? this.table() : null}
        {this.state.needsComponent ? this.bottom() : null}
        {this.state.needsComponent ? this.toast() : null}
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
  DataReducer: state.DataReducer,
});
// action
const mapDispatchToProps = dispatch => ({
  DataAction: bindActionCreators(dataAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);