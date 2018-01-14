// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, SectionList, TouchableHighlight, Alert, ScrollView} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// Action
import mineAction from '../../redux/action/mineAction';
// 控件
import Navigation from '../../common/Navigation/Navigation';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';

class Screenshots extends Component {

  static navigationOptions = {
    mode: 'modal',
    gesturesEnabled: false
  };

  constructor(props) {
    super(props);
    this.state = {
      text: ['保存图片','微信','朋友圈','QQ','新浪微博','短信'],
      icon: [
        require('../../assets/images/share_download.png'),
        require('../../assets/images/share_wx.png'),
        require('../../assets/images/share_wxfc.png'),
        require('../../assets/images/share_qq.png'),
        require('../../assets/images/share_sina.png'),
        require('../../assets/images/share_sms.png'),
      ]
    }
  }

  _back() {
    const { goBack } = this.props.navigation;
    const { MineAction } = this.props;
    MineAction.hideScreenShortAction();
    goBack();
  }

  
  top() {
    return (
      <View style={styles.top}>
        <View style={styles.screenShots}/>
      </View>
    )
  }
  bottom() {
    let arr = [];
    for (var i=0; i<this.state.text.length; i++) {
      arr.push(
        <TouchableHighlight key={i} underlayColor={'rgba(244,244,244,1)'} style={styles.bottomV} onPress={()=>{}}>
          <View>
            <Image style={styles.bottomIcon} resizeMode={"contain"} source={this.state.icon[i]}/>
            <Text style={styles.bottomText}>{this.state.text[i]}</Text>
          </View>
        </TouchableHighlight>
      )
    }
    return (
      <View style={styles.bottom}>
        <ScrollView style={{flex: 1}}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}>
          {arr}
        </ScrollView>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigation text="晒单" 
                    rightText={"取消"}
                    rightClick={()=>this._back()}
                    rightStyle={{width: 0, height: 25}}
                    />
        {this.top()}
        {this.bottom()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenShots: {
    width: ScreenWidth / 5 * 4,
    height: (ScreenHeight - 80 - 64) / 5 * 4,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  bottom: {
    width: ScreenWidth,
    height: 80,
    backgroundColor: 'white',
  },
  bottomV: {
    width: ScreenWidth / 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  bottomIcon: {
    width: ScreenWidth / 8,
    height: ScreenWidth / 8,
  },
  bottomText: {
    textAlign: 'center',
    fontWeight: '300',
    color: '#282828',
    fontSize: 8,
    // backgroundColor: 'blue'
  }
});

// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  // MainReducer: state.MainReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  MineAction: bindActionCreators(mineAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Screenshots);