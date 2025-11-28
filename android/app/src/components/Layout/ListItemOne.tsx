import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { Item } from './Item'
import {items}  from './listDtate'
const {height} = Dimensions.get('window')
const ListItemOne = () => {

  return (
    <ScrollView style={{ flex: 1 }}
    contentContainerStyle={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 5,
      padding: 5,
    }}
>
      {
        items.map((__, index) => (
            <Item key={index} itemIndex={index} items={items} classProp={styles.item}/>
        ))
      }
    </ScrollView>
  )
}

export default ListItemOne

const styles = StyleSheet.create({
    item: {
        width: '32%', 
        height: height * 0.31,
        justifyContent:'center', 
        alignItems:'center',
        borderWidth:1,
        borderColor:'gray',
        padding:5,
    }
})