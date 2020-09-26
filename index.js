/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./service.js'));
