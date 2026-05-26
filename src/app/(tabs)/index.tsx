import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';

const { width } = Dimensions.get('window');

export default function AiModeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const colors = useColors();
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text>We need camera permission to diagnose your car.</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.btn}><Text>Grant Permission</Text></TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={StyleSheet.absoluteFill} ref={cameraRef} facing="back">
        
        {/* --- Mask Overlay (The "Box" Effect) --- */}
        <View style={styles.maskContainer}>
          <View style={[styles.mask, { top: 0, height: '25%' }]} />
          <View style={[styles.mask, { top: '25%', left: 0, width: '10%', height: '50%' }]} />
          <View style={[styles.mask, { top: '25%', right: 0, width: '10%', height: '50%' }]} />
          <View style={[styles.mask, { bottom: 0, height: '25%' }]} />
          
          {/* Border Frame */}
          <View style={styles.focusFrame} />
        </View>

        {/* --- UI Layer --- */}
        <View style={styles.overlay}>
          {/* Top Bar */}
          <TouchableOpacity onPress={() => router.back()} style={[styles.backBtn, { marginTop: insets.top }]}>
            <Feather name="chevron-left" size={28} color="#fff" />
          </TouchableOpacity>

          {/* Bottom Controls */}
          <View style={styles.bottomControls}>
            <View style={styles.hintsRow}>
              {[{icon: 'brightness-7', label: 'Good light'}, {icon: 'camera-iris', label: 'Close-up'}, {icon: 'eye-outline', label: 'Clear view'}].map((item, i) => (
                <View key={i} style={styles.hintItem}>
                  <View style={styles.hintCircle}><MaterialCommunityIcons name={item.icon} size={20} color="#fff"/></View>
                  <Text style={styles.hintText}>{item.label}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity style={styles.carSelector}>
              <Ionicons name="car-sport" size={18} color="#fff" />
              <Text style={styles.carText}>2014 Toyota Corolla</Text>
            </TouchableOpacity>

            <View style={styles.bottomActions}>
              <TouchableOpacity><Feather name="image" size={28} color="#fff" /></TouchableOpacity>
              <TouchableOpacity style={styles.captureBtn} />
              <TouchableOpacity><Feather name="zap" size={28} color="#fff" /></TouchableOpacity>
            </View>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  maskContainer: { ...StyleSheet.absoluteFillObject },
  mask: { position: 'absolute', backgroundColor: 'rgba(0,0,0,0.6)' },
  focusFrame: {
    position: 'absolute',
    top: '25%', left: '10%', width: '80%', height: '50%',
    borderWidth: 2, borderColor: '#fff', borderRadius: 12
  },
  overlay: { flex: 1, padding: 20, justifyContent: 'space-between' },
  backBtn: { padding: 5 },
  bottomControls: { marginBottom: 30 },
  hintsRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 25 },
  hintItem: { alignItems: 'center' },
  hintCircle: { width: 45, height: 45, borderRadius: 23, borderWidth: 1, borderColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  hintText: { color: '#fff', fontSize: 11, marginTop: 8 },
  carSelector: { flexDirection: 'row', backgroundColor: '#000', alignSelf: 'center', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, marginBottom: 25 },
  carText: { color: '#fff', marginLeft: 8, fontWeight: '600' },
  bottomActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 },
  captureBtn: { width: 75, height: 75, borderRadius: 38, borderWidth: 4, borderColor: '#fff', backgroundColor: 'rgba(255,255,255,0.2)' }
});