import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native'
import React, {useRef, useState} from 'react'

const Linear = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [result, setResult] = useState<string>('Kết quả');

  const inputA = useRef<TextInput>(null);
  const checkNumber = (text: string) => {
    if(isNaN(Number(text))){
        Alert.alert('Vui lòng nhập số');
        setResult('Kết quả');
        return false;
        }
     return true
    }
  const onPress = () =>{
    if(a == '' || b == ''){
        Alert.alert('Vui lòng nhập đầy đủ giá trị a và b');
        setResult('Kết quả');
        return;
    }
    const numA = Number(a);
    const numB = Number(b);
    if(numA === 0){
        if(numB === 0){
            setResult('Phương trình có vô số nghiệm');
        } else {
            setResult('Phương trình vô nghiệm');
        }
    } else{
        const x = (-numB/numA).toFixed(2);
        setResult(`Phương trình có nghiệm x = ${x}`);
    }
    inputA.current?.focus();
  }
  return (
    <>
        <View style={{marginVertical:30, paddingHorizontal:5,backgroundColor:'#dbdbdbff', borderRadius:10, paddingVertical:20, marginHorizontal:10}}>
            <Text style={{fontWeight:'bold',fontSize:25}}>Tính phương trình bậc nhất</Text>
            <View style={{flexDirection:'row', alignItems:'center',justifyContent: 'space-between', marginVertical:20}}>
                <TextInput 
                    ref={inputA}
                    placeholder='Nhập a' 
                    value={a}
                    onChangeText={text => checkNumber(text) ? setA(text) : null}
                    style={{borderWidth:1, padding:10, flex:1, marginHorizontal: 10, borderRadius: 10, backgroundColor:'white'}}
                    
                >
                </TextInput>
                <TextInput 
                    placeholder='Nhập b' 
                    value={b}
                    onChangeText={text => checkNumber(text) ? setB(text) : null}
                    style={{borderWidth:1, padding:10, flex:1, marginHorizontal: 10, borderRadius: 10, backgroundColor:'white'}}
                >
                </TextInput>
            </View>
            <View style={{ paddingHorizontal:10}}>
                <Button title='Tính' onPress={()=>onPress()}></Button>
            </View>
        </View>
        <View style={{marginTop:30, paddingVertical:20, alignItems:'center', backgroundColor:'#a6f764ff', padding:10, borderRadius:10}}>
            <Text>{result}</Text>
        </View>
    </>
    
  )
}

export default Linear

const styles = StyleSheet.create({})