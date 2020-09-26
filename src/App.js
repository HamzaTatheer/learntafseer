import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {View, Text, Image, StatusBar, StyleSheet} from 'react-native';
import {LiveBrodcast, ShortClips, Lectures} from './screens';
import {ResponsiveIcon} from './components';

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    );
  }
}

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  let indicatorStyle = {
    height: null,
    top: 0,
    backgroundColor: 'red',
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Tab.Navigator
        initialRouteName="LiveBrodcast"
        activeColor="#f0edf6"
        barStyle={styles.navbarstyle}
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}>
        <Tab.Screen
          name="LiveBrodcast"
          component={LiveBrodcast}
          options={{
            tabBarLabel: 'Live Brodcast',
            tabBarIcon: ({color}) => (
              <Image
                style={styles.icon1style}
                source={require('./images/icons/pic1.png')}
              />
            ),
            pressColor: 'gray',
            style: indicatorStyle,
          }}
        />
        <Tab.Screen
          name="Lectures"
          component={Lectures}
          options={{
            tabBarLabel: 'Lectures',
            tabBarIcon: ({color}) => (
              <Image
                style={{width: 20, height: 20}}
                source={require('./images/icons/pic3.png')}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  navbarstyle: {
    backgroundColor: '#4285F4',
    paddingTop: 10,
    paddingBottom: 10,
  },
  icon1style: {width: 20, height: 20},
});
