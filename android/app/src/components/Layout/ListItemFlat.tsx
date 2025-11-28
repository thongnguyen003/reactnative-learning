import { StyleSheet, Text, View ,FlatList , Dimensions} from 'react-native'
import React from 'react'
import { Item } from './Item';
import {items}  from './listDtate'
const {height} = Dimensions.get('window')
const ListItemFlat = () => {
  return (
    <FlatList 
        data={items}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        renderItem={({item})=>(
            <Item itemIndex={item.id} items={items} classProp={styles.item} ></Item>
        )}
        style={{padding:5}}
        contentContainerStyle={{
            gap:5,
            justifyContent:'center',
        }}
        columnWrapperStyle={{
            gap:5,
            alignContent:'center',
        }}

    />
  )
}

export default ListItemFlat

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