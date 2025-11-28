import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {Product, Category} from '../type/Object';
// Imports từ các file định nghĩa
import CategorySelector from './CategorySelector';
import {HomeStackParamList} from '../type/Param';
import {  getAllData } from '../../Database/dbHelpers';

type ProductDetailRouteProp = RouteProp<HomeStackParamList, 'Details'>;
type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'ProductsByCategory'>;

const DetailScreen = () => {
  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { product } = route.params; 
  
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(()=>{
      const setData = async ()=>{
          const categoriesData = await getAllData('categories');
          setCategories(categoriesData)
      }
      setData()
    },[])

  // --- LOGIC XỬ LÝ ẢNH ---

  // --- LOGIC XỬ LÝ SỰ KIỆN ---
  /**
   * Xử lý khi người dùng chọn một category.
   * Điều hướng sang màn hình ProductsByCategory.
   * @param id ID của loại sản phẩm được chọn
   */
  const handleSelectCategory = (id: number) => {
    const selected = categories.find((c) => c.id === id);
    if (selected) {
        console.log('Selected category:', selected);
      navigation.navigate('ProductsByCategory', {
        categoryId: selected.id,
        categoryName: selected.name,
      });
    }
  };

  // --- RENDER ---
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Ảnh sản phẩm */}
      <Image 
        source={{ uri: product.image }} 
        style={styles.image} 
      />
      
      {/* Thông tin cơ bản */}
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>{product.price.toLocaleString('vi-VN')} đ</Text>
      
      {/* Bộ chọn Category */}
      <Text style={styles.label}>Xem các sản phẩm khác:</Text>
      <CategorySelector
        categories={categories}        // Mảng categories đã fetch
        selectedId={product.categoryId}  // Highlight category của sản phẩm hiện tại
        onSelect={handleSelectCategory} // Khi chọn, gọi hàm điều hướng
      />
    </ScrollView>
  );
};

// --- STYLESHEET ---
const styles = StyleSheet.create({
  container: { 
    padding: 16,
    backgroundColor: '#fff',
  },
  image: { 
    width: '100%', 
    height: 250, // Chiều cao lớn hơn
    resizeMode: 'contain',
    borderRadius: 8,
    marginBottom: 10,
  },
  name: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginVertical: 10,
    color: '#333',
  },
  price: { 
    fontSize: 20, 
    color: '#007bff', // Màu nổi bật hơn cho giá
    marginBottom: 15,
    fontWeight: '600',
  },
  label: { 
    marginTop: 20, 
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#555',
  },
});

export default DetailScreen;