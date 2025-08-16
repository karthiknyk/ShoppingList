import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { GestureHandlerRootView, Swipeable } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { CommonStyles } from "../constants/CommonStyles";
import { addItemToList, AppDispatch, delItemFromList, editItemList, RootState } from '../store/store';
import CommonButton from "./component/CommonButton";
import CommonModal from "./component/CommonModal";
import ItemCard from "./component/ItemCard";
import ItemForm from "./component/ItemForm";
import RightSwipe from "./component/RightSwipe";
import { showToast } from "./component/toastMessage";
import { getRandomColor } from "../utils/helper";

interface Item {
  id: string;
  name: string;
  quantity: string;
  notes: string;
  bgcolor: string;
}

interface List {
  id: string;
  title: string;
  items: Item[];
}

export default function ItemManager() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [isEdit, setIsEdit] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const defValue = { id: "", name: "", quantity: "", notes: "", color: "" };
  const [initialValue, setInitialValue] = useState(defValue);

  const list = useSelector((state: RootState) =>
    state.lists.find((l: List) => l.id === id)
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleAddItem = (data: any) => {
    const { id: itemid, name, quantity, notes, bgcolor } = data;

    if (isEdit) {
      dispatch(
        editItemList({
          listId: id,
          item: { id: itemid, name, quantity, notes, bgcolor },
        })
      );
      showToast("Success, Item updated", "");
      setIsEdit(false);
    } else {
      dispatch(
        addItemToList({
          listId: id,
          item: {
            id: Date.now().toString(),
            name,
            quantity,
            notes,
            bgcolor: getRandomColor(), // assign once here
          },
        })
      );
      showToast("Success, New item is added", "");
    }
    setIsModalVisible(false);
    setInitialValue(defValue);
  };

  const handleDelete = useCallback(
    (item: Item) => {
      dispatch(delItemFromList({ listId: id, item }));
      showToast("Success", "Item Deleted");
    },
    [dispatch, id]
  );

  const handleEdit = useCallback((item: Item) => {
    setIsEdit(true);
    setInitialValue(item);
    setIsModalVisible(true);
  }, []);

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  if (!list?.items) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
          renderItem={({ item }) => (
            <RenderItem item={item} onDelete={handleDelete} onEdit={handleEdit} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
          ListEmptyComponent={() => (
            <View style={CommonStyles.container}>
              <Text style={CommonStyles.dateTitle}>No items found</Text>
            </View>
          )}
        />
      </GestureHandlerRootView>

      <View style={CommonStyles.absButtonView}>
        <CommonButton title="Add Items" onPress={() => setIsModalVisible(true)} />
      </View>

      <CommonModal isVisible={isModalVisible} onCloseModal={onModalClose}>
        <Text style={CommonStyles.modalTitle}>Add New Items</Text>
        <ItemForm initialValues={initialValue} formSubmit={handleAddItem} />
      </CommonModal>
    </View>
  );
}

// ---------- Memoized Child Components ---------- //

const RenderItem = React.memo(
  ({ item, onDelete, onEdit }: { item: Item; onDelete: (i: Item) => void; onEdit: (i: Item) => void }) => (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        RightSwipe(progress, dragX, () => onDelete(item))
      }
      overshootRight={false}
    >
      <ItemCard data={item} onPress={() => onEdit(item)} />
    </Swipeable>
  )
);


