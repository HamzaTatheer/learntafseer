import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

class Tile extends Component {
  render() {
    let {title} = this.props;
    return (
      <View style={(styles.Tile, this.props.style)}>
        <Text style={styles.tileText}>{title}</Text>
      </View>
    );
  }
}

export {Tile};

const styles = StyleSheet.create({
  Tile: {
    borderRadius: 30,
  },
  tileText: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    color: '#fff',
    textAlign: 'center',
  },
});
