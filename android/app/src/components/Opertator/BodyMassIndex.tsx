import { StyleSheet, Text, View, Alert, Button, TextInput, Keyboard, Image } from 'react-native'
import React, { useState } from 'react'
import { RadioButton } from 'react-native-paper'

const BodyMassIndex = () => {
  const [height,setHeight]= useState('');
  const [weight,setWeight]= useState('');
  const [result, setResult] = useState('');
  const [colorResult, setColorResult] = useState('black');
  const [imagePath, setImagePath] = useState(null);

  const calculateBMI = (weight: number, height: number): number => {
    return weight / (height * height);
  }
  const getBMICategory = (bmi: number): string => {  
    if (bmi < 18.5) return 'Underweight';
    else if (bmi < 25) return 'Normal weight';
    else if (bmi < 30) return 'Overweight';
    else return 'Obesity';
  }

  const onPressClear = () =>{
    setHeight('');
    setWeight('');
    setResult('');
    setImagePath(null);
    Keyboard.dismiss();
  }
  const onPress = () => { 
    setResult('');
    setImagePath(null);
    if ( height === '' || weight === '') {
      Alert.alert('Please enter all fields');
      return;
    } 
    if (isNaN(Number(height)) || isNaN(Number(weight))) {
      Alert.alert('Please enter valid numbers');
      return;
    } 
    const numHeight = Number(height);
    const numWeight = Number(weight);
    if (numHeight <= 0 || numWeight <= 0) {
      Alert.alert('Please enter positive numbers');
      return;
    }
    const bmi = calculateBMI(numWeight, numHeight);
    const category = getBMICategory(bmi);
    switch (category) {
      case 'Underweight':
        setImagePath(require('../../source/shape1.png'));
        setColorResult('blue'); 
        break;  
      case 'Normal weight':
        setImagePath(require('../../source/shape2.png'));
        setColorResult('green');
        break;
      case 'Overweight':
        setImagePath(require('../../source/shape3.png'));
        setColorResult('orange');
        break;
      case 'Obesity':
        setImagePath(require('../../source/shape4.png'));
        setColorResult('red');
        break;
    }
    setResult(`Your BMI is ${bmi.toFixed(2)} (${category})`);
    Keyboard.dismiss();
    Alert.alert(`Your BMI is ${bmi.toFixed(2)} (${category})`);
  }   


  return (
    <View style={{padding:10,}}>
      <Text style={{fontSize:26, textAlign:'center', color:'blue'}}>BodyMassIndex</Text>
      <View style={{marginVertical:15, padding:10,  backgroundColor:'#e9e9e9ff', borderRadius: 10}}>
        <Text style={{fontSize:20}}>Enter your height(m) and weight(kg)</Text>
        <View>
            <TextInput 
                placeholder='Enter height' 
                keyboardType='numeric'
                value={height} 
                onChangeText={text=> setHeight(text)}
                style={{marginVertical:5,borderWidth:1, borderRadius:10, backgroundColor:'white'}}
            >
            </TextInput>
            <TextInput 
                placeholder='Enter weight' 
                keyboardType='numeric'
                value={weight} 
                onChangeText={text=> setWeight(text)}
                style={{marginVertical:5,borderWidth:1, borderRadius:10,  backgroundColor:'white'}}
            >
            </TextInput>
        </View>
      </View>
      <View style={{marginVertical: 5, paddingVertical:10, borderRadius:10, flexDirection:'row', justifyContent:'space-around', backgroundColor:'#dadadaff'}}>
          <Button title="Caculate" onPress={()=> onPress()}></Button>
          <Button title="Reset" onPress={()=>onPressClear()}></Button>
      </View>
      <View>
        <Text style={{fontSize:20, color:colorResult }}>{result}</Text>
      </View>
      <View style={{marginTop:10, justifyContent:'center', alignItems:'center'}}>
        {
          imagePath && (
            <Image source={imagePath} style={{width:100, height:100}} />
          )
        }
      </View>
    </View>
  
  )
}

export default BodyMassIndex

const styles = StyleSheet.create({})