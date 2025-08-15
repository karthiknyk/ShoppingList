import Toast from "react-native-toast-message";

export const showToast = (text1: string, text2: string) => {
  Toast.show({
    type: 'success', // 'success' | 'error' | 'info'
    text1: text1 || '',
    text2: text2 || '',
    position: 'bottom', // 'top' | 'bottom'
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 50,
    bottomOffset: 40,
  });
};
