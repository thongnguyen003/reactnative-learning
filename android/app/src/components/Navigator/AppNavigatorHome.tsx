import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../home/HomeScreen';
import DetailScreen from '../home/DetailScreen';
import { HomeStackParamList } from '../type/Param';
import About from '../home/About';
import Categories from '../home/Categories';
import Fashion from '../home/Fashion';
import Accessory from '../home/Accessory';
import ItemManagement from '../SQLite/ItemManagement';
import ProductsByCategoryScreen from '../home/ProductsByCategoryScreen';
import CategoryManagement from '../SQLite/CategoryManagement';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator<HomeStackParamList>();

const AppNavigatorHome = () => {
  return (
    <Stack.Navigator 
      initialRouteName='Home'
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailScreen} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Fashion" component={Fashion} />
      <Stack.Screen name="Accessory" component={Accessory} />
      <Stack.Screen name="ProductManagement" component={ItemManagement} />
      <Stack.Screen name="CategoryManagement" component={CategoryManagement} />
      <Stack.Screen name="ProductsByCategory" component={ProductsByCategoryScreen}/>
      <Stack.Screen name="AdminDashboard" component={ItemManagement}/>
    </Stack.Navigator>
  );
}
export default AppNavigatorHome;