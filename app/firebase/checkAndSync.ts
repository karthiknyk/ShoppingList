import AsyncStorage from "@react-native-async-storage/async-storage";
import { syncDataToFirebase } from "./syncService";

export const checkAndSync = async () => {
  const lastSync = await AsyncStorage.getItem("lastSync");
  const today = new Date().toDateString();

  if (lastSync !== today) {
    await syncDataToFirebase();
    await AsyncStorage.setItem("lastSync", today);
  }
};
