import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, FlatList, Image, Alert} from 'react-native'
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import { launchImageLibrary ,ImageLibraryOptions} from 'react-native-image-picker';
import {getDb, initDatabase} from '../../Database/database';
import { updateData, deleteData, insertData, getAllData, searchProductsByNameOrCategory } from '../../Database/dbHelpers';
import { Product,Category } from '../type/Object';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../type/Param';
import HeaderAdmin from '../HeaderAdmin';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'ProductManagement'>;


const ItemManagement = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(categories.length >0 ? categories[0].id : null);
  const [image,setImage] = useState<string>('');
  const [idSelected, setIdSelected] = useState<number | null>(null);
  const [querySearch, setQuerySearch] = useState<string>('');

  const navigation = useNavigation<NavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderAdmin />,
    });
  }, [navigation]);

  const openGallery = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('Người dùng hủy');
      } else if (response.errorCode) {
        console.log('Lỗi: ', response.errorMessage);
      } else {
        const uri = response.assets?.[0]?.uri ?? '../../source/image1.png';
        setImage(uri);
        console.log(uri);
      }
    });
  };
  const clear=()=>{
    setName('');
    setPrice(null);
    setImage('');
    setSelectedCategory(categories.length >0 ? categories[0].id : null);
    setIdSelected(null);
}
  const addProduct = async()=>{
    if(!name || !price || !selectedCategory ){
        Alert.alert('Vui lòng điền đầy đủ thông tin');
        return;
    }
    const newProduct = [
        {field: 'id', newValue: products.length > 0 ? products[products.length -1].id +1 : 1},
        {field: 'name', newValue: name},
        {field: 'price', newValue: price},
        {field: 'categoryId', newValue: selectedCategory},
        {field: 'image', newValue: image},
    ];
    await insertData('products', newProduct);
    const updatedProducts = await getAllData('products');
    setProducts(updatedProducts);
    clear();
  }

  const clickEditContact = (id: number) => {
    setIdSelected(id);
    const itemToEdit = products.find(product => product.id === id);
    if (itemToEdit) {
      setName(itemToEdit.name.toString());
      setPrice(itemToEdit.price);
      setSelectedCategory(itemToEdit.categoryId)
      setImage(itemToEdit.image)
    }
  }

  const updateproduct = async(id: number) => {
    for(const product of products){
        if (product.id === id){
            const newProduct = [
            {field: 'name', newValue: name},
            {field: 'price', newValue: price},
            {field: 'categoryId', newValue: selectedCategory},
            {field: 'image', newValue: image},
        ];
        await updateData(id,'products', newProduct);
        const updatedProducts = await getAllData('products');
        setProducts(updatedProducts);
        clear();
        }
    }
  }

  const deleteProduct = (id: number) => {
      Alert.alert(
          'Xác nhận xóa',
          'Bạn có chắc chắn muốn xóa liên lạc này?',
          [
              { text: 'Hủy', style: 'cancel' },
              { 
                text: 'Xóa', 
                onPress: async () => {
                    await deleteData(id, 'products');
                    const updatedProducts = await getAllData('products');
                    setProducts(updatedProducts);
                    Alert.alert("Xóa thành công!")
                }, 
              },
          ]
      );
    }

  const getNameCategoryById = (id: number): string => {
    const category = categories.find(cat => cat.id === id);
    return category ? category.name.toString() : 'Unknown';
  }

  useEffect(()=>{
    const searchByNameOrCategory = async (keyword: string) => {
        const results = await searchProductsByNameOrCategory(keyword);
        console.log(results)
        setProducts(results);
    }
    searchByNameOrCategory(querySearch);
    },[querySearch])

  useEffect(()=>{
    const setData = async ()=>{
        const categoriesData = await getAllData('categories');
        const productsData = await getAllData('products');
        setCategories(categoriesData)
        setProducts(productsData)
    }
    setData()
  },[])
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title_header}>📋Item Management</Text>
      <View>
        <TextInput
            style={styles.input}
            placeholder='Nhập tên sản phẩm' 
            value={name}
            onChangeText={text=>setName(text)}
        />
        <TextInput
            style={styles.input}
            placeholder='Nhập giá sản phẩm' 
            value={price?.toString()}
            onChangeText={text=>setPrice(Number(text))}
        />
        <View style={styles.picker_container}>
            <Picker
                selectedValue= {selectedCategory}
                onValueChange={value=> setSelectedCategory(Number(value))}
            >
                {
                    categories.length > 0 
                    && categories.map((category) => (
                        <Picker.Item 
                            key={category.id}   
                            label={category.name.toString()}
                            value={category.id}
                        />
                    ))
                }
            </Picker>
        </View>
        <View style={{flexDirection:'row'}}>
            <TouchableOpacity style={styles.button_upload_image} onPress={openGallery}>
                <Text style={{color:'white', fontSize: 12, fontWeight: 'bold'}}>🗃 Chọn ảnh trong thư viện</Text>
            </TouchableOpacity>
            <Image source={{uri: image}} style={{width:50, height: 40, marginLeft: 'auto'}}/>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {
                idSelected ?(
                    <>
                        <TouchableOpacity style={styles.button} onPress={()=>{updateproduct(idSelected)}} >
                            <Text style={{color:'#ffffff', fontSize:18, fontWeight:'bold' }}>✏️ Cập Nhật</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={()=>{clear(); setIdSelected(null);}} >
                            <Text style={{color:'#ffffff', fontSize:18, fontWeight:'bold' }}>❌ Hủy</Text>
                        </TouchableOpacity>
                    </>
                ):(
                    <TouchableOpacity style={styles.button} onPress={()=>addProduct()}>
                        <Text style={{color:'white', fontSize: 15, fontWeight: 'bold'}}>➕ Thêm</Text>
                    </TouchableOpacity>
                )
            }
        </View>
      </View>
      <TextInput
            style={styles.input}
            placeholder='🔍 Tìm kiếm theo tên sản phẩm hay tên loại' 
            value={querySearch}
            onChangeText={
                text=> setQuerySearch(text)
            }/>
      <FlatList
        data={products}
        keyExtractor = {(item)=> item.id.toString()}
        scrollEnabled={false}
        renderItem={({item})=>(
            <View style={styles.item_container}>
                <TouchableOpacity onPress={()=>navigation.navigate('Details',{product:item})}>
                <Image 
                    style={styles.item_image}
                    source={{uri : item.image}}/>
                </TouchableOpacity>
                <View style={styles.item_content}>
                    <Text style={styles.text}>Tên {item.name}</Text>
                    <Text style={styles.text}>Loại {
                        getNameCategoryById(item.categoryId)
                    } </Text>
                    <Text style={styles.text}>Gía {item. price}</Text>
                </View>
                <View style={styles.item_buttonContainer}>
                    <TouchableOpacity onPress={()=>{clickEditContact(item.id)}}>
                        <Text>🖊</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>deleteProduct(item.id)}>
                        <Text>🗑</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )}
      />
    </ScrollView>
  )
}

export default ItemManagement

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: '#e5ffffff',
    },
    title_header:{
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#00c1fcff",
        marginBottom: 10,
    },
    input: {
        borderWidth: 2,
        borderColor: '#0092beff',
        borderRadius: 12,
        marginBottom: 10,
        fontSize: 12,
        paddingHorizontal: 15,
        paddingVertical: 10,
        color: 'black',
    },
    picker_container:{
        borderWidth: 2,
        borderColor: '#0092beff',
        borderRadius: 12,
        marginBottom: 10,
    },
    picker: {
        fontSize: 12,
        color: 'black',
    },
    button_upload_image:{
        borderWidth: 2,
        borderColor:'#0092beff',
        paddingHorizontal: 5,
        paddingVertical: 2,
        backgroundColor:'#00c1fcff',
        marginBottom: 10,
    },
    button: {
        borderWidth: 2,
        borderColor:'#0092beff',
        paddingHorizontal: 20,
        paddingVertical: 5,
        backgroundColor:'#00c1fcff',
        marginBottom: 10,
        marginTop: 5,
        borderRadius: 12,
    },
    text: {
        color: 'black',
        fontSize:12,
    },
    item_container: {
        flexDirection: 'row', 
        gap: 10, 
        marginBottom: 10, 
        borderWidth:1, 
        borderColor: '#0092beff', 
        borderRadius: 12, 
        padding: 10
    },
    item_image: {
        width: 70, 
        height:60,
    },
    item_content: {
        gap:3
    },
    item_buttonContainer: {
        marginLeft: 'auto', 
        gap: 5
    }
})