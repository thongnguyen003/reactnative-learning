import { StyleSheet, Text, View, TextInput,Button,Alert } from 'react-native'
import React, {useState} from 'react'

const Input = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const submit = () =>{
    Alert.alert(`Hello ${name}, you are ${age} years old`)
  }
  return (
    <View>
      <Text>Input Your name</Text>
      <TextInput placeholder='Enter your name' value={name} onChangeText={text => setName(text)}></TextInput>
      <Text>Input Your age</Text>
      <TextInput placeholder='Enter your age' value={age} onChangeText={text => setAge(text)}></TextInput>
      <Button title='Submit' onPress={submit}/>
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        borderBlockColor: "black",
        borderWidth: 2,
        padding: 20,
        margin: 20
        },
})