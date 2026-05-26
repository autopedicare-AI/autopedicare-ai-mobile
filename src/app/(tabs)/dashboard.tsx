import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// Referencing the layout design from dashboard.png

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hi, Peter Jones</Text>
            <Text style={styles.mode}>
              welcome you are in <Text style={{ color: "red" }}>AI mode</Text>
            </Text>
          </View>
          <TouchableOpacity>
            <Feather name="shopping-cart" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Car Display */}
        <View style={styles.carSection}>
          <Text style={styles.carTitle}>Toyota Corolla 2017</Text>
          <Text style={styles.mileage}>600,000 kg</Text>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1617854818583-09e7f077a156?q=80&w=500&auto=format&fit=crop",
            }}
            style={styles.carImage}
            resizeMode="contain"
          />
        </View>

        {/* System Status */}
        <TouchableOpacity style={styles.statusCard}>
          <Ionicons name="checkmark-circle-outline" size={32} color="#2ecc71" />
          <View style={styles.statusText}>
            <Text style={styles.statusTitle}>All Systems Good</Text>
            <Text style={styles.statusSubtitle}>
              Your Corolla is in great condition
            </Text>
          </View>
          <Feather name="chevron-right" size={24} color="black" />
        </TouchableOpacity>

        {/* Quick Actions */}
        <Text style={styles.sectionHeader}>
          Quick Actions <Text>❗</Text>
        </Text>
        <View style={styles.actionsContainer}>
          {[
            { icon: "mic", label: "Record Sound" },
            { icon: "tools", label: "Find Repair Shops" },
            { icon: "alert-octagon", label: "Emergency" },
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.actionButton}>
              <MaterialCommunityIcons
                name={item.icon as any}
                size={28}
                color="black"
              />
              <Text style={styles.actionLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Alerts */}
        <Text style={styles.sectionHeader}>Recent Alerts alert 🚨</Text>
        <TouchableOpacity style={styles.alertCard}>
          <MaterialCommunityIcons
            name="alert-outline"
            size={24}
            color="orange"
          />
          <Text style={styles.alertText}>Engine Temperature High</Text>
          <Feather name="chevron-right" size={20} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.alertCard}>
          <MaterialCommunityIcons
            name="water-outline"
            size={24}
            color="#3498db"
          />
          <Text style={styles.alertText}>Radiator Lickage</Text>
          <Feather name="chevron-right" size={20} color="black" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  scrollContent: { padding: 20, paddingBottom: 100 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: { fontSize: 22, fontWeight: "bold" },
  mode: { color: "#666" },
  carSection: { alignItems: "center", marginBottom: 20 },
  carTitle: { fontSize: 18, fontWeight: "bold" },
  mileage: { color: "#999", marginBottom: 10 },
  carImage: { width: "100%", height: 150 },
  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f6f3",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  statusText: { flex: 1, marginLeft: 10 },
  statusTitle: { fontWeight: "bold", fontSize: 16, color: "#27ae60" },
  statusSubtitle: { fontSize: 12, color: "#666" },
  sectionHeader: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  actionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  actionButton: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    width: "30%",
    borderWidth: 1,
    borderColor: "#eee",
  },
  actionLabel: { fontSize: 12, marginTop: 8, textAlign: "center" },
  alertCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  alertText: { flex: 1, marginLeft: 10, fontWeight: "500" },
});
