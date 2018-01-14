// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, WebView} from 'react-native';
// Common
import { Navigation, Share } from '../../common/index';
// Utils
import { ScreenWidth, ScreenHeight, StreamColor } from '../../utils/index';

var webview = null;
class Web extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      canGoBack: false,
      isShowWeb: false,
    };
  }
  componentDidMount() {
    this.timer = setTimeout(()=>{
      this.setState(() => ({
        isShowWeb: true,
      }));
    },300);
  }
  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }
  
  _onLeftClick=()=>{
    if (this.state.canGoBack == false) {
      this._back();
    } else {
      this.refs.webview.goBack();
    }
  }
  _back=()=>{
    const { goBack } = this.props.navigation;
    goBack();
  }
  _onRightClick=()=>{
    this.refs.share.show()
  }
  _onNavigationStateChange=(event)=>{
    if (event.canGoBack != undefined) {
      this.setState({
        canGoBack: event.canGoBack
      })
    }
  }
  webview() {
    if (this.state.isShowWeb == true) {
      return (
        <WebView 
          ref={'webview'}
          source={{uri: this.props.navigation.state.params.url}}
          scalesPageToFit={true}
          onLoad={this._onLoad}
          onNavigationStateChange={(event)=>this._onNavigationStateChange(event)}
        />
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Navigation 
          text={this.props.navigation.state.params.name}
          leftIcon={require('../../assets/images/nav_back_n.png')}
          leftText={'返回'}
          leftClick={this._onLeftClick}
          leftTwoText={this.state.canGoBack == true ? '关闭' : undefined}
          leftTwoClick={this._back}
          rightIcon={this.props.navigation.state.params.share == true ? require('../../assets/images/share.png') : undefined}
          rightClick={this._onRightClick}
        />
        {this.webview()}
        <Share ref={'share'}/>
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

export default Web;