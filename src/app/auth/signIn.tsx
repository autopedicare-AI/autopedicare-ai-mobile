import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColors } from '@/hooks/useColors';
import { useApp, useDefaultVehicles } from '@/context/AppContext';

export default function SignInScreen() {
  const colors = useColors();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { login } = useApp();
  const defaultVehicles = useDefaultVehicles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    if (!email || !password) return;

    await login(
      {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email,
      },
      defaultVehicles
    );

    router.replace('/auth/mood-selection');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>      
      <View
        style={[
          styles.curve,
          { backgroundColor: colors.card || '#F3F4F6' },
        ]}
      />

      <View
        style={[
          styles.content,
          { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 20 },
        ]}
      >
        <View style={styles.logoWrap}>
          <Image
            source={require('@/assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.form}>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
            placeholder="Email"
            placeholderTextColor={colors.mutedForeground}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, color: colors.text, borderColor: colors.border }]}
            placeholder="Password"
            placeholderTextColor={colors.mutedForeground}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
            onPress={handleSignIn}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dividerRow}>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <Text style={[styles.dividerText, { color: colors.mutedForeground }]}>Or continue with</Text>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.button, styles.secondaryBtn]}
            onPress={() => router.push('/auth/google')}
            activeOpacity={0.85}
          >
            <Image
              source={require('@/assets/icons/google.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.secondaryText}>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryBtn]}
            onPress={() => router.push('/auth/apple')}
            activeOpacity={0.85}
          >
            <Image
              source={require('@/assets/icons/apple.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <Text style={styles.secondaryText}>Apple</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.mutedForeground }]}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/signup')}>
            <Text style={styles.link}>sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f4f2',
  },
  curve: {
    position: 'absolute',
    bottom: -120,
    left: -80,
    right: -80,
    height: 300,
    borderTopLeftRadius: 200,
    borderTopRightRadius: 200,
    opacity: 0.4,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 180,
    height: 180,
  },
  form: {
    width: '100%',
    gap: 14,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 14,
  },
  primaryBtn: {
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  dividerRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginVertical: 18,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    fontSize: 12,
  },
  actions: {
    width: '100%',
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    gap: 12,
    backgroundColor: '#fff',
  },
  secondaryBtn: {
    backgroundColor: '#FFFFFF',
  },
  icon: {
    width: 20,
    height: 20,
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
  },
  link: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2563EB',
  },
});
