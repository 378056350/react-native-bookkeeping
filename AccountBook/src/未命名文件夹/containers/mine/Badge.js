// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SectionList} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import Navigation from '../../common/Navigation/Navigation';
import BadgeTable from '../../components/mine/badge/BadgeTable';
import BadgeShadow from '../../components/mine/badge/BadgeShadow';
import BadgeFinish from '../../components/mine/badge/BadgeFinish';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';

class Badge extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isHide: false,
      item: null
    }
  }

  _back() {
    const { goBack } = this.props.navigation;
    goBack();
  }

  _onPress(item) {
    this.setState({
      isHide: true,
      item: item
    });
  }
  
  _hide() {
    this.setState({
      isHide: false
    });
  }

  _shadow() {
    if (this.state.isHide == true) {
      return (
        // <BadgeShadow ref="shadow" data_style={styles.ad}
        //              onClickHide={()=>this._hide()}
        //              item={this.state.item}/>
        <BadgeFinish ref="shadow" data_style={styles.ad}
                     onClickHide={()=>this._hide()}
                     item={this.state.item}/>
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigation text="徽章"
                    rightText={""}
                    leftText={"返回"}
                    leftIcon={require('../../assets/images/nav_back_n.png')}
                    leftClick={()=>this._back()}/>
        <BadgeTable onPress={(item)=>this._onPress(item)}
                    data_style={styles.table}/>
        {this._shadow()}
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
  },
  table: {
    position: 'absolute',
    top: 64,
    left: 0,
    width: ScreenWidth,
    height: ScreenHeight - 64,
  },
  ad: {
    position: 'absolute',
    left: 0,
    top: -64,
    width: ScreenWidth,
    height: ScreenHeight,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  // MainReducer: state.MainReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  // MainAction: bindActionCreators(mainAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Badge);