import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native'
import React, {useState} from 'react'

const LinearEquation = () => {
  const [alpha, setAlpha] = useState<Number | null>(null);
  const [beta, setBeta] = useState<Number | null>(null);
  const [result, setResult] = useState('N/A');
  const onPress = ()=>{
    if (alpha === null || beta === null) {
      setResult('N/A');
      Alert.alert('Vui lòng nhập đầy đủ giá trị a và b');
      return;
    }
    if (alpha === 0) {
      if (beta === 0) {
        setResult('Phương trình có vô số nghiệm');
      } else {
        setResult('Phương trình vô nghiệm');
      }
      return;
    }
    const x = -Number(beta) / Number(alpha);
    setResult(`Phương trình có nghiệm x = ${x}`);
  }

  return (
        <View style={styles.container}>
            <Text style={{fontSize:25,fontWeight:"bold",margin:10}}>Nguyễn Lương Thông</Text>
            <Text style={{fontSize:25,fontWeight:"bold", color:"blue",marginBottom:20}}>Phương trình bậc 1: ax+b=0</Text>
            <TextInput 
                placeholder='Nhập a' 
                keyboardType='numeric' 
                value={alpha != null ? alpha.toString() : ''} 
                onChangeText={ text => setAlpha(text == '' ? null : Number(text))}
                style={styles.input}
            >
            </TextInput>
            <TextInput 
                placeholder='Nhập b' 
                keyboardType='numeric' value={beta != null ? beta.toString() : ''} 
                onChangeText={ text => setBeta(text == '' ? null : Number(text))}
                style={styles.input}
            >
            </TextInput>
            <Button title='Tính' onPress={onPress} />
            <Text style={{fontSize:25,fontWeight:"bold", color:"red",margin:20}}>{result}</Text>
        </View>
  )
}

export default LinearEquation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',   
        alignItems: 'center',
        borderBlockColor: "black",
        borderWidth: 2,
        padding: 20,
        margin: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#aaa',
        padding: 10,
        width: '100%',
        borderRadius: 5,
        marginBottom: 10,
    },
})