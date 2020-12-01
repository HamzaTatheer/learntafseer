import React, {Component, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableHighlight,
  Button,
  Alert,
} from 'react-native';
import axios from 'axios';
import {Player, Tile} from '../components';
import TrackPlayer, {STATE_NONE} from 'react-native-track-player';

const PlayerReloader = (props) => {
  const {audioAvailable, RepeatFunction} = props;

  useEffect(() => {
    if (audioAvailable === false) {
      console.log('use effect called');
      let a = setInterval(() => {
        console.log('i get called every 5 seconds if audio isnt available');
        RepeatFunction();
      }, 15000);
      return () => {
        console.log('clearing interval');
        clearInterval(a);
      };
    }
  }, [audioAvailable, RepeatFunction]);

  return null;
};

class LiveBrodcast extends Component {
  
  constructor(props) {
    super(props);
    this.state = {audioAvailable: false};
  }

  componentDidMount() {
    console.log('player mounted');
    this.loadPlayer();
    this.onTrackChange = TrackPlayer.addEventListener(
      'playback-state',
      async (data) => {
        console.log(data.state);
        if (data.state === 1) {
          this.setState({
            audioAvailable: false,
          });
          console.log('player ended: I want the player to reload');
          //this.loadPlayer();
        }
      },
    );
  }

  async loadPlayer() {
    console.log('load player called');
    axios
      .get('https://api.mixlr.com/users/4908227?source=embed')
      .then((response) => {
        //console.log(response.data);

        if (response.data.is_live === true) {
          let link = response.data.broadcasts[0].streams.progressive.url;
          this.setState({BroadcastData: response.data.broadcasts[0]});
          this.setThePlayer(link);
        }
      })
      .catch((error) => {
        console.log(
          'Somebody Called me. I checked but didnt find it. i want to see again.',
        );
        console.log(error);
      });
  }

  setThePlayer(broadcastlink) {
    console.log(broadcastlink);
    let link = broadcastlink;
    var track = {
      id: '12492dddd2', // Must be a string, required

      url: link, // Load media from the network
      title: 'Live Broadcast',
      artist: ' ',
      album: 'Islamic',
      genre: 'Lectures',
      date: '2014-05-20T07:00:00+00:00', // RFC 3339

      artwork: require('../images/icons/thumb.png'), // Load artwork from the app bundle
    };

    TrackPlayer.setupPlayer().then(() => {
      console.log('player setup');
      TrackPlayer.add(track)
        .then(() => this.setState({audioAvailable: true}))
        .catch(() => console.log('errorrrrr'));
    });
  }

  loadingPlayer(err) {
    console.log(err);
  }
  toggleplayer(playing) {
    console.log('Parent toggle ' + playing);
    console.log(playing);
    if (playing === false) {
      TrackPlayer.play();
    } else {
      TrackPlayer.pause();
    }
  }

  renderBroadcastTitle() {
    if (this.state.audioAvailable === true) {
      return (
        <Tile
          style={styles.titlestyle}
          title={this.state.BroadcastData.title}
        />
      );
    } else {
      return <Tile style={styles.titlestyle} title={'Connecting..'} />;
    }
  }

  callmemanytimes() {
    console.log('i get called every 5 seconds');
  }

  render() {
    return (
<SafeAreaView style={{flex:1,backgroundColor:'white'}}>
      <View style={styles.container}>
        <PlayerReloader
          audioAvailable={this.state.audioAvailable}
          RepeatFunction={this.loadPlayer.bind(this)}
        />
        <View style={styles.headerContainer}>
          <Image
            style={styles.headerImage}
            source={require('../images/appLogo.png')}
          />
          <View
            style={{
              flex: 0.4,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="#DDDDDD"
              style={{
                borderRadius: 30,
                backgroundColor: 'white',
                borderColor: '#F4B400',
                borderWidth: 1,
                margin: 5,
              }}
              onPress={() =>
                axios.get('https://docs.google.com/document/d/13rEexQYH1z6tatSNkyb4VeOb-7yomSvyGqPF9c3nWmM/export?format=txt').then((response)=>{
                  Alert.alert(
                    'Timings',
                    response.data,
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
                    {cancelable: false},
                  )
                }).catch(()=>console.log("data not found"))
              }>
              <Text
                style={{
                  textAlign: 'center',
                  paddingTop: 7,
                  paddingBottom: 7,
                  paddingLeft: 20,
                  paddingRight: 20,
                  fontSize: 11,
                }}>
                View Bayan Timings
              </Text>
            </TouchableHighlight>
          </View>
        </View>

        <ImageBackground
          source={require('../images/newbg.png')}
          style={styles.playerContainer}>
          <View style={styles.contentHolder}>
            <View style={styles.playerbox}>
              <Player
                available={this.state.audioAvailable}
                onPress={this.toggleplayer.bind(this)}
              />
            </View>
            <View style={{flex: 1, justifyContent: 'space-evenly'}}>
              <Tile
                style={
                  this.state.audioAvailable
                    ? {backgroundColor: '#0F9D58', borderRadius: 30}
                    : {backgroundColor: '#9D0F0F', borderRadius: 30}
                }
                title={this.state.audioAvailable ? 'On Air' : 'Off Air'}
              />
              <Text></Text>
              {this.renderBroadcastTitle()}
            </View>
          </View>
        </ImageBackground>

      </View>
      </SafeAreaView>
    );
  }

  componentWillUnmount() {
    console.log('unmount');
    this.onTrackChange.remove();
    TrackPlayer.destroy();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playerContainer: {
    flex: 7,
  },
  contentHolder: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 50,
    backgroundColor: 'rgba(0, 0, 0,0.8)',
  },
  playerbox: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  extraContainer: {
    flex: 1,
    alignItems: 'center',
  },
  stretch: {},
  image: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  headerImage: {
    flex: 0.3,
    marginTop: 10,
    marginBottom: 20,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  Tile: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  tileText: {
    color: '#fff',
    textAlign: 'center',
  },
  timingbtnstyle: {
    backgroundColor: '#0075CF',
    borderRadius: 30,
  },
  titlestyle: {
    backgroundColor: '#000000',
    borderRadius: 30,
    marginBottom: 30,
  },
});


export {LiveBrodcast};
