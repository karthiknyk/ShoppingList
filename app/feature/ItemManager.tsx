
import React, { useCallback, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import CommonModal from "./component/CommonModal";
import ItemCard from "./component/ItemCard";
import ItemForm from "./component/ItemForm";
import RightSwipe from "./component/RightSwipe";

// ✅ Memoized Item Card
const MemoItemCard = React.memo(ItemCard);

// ✅ Separate FlatList component
const ItemsList = React.memo(({ items, onEdit, onDelete }:any) => {
  const renderItems = useCallback(({ item }:any) => (
    <Swipeable
      renderRightActions={(progress, dragX) =>
        RightSwipe(progress, dragX, () => onDelete(item))
      }
      overshootRight={false}
    >
      <MemoItemCard
        data={item}
        onPress={() => onEdit(item)}
      />
    </Swipeable>
  ), [onDelete, onEdit]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItems}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Text>No Data</Text>
          </View>
        )}
        initialNumToRender={10}
        windowSize={5}
        removeClippedSubviews
      />
    </GestureHandlerRootView>
  );
});

export default function ItemManager({ list }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [initialValue, setInitialValue] = useState(null);

  const handleEdit = useCallback((item) => {
    setIsEdit(true);
    setInitialValue(item);
    setIsModalVisible(true);
  }, []);

  const handleDelete = useCallback((item) => {
    // Your delete logic
    console.log('Delete item:', item);
  }, []);

  const handleAddItem = useCallback((values) => {
    // Your add/edit logic
    console.log('Form submitted:', values);
    setIsModalVisible(false);
  }, []);
  

  return (
    <>
      <ItemsList
        items={list.items}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <CommonModal
        isVisible={isModalVisible}
        onCloseModal={() => setIsModalVisible(false)}
      >
        <ItemForm
          initialValues={initialValue}
          formSubmit={handleAddItem}
        />
      </CommonModal>
    </>
  );
}