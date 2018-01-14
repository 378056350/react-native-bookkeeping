// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TouchableHighlight, FlatList, ListView, TouchableOpacity} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 控件
import PushCell from './PushCell';
import { ScreenWidth, ScreenHeight, StreamColor } from '../../../public/Public';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

class PushTable extends Component {
  
  constructor(props) {
		super(props);
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			listViewData: Array(6).fill('').map((_,i)=>`item #${i}`)
		};
  }
  
  deleteRow(secId, rowId, rowMap) {
		rowMap[`${secId}${rowId}`].closeRow();
		const newData = [...this.state.listViewData];
		newData.splice(rowId, 1);
		this.setState({listViewData: newData});
	}

  _back() {
    const { goBack } = this.props.navigation;
    goBack();
  }

  _onClick(item) {
    const { navigate } = this.props.navigation;
    if (item.section == 0) {
      if (item.row == 0) {
        navigate("Badge");
      }
    }
  }

  render() {
    return (
      <SwipeListView
        dataSource={this.ds.cloneWithRows(this.state.listViewData)}
        renderRow={ (data, secId, rowId, rowMap) => (
          <SwipeRow
            disableRightSwipe={true}
            disableLeftSwipe={false}
            rightOpenValue={-60}
          >
            <View style={styles.rowBack}>
              <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={ _ => this.deleteRow(secId, rowId, rowMap) }>
                <Text style={styles.backTextWhite}>删除</Text>
              </TouchableOpacity>
            </View>
            <PushCell/>
          </SwipeRow>
        )}
      /> 
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 10,
    top: 30,
    backgroundColor: 'white',
    borderColor: 'white',
    borderRadius: 35,
    borderWidth: 1,
  },
  backTextWhite: {
		color: '#FFF'
	},
	rowBack: {
		alignItems: 'center',
		backgroundColor: '#DDD',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 60
	},
	backRightBtnLeft: {
		backgroundColor: 'blue',
		right: 60
	},
	backRightBtnRight: {
		backgroundColor: '#ff5a5a',
		right: 0
	},
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
export default connect(mapStateToProps, mapDispatchToProps)(PushTable);