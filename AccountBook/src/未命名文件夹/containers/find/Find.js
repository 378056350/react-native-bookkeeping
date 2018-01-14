// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import Navigation from '../../common/Navigation/Navigation';
import Table from '../../components/find/find/Table';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';

class Find extends Component {

  componentDidMount() {
    
  }

  _onPress(item) {
    const { navigate } = this.props.navigation;
    navigate("Bills");
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigation text="发现"
                    rightText={""}/>
        <Table 
          onPress={(item)=>this._onPress(item)}
        />
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

// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  // MainReducer: state.MainReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  // MainAction: bindActionCreators(mainAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Find);