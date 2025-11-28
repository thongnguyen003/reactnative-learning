import { StyleSheet, Text, View , ScrollView, TouchableOpacity, TextInput, FlatList, Alert } from 'react-native'
import React, {useState,useEffect,useLayoutEffect} from 'react'
import { getAllData, insertData, deleteData, updateData } from '../../Database/dbHelpers';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../type/Param';
import HeaderAdmin from '../HeaderAdmin';

type NavigationProp = NativeStackNavigationProp<HomeStackParamList, 'CategoryManagement'>;

const CategoryManagement = () => {
    const [categories, setCategories] = React.useState<Array<{id: number; name: string}>>([]);
    const [idSelected, setIdSelected] = React.useState<number | null>(null);
    const [name, setName] = React.useState<string>('');

    const navigation = useNavigation<NavigationProp>();

    useLayoutEffect(() => {
        navigation.setOptions({
        headerRight: () => <HeaderAdmin />,
        });
    }, [navigation]);

    useEffect(() => {
        const fetchCategories = async () => {
            const data = await getAllData('categories');
            setCategories(data);
        }
        fetchCategories();
    }, []);

    const addCategory = async () => {
        if(!name){
            Alert.alert('Vui lòng nhập tên danh mục');
            return;
        }
        const newCategory = [
            {field: 'name', newValue: name},
        ];
        await insertData('categories', newCategory);
        const data = await getAllData('categories');
        setCategories(data);
        setName('');
    };

    const updateCategory = async (id: number) => {
        if(!name){
            Alert.alert('Vui lòng nhập tên danh mục');
            return;
        }
        const updatedCategory = [
            {field: 'name', newValue: name},
        ];      
        await updateData(id,'categories', updatedCategory);
        const data = await getAllData('categories');
        setCategories(data);
        clear();
    };
    const deleteCategory = (id: number) => {
        Alert.alert(
            'xác nhấn xóa'
            ,'bạn có chắc chắn muốn xóa danh mục này?'
            ,[
                {text: 'Hủy', style: 'cancel'},
                {text: 'OK', onPress: async () => {
                    await deleteData(id, 'categories');
                    const data = await getAllData('categories');
                    setCategories(data);
                    if(idSelected === id){
                        clear();
                    }
                }}
            ]
        );
    };

    const clear = () => {
        setName('');
        setIdSelected(null);
    };
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title_header}>CategoryManagement</Text>
      <TextInput
        style={styles.input}
        placeholder='Nhập tên category'
         value={name} 
         onChangeText={text=>setName(text)} />
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {
                idSelected ?(
                    <>
                        <TouchableOpacity style={styles.button} onPress={()=>{updateCategory(idSelected)}} >
                            <Text style={{color:'#ffffff', fontSize:18, fontWeight:'bold' }}>✏️ Cập Nhật</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={()=>{clear()}} >
                            <Text style={{color:'#ffffff', fontSize:18, fontWeight:'bold' }}>❌ Hủy</Text>
                        </TouchableOpacity>
                    </>
                ):(
                    <TouchableOpacity style={styles.button} onPress={()=>addCategory()}>
                        <Text style={{color:'white', fontSize: 15, fontWeight: 'bold'}}>➕ Thêm</Text>
                    </TouchableOpacity>
                )
            }
        </View>
        <FlatList
            data={categories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item})=>(
                <View style={styles.item_container}>
                    <View style={styles.item_content}>
                        <Text style={styles.text}>ID: {item.id}</Text>
                        <Text style={styles.text}>Tên danh mục: {item.name}</Text>
                    </View>
                    <View style={styles.item_buttonContainer}>
                        <TouchableOpacity onPress={()=>{
                            setIdSelected(item.id);
                            setName(item.name);
                        }}>
                           <Text>🖊</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>deleteCategory(item.id)}>
                            <Text>🗑</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        />
    </ScrollView>
  )
}

export default CategoryManagement

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