import React from 'react';
import { ImageSourcePropType,FlatList,View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
//1a. import NativeStackScreenProps
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Product } from '../type/Object';
import { HomeStackParamList } from '../type/Param';
import { useEffect } from 'react';
import {  getAllData } from '../../Database/dbHelpers';
import Header from './Header';

//1c. định nghĩa kiểu cho các props(cụ thể ở đây là navigation) mà 1 màn hình sẽ nhận vào (cụ thể ở đây là Home)
type HomeScreenProps = NativeStackScreenProps<HomeStackParamList, 'Home'>;
// Mảng chứa các hình ảnh sản phẩm


//2. Gán kiểu cho props navigation (là kiểu đối tượng vì có {})
const HomeScreen= ({ navigation }: HomeScreenProps) => {
  const [products, setProducts] = React.useState<Product[]>([]);

  useEffect(()=>{
      const setData = async ()=>{
          const productsData = await getAllData('products');
          setProducts(productsData)
      }
      setData()
  },[])
   // Hàm renderProduct được định nghĩa bên trong HomeScreen để có thể sử dụng navigation
   const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', { product: item })}  // Điều hướng sang Details với product được truyền qua tham số
    >
      <View style={styles.productCard}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Mua Ngay</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      {/* Banner */}
<Image source={{uri: 'file:///data/user/0/com.reactnative/cache/rn_image_picker_lib_temp_a98111bd-faf0-4743-8ef7-c2c5623a34b8.jpg'}} style={styles.banner} />
      <Header/>
      {/* Menu ngang */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('About')}>
          <Text style={styles.menuText}>Giới thiệu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Categories')}>
          <Text style={styles.menuText}>Danh mục sản phẩm</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.welcomeText}>Chào mừng đến với cửa hàng thời trang ABC!</Text>
      {/* hiển thị ra danh sách sản phẩm tĩnh với hình ảnh lấy ngẫu nhiên*/}
              <FlatList
                          data={products}
                          keyExtractor={(item) => item.id.toString()}
                          numColumns={2}
                          renderItem={renderProduct}
                          contentContainerStyle={styles.listContainer}
              />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  banner: { width: '100%', height: 100, resizeMode: 'cover' },
  menuContainer: { flexDirection: 'row', justifyContent: 'space-around', padding: 10, backgroundColor: '#eee' },
  menuItem: { padding: 10 },
  menuText: { fontSize: 16, fontWeight: 'bold' },
  welcomeText: { textAlign: 'center', fontSize: 18, marginTop: 20 },
  // style cho FlatList sản phẩm
  listContainer: {
    paddingHorizontal: 10,
},
productCard: {
  flex: 1,
  backgroundColor: '#fff',
  margin: 10,
  padding: 10,
  borderRadius: 10,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOpacity: 0.1,
  shadowRadius: 5,
  elevation: 5,
},
productImage: {
  width: 100,
  height: 100,
  borderRadius: 10,
},
productName: {
  fontSize: 12,
  fontWeight: 'bold',
  marginVertical: 5,
  textAlign: 'center',
},
productPrice: {
  fontSize: 14,
  color: '#E91E63',
  marginBottom: 10,
},
buyButton: {
  backgroundColor: '#E91E63',
  paddingVertical: 8,
  paddingHorizontal: 15,
  borderRadius: 5,
},
buyButtonText: {
  color: '#fff',
  fontWeight: 'bold',
},
});

export default HomeScreen;
