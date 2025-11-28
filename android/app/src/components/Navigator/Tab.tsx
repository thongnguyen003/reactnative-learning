import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AppNavigatorHome from './AppNavigatorHome';
import SignIn from '../Authetication/SignIn';
import SignUp from '../Authetication/SignUp';
import HomeScreen from '../home/HomeScreen';
import { BottomTabParamList } from '../type/Param';

const Tabo = createBottomTabNavigator<BottomTabParamList>();

const Tab = () => {
  return (
    <Tabo.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='HomeTab'
    >
      <Tabo.Screen
        name="HomeTab"
        component={AppNavigatorHome as React.ComponentType<any>}
        options={{ title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🏠</Text>
          ),
         }}
      />
      <Tabo.Screen
        name="Login"
        component={SignIn}
        options={{ title: 'Login',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>🔒</Text> // Unicode 🔒
          ),
         }}
      />
      <Tabo.Screen
        name="Signup"
        component={SignUp}
        options={{ title: 'Signup',
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size, color }}>➕</Text> // Unicode ➕
          ),
         }}
      />
    </Tabo.Navigator>
  );
};

export default Tab;
// Không thể viết  <Tab.Screen name="Home" component={HomeScreen} /> mà phải viết
//   <Tab.Screen name="Home" component={HomeScreen as React.ComponentType<any>} />
//khi trong HomeScreen có sử dụng BottomTab vì
// Lỗi này thường xảy ra do sự không tương thích giữa kiểu của HomeScreen và kiểu mà Tab Navigator mong đợi. Khi bạn khai báo HomeScreen với các props bắt buộc (navigation, route) từ Native Stack, thì khi sử dụng nó trong Bottom Tab Navigator, các màn hình của Tab Navigator được coi là có props rỗng (ví dụ: {}).
// Để khắc phục, bạn có thể ép kiểu HomeScreen thành một component có kiểu phù hợp (ví dụ: React.ComponentType<any>) khi truyền vào màn hình có dùng Tab
// Điều này sẽ buộc TypeScript chấp nhận HomeScreen như một component mà Tab Navigator có thể sử dụng, ngay cả khi HomeScreen yêu cầu các props navigation và route.