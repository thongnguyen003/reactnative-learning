import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Structure = () => {
  return (
    <View style={{flex:1,flexDirection:'row'}}>
      <View style={{flex: 1,justifyContent:'center', alignItems:'center', backgroundColor:'#b9efffff'}}> 
        <Text style={styles.text}>Header</Text>
      </View>
      <View style={{flex: 2,justifyContent:'center', alignItems:'center', backgroundColor:'#ecff95ff'}}> 
        <Text style={styles.text}>Body</Text>
      </View>
      <View style={{flex: 1,justifyContent:'center', alignItems:'center', backgroundColor:'#ffb9ffff'}}> 
        <Text style={styles.text}>Footer</Text>
      </View>
    </View>
  )
}

export default Structure

const styles = StyleSheet.create({
    text:{
        fontWeight:'bold',
        fontSize:21,
    }
})