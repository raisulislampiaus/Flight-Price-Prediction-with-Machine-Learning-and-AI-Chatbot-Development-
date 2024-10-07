
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigator/RootNavigator';
import {LogBox} from 'react-native';
import Header from './src/screen/Header';

LogBox.ignoreAllLogs(true);
function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Header />
      <RootNavigator />
    </NavigationContainer>
  );
}



export default App;
