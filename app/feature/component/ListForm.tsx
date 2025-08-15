import { CommonStyles } from '@/app/constants/CommonStyles';
import { Formik } from 'formik';
import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import * as Yup from 'yup';
import CommonButton from './CommonButton';
import { RadioGroup } from './Radio';

// Validation schema
const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required('title is required')
        .min(3, 'Too short!').trim(),
    priority: Yup.string()
});

export default function ListForm({ initialValues, formSubmit }: any) {
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
                            {({ handleChange, handleBlur,setFieldValue, handleSubmit, values, errors, touched }) => (
                                <View style={CommonStyles.mainContainer}>
                                    {/* Name Field */}
                                    <TextInput
                                        style={CommonStyles.input}
                                        placeholder="Enter your title"
                                        onChangeText={handleChange('title')}
                                        onBlur={handleBlur('title')}
                                        value={values.title}
                                    />
                                    {touched.title && errors.title && <Text style={styles.error}>{errors.title}</Text>}
                                    <View style={{ padding: 16 }}>
                                        <Text style={{ marginBottom: 8 }}>Priority</Text>
                                        <RadioGroup
                                            options={[
                                                { label: 'Low', value: 'Low' },
                                                { label: 'Medium', value: 'Medium' },
                                                { label: 'High', value: 'High' },
                                            ]}
                                            value={values.priority}
                                            // onChange={handleChange('priority')}
                                            // onChange={(val) => handleChange('priority')(val)} // <- important!
                                            onChange={(val) => setFieldValue('priority', val)}

                                        />
                                    </View>                                    
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
