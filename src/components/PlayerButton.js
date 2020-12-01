import React, {Component} from 'react';
import {TouchableHighlight, Image, StyleSheet} from 'react-native';

class PlayerButton extends Component {
  constructor(props) {
    super(props);
    this.props;
    this.state = {playing: false};
  }

  render() {
    let play = require('../images/icons/playbtn.png');
    let pause = require('../images/icons/pausebtn.png');

    return (
      <TouchableHighlight
        style={styles.PlayButton_container}
        onPress={() => {
          this.props.onPress(this.state.playing);
          this.setState({playing: !this.state.playing});
        }}>
        <Image
          style={styles.ImageButtonStyle}
          source={this.state.playing ? pause : play}
        />
      </TouchableHighlight>
    );
  }
}

export {PlayerButton};

const styles = StyleSheet.create({
  ImageButtonStyle: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  PlayButton_container: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
