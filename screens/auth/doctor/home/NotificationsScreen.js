import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";

export default function NotificationsScreen({ navigation }) {
  // مكون الإشعار الواحد
  const NotificationItem = ({ title, description, time, icon, isUnread }) => (
    <View
      style={[styles.notificationCard, isUnread && styles.unreadBackground]}
    >
      {/* الوقت على اليسار */}
      <Text style={styles.timeText}>{time}</Text>

      {/* محتوى الإشعار في المنتصف */}
      <View style={styles.textContainer}>
        <Text style={styles.notificationTitle}>{title}</Text>
        <Text style={styles.notificationDescription}>{description}</Text>
      </View>

      {/* الأيقونة على اليمين داخل دائرة */}
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={22} color="#8B6F47" />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      {/* Header الصفحة */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-forward" size={26} color="#631515" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>الإشعارات</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <NotificationItem
          title="طلب جديد"
          description="أحمد خالد أرسل إليك طلب متابعة"
          time="10 د"
          icon="notifications-outline"
          isUnread={true} // الإشعار الأول له خلفية مختلفة في الصورة
        />
        <NotificationItem
          title="وافقت علي الطلب"
          description="إنت وافقت علي طلب المتابعة الخاص بوائل"
          time="10 د"
          icon="checkmark-done-outline"
        />
        <NotificationItem
          title="تقييم جديد"
          description="جميل جداً ! تم استلام تقييم 4.7 من المريض ساهر"
          time="10 د"
          icon="star-outline"
        />
        <NotificationItem
          title="تم توثيق الحساب"
          description="مبروك ! تم تفعيل الحساب"
          time="4 ي"
          icon="shield-checkmark-outline"
        />
        <NotificationItem
          title="تحديث النظام"
          description="مميزات جديدة في النظام بقت متاحة دلوقتي"
          time="1 أ"
          icon="download-outline"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "#EEE",
    paddingTop: Platform.OS === "android" ? 15 : 5,
    marginBottom: 15,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "right",
  },
  backButton: {
    padding: 5,
  },
  notificationCard: {
    flexDirection: "row", // ترتيب: وقت -> نص -> أيقونة
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F5F5F5",
  },
  unreadBackground: {
    backgroundColor: "#FFF9F0", // اللون الكريمي الفاتح للإشعارات الجديدة
  },
  timeText: {
    fontSize: 12,
    color: "#999",
    width: 40,
  },
  textContainer: {
    flex: 1,
    alignItems: "flex-end", // محاذاة النص لليمين
    marginRight: 15,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 13,
    color: "#777",
    textAlign: "right",
  },
  iconCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#FDF4E7",
    justifyContent: "center",
    alignItems: "center",
  },
});
