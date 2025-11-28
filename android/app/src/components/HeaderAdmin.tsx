import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ADMIN_MENU_ITEMS = [
  { id: '2', title: 'QL Danh mục', screen: 'CategoryManagement' }, // Ví dụ
  { id: '3', title: 'QL Sản phẩm', screen: 'ProductManagement' }, // Ví dụ
  { id: '4', title: 'Đăng xuất', screen: 'Logout', isDestructive: true },
];

const HeaderAdmin = () => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation<any>(); // Dùng any cho gọn, hoặc type chuẩn nếu muốn

  const handleMenuItemPress = async (item: any) => {
    setVisible(false);
    if (item.screen === 'Logout') {
      Alert.alert('Đăng xuất', 'Bạn muốn đăng xuất?', [
        { text: 'Hủy', style: 'cancel' },
        { 
          text: 'OK', 
          onPress: async () => {
            await AsyncStorage.removeItem('loggedInUser');
            navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
          }
        }
      ]);
    } else {
      navigation.navigate(item.screen);
    }
  };

  return (
    <View>
      {/* Nút 3 gạch để mở menu */}
      <TouchableOpacity onPress={() => setVisible(true)} style={{ padding: 10 }}>
        <Text style={{ fontSize: 24 }}>☰</Text>
      </TouchableOpacity>

      {/* Phần Modal Menu */}
      <Modal
        transparent={true}
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setVisible(false)}
        >
          <View style={styles.menuContainer}>
            {ADMIN_MENU_ITEMS.map((item, index) => (
              <TouchableOpacity 
                key={item.id} 
                style={[
                  styles.menuItem, 
                  index < ADMIN_MENU_ITEMS.length - 1 && styles.menuItemBorder
                ]}
                onPress={() => handleMenuItemPress(item)}
              >
                <Text style={[
                  styles.menuText, 
                  item.isDestructive && { color: 'red', fontWeight: 'bold' }
                ]}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContainer: {
    marginTop: 50, // Chỉnh cái này nếu menu bị lệch so với header
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    width: 180,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuItem: { paddingVertical: 12, paddingHorizontal: 15 },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: '#eee' },
  menuText: { fontSize: 16, color: '#333' },
});

export default HeaderAdmin;