import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// الإعداد ده عشان النوتيفيكيشن تظهر بوب أب واليوزر فاتح الأبليكيشن
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function getFCMTokenAsync() {
  let token;

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      console.log('⚠️ اليوزر رفض يدي صلاحية النوتيفيكيشن');
      return null;
    }

    // 🔥 التريكة هنا: بنستخدم getDevicePushTokenAsync عشان نجيب FCM مش إكسبو
    const tokenData = await Notifications.getDevicePushTokenAsync();
    token = tokenData.data;
    console.log("🔥 FCM Token:", token);
    
  } else {
    console.log('⚠️ النوتيفيكيشن محتاجة موبايل حقيقي مش محاكي');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}