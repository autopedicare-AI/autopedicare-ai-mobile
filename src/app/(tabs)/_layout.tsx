import React, { memo } from 'react';
import { Platform, StyleSheet, useColorScheme, View } from 'react-native';
import { Tabs } from 'expo-router';
import { BlurView } from 'expo-blur';
import { isLiquidGlassAvailable } from 'expo-glass-effect';
import {
  Icon,
  Label,
  NativeTabs,
} from 'expo-router/unstable-native-tabs';
import { SymbolView } from 'expo-symbols';
import {
  Feather,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColors } from '@/hooks/useColors';

type TabItem = {
  name: string;
  title: string;
  iosIcon: string;
  androidIcon: keyof typeof Feather.glyphMap;
  androidFilledIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
};

const TABS: TabItem[] = [
  {
    name: 'index',
    title: 'Dashboard',
    iosIcon: 'house',
    androidIcon: 'home',
    androidFilledIcon: 'home',
  },
  {
    name: 'shop',
    title: 'Shop',
    iosIcon: 'cart',
    androidIcon: 'shopping-bag',
    androidFilledIcon: 'shopping',
  },
  {
    name: 'intersection',
    title: 'Explore',
    iosIcon: 'square.grid.2x2',
    androidIcon: 'grid',
    androidFilledIcon: 'view-grid',
  },
  {
    name: 'profile',
    title: 'Profile',
    iosIcon: 'person',
    androidIcon: 'user',
    androidFilledIcon: 'account',
  },
];

const IS_IOS = Platform.OS === 'ios';
const USE_NATIVE_TABS = IS_IOS && isLiquidGlassAvailable();

const TabBarBackground = memo(({ isDark }: { isDark: boolean }) => {
  if (!IS_IOS) return null;

  return (
    <BlurView
      intensity={90}
      tint={isDark ? 'dark' : 'light'}
      style={StyleSheet.absoluteFill}
    />
  );
});

function NativeTabLayout() {
  return (
    <NativeTabs>
      {TABS.map((tab) => (
        <NativeTabs.Trigger key={tab.name} name={tab.name}>
          <Icon
            sf={{
              default: tab.iosIcon,
              selected: `${tab.iosIcon}.fill`,
            }}
          />
          <Label>{tab.title}</Label>
        </NativeTabs.Trigger>
      ))}
    </NativeTabs>
  );
}

function ClassicTabLayout() {
  const colors = useColors();
  const isDark = useColorScheme() === 'dark';
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: colors.background,
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primary,
        // Inactive color set to solid gray
        tabBarInactiveTintColor: '#8e8e93',
        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          position: 'absolute',
          left: 16,
          right: 16,
          bottom: 12,
          height: 72 + insets.bottom,
          paddingTop: 10,
          paddingBottom: Math.max(insets.bottom, 10),
          borderTopWidth: 0,
          backgroundColor: IS_IOS ? 'transparent' : colors.card,
          borderRadius: 20,
          elevation: 0,
          shadowOpacity: 0,
          shadowRadius: 0,
          shadowOffset: { width: 0, height: 0 },
        },

        tabBarItemStyle: {
          paddingVertical: 4,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },

        tabBarBackground: () => (
          <View
            style={[
              StyleSheet.absoluteFill,
              styles.tabBackground,
              {
                backgroundColor: IS_IOS
                  ? (isDark ? 'rgba(0,0,0,0.8)' : 'rgba(255,255,255,0.9)')
                  : colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            <TabBarBackground isDark={isDark} />
          </View>
        ),
      }}
    >
      {TABS.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ focused, color, size }) => {
              if (IS_IOS) {
                return (
                  <SymbolView
                    name={focused ? `${tab.iosIcon}.fill` : tab.iosIcon}
                    tintColor={color}
                    size={22}
                    resizeMode="scaleAspectFit"
                  />
                );
              }

              if (focused && tab.androidFilledIcon) {
                return (
                  <MaterialCommunityIcons
                    name={tab.androidFilledIcon}
                    size={24}
                    color={color}
                  />
                );
              }

              return (
                <Feather
                  name={tab.androidIcon}
                  size={22}
                  color={color}
                />
              );
            },
          }}
        />
      ))}
    </Tabs>
  );
}

export default function TabLayout() {
  if (USE_NATIVE_TABS) {
    return <NativeTabLayout />;
  }

  return <ClassicTabLayout />;
}

const styles = StyleSheet.create({
  tabBackground: {
    overflow: 'hidden',
    borderRadius: 20,
    borderWidth: 1,
  },
});