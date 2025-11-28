import { Product } from './Object';
import { NavigatorScreenParams } from '@react-navigation/native';

export type ProductStackParamList = {
    ItemManagement : undefined;
    ProductDetail: { product: Product  };
}
export type BottomTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
  Signup: undefined;  //minh họa cho users lưu ở AsyncStorage
  Login: undefined; //minh họa cho users lưu ở AsyncStorage
};

export type HomeStackParamList = {
    // Main: undefined;
    Home: undefined;
    Details: { product: Product }; 
    Accessory: undefined;
    Fashion: undefined;
    Categories:undefined;
    About:undefined;
    AdminDashboard: undefined;
    CategoryManagement: undefined;
    UserManagement: undefined;
    AddUser:undefined;
    EditUser:{userId:number};
    ProductManagement:{categoryId:number};
    ProductsByCategory: { categoryId: number; categoryName?: string };
  };