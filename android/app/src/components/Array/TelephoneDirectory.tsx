import { StyleSheet, Text, View, TextInput, TouchableOpacity , FlatList, Alert} from 'react-native'
import React, {useState} from 'react'

type Contact = {
  id: number;
  name: string;
  phoneNumber: string;
}
const contacts: Contact[] = [
  {id: 1, name: 'Nguyễn Lương Thông', phoneNumber: '0123456789'},
  {id: 2, name: 'Tran Thi B', phoneNumber: '0987654321'},
];
const TelephoneDirectory = () => {
  const [contactlist, setContactlist] = useState<Contact[]>(contacts);
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [idSelected, setIdSelected] = useState<number | null>(null);

  const clearInputs = () => {
    setName('');
    setPhoneNumber('');
  }
  const addContact = () => {
    if (name && phoneNumber) {
      const newContact: Contact = {
        id: contactlist[contactlist.length - 1]?.id + 1 || 1,
        name: name,
        phoneNumber: phoneNumber,
      };
        setContactlist([...contactlist, newContact]);
        clearInputs();
    }else{
        Alert.alert('Vui lòng nhập đầy đủ thông tin liên lạc');
    }
  }

  const clickEditContact = (id: number) => {
    setIdSelected(id);
    const contactToEdit = contactlist.find(contact => contact.id === id);
    if (contactToEdit) {
      setName(contactToEdit.name);
      setPhoneNumber(contactToEdit.phoneNumber);
    }
  }

    
  const updateContact = (id: number) => {
    const updatedContacts = contactlist.map(contact => {
      if (contact.id === id) {
        return {
          ...contact,
          name: name || contact.name,
          phoneNumber: phoneNumber || contact.phoneNumber,
        };
      }
        return contact;
    });
    setContactlist(updatedContacts);
    clearInputs();
    setIdSelected(null);
  }

  const deleteContact = (id: number) => {
    Alert.alert(
        'Xác nhận xóa',
        'Bạn có chắc chắn muốn xóa liên lạc này?',
        [
            { text: 'Hủy', style: 'cancel' },
            { text: 'Xóa', onPress: () => {
                const updatedContacts = contactlist.filter(contact => contact.id !== id);
                setContactlist(updatedContacts);
                Alert.alert('Đã xóa liên lạc');
            } }
        ]
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title_header}>📒 Danh Bạ Cute</Text>
      <View>
        <TextInput 
            value={name} 
            onChangeText={text => setName(text)} 
            style={styles.input} placeholder='📌 Nhập tên' />
        <TextInput 
            value={phoneNumber} 
            onChangeText={text => setPhoneNumber(text)} 
            style={styles.input} placeholder='📱 Nhập số điện thoại' />
        {idSelected ? (
            <>
                <TouchableOpacity style={styles.button} onPress={()=>{updateContact(idSelected)}} >
                    <Text style={{color:'#ffffff', fontSize:18, fontWeight:'bold' }}>✏️ Cập Nhật</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>{clearInputs(); setIdSelected(null);}} >
                    <Text style={{color:'#ffffff', fontSize:18, fontWeight:'bold' }}>❌ Hủy</Text>
                </TouchableOpacity>
            </>
        ) : (
            <TouchableOpacity style={styles.button} onPress={()=>{addContact()}} >
                <Text style={{color:'#ffffff', fontSize:18, fontWeight:'bold' }}>➕ Thêm</Text>
            </TouchableOpacity>
        )}
        <TextInput 
            value={searchQuery} 
            onChangeText={text=>setSearchQuery(text)}  
            style={styles.input} placeholder='🔍 Tìm kiếm theo tên' />
      </View>
      <FlatList
        data={contactlist.filter(contact => contact.name.toLowerCase().includes(searchQuery.toLowerCase()))}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{flexDirection:'row'}}>
                <Text style={styles.item_text}>👤 </Text>
                <View >
                    <Text style={styles.item_text}> {item.id}: {item.name}</Text>
                    <Text style={styles.item_text}>  {item.phoneNumber}</Text>
                </View>
            </View>
            <View style={{flexDirection:'row', gap:10, marginLeft:'auto'}}>
                <TouchableOpacity onPress={()=>{clickEditContact(item.id)}}>
                    <Text >🖊</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{deleteContact(item.id)}}>
                    <Text>🗑</Text>
                </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  )
}

export default TelephoneDirectory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffe4fdff',
    },
    title_header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color:'#ff14efff',
    },
    input: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#ff68f5ff',
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#ffffff',
    },
    button:{
        backgroundColor: '#ff68f5ff',
        borderRadius: 10,
        marginBottom: 10,
        paddingVertical: 10,
        alignItems: 'center',
    },
    item: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: '#ffbcfbff',
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
    },
    item_text: {
        color: '#000000',
        fontSize: 16,
    }
})