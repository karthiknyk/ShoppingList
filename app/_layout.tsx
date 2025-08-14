import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/store';
export default function RootLayout() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack>
          <Stack.Screen name="feature/home" options={{ title: 'Home' }} />
          <Stack.Screen name="feature/addItems" options={{ title: 'Items Manager' }} />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
