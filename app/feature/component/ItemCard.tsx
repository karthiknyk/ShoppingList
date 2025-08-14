import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ItemCard = ({ data }: any) => {
    const { name, quantity, notes,id } = data
    return (
        <View style={styles.listView}>
            <Text>{name}</Text>
            <Text>{quantity}</Text>
            <Text>{notes}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    listView: {
        padding: 16,
        margin: 4,
        elevation: 1,
        borderRadius: 15,
        backgroundColor: '#dadada'
    }
})

export default ItemCard;
