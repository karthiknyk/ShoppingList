import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { addList, AppDispatch, delList, RootState } from '../store/store';
import CommonButton from './component/CommonButton';
import CommonModal from './component/CommonModal';
import ListCard from './component/ListCard';
import { RadioGroup } from './component/Radio';
import RightSwipe from './component/RightSwipe';

// Define type for list item
interface ListItem {
    id: string;
    name: string;
    priority: string;
    items: string[];
}

export default function ListScreen() {
    const [newListName, setNewListName] = useState<string>('');
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [priority, setPriority] = useState('Medium');

    // Typed selector
    //   const lists = useSelector((state: RootState) => state.lists as ListItem[]);
    const lists = useSelector((state: RootState) => state.lists);
    console.log(lists, 'dsfsd')
    // Typed dispatch
    const dispatch = useDispatch<AppDispatch>();

    const router = useRouter();


    const handleAddList = () => {
        if (!newListName.trim()) return;
        dispatch(
            addList({
                id: Date.now().toString(),
                title: newListName,
                priority: priority,
                items: [],
            })
        );
        setNewListName('');
        setIsModalVisible(false)
    };

    const handleDelete = (id: any) => {
        dispatch(
            delList({ listId: id })
        );
    };

    const onModalClose = () => {
        setIsModalVisible(false);
    };




    const renderList = ({ item, index }: any) => (
        <Swipeable
            renderRightActions={(progress, dragX) => RightSwipe(progress, dragX, () => {
                handleDelete(item.id)
            })}
            overshootRight={false}
        >
            <TouchableOpacity style={{ padding: 5 }} onPress={() => router.push(`/feature/${item.id}`)}>
                <ListCard data={item} />
            </TouchableOpacity>
        </Swipeable>
    )

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>My Shopping Lists</Text>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <FlatList
                    data={lists}
                    keyExtractor={(item) => item.id}
                    renderItem={renderList}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 80 }} // give space for button
                    ListEmptyComponent={() =>
                        <View><Text>No Data</Text></View>
                    }
                />
            </GestureHandlerRootView>
            <View style={styles.absButtonView}>
                <CommonButton title="Add List" onPress={() => setIsModalVisible(true)} />
            </View>

            <CommonModal isVisible={isModalVisible} onCloseModal={onModalClose}>
                <Text style={styles.title}>Add New List</Text>
                <TextInput
                    placeholder="New List Name"
                    value={newListName}
                    onChangeText={setNewListName}
                    style={styles.inputText}
                />
                <View style={{ padding: 16 }}>
                    <Text style={{ marginBottom: 8 }}>Priority</Text>
                    <RadioGroup
                        options={[
                            { label: 'Low', value: 'Low' },
                            { label: 'Medium', value: 'Medium' },
                            { label: 'High', value: 'High' },
                        ]}
                        value={priority}
                        onChange={setPriority}
                    />
                </View>
                <CommonButton title="Create" onPress={handleAddList} />
            </CommonModal>
        </View>
    );
}

const styles = StyleSheet.create({

    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        padding: 20,
    },
    inputText: { borderWidth: 1, padding: 8, margin: 8, borderRadius: 8 },
    title: { fontSize: 16, fontWeight: '500', paddingVertical: 8, textAlign: 'center' },
    absButtonView: { position: 'absolute', bottom: 20, left: 0, right: 0, margin: 20 },


})



// https://github.com/karthiknyk/ShoppingList.git