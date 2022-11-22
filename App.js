/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContainer from './src/DrawerContainer/DrawerContainer';
import List from './src/screens/List';
import TrackPlayer, {State} from 'react-native-track-player';
import MusicScreen from './src/screens/musicScreen';
const Stack = createNativeStackNavigator();
function MainNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="List"
      screenOptions={{
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: 'center',
          alignSelf: 'center',
          flex: 1,
        },
      }}>
      <Stack.Screen
        name="List"
        options={{headerShown: false}}
        component={List}
      />
      <Stack.Screen
        name="Music"
        options={{headerShown: false}}
        component={MusicScreen}
      />
    </Stack.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function DrawerStack() {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      initialRouteName="Main"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#000',
          width: 200,
        },
        headerShown: false,
        drawerPosition: 'right',
      }}
      drawerContent={({navigation}) => (
        <DrawerContainer navigation={navigation} />
      )}>
      <Drawer.Screen name="Main" component={MainNavigator} />
    </Drawer.Navigator>
  );
}

export default function App() {
  // useEffect(async () => {
  //   const state = await TrackPlayer.getState();
  //   if (state === State.Playing) {
  //     // alert('The player is playing');
  //   }
  // }, []);
  return (
    <NavigationContainer>
      <DrawerStack />
    </NavigationContainer>
  );
}

console.disableYellowBox = true;
