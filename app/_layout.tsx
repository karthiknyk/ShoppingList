import { Stack } from 'expo-router';
import { Image, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/store';
import Toast from 'react-native-toast-message';
export default function RootLayout() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack>
          <Stack.Screen name="feature/home"
            options={{
              headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image
                    source={require('../assets/images/appicon.png')}
                    style={{ width: 24, height: 24, marginRight: 8 }}
                  />
                  <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Home</Text>
                </View>
              ),
              headerStyle: { backgroundColor: '#f0f0f0' }, // optional
            }}
          />
          {/* <Stack.Screen name="feature/[id]" options={{ title: 'Items Manager' }} /> */}
          <Stack.Screen
            name="feature/[id]"
            options={({ route }) => ({
              title: `Items Manager`,
            })}
          />
        </Stack>
        <Toast />
      </PersistGate>
    </Provider>
  );
}
