import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const COLORS = {
  primary: "#ff5622f7",
  background: "#F9FAFB",
  card: "#FFFFFF",
  text: "#111827",
  muted: "#6B7280",
  border: "#E5E7EB",
};

export default function MoodSelection() {
  const [selectedMode, setSelectedMode] = useState("AI");
  const router = useRouter();

  const ModeCard = ({
    mode,
    title,
    description,
    tags,
    imageSource,
    isRecommended,
  }: {
    mode: string;
    title: string;
    description: string;
    tags: string[];
    imageSource: any;
    isRecommended?: boolean;
  }) => {
    const isActive = selectedMode === mode;
    return (
      <View style={styles.cardWrapper}>
        {isRecommended && (
          <View style={styles.recommendedBadge}>
            <Ionicons name="sparkles" size={12} color="#FFF" />
            <Text style={styles.badgeText}>Recommended</Text>
          </View>
        )}
        <TouchableOpacity
          style={[styles.card, isActive && styles.activeCard]}
          onPress={() => setSelectedMode(mode)}
          activeOpacity={0.9}
        >
          <Image source={imageSource} style={styles.cardImage} />
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>{title}</Text>
            <View style={styles.divider} />
            <Text style={styles.cardDescription}>{description}</Text>
            <View style={styles.tagRow}>
              {tags.map((tag) => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>How would you like</Text>
      <Text style={styles.brandTitle}>
        Autopedicare <Text style={styles.subtitle}>to help you?</Text>
      </Text>
      <Text style={styles.instruction}>
        Choose your preferred <Text style={{ color: COLORS.primary, fontWeight: "700" }}>
          diagnosis mode
        </Text>
      </Text>

      <ModeCard
        mode="AI"
        title="Full AI Automation"
        description="Instantly detect issues using sensors, engine data & smart AI."
        tags={["Fast", "Accurate", "Hands-Off"]}
        imageSource={require('@/assets/images/ai.png')}
        isRecommended={true}
      />

      <ModeCard
        mode="Manual"
        title="Manual Mode"
        description="Select symptoms and guide the diagnosis, step by step"
        tags={["Step by Step", "Detailed Input", "DIY Control"]}
        imageSource={require('@/assets/images/manual.png')}
      />

      <View style={styles.footer}>
        <Text style={styles.hint}>
          Not sure? Go with <Text style={{ fontWeight: '700', color: COLORS.primary }}>
            AI Automation
          </Text> for faster results!
        </Text>
        <TouchableOpacity
          style={styles.mainButton}
          onPress={() => router.replace('/(tabs)')}
          activeOpacity={0.9}
        >
          <Text style={styles.buttonText}>
            Continue with {selectedMode === 'AI' ? 'AI Automation' : 'Manual Mode'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.privacy}>
          <Ionicons name="lock-closed" size={12} /> Your data is secure & private!
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center' },
  brandTitle: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    color: COLORS.primary,
  },
  subtitle: { color: COLORS.text },
  instruction: { textAlign: 'center', marginVertical: 15, color: COLORS.muted },
  cardWrapper: { marginBottom: 15 },
  recommendedBadge: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: -5,
    marginRight: 20,
    zIndex: 1,
  },
  badgeText: { color: '#FFF', fontSize: 11, fontWeight: '700', marginLeft: 4 },
  card: {
    flexDirection: 'row',
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    marginBottom: 12,
  },
  activeCard: { borderColor: COLORS.primary, borderWidth: 2 },
  cardImage: { width: 99, height: 99, resizeMode: 'contain', marginRight: 15 },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700' },
  divider: {
    height: 2,
    backgroundColor: COLORS.primary,
    width: 40,
    marginVertical: 8,
  },
  cardDescription: { color: COLORS.muted, fontSize: 12, marginBottom: 10 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: {
    borderWidth: 1,
    borderColor: COLORS.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  tagText: { color: COLORS.primary, fontSize: 10, fontWeight: '600' },
  footer: { alignItems: 'center', marginTop: 20 },
  hint: { color: COLORS.muted, marginBottom: 10, fontSize: 13 },
  mainButton: {
    backgroundColor: COLORS.primary,
    width: '100%',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: { color: '#FFF', fontWeight: '700', fontSize: 16 },
  privacy: { marginTop: 15, fontSize: 12, color: COLORS.muted },
});
