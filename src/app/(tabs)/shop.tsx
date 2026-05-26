import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  SafeAreaView 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';

const PARTS_DATA = [
  { id: '1', name: 'Brake Pads', price: '$45.00', category: 'Brakes' },
  { id: '2', name: 'Oil Filter', price: '$12.00', category: 'Engine' },
  { id: '3', name: 'Spark Plugs', price: '$8.50', category: 'Ignition' },
  { id: '4', name: 'Radiator Fan', price: '$85.00', category: 'Cooling' },
];

export default function ShopScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const colors = useColors();

  const filteredParts = PARTS_DATA.filter((part) =>
    part.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Shop Parts</Text>
        
        {/* Search Input */}
        <View style={[styles.searchBar, { backgroundColor: colors.card }]}>
          <Feather name="search" size={20} color={colors.mutedForeground} />
          <TextInput
            placeholder="Search for parts..."
            placeholderTextColor={colors.mutedForeground}
            style={[styles.input, { color: colors.text }]}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <FlatList
        data={filteredParts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.card, { backgroundColor: colors.card }]}>
            <View style={styles.cardInfo}>
              <Text style={[styles.partName, { color: colors.text }]}>{item.name}</Text>
              <Text style={{ color: colors.mutedForeground }}>{item.category}</Text>
            </View>
            <Text style={[styles.price, { color: colors.primary }]}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 15 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
  },
  input: { flex: 1, marginLeft: 10, fontSize: 16 },
  listContent: { padding: 20 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  partName: { fontSize: 16, fontWeight: '600' },
  price: { fontWeight: 'bold', fontSize: 16 },
});