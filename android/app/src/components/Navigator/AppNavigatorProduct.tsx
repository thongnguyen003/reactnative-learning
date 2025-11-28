import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ItemManagement from '../SQLite/ItemManagement';
import ProductDetail from '../SQLite/ProductDetail';
import { ProductStackParamList } from '../type/Param';



const Stack = createNativeStackNavigator<ProductStackParamList>();

const AppNavigatorProduct = () => {
  return (
    <Stack.Navigator
    >
      <Stack.Screen name="ItemManagement" component={ItemManagement} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
}
export default AppNavigatorProduct;