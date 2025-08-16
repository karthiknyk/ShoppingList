import { CommonStyles } from '@/app/constants/CommonStyles';
import { Formik } from 'formik';
import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import * as Yup from 'yup';
import CommonButton from './CommonButton';

// Validation schema
const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Item Name is required')
        .min(3, 'Too short!').trim(),
    quantity: Yup.string()
        .required('Quantity is required'),
    notes: Yup.string()
});

export default function ItemForm({ initialValues, formSubmit }: any) {
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <View style={styles.container}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                formSubmit(values)
                            }}>
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                                <View style={CommonStyles.mainContainer}>
                                    {/* Name Field */}
                                    <TextInput
                                        style={CommonStyles.input}
                                        placeholder="Enter your name"
                                        maxLength={30}
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        value={values.name}
                                    />
                                    {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
                                    {/* Email Field */}
                                    <TextInput
                                        style={CommonStyles.input}
                                        placeholder="Enter Quantity"
                                        keyboardType="numeric"
                                        maxLength={3}
                                        onChangeText={handleChange('quantity')}
                                        onBlur={handleBlur('quantity')}
                                        value={values.quantity}
                                    />
                                    {touched.quantity && errors.quantity && <Text style={styles.error}>{errors.quantity}</Text>}
                                    <TextInput
                                        style={[CommonStyles.input, { height: 100, textAlignVertical: 'top' }]}
                                        placeholder="Enter notes (Optional)"
                                        onChangeText={handleChange('notes')}
                                        onBlur={handleBlur('notes')}
                                        multiline
                                        numberOfLines={3}
                                        value={values.notes}
                                    />
                                    {/* Submit Button */}
                                    <CommonButton title="Submit" onPress={handleSubmit} />
                                </View>
                            )}
                        </Formik>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    error: {
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 12
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
});
