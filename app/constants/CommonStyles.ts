import { StyleSheet } from 'react-native'
export const CommonStyles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 20,
    },

    container:{
        flex: 1,
    },
    // inputText: { borderWidth: 1, padding: 8, margin: 8, borderRadius: 8 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 8,
        borderRadius: 10,
    },
    itemstitle: { fontSize: 16, fontWeight: 'bold', paddingVertical: 8, textAlign: 'center' },
    modalTitle: { fontSize: 16, fontWeight: 'bold', paddingVertical: 8, textAlign: 'center' },
    title: { fontSize: 18, fontWeight: 'bold', paddingVertical: 8, textAlign: 'left' },
    dateTitle: { fontSize: 12, paddingVertical: 4, textAlign: 'left' },

    absButtonView: { position: 'absolute', bottom: 20, left: 0, right: 0, margin: 20 },


})