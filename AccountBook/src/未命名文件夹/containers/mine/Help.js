// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SectionList, WebView} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// Action
import mineAction from '../../redux/action/mineAction';
// 控件
import Navigation from '../../common/Navigation/Navigation';
import Share from '../../common/Share/Share';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';

class Help extends Component {

  _back() {
    const { goBack } = this.props.navigation;
    goBack();
    
  }

  _share() {
    // 分享
    const { MineAction } = this.props;
    MineAction.showShareAction('help');
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Navigation text="帮助"
                    rightText={""}
                    leftText={"返回"}
                    leftIcon={require('../../assets/images/nav_back_n.png')}
                    leftClick={()=>this._back()}
                    rightIcon={require('../../assets/images/share.png')}
                    rightStyle={{width: 25, height: 25}}
                    rightClick={()=>this._share()}/>
        <WebView
          style={{
            flex: 1
          }}
          source={{uri: 'http://url.cn/5HXIhBk'}}
          scalesPageToFit={true}
        />
        <Share name={'help'}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: ScreenHeight,
    backgroundColor: 'rgba(244,244,244,1)',
    flexDirection: 'column',
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
export default connect(mapStateToProps, mapDispatchToProps)(Help);