import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";

const RightSwipe = (progress: Animated.AnimatedInterpolation<number>, dragX: Animated.AnimatedInterpolation<number>,onPress:any) => {
    const scale = dragX.interpolate({
        inputRange: [-100, 0],
        outputRange: [1, 0.5],
        extrapolate: 'clamp',
    });

    return (
        
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
            <View style={styles.deleteContainer}>
                <MaterialIcons name='delete' color={'red'} size={28} />
            </View>
        </TouchableOpacity>
    );
};

const styles=StyleSheet.create({
    deleteContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'light',
    },})


export default RightSwipe;
