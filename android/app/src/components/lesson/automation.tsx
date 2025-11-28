import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const automation = () => {
  return (
    <View>
        <View>
        <Text style={{color:"yellow", fontWeight: "bold", fontSize:60}} >Hello world!</Text>
        </View>
      <Text>automation</Text>
    </View>
  )
}

export default automation

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        },
})