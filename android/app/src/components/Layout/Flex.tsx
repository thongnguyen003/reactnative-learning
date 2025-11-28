import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Flex = () => {
  return (
    <View style={{backgroundColor:'yellow',flex:1}}>
      <View style={{backgroundColor:'red',flex:1, justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'white', fontSize:21, fontWeight:'bold'}} >Section 1</Text>
      </View>
      <View style={{backgroundColor:'blue',flex:1, justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'white', fontSize:21, fontWeight:'bold'}}>Section 2</Text>
      </View>
    </View>
  )
}

export default Flex

const styles = StyleSheet.create({})