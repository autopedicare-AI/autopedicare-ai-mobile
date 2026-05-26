import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { SERVICE_CATEGORIES, PROVIDERS } from '@/data/mock';
import { useColors } from '@/hooks/useColors';

export default function ExploreScreen() {
  const colors = useColors();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>      
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Explore</Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>Find services, offers, and trusted providers near you.</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.row}>
          {SERVICE_CATEGORIES.map((category) => (
            <View key={category.id} style={[styles.categoryCard, { backgroundColor: colors.card, borderColor: colors.border }]}>              
              <View style={[styles.categoryIcon, { backgroundColor: category.color + '22' }]}>
                <MaterialCommunityIcons name={category.icon as any} size={22} color={category.color} />
              </View>
              <Text style={[styles.categoryText, { color: colors.text }]}>{category.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Top Providers</Text>
        {PROVIDERS.map((provider) => (
          <TouchableOpacity key={provider.id} style={[styles.providerCard, { backgroundColor: colors.card, borderColor: colors.border }]}>            
            <View style={styles.providerMeta}>
              <View style={[styles.providerAvatar, { backgroundColor: provider.coverColor }]}>
                <Text style={styles.providerAvatarText}>{provider.avatar}</Text>
              </View>
              <View style={styles.providerInfo}>
                <Text style={[styles.providerName, { color: colors.text }]}>{provider.name}</Text>
                <Text style={[styles.providerDetails, { color: colors.mutedForeground }]}>{provider.businessName}</Text>
                <Text style={[styles.providerDetails, { color: colors.mutedForeground }]}>{provider.services.join(' • ')}</Text>
              </View>
            </View>
            <View style={[styles.badge, { backgroundColor: provider.available === 'available' ? '#E6F4EA' : '#F9EBEB' }]}>
              <Text style={{ color: provider.available === 'available' ? '#0F8B43' : '#C62828', fontSize: 12, fontWeight: '700' }}>
                {provider.available === 'available' ? 'Available' : provider.available}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 14,
    paddingHorizontal: 20,
  },
  row: {
    paddingLeft: 20,
  },
  categoryCard: {
    minWidth: 120,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    marginRight: 12,
    alignItems: 'flex-start',
  },
  categoryIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '700',
  },
  providerCard: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },
  providerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerAvatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  providerAvatarText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
  providerInfo: {
    flex: 1,
    marginLeft: 14,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  providerDetails: {
    fontSize: 12,
    lineHeight: 18,
  },
  badge: {
    alignSelf: 'flex-start',
    marginTop: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
});
