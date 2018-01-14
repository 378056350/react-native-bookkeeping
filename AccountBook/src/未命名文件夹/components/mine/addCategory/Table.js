// 控件
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, SectionList} from 'react-native';
// Redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// 数据库
import SaveCateManager from '../../../common/StorageManager/SaveCateManager';
// 控件
import Cell from './Cell';
import {ScreenWidth, ScreenHeight, StreamColor} from '../../../public/Public';

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    SaveCateManager.getNewCate((data)=>{
      this.setState({
        data: data
      })
    });
  }
  componentWillReceiveProps(nextProps) {
    const { BookkeepReducer } = this.props;
    // 切换收入/支出
    if (this.props.BookkeepReducer.showInEx != 
        nextProps.BookkeepReducer.showInEx) {
        SaveCateManager.getNewCate((data)=>{
          this.setState({
            data: data
          })
        });
    }
  }


  _sections() {
    let arr = [];
    for (let i=0; i<this.state.data.length; i++) {
      let subarr = [];
      for(let j=0; j<this.state.data[i].icon.length; j++) {
        subarr.push ({
          key: j, 
          section: i,
          row: j,
          icon: this.state.data[i].icon[j],  
        })
      }
      arr.push({data: [{key: i, data: subarr}], renderItem: ({item}) => this._cell(item)});
    }
    return arr;
  }
  _renderSectionHeader() {
    return (
      <View style={styles.sectionHeader}/>
    )
  }
  _renderSectionHeader(data) {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>{this.state.data[data.section.data[0].key].name}</Text>
      </View>
    )
  }
  _renderSectionFooter(item) {
    return (
      <View style={[styles.sectionFooter]}/>
    )
  }
  _cell(item) {
    return (
      <Cell item={item}/>
    )
  }
  
  render() {
    return (
      <SectionList
          style={styles.container}
          sections={this._sections()}
          renderSectionHeader={(data)=>this._renderSectionHeader(data)}
          renderSectionFooter={(item)=>this._renderSectionFooter(item)}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled={false}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sectionHeader: {
    width: ScreenWidth, 
    padding: 10,
    paddingLeft: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  sectionHeaderText: {
    fontSize: 12,
    fontWeight: '300',
    color: '#282828',
  },
  sectionFooter: {
    width: ScreenWidth, 
    height: 15,
    backgroundColor: 'white',
  },
});

// 映射Redux state到组件的属性
const mapStateToProps = state => ({
  // nav: state.NavigationReducer,
});
// 映射Redux actions到组件的属性
const mapDispatchToProps = dispatch => ({
  // MainAction: bindActionCreators(mainAction, dispatch),
});

// 连接组件
export default connect(mapStateToProps, mapDispatchToProps)(Table);