import { StyleSheet, Text, View, Image, TouchableOpacity, ImageSourcePropType, ScrollView } from 'react-native'
import React from 'react'
import { Item } from './Item';
import {items}  from './listDtate'

const ListItem = () => { 
  

  const quantity= Math.floor(Math.sqrt(items.length));
  const exQuantity= (quantity*quantity < items.length) ? quantity + 1 : quantity;
    console.log(quantity, exQuantity);
  return (
    <View style={{flex:1, gap:5, padding:5}}>
      {Array.from({length: exQuantity}).map((_, rowIndex) => (
        <View key={rowIndex} style={{flex:1, flexDirection:'row', gap: 5}}>
            {
                Array.from({length:exQuantity}).map((_, columnIndex) => {
                    const itemIndex = rowIndex * exQuantity + columnIndex;
                    if (itemIndex < items.length){
                        return(
                            <Item key={columnIndex} itemIndex={itemIndex} items={items} classProp={styles.item}/>
                        )
                    }else{
                        return(
                            <View key={columnIndex} style={{flex:1, justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:'gray'}}>
                            </View>
                        )
                    }
                })
            }
        </View>
      ))}
    </View>
  )
}



export default ListItem

const styles = StyleSheet.create({
    item: {
        flex:1, 
        justifyContent:'center', 
        alignItems:'center', 
        borderWidth:1, 
        borderColor:'gray'
    }
})