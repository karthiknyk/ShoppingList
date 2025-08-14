import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { useDispatch, useSelector } from 'react-redux';
import { CommonStyles } from "../constants/CommonStyles";
import { addItemToList, AppDispatch, delItemFromList, RootState } from '../store/store';
import CommonButton from "./component/CommonButton";
import CommonModal from "./component/CommonModal";
import ItemCard from "./component/ItemCard";
import RightSwipe from "./component/RightSwipe";

// Define item and list types
interface Item {
    id: string;
    item_name: string;
}

interface List {
    id: string;
    name: string;
    items: Item[];
}

// Props for the route
interface ItemManagerScreenProps {
    route: {
        params: {
            listId: string;
        };
    };
}

export default function ItemManager({ route }: ItemManagerScreenProps) {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [newListName, setNewListName] = useState<string>('');
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);


    // Get specific list from Redux store
    const list = useSelector((state: RootState) =>
        state.lists.find((l: List) => l.id === id)
    );

    const dispatch = useDispatch<AppDispatch>();
    const [itemName, setItemName] = useState<string>('');
    const [itemQty, setItemQty] = useState<string>('');
    const [itemNotes, setItemNotes] = useState<string>('');

    const handleAddItem = () => {
        console.log(itemName, itemQty, '===dsafs')
        if (itemName.trim() && itemQty.trim()) {
            dispatch(
                addItemToList({
                    listId: id,
                    item: { id: Date.now().toString(), name: itemName, quantity: itemQty, notes: itemNotes },
                })
            );
            setItemName('');
            setIsModalVisible(false)

        }
    };

    const handleDelete = (item: any) => {
        dispatch(
            delItemFromList({
                listId: id,
                item
            })
        );
    };
    const renderItems = ({ item, index }: any) => (
        <Swipeable
            renderRightActions={(progress, dragX) => RightSwipe(progress, dragX, () => {
                handleDelete(item)
            })}
            overshootRight={false}
        >
            <TouchableOpacity>
                <ItemCard data={item} />
                <MaterialIcons />
            </TouchableOpacity>
        </Swipeable>
    )

    const onModalClose = () => {
        setIsModalVisible(false);
    };

    if (!list?.items) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Items not found</Text>
            </View>
        );
    }

    return (

        <View style={CommonStyles.mainContainer}>
            <Text style={CommonStyles.title}>My Shopping Lists</Text>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <FlatList
                    data={list.items}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItems}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 80 }} // give space for button
                    ListEmptyComponent={() =>
                        <View><Text>No Data</Text></View>
                    }
                />
            </GestureHandlerRootView>
            <View style={CommonStyles.absButtonView}>
                <CommonButton title="Add List" onPress={() => setIsModalVisible(true)} />
            </View>
            <CommonModal isVisible={isModalVisible} onCloseModal={onModalClose}>
                <Text style={CommonStyles.title}>Add New List</Text>

                
                <TextInput
                    placeholder="New Item Name"
                    value={itemName}
                    onChangeText={setItemName}
                    style={CommonStyles.inputText}
                />
                <TextInput
                    placeholder="Quantity"
                    value={itemQty}
                    keyboardType="numeric"
                    onChangeText={setItemQty}
                    style={CommonStyles.inputText}
                />
                <TextInput
                    placeholder="Notes"
                    value={itemNotes}
                    onChangeText={setItemNotes}
                    style={CommonStyles.inputText}
                />
                <CommonButton title="Add Item" onPress={handleAddItem} />
            </CommonModal>
        </View>

        // <View style={{ flex: 1, padding: 20 }}>
        //     <Text style={{ fontSize: 20, marginBottom: 10 }}>{list.title}</Text>
        //     <TextInput
        //         placeholder="New Item"
        //         value={itemName}
        //         onChangeText={setItemName}
        //         style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        //     />
        //     <TextInput
        //         placeholder="Quantity"
        //         value={itemName}
        //         onChangeText={setItemName}
        //         style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        //     />
        //      <TextInput
        //         placeholder="Notes"
        //         value={itemName}
        //         onChangeText={setItemName}
        //         style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
        //     />
        //     <Button title="Add Item" onPress={handleAddItem} />

        //     <FlatList
        //         data={list.items}
        //         keyExtractor={(item) => item.id}
        //         renderItem={renderItems}
        //     />
        // </View>
    );
}
