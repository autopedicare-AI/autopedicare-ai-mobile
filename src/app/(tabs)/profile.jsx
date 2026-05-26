import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { Feather, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useColors } from "@/hooks/useColors";

export default function ProfileScreen() {
  const colors = useColors();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image
            source={{ uri: "https://via.placeholder.com/100" }}
            style={styles.avatar}
          />
          <View style={styles.headerText}>
            <Text style={[styles.name, { color: colors.text }]}>
              Dchurchboi_Ui/Ux
            </Text>
            <View style={[styles.badge, { backgroundColor: "#e0f7fa" }]}>
              <Ionicons name="person-outline" size={14} color="#00838f" />
              <Text style={styles.badgeText}> Car Owner</Text>
            </View>
          </View>
          <Feather name="edit-2" size={20} color={colors.text} />
        </View>

        {/* Account Information */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Account Information
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: "#e8f5e9" }]}>
              <Ionicons name="checkmark-circle" size={14} color="#2e7d32" />
              <Text style={{ color: "#2e7d32", fontSize: 12 }}> Verified</Text>
            </View>
          </View>
          <Text style={styles.label}>Email Address</Text>
          <Text style={[styles.value, { color: colors.text }]}>
            dchurchboi99@gmail.com
          </Text>
          <Text style={[styles.label, { marginTop: 10 }]}>Phone Number</Text>
          <Text style={[styles.value, { color: colors.text }]}>
            +2347082605460
          </Text>
        </View>

        {/* Vehicle Management */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View style={styles.cardHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Vehicle Management
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#ff6600",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "white", fontSize: 12 }}>View Vehicle</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <MaterialCommunityIcons
              name="car-outline"
              size={20}
              color="#2196f3"
            />
            <Text style={{ marginLeft: 8 }}>Vehicles Added</Text>
          </View>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.actionRow}>
            <Text>Manage Vehicles</Text>
            <Feather name="chevron-right" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionRow}>
            <Text>Add New Vehicle</Text>
            <Feather name="chevron-right" size={20} />
          </TouchableOpacity>
        </View>

        {/* AI & System Preferences */}
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            AI & System Preferences
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: colors.mutedForeground,
              marginBottom: 15,
            }}
          >
            These settings help improve AI identification accuracy.
          </Text>
          <View style={styles.cardHeader}>
            <Text style={styles.label}>AI Accuracy Level</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#e3f2fd",
                padding: 5,
                borderRadius: 6,
              }}
            >
              <Ionicons name="sparkles" size={14} color="#1976d2" />
              <Text style={{ color: "#1976d2", marginLeft: 5 }}>High</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20 },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 30 },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  headerText: { flex: 1, marginLeft: 15 },
  name: { fontSize: 18, fontWeight: "bold" },
  badge: {
    flexDirection: "row",
    alignSelf: "flex-start",
    padding: 4,
    borderRadius: 4,
    marginTop: 4,
  },
  badgeText: { fontSize: 12, color: "#00838f" },
  card: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold" },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    borderRadius: 4,
  },
  label: { fontSize: 12, color: "#888" },
  value: { fontSize: 14, fontWeight: "500" },
  row: { flexDirection: "row", alignItems: "center", marginVertical: 10 },
  divider: { height: 1, backgroundColor: "#eee", marginVertical: 10 },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
});
