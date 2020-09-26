import React, {Component} from 'react';
import 'react-native-get-random-values';
import {WebView} from 'react-native-webview';

class Lectures extends Component {
  render() {
    return (
      <WebView
        injectedJavaScript="document.getElementById('off_canvas_navigation').style.visibility = 'hidden';document.getElementById('main_menu').style.visibility = 'hidden';document.getElementById('footer').style.visibility = 'hidden';"
        source={{uri: 'https://mixlr.com/tafseer1/showreel/'}}
      />
    );
  }
}

export {Lectures};
