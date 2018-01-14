// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// Action
import mainAction from '../../redux/action/mainAction';
import detailsAction from '../../redux/action/detailsAction';
// 数据库
import StorageManager from '../../common/StorageManager/StorageManager';
import SaveManager from '../../common/StorageManager/SaveManager';
import SaveCateManager from '../../common/StorageManager/SaveCateManager';
import SaveDataManager from '../../common/StorageManager/SaveDataManager';
// 控件
import Navigation from '../../common/Navigation/Navigation';
import Header from '../../components/details/details/Header';
import Table from '../../components/details/details/Table';
import DatePicker from '../../common/DatePicker/DatePicker';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../public/Public';

class Details extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contentOffsetY: 0,
      contentSizeH: 0,
    }
  }

  componentWillMount() {
    this.timer && clearTimeout(this.timer);
  }

  componentDidMount() {
    SaveManager.initialization();
    const { MainAction } = this.props;
    // MainAction.refreshCateDataSaga();
    this.timer = setTimeout(()=>{
      MainAction.refreshCateDataSaga();
      MainAction.initializationDataRangeSaga();
    },1000);
  }

  _onPress() {
    const { navigate } = this.props.navigation;
    navigate("Item");
  }
  _onHeaderPress=()=>{
    if (this.refs.datePicker.getIsShow() == false) {
      this.refs.datePicker.show(3);
    } else {
      this.refs.datePicker.hide();
    }
  }
  _onScroll=(event)=>{
    const { DetailsAction, DetailsReducer } = this.props;
    let contentOffsetY = event.nativeEvent.contentOffset.y;
    let contentSizeH = event.nativeEvent.contentSize.height;
    contentSizeH = contentSizeH <= (ScreenHeight - 50 - 64 - 54) ? (ScreenHeight - 50 - 64 - 54) : contentSizeH;
    this.setState({
      contentOffsetY: contentOffsetY,
      contentSizeH: contentSizeH
    })
    if (contentOffsetY <= 0 && DetailsReducer.isTableAnimating == false) {
      DetailsAction.changeTableMoveY(0);
    } else if (contentOffsetY > 0 && DetailsReducer.isTableAnimating == false) {
      DetailsAction.changeTableMoveY(1);
    }
  }
  _onTouchEnd=()=>{
    const tableH = ScreenHeight - 50 - 64 - 54;
    const { DetailsAction, DetailsReducer } = this.props;
    if (DetailsReducer.tableDisplay % 2 == 0 && 
        (this.state.contentOffsetY <= -40 || (this.state.contentOffsetY + tableH - 40) >= this.state.contentSizeH)) {
      DetailsAction.startTableChange();
      this.refs.table1.hide();
      this.refs.table2.show(()=>{
        DetailsAction.changeTableDisplay();
        this.setState({
          contentOffsetY: 0,
          contentSizeH: 0,
        })
      });
    } 
    else if (DetailsReducer.tableDisplay % 2 == 1 && 
             (this.state.contentOffsetY <= -40 || (this.state.contentOffsetY + tableH - 40) >= this.state.contentSizeH)) {
      DetailsAction.startTableChange();
      this.refs.table2.hide();
      this.refs.table1.show(()=>{
        DetailsAction.changeTableDisplay();
        this.setState({
          contentOffsetY: 0,
          contentSizeH: 0,
        })
      });
    }
  }


  render() {
    const { DetailsReducer } = this.props;
    return (
      <View style={styles.container}>
        <Table 
          ref="table1" 
          onScroll={this._onScroll} 
          onPress={()=>this._onPress()} 
          onTouchEnd={this._onTouchEnd}
          tableMoveY={DetailsReducer.tableMoveY}
          isShow={DetailsReducer.tableDisplay % 2 == 0}
          moveY={1}
        />
        <Table 
          ref="table2" 
          onScroll={this._onScroll} 
          onPress={()=>this._onPress()} 
          onTouchEnd={this._onTouchEnd}
          tableMoveY={DetailsReducer.tableMoveY}
          isShow={DetailsReducer.tableDisplay % 2 != 0}
          moveY={0}
        />
        <DatePicker ref="datePicker"
                    title={"选择月份"}
                    top={114}/>
        <Navigation textView={
              <Image style={styles.icon} 
                     resizeMode={"contain"}
                     source={require('../../assets/images/detail_share_shark.png')}/>
            }
        />
        <Header onPress={this._onHeaderPress}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  icon: {
    flex: 1,
    height: 25, 
    width: ScreenWidth,
  }
});

// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  MainReducer: state.MainReducer,
  DetailsReducer: state.DetailsReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  MainAction: bindActionCreators(mainAction, dispatch),
  DetailsAction: bindActionCreators(detailsAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Details);