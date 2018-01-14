// Default
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, TextInput } from 'react-native';
// Utils
import { ADD_CATEGORY_JSON, ICON_JSON } from '../../assets/json/AccountJson';
import { ScreenWidth, ScreenHeight, StreamColor, TitleColor } from '../../utils/index';
import { BackDefaultColor } from '../../utils/UIUtils';

class Header extends Component {
  render() {
    const section = this.props.currentIndex[0];
    const row = this.props.currentIndex[1];
    const iconId = ADD_CATEGORY_JSON[section].icon[row]
    return (
      <View style={styles.container}>
        <Image style={styles.icon} source={ICON_JSON[iconId].iconS}/>
        <TextInput 
          style={styles.input} 
          placeholder={'请输入类别名称(不超过4个汉字)'}
          autoCapitalize={'none'}
          autoCorrect={false}
          maxLength={4}
          selectionColor={TitleColor}
          clearButtonMode={'while-editing'}
          // onChangeText={(text) => this._onChangeText(text)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    backgroundColor: 'white',
    borderBottomColor: BackDefaultColor,
    borderBottomWidth: 0.5,
    alignItems: 'center',
    flexDirection: 'row',
  },
  icon: {
    width: ScreenWidth / 5 / 5 * 3,
    height: ScreenWidth / 5 / 5 * 3,
    marginLeft: ScreenWidth / 5 / 5,
  },
  input: {
    width: ScreenWidth - ScreenWidth / 5 / 5 * 3 * 2,
    height: 70,
    marginLeft: ScreenWidth / 5 / 5,
    fontSize: 16,
    marginRight: 20,
  }
});

export default Header;