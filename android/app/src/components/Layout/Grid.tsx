import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Grid = () => {
  const colors=['#fdce87ff','#fdff70ff','#c5fd6aff','#8eff77ff','#4ee7fcff','#569fffff','#8714f3ff','#ff1bbbff','#ff1125ff'];
  const quantity= Math.floor(Math.sqrt(colors.length));
  const exQuantity= (quantity*quantity < colors.length) ? quantity + 1 : quantity;
  console.log(quantity, exQuantity);
  return (
    <View style={{flex:1, gap:5, padding:5}}>
        {Array.from({length:exQuantity}).map((_, rowIndex) => (
            <View key={rowIndex} style={{flex:1, flexDirection:'row', gap: 5}}>
                {Array.from({length:quantity}).map((_, colIndex) => {
                    const colorIndex = rowIndex * quantity + colIndex;
                    if (colorIndex < colors.length) {
                        return (
                            <View key={colIndex} style={[styles.box, {backgroundColor: colors[colorIndex]}]}>
                                <Text style={styles.text}>{colorIndex + 1}</Text>
                            </View>
                        );
                    } else {
                        return <View key={colIndex} style={[styles.box, {backgroundColor: 'transparent'}]} />;
                    }
                })}
            </View>
        ))}
    </View>
    // <View style={{flex:1, gap:5, padding:5}}>
    //     <View style={{flex:1, flexDirection:'row', gap: 5}}>
    //         <View style={[styles.box, styles.box1]}> 
    //             <Text style={styles.text} >1</Text>
    //         </View>
    //         <View  style={[styles.box, styles.box2]}> 
    //             <Text style={styles.text}>2</Text>
    //         </View>
    //         <View   style={[styles.box, styles.box3]}> 
    //             <Text style={styles.text}>3</Text>
    //         </View>
    //     </View>
    //     <View style={{flex:1, flexDirection:'row', gap: 5}}>
    //         <View style={[styles.box, styles.box4]}> 
    //             <Text style={styles.text}>4</Text>
    //         </View>
    //         <View  style={[styles.box, styles.box5]}> 
    //             <Text style={styles.text}>5</Text>
    //         </View>
    //         <View   style={[styles.box, styles.box6]}> 
    //             <Text style={styles.text}>6</Text>
    //         </View>
    //     </View>
    //     <View style={{flex:1, flexDirection:'row', gap: 5}}>
    //         <View style={[styles.box, styles.box7]}> 
    //             <Text style={styles.text}>7</Text>
    //         </View>
    //         <View  style={[styles.box, styles.box8]}> 
    //             <Text style={styles.text}>8</Text>
    //         </View>
    //         <View   style={[styles.box, styles.box9]}> 
    //             <Text style={styles.text}>9</Text>
    //         </View>
    //     </View>
    // </View>
  )
}

export default Grid

const styles = StyleSheet.create({
    box:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        borderWidth:1,
        borderColor:'black',
    },
    text:{
        fontWeight:'bold',
        fontSize:21,
        color:'white',
    },
    box1:{
        backgroundColor:'#fdce87ff'
    },
    box2:{
        backgroundColor:'#fdff70ff'
    },
    box3:{
        backgroundColor:'#c5fd6aff'
    },
    box4:{
        backgroundColor:'#8eff77ff'
    },
    box5:{
        backgroundColor:'#4ee7fcff'
    },
    box6:{
        backgroundColor:'#569fffff'
    },
    box7:{
        backgroundColor:'#8714f3ff'
    },
    box8:{
        backgroundColor:'#ff1bbbff'
    },
    box9:{
        backgroundColor:'#ff1125ff'
    },
})