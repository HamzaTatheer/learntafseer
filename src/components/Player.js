import React, {Component} from 'react';
import {View, Text, Image, TouchableHighlight, StyleSheet} from 'react-native';
import {PlayerButton} from '../components';

class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {playing: false};
  }

  renderidle() {
    console.log('idle');
    let idle = require('../images/icons/idlebtn.png');
    return (
      <View style={styles.idleButtonContainer}>
        <Image style={styles.idleButtonImage} source={idle} />
      </View>
    );
  }

  render() {
    console.log(this.props.available);
    return (
      <View>
        <View>
          <View style={styles.container}>
            {this.props.available ? (
              <PlayerButton onPress={this.props.onPress} />
            ) : (
              this.renderidle()
            )}
          </View>
          <Text />
        </View>
      </View>
    );
  }
}

export {Player};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  idleButtonContainer: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  idleButtonImage: {width: 100, height: 100},
});
