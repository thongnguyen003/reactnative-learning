import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import type { ItemProps } from './type';

export const Item = ( {itemIndex, items, classProp} : ItemProps) => {
    return (
        <View style={classProp}>
            <Image source={items[itemIndex].image} style={{ width:100,height:100}} />
            <Text>{items[itemIndex].name}</Text>
            <Text>{items[itemIndex].price}</Text>
            <TouchableOpacity style={{backgroundColor:'blue', paddingVertical:5, paddingHorizontal:10, borderRadius:5, marginTop:5}}>
                <Text style={{color:'white'}}>Mua</Text>
            </TouchableOpacity>
        </View>
    )
}