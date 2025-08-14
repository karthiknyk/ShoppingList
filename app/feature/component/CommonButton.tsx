import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CommonButton({ title, onPress }: any) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} >
                <LinearGradient
                    // Button Linear Gradient
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={styles.button}>
                    <Text style={styles.text}>{title}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
    },

    button: {
        padding: 15,
        alignItems: 'center',
        borderRadius: 10,
    },
    text: {
        backgroundColor: 'transparent',
        fontSize: 15,
        color: '#fff',
    },
});
