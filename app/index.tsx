
import { useRouter } from 'expo-router';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { CommonStyles } from './constants/CommonStyles';
import CommonButton from './feature/component/CommonButton';
import CommonModal from './feature/component/CommonModal';
import ListCard from './feature/component/ListCard';
import ListForm from './feature/component/ListForm';
import RightSwipe from './feature/component/RightSwipe';
import { showToast } from './feature/component/toastMessage';
import { addList, AppDispatch, delList, RootState } from './store/store';

export default function Home() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const defValue = {
        id: 0, title: '', priority: ""
    }
    const [initialValue, setInitialValue] = useState(defValue);
    const lists = useSelector((state: RootState) => state.lists);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const handleAddList = (data: any) => {
        const { title, priority } = data
        dispatch(
            addList({
                id: Date.now().toString(),
                title: title,
                priority: priority,
                items: [],
            })
        );
        showToast("Success, New List is created", "")
        setIsModalVisible(false);
    };

    const handleDelete = useCallback(
        (id: string) => {
            dispatch(delList({ listId: id }));
            showToast("Success, List Deleted", "")
        },
        [dispatch]
    );

    const onModalClose = () => {
        setIsModalVisible(false);
    };

    // Memoized FlatList render function
    const renderList = useCallback(
        ({ item }: any) => (
            <Swipeable
                renderRightActions={(progress, dragX) =>
                    RightSwipe(progress, dragX, () => handleDelete(item.id))
                }
                overshootRight={false}
            >
                <TouchableOpacity
                    style={{ padding: 5 }}
                    onPress={() => router.push(`/feature/${item.id}`)}
                >
                    <ListCard data={item} />
                </TouchableOpacity>
            </Swipeable>
        ),
        [router, handleDelete]
    );

    return (
        <View style={styles.mainContainer}>

            <Text style={styles.headerTitle}>Hi, Karthik </Text>
            <Text style={styles.timeText}>{moment(new Date()).format("DD-MM-YYYY hh:mm a")}</Text>

            <Text style={styles.title}>My Shopping Lists</Text>

            <GestureHandlerRootView style={{ flex: 1 }}>
                <FlatList
                    data={lists}
                    keyExtractor={(item) => item.id}
                    renderItem={renderList}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 80 }}
                    ListEmptyComponent={() => (
                        <View>
                            <Text>No Data</Text>
                        </View>
                    )}
                />
            </GestureHandlerRootView>

            <View style={styles.absButtonView}>
                <CommonButton title="Add List" onPress={() => setIsModalVisible(true)} />
            </View>

            <CommonModal isVisible={isModalVisible} onCloseModal={onModalClose}>
                <Text style={CommonStyles.modalTitle}>Add New List</Text>
                <ListForm initialValues={initialValue} formSubmit={handleAddList} />
            </CommonModal>

        </View>
    );
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 20,
    },
    title: { fontSize: 16, fontWeight: '500', paddingVertical: 8, textAlign: 'center' },
    headerTitle: { fontSize: 18, fontWeight: '500', paddingBottom: 4, textAlign: 'left', color: 'blue' },
    timeText: { fontSize: 12, fontWeight: '300', paddingBottom: 4, textAlign: 'left', color: 'grey' },

    absButtonView: { position: 'absolute', bottom: 20, left: 0, right: 0, margin: 20 },
});
