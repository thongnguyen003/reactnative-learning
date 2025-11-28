import { StyleSheet, Text, TextInput, View, Button, Alert, Keyboard} from 'react-native'
import {RadioButton} from 'react-native-paper'
import React, {useRef} from 'react'

const Calculator = () => {
  const [number1, setNumber1] = React.useState('');
  const [number2, setNumber2] = React.useState('');
  const [result, setResult] = React.useState<string>('');
  const [operrator, setOperator] = React.useState('');
  const [isNotFormat, setIsNotFormat] = React.useState<number>(0); // 0: valid, 1: number1 not format, 2: number2 not format, 3: both not format
  const inputA = useRef<TextInput>(null)

  const onPressClear = () =>{
    setNumber1('');
    setNumber2('');
    setResult('');
    setIsNotFormat(0);
    setOperator('');
  }
  const onPressEqual = () => {
    setResult('');
    setIsNotFormat(0);
    if(number1 === '' || number2 === '' || operrator === ''){
        setResult('Please enter full value and choose an operator');
        Alert.alert('Please enter full value and choose an operator');
        inputA.current?.focus()
        Keyboard.dismiss();
        return;
    }
    if(isNaN(Number(number1)) && isNaN(Number(number2))){
        setIsNotFormat(3);
        Alert.alert('Please enter valid numbers');
        inputA.current?.focus();
        Keyboard.dismiss();
        return;
    }else if(isNaN(Number(number1))){
        setIsNotFormat(1);
        Alert.alert('Please enter valid number 1');
        inputA.current?.focus()
        Keyboard.dismiss();
        return;
    }else if(isNaN(Number(number2))){
        setIsNotFormat(2);
        Alert.alert('Please enter valid number 2');
        inputA.current?.focus();
        Keyboard.dismiss();
        return;
    }

    const num1 = Number(number1);
    const num2 = Number(number2);
    let res: number = 0;
    switch(operrator){
        case 'Plus':
            res = num1 + num2;
            break;
        case 'minos':
            res = num1 - num2;
            break;
        case 'multiply':
            res = num1 * num2;
            break;
        case 'devide':
            if(num2 === 0){
                if(num1 === 0){
                    setResult('Result is undefined');
                    inputA.current?.focus()
                    Keyboard.dismiss();
                    return;
                }
                setResult('Result is infinity');
                inputA.current?.focus()
                Keyboard.dismiss();
                return;
            }
            res = num1 / num2;
            break;
        case 'compare':
            if(num1 > num2){
                setResult(`${num1} is greater than ${num2}`);
            } else if(num1 < num2){
                setResult(`${num1} is less than ${num2}`);
            } else{
                setResult(`${num1} is equal to ${num2}`);
            }
            return;
    }
    setResult(res.toFixed(2).toString());
    inputA.current?.focus();
    Keyboard.dismiss();
  }

  return (
    <View style={{paddingHorizontal:10, paddingVertical:20}}>
      <View style={{backgroundColor:'#ddddddff', borderRadius:10}}>
        <Text style={{fontSize:27, fontWeight:'bold'}}>Calculator</Text>
        <View style={{paddingHorizontal:5, flexDirection:'row', marginVertical:20, justifyContent:'space-between',}}>
            <TextInput 
                autoFocus
                ref={inputA}
                placeholder='Enter number 1'
                value={number1}
                onChangeText={text => setNumber1(text)}
                style={{ marginHorizontal:10, paddingVertical:10, borderWidth: 1, borderColor: (isNotFormat===1 || isNotFormat ===3)? 'red' : 'black', borderRadius:10, flex:1, backgroundColor:'white'}}
            >
            </TextInput>
            <TextInput 
                placeholder='Enter number 2'
                value={number2}
                onChangeText={text => setNumber2(text)}
                style={{ marginHorizontal:10, paddingVertical:10, borderWidth: 1, borderColor: (isNotFormat===2 || isNotFormat ===3)? 'red' : 'black', borderRadius:10, flex:1, backgroundColor:'white'}}
            >
            </TextInput>
        </View>
        <View>
            <RadioButton.Group onValueChange={newValue => setOperator(newValue)} value={operrator}>
                <RadioButton.Item label="Plus" value="Plus" />
                <RadioButton.Item label="Minos" value="minos" />
                <RadioButton.Item label="Multiply" value="multiply" />
                <RadioButton.Item label="Devide" value="devide" />
                <RadioButton.Item label="Compare" value="compare" />
            </RadioButton.Group>
        </View>
      </View>
      <View>
        <View style={{marginVertical: 5, paddingVertical:10, borderRadius:10, flexDirection:'row', justifyContent:'space-around', backgroundColor:'#dadadaff'}}>
            <Button title="Equal" onPress={()=>onPressEqual()}></Button>
            <Button title="Clear" onPress={()=>onPressClear()}></Button>
        </View>
        <View style={{borderWidth:1, borderColor:'black', borderRadius:10, padding:10}}>
            <Text style={{fontSize:20}}>Result: {result}</Text>
        </View>
      </View>
    </View>
  )
}

export default Calculator

const styles = StyleSheet.create({})