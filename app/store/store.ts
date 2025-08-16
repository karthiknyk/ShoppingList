// store.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';

// --------- Types ---------
export interface ListItem {
  id: string;
  name: string;
  quantity: string;
  notes: string;
  bgcolor:string
}

export interface List {
  id: string;
  title: string;
  priority: string;
  cardBg:string;
  items: ListItem[];
}

// --------- Slice ---------
const listSlice = createSlice({
  name: 'lists',
  initialState: [] as List[],
  reducers: {
    addList: (state, action: PayloadAction<List>) => {
      state.push(action.payload); // Immer allows "mutations"
    },
    delList: (state, action: PayloadAction<any>) => {
      const { listId } = action.payload;
      return state.filter((l) => l.id !== listId);
    },
    addItemToList: (
      state,
      action: PayloadAction<any>
    ) => {
      const { listId, item } = action.payload;
      const list = state.find((l) => l.id === listId);
      if (list) {
        list.items.push(item);
      }
    },
    delItemFromList: (
      state,
      action: PayloadAction<{ listId: string; item: ListItem }>
    ) => {
      const { listId, item } = action.payload;
      const list = state.find((l) => l.id === listId);
      if (list) {
        list.items = list.items.filter((l) => l.id !== item.id);
      }
    },

    editItemList: (
      state,
      action: PayloadAction<{ listId: string; item: ListItem }>
    ) => {
      const { listId, item } = action.payload;
      const list = state.find((l) => l.id === listId);
      if (list) {
        const index = list.items.findIndex((i) => i.id === item.id);
        if (index !== -1) {
          list.items[index] = item; // Immer lets you mutate directly
        }
      }
    },


  },
});

export const { addList, addItemToList, delList, delItemFromList ,editItemList} = listSlice.actions;

// --------- Root Reducer ---------
const rootReducer = combineReducers({
  lists: listSlice.reducer,
});

// --------- Persist Config ---------
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['lists'], // only persist lists slice
};

// --------- Persisted Reducer ---------
const persistedReducer = persistReducer(persistConfig, rootReducer);

// --------- Store ---------
export const store = configureStore({
  reducer: persistedReducer,
});

// --------- Persistor ---------
export const persistor = persistStore(store);

// --------- Types for Hooks ---------
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
