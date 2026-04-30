import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function AllRequestsScreen({ route, navigation }) {
  const { requests } = route.params; // استقبال البيانات من الصفحة الرئيسية

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity style={styles.iconContainer}>
        <MaterialCommunityIcons
          name="account-check-outline"
          size={24}
          color="#fff"
        />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.condition}>{item.condition}</Text>
      </View>

      <Image source={item.image} style={styles.avatar} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-forward" size={26} color="#641919" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>جميع الطلبات</Text>
      </View>

      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FDFCF8", paddingTop: 30 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 2,
  },
  headerTitle: { fontSize: 22, fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 15,
    borderRadius: 11,
    marginBottom: 10,
    // elevation: 1,
  },
  iconContainer: { backgroundColor: "#631515", padding: 8, borderRadius: 10 },
  textContainer: { flex: 1, marginLeft: 10, alignItems: "flex-start" },
  name: { fontSize: 16, fontWeight: "bold" },
  condition: { fontSize: 13, color: "#666" },
  avatar: { width: 60, height: 60, borderRadius: 30 },
});
