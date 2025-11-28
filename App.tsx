/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native'
import AppNavigatorProduct from './android/app/src/components/Navigator/AppNavigatorProduct';

import HelloWorldApp from './android/app/src/components/lesson/hellpWorld';
import Event from './android/app/src/components/lesson/Event';
import Input from './android/app/src/components/Input';
import LinearEquation from './android/app/src/components/lesson/LinearEquation';
import ExOne from './android/app/src/components/props/ExOne';
import Linear from './android/app/src/components/Opertator/Linear';
import Calculator from './android/app/src/components/Opertator/Calculator';
import BodyMassIndex from './android/app/src/components/Opertator/BodyMassIndex';
import Flex from './android/app/src/components/Layout/Flex';
import Structure from './android/app/src/components/Layout/Structure';
import Grid from './android/app/src/components/Layout/Grid';
import ListItem from './android/app/src/components/Layout/ListItem';
import ListItemOne from './android/app/src/components/Layout/ListItemOne';
import ListItemFlat from './android/app/src/components/Layout/ListItemFlat';
import {getDb, initDatabase} from './android/app/src/Database/database';
import {useEffect} from 'react';
import Tab from './android/app/src/components/Navigator/Tab';
function App() {
  const NAVIGATION_KEY = "APP_NAVIGATOR_RESET_V990"; 
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(()=>{
    initDatabase();
  },[])

  return (
      <NavigationContainer key={NAVIGATION_KEY}>
        <Tab />
      </NavigationContainer>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import TelephoneDirectory from './android/app/src/components/Array/TelephoneDirectory';
import ItemManagement from './android/app/src/components/SQLite/ItemManagement';
import HomeScreen from './android/app/src/components/home/HomeScreen';
import AppNavigatorHome from './android/app/src/components/Navigator/AppNavigatorHome';

export default App;
