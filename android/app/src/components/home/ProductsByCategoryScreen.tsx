import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Category, Product } from '../type/Object';
import {HomeStackParamList} from '../type/Param';
import {  getAllData } from '../../Database/dbHelpers';

// Imports từ các file định nghĩa
const listCategoty: Category[] = [{id: 1, name: 'Áo'},{id: 2, name: 'Quần'},{id: 3, name: 'Giày'},{id: 4, name: 'Túi'},];
const listProduct: Product[] = [
    {id:1, name: 'Áo ngắn tay', price: 12, categoryId:1, image:'file:///data/user/0/com.learning/cache/rn_image_picker_lib_temp_1882660d-a707-4141-9106-a7a29b485615.jpg'},
    {id:2, name: 'Quần tây đen', price: 20, categoryId:2, image:'file:///data/user/0/com.learning/cache/rn_image_picker_lib_temp_1882660d-a707-4141-9106-a7a29b485615.jpg'},
    {id:3, name: 'Giày vải', price: 30, categoryId:3, image:'file:///data/user/0/com.learning/cache/rn_image_picker_lib_temp_1882660d-a707-4141-9106-a7a29b485615.jpg'},
    {id:4, name: 'Túi da cá sấu', price: 50, categoryId:4, image:'file:///data/user/0/com.learning/cache/rn_image_picker_lib_temp_1882660d-a707-4141-9106-a7a29b485615.jpg'},
]

import CategorySelector from './CategorySelector';

// --- ĐỊNH NGHĨA KIỂU DỮ LIỆU (TYPESCRIPT) ---

// Định nghĩa kiểu cho Navigation Prop (dùng để điều hướng)
type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'ProductsByCategory'>;
// Định nghĩa kiểu cho Route Prop (dùng để lấy params)
type RouteProps = RouteProp<HomeStackParamList, 'ProductsByCategory'>;

/**
 * Màn hình hiển thị danh sách sản phẩm theo loại.
 * Cho phép người dùng chuyển đổi loại sản phẩm thông qua CategorySelector.
 */
export default function ProductsByCategoryScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { categoryId, categoryName } = route.params;
    console.log('ProductsByCategoryScreen - categoryId:', categoryId);
    console.log('ProductsByCategoryScreen - categoryName:', categoryName);

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(()=>{
    const setData = async ()=>{
        const categoriesData = await getAllData('categories');
        const productsData = await getAllData('products');
        setCategories(categoriesData)
        setProducts(productsData)
    }
    setData()
  },[])
  // selectedCategoryId ban đầu lấy từ params, sau đó có thể thay đổi
  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId);


  // 2. Fetch danh sách sản phẩm dựa trên selectedCategoryId

  // --- LOGIC XỬ LÝ ẢNH ---

  /**
   * Xử lý nguồn ảnh: Nếu là file URI (từ bộ nhớ thiết bị) thì dùng { uri: ... },
   * nếu là tên file tĩnh thì dùng require().
   * @param img Tên file ảnh hoặc URI
   * @returns Nguồn ảnh hợp lệ cho component <Image>
   */

  // --- RENDER ---
  return (
    <View style={styles.screenContainer}>
      
      {/* 1. Bộ chọn loại sản phẩm */}
      <CategorySelector
        categories={categories}
        selectedId={selectedCategoryId}
        // Khi chọn, cập nhật state selectedCategoryId, điều này kích hoạt useEffect (2)
        onSelect={(id) => setSelectedCategoryId(id)} 
      />

      {/* 2. Danh sách sản phẩm */}
      <FlatList
        data={products.filter((p) => p.categoryId === selectedCategoryId)} // Lọc sản phẩm theo loại đã chọn
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Details', { product: item })}
          >
            <Image 
              source={{uri: item.image}} 
              style={styles.image} 
              resizeMode="cover" // Đảm bảo ảnh hiển thị đẹp
            />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              {/* Định dạng giá tiền có dấu phân cách hàng nghìn */}
              <Text>{item.price.toLocaleString('vi-VN')} đ</Text> 
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// --- STYLESHEET (Định dạng) ---
const styles = StyleSheet.create({
  screenContainer: { 
    flex: 1, 
    padding: 10,
    backgroundColor: '#fff', // Thêm màu nền cho màn hình
  },
  card: {
    flexDirection: 'row', 
    padding: 10, 
    marginBottom: 10,
    borderWidth: 1, 
    borderColor: '#eee', // Màu border nhẹ hơn
    borderRadius: 8, // Góc bo tròn hơn
    backgroundColor: '#fff',
    // Thêm shadow nhẹ cho card (chỉ áp dụng cho iOS/Android)
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  image: { 
    width: 80, 
    height: 80, 
    marginRight: 10,
    borderRadius: 4, // Bo tròn ảnh sản phẩm
  },
  info: { 
    justifyContent: 'center',
    flexShrink: 1, // Cho phép text co lại
  },
  name: { 
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  }
});