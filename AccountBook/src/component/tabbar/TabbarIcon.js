// Default
import React, { Component } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableHighlight, 
  TouchableOpacity,
  Platform
} from 'react-native';

class TabbarIcon extends Component {

  constructor (props) {
    super(props);
    this.state = {
       isHighlight: false
    };
  }
  pushAccount=()=>{
    const { navigate } = this.props.navigation;
    navigate("Account");
  }
  _onPressIn=()=>{
    this.setState({
      isHighlight: true
    })
  }
  _onPressOut=()=>{
    this.setState({
      isHighlight: false
    })
  }
  icon=()=>{
    if (this.props.isBig == false) {
      return this.props.source
    } else {
      if (this.state.isHighlight == true) {
        return this.props.select
      } else {
        return this.props.normal
      }
    }
  }
  render() {
    var iconW = this.props.isBig == true ? 60 : 25;
    iconW = Platform.select({ios: iconW, android: 30});
    var iconPadding = this.props.isBig == true ? 20 : 0;
    iconPadding = Platform.select({ios: iconPadding, android: 0});
    return (
      <TouchableOpacity 
          activeOpacity={1}
          style={{marginBottom: iconPadding}}
          onPress={this.pushAccount} 
          disabled={!this.props.isBig}
          // disabled={true}
          onPressIn={this._onPressIn}
          onPressOut={this._onPressOut}
      >
        <Image source={this.icon()} style={{
            height: iconW,
            width: iconW,
        }}/>
      </TouchableOpacity>
    );
  }

}

export default TabbarIcon;



