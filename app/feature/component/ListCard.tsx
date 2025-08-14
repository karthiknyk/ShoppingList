import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ListCard = ({ data }: any) => {
    const { title ,priority,id} = data
    return (
        <View style={styles.listView}>
            <Text>{title}</Text>
            <Text>{priority}</Text>

        </View>
    )
};

const styles = StyleSheet.create({
    listView: {
        padding: 16,
        margin:4,
        elevation:1,
        borderRadius: 15,
        backgroundColor:'#dadada'
    }
})

export default ListCard;
