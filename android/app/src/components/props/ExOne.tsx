import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, {useState} from 'react'
import Input from '../Input'

const ExOne = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(0);
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Nhập Tên và tuôi vào các ô</Text>
        <TextInput 
            placeholder='Nhập tên'
            value={name}
            onChangeText={text => setName(text)}
            style={styles.input}
        >
        </TextInput>
        <TextInput 
            placeholder='Nhập tuổi'
            value={age.toString()}
            keyboardType='numeric'
            onChangeText={text => setAge(Number(text))}
            style={styles.input}
            maxLength={3}
        >
        </TextInput>
        <Child 
            name={name} 
            age={age} 
            setName={setName} 
            setAge={setAge} 
        >
        </Child>
    </View>
  )
}
const Child = ( {name,age,setName,setAge} : ChildProps) =>{
    return (
        <View style={styles.childContainer}>
            <Text  
                style={styles.textResult}
            > 
                Bạn tên là {name}, {age.toString()} tuổi
            </Text>
            <Text  style={styles.subText}>Nếu muốn đổi lại tên, bạn có thể thay đổi phía dưới</Text>
            <TextInput 
                placeholder='Nhập tên'
                value={name}
                onChangeText={text => setName(text)}
                style={styles.input}
            >
            </TextInput>
            <TextInput 
                placeholder='Nhập tuổi'
                value={age.toString()}
                keyboardType='numeric'
                onChangeText={text => setAge(Number(text))}
                maxLength={3}
                style={styles.input}
            >
            </TextInput>
        </View>
    )
}
export default ExOne
type ChildProps = {
  name: string;
  age: number;
  setName: (name: string) => void;
  setAge: (age: number) => void;
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
        paddingHorizontal: 20,
    },
    childContainer: {
        width: '100%',
        alignItems: 'center',
        marginTop: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        width: '90%',
        backgroundColor: '#fff',
        borderWidth: 1.5,
        borderColor: '#dcdcdc',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginVertical: 8,
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    textResult: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#e74c3c',
        textAlign: 'center',
        marginVertical: 10,
    },
    subText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#34495e',
        marginBottom: 10,
        textAlign: 'center',
    },
})