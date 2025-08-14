import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';

const CommonModal = ({ children, isVisible, onCloseModal, ...props }: any) => {

    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isVisible}
                onRequestClose={onCloseModal}>
                <View style={styles.blurBgModal}>
                    <View
                        style={[styles.modalStyle, props.customModalStyle]}>
                        <View style={styles.headerStyle}>
                            <TouchableOpacity
                                style={styles.addButton}
                                onPress={onCloseModal}>
                                <MaterialIcons name="close" color="#000" size={22} />
                            </TouchableOpacity>
                        </View>
                        {children}
                    </View>
                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({

    modalStyle: {
        height: '60%',
        marginTop: 'auto',
        backgroundColor: 'white',
        elevation: 5,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 16
    }, footer: {
    }, vendorInfoView: {
        justifyContent: 'center', alignItems: 'center'

    },
    addButton: {
        borderRadius: 50, backgroundColor: 'white'
    },
    blurBgModal: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' },

    headerStyle: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center', padding: 10
    }
})

export default CommonModal;