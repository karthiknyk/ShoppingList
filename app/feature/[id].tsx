import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { useDispatch, useSelector } from 'react-redux';
import { CommonStyles } from "../constants/CommonStyles";
import { addItemToList, AppDispatch, delItemFromList, editItemList, RootState } from '../store/store';
import CommonButton from "./component/CommonButton";
import CommonModal from "./component/CommonModal";
import ItemCard from "./component/ItemCard";
import ItemForm from "./component/ItemForm";
import RightSwipe from "./component/RightSwipe";
import { showToast } from "./component/toastMessage";

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
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const defVaule = {
        id: 0, name: '', quantity: "", notes: ''
    }

    const [initialValue, setInitialValue] = useState(defVaule);

    // Get specific list from Redux store
    const list = useSelector((state: RootState) =>
        state.lists.find((l: List) => l.id === id)
    );
    const dispatch = useDispatch<AppDispatch>();

    const handleAddItem = (data: any) => {
        console.log('sdasdasd', data)

        const { id: itemid, name, quantity, notes } = data
        console.log('sdasdasd', data)

        if (isEdit) {
            dispatch(
                editItemList({
                    listId: id,
                    item: { id: itemid, name, quantity, notes },
                })
            );
            showToast("Success, Item updated",'')
            setIsEdit(false)

        } else {
            dispatch(
                addItemToList({
                    listId: id,
                    item: { id: Date.now().toString(), name, quantity, notes },
                })
            );
            showToast("Success, New item is added", "")
        }
        setIsModalVisible(false)
        setInitialValue(defVaule)
    };

    const handleDelete = (item: any) => {
        dispatch(
            delItemFromList({
                listId: id,
                item
            })
        );
                    showToast("Success", "Item Deleted")
        

    };
    const renderItems = useCallback(({ item, index }: any) => (
        <Swipeable
            renderRightActions={(progress, dragX) => RightSwipe(progress, dragX, () => {
                handleDelete(item)
            })}
            overshootRight={false}
        >
            <ItemCard data={item} onPress={() => {
                setIsEdit(true)
                setInitialValue(item)
                setIsModalVisible(true)
            }} />
        </Swipeable>
    ), [handleDelete])

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
            <Text style={CommonStyles.title}>List: {list.title}</Text>

            <Text style={CommonStyles.itemstitle}>Items List</Text>

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
                <CommonButton title="Add Items" onPress={() => setIsModalVisible(true)} />
            </View>
            <CommonModal isVisible={isModalVisible} onCloseModal={onModalClose}>
                <Text style={CommonStyles.modalTitle}>Add New Items</Text>

                <ItemForm initialValues={initialValue} formSubmit={handleAddItem} />
                {/* <TextInput
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
                <CommonButton title="Add Item" onPress={handleAddItem} /> */}
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
