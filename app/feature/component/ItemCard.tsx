import { getRandomColor } from "@/app/utils/helper";
import { MaterialIcons } from "@expo/vector-icons";
import React, { memo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const ItemCard = memo(({ data, onPress }: any) => {
    const { name, quantity, notes, id ,bgcolor} = data
    console.log('dsaljldksf')
    return (

        <View style={[styles.card, { backgroundColor: getRandomColor() }]}>
            <View style={{ position: 'absolute', right: 10, top: 10,zIndex:2 }}>
                <Pressable onPress={onPress}>
                    <MaterialIcons name={"edit"} size={20} style={styles.iconStyle} />
                </Pressable>
            </View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.quantity}>Qty: {quantity}</Text>
            {notes ? <Text style={styles.notes}>Notes: {notes}</Text> : null}
        </View>

    )
});

const styles = StyleSheet.create({

    card: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 12
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    quantity: {
        fontSize: 12,
        color: '#333',
        marginTop: 4
    },
    notes: {
        fontSize: 12,
        fontStyle: 'italic',
        marginTop: 4,
        color: '#555'
    },
    iconStyle: {
        borderRadius: 30,
        backgroundColor: 'transparent',
        borderWidth: 1,
        padding: 4,
        // elevation:3
    }
})

export default ItemCard;
