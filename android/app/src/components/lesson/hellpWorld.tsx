import React from "react";
import {StyleSheet, View, Text} from "react-native";
const HelloWorldApp = () => {
  return (
    <View style={styles.container}>
      <Text style={{color:"yellow", fontWeight: "bold", fontSize:60}} >Hello world!</Text>
      <Text style={{color:"white", fontWeight: "300", fontSize:25}} >Nguyễn Lương Thông</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
})

export default HelloWorldApp;
