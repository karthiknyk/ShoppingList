import { CommonStyles } from "@/app/constants/CommonStyles";
import { getRandomColor } from "@/app/utils/helper";
import moment from "moment";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ListCard = ({ data }: any) => {
    const { title, priority, id } = data

    return (
        <View style={[styles.listView, { backgroundColor: getRandomColor() }]}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={CommonStyles.dateTitle}>{moment(new Date(Number(id))).format("DD MMM hh:mm a")}</Text>
            </View>
            {priority && <Text style={[styles.priority]}>{priority}</Text>}
        </View>
    )
};

const styles = StyleSheet.create({
    listView: {
        padding: 16,
        margin: 4,
        // elevation: 2,
        borderRadius: 15,
        flexDirection: 'row',
        // alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        flex: 1,
        fontSize: 18,
        textAlign: 'left',
        fontWeight: 'bold'
    },
    priority: {
        fontSize: 12,
        textAlign: 'center',
        padding: 4,
        color: '#FFF',
        borderRadius: 5,
        borderWidth: StyleSheet.hairlineWidth,
        backgroundColor: '#111',
        width: 60,
        height:30,
        alignSelf:'center',
        alignItems:'center'
    }
})

export default ListCard;
