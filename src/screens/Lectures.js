import React, {Component} from 'react';
import 'react-native-get-random-values';
import {WebView} from 'react-native-webview';

class Lectures extends Component {
  render() {
    return (
      <WebView
        onMessage={()=>{}}
        injectedJavaScript="document.getElementById('main_header').style.visibility = 'hidden';document.getElementById('off_canvas_navigation').style.visibility = 'hidden';document.getElementById('main_menu').style.visibility = 'hidden';document.getElementById('footer').style.visibility = 'hidden';"
        source={{uri: 'https://mixlr.com/tafseer1/showreel/'}}
      />
    );
  }
}

export {Lectures};
