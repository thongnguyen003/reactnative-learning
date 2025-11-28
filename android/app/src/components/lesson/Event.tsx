import { StyleSheet, Text, View, Alert, Button } from 'react-native'
import React from 'react'
type People = {
    name: string,
    age: number
}
const Event = (person: People) => {
  const greeting = () =>{
    Alert.alert(`Hello ${person.name}, you are ${person.age} years old`)
  }
  return (
    <View style={styles.conetainer}>
      <Text style={{fontSize:40,fontWeight:'bold'}}>Hello! </Text>
      <Button  title='Greeting' onPress={greeting}/>
    </View>
  )
}

const styles = StyleSheet.create({
    conetainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
export default Event