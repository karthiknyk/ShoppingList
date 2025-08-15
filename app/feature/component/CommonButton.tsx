import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CommonButton({ title, onPress }: any) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPress} >
                <LinearGradient
                    // Button Linear Gradient
                    colors={['#1FA2FF', '#12D8FA', '#1FA2FF']}
                    start={{ x: 0, y: 0 }} // left
                    end={{ x: 1, y: 0 }}   // right
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
        fontWeight:'bold'
    },
});
