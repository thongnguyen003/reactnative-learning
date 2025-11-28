import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// Giả định 'database' chứa định nghĩa cho Category
import { Category } from '../type/Object';


// --- ĐỊNH NGHĨA KIỂU DỮ LIỆU (TYPESCRIPT) ---
interface Props {
  /** Mảng các đối tượng Category để hiển thị. */
  categories: Category[];
  /** ID của loại sản phẩm đang được chọn. */
  selectedId: number;
  /** Hàm callback được gọi khi người dùng chọn một loại sản phẩm mới. */
  onSelect: (id: number) => void;
}
/**
 * Component hiển thị danh sách các loại sản phẩm dưới dạng các nút bấm.
 * Nút đang chọn sẽ được làm nổi bật.
 */
const CategorySelector = ({ categories, selectedId, onSelect }: Props) => {
  return (
    <View style={styles.container}>
      {categories.map((cat) => (
        <TouchableOpacity
          key={cat.id}
          style={[
            styles.button,
            // Áp dụng style 'selectedButton' nếu id của loại sản phẩm khớp với selectedId
            cat.id === selectedId && styles.selectedButton, 
          ]}
          onPress={() => {
            console.log('Pressed category:', cat); // 🐞 Thêm dòng này để debug
            onSelect(cat.id);
          }}
        >
          <Text style={[styles.text, cat.id === selectedId && styles.selectedText]}>
            {cat.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// --- STYLESHEET (Định dạng) ---
const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    marginTop: 10 
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#ccc', // Nền màu xám cho nút chưa chọn
    borderRadius: 6,
    margin: 5,
    minWidth: 80, // Chiều rộng tối thiểu cho nút
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#007bff', // Nền màu xanh dương nổi bật cho nút đang chọn
  },
  text: {
    color: '#000', // Màu chữ mặc định
    fontWeight: 'normal',
  },
  selectedText: {
    color: '#fff', // Màu chữ trắng khi nút được chọn
    fontWeight: 'bold',
  }
});

export default CategorySelector;

/*
--- Ghi chú về luồng hoạt động ---
1️⃣ ProductDetailScreen (hoặc màn hình cha) lấy dữ liệu categories và truyền 
    props categories, selectedId, onSelect xuống CategorySelector.
2️⃣ CategorySelector hiển thị danh sách loại sản phẩm, đánh dấu loại sản phẩm 
    đang chọn (dùng selectedId) và gọi onSelect khi nhấn nút.
3️⃣ ProductDetailScreen xử lý sự kiện onSelect, có thể cập nhật trạng thái 
    (selectedId) hoặc điều hướng sang màn ProductsByCategory.
*/