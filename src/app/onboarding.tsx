import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useApp } from '@/context/AppContext';

const { width } = Dimensions.get('window');
const ORANGE = '#FF5A00';

const SLIDES = [
  {
    id: '1',
    titlePlain: 'Your car talks.\nWe ',
    titleAccent: 'listen',
    titleEnd: '.',
    subtitle: 'AI-powered diagnostics in seconds.',
    image: require('@/assets/images/onboarding1.png'),
  },
  {
    id: '2',
    titlePlain: 'Breakdown?\nGet help ',
    titleAccent: 'instantly',
    titleEnd: '.',
    subtitle: 'Request verified Mobility Partners nearby.',
    image: require('@/assets/images/onboarding2.png'),
  },
  {
    id: '3',
    titlePlain: 'Track help\nin ',
    titleAccent: 'real time',
    titleEnd: '.',
    subtitle: 'Live updates until your car is safe.',
    image: require('@/assets/images/onboarding3.png'),
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { completeOnboarding } = useApp();

  const flatListRef = useRef<FlatList>(null);

  const scrollX = useSharedValue(0);
  const [index, setIndex] = useState(0);

  const topPad = Platform.OS === 'web' ? 20 : insets.top;

  const isLastSlide = index === SLIDES.length - 1;

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x / width;
    },
  });

  const viewabilityConfig = useMemo(
    () => ({
      itemVisiblePercentThreshold: 60,
    }),
    []
  );

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const newIndex = viewableItems?.[0]?.index ?? 0;
      setIndex(newIndex);
    }
  ).current;

  const goNext = useCallback(async () => {
    if (!isLastSlide) {
      flatListRef.current?.scrollToIndex({
        index: index + 1,
        animated: true,
      });
      return;
    }

    await completeOnboarding();
    router.replace('/auth/signIn');
  }, [index, isLastSlide, completeOnboarding, router]);

  const skip = useCallback(async () => {
    await completeOnboarding();
    router.replace('/auth/signIn');
  }, [completeOnboarding, router]);

  const Dot = ({ i }: { i: number }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const scale = interpolate(scrollX.value, [i - 1, i, i + 1], [1, 1.6, 1]);
      const opacity = interpolate(scrollX.value, [i - 1, i, i + 1], [0.3, 1, 0.3]);

      return {
        transform: [{ scale }],
        opacity,
        backgroundColor: ORANGE,
      };
    });

    return <Animated.View style={[styles.dot, animatedStyle]} />;
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.slide}>
      <View style={styles.blobWrap}>
        <View style={styles.blob} />
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      </View>
    </View>
  );

  const slide = SLIDES[index];

  return (
    <View style={[styles.container, { paddingTop: topPad }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={skip} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Slides */}
      <Animated.FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        renderItem={renderItem}
        getItemLayout={(_, i) => ({
          length: width,
          offset: width * i,
          index: i,
        })}
      />

      {/* Bottom */}
      <View style={[styles.bottom, { paddingBottom: insets.bottom + 24 }]}>
        <View style={styles.dotsRow}>
          {SLIDES.map((_, i) => (
            <Dot key={i} i={i} />
          ))}
        </View>

        <Text style={styles.title}>
          <Text style={styles.titleBlack}>{slide.titlePlain}</Text>
          <Text style={styles.titleAccent}>{slide.titleAccent}</Text>
          <Text style={styles.titleBlack}>{slide.titleEnd}</Text>
        </Text>

        <Text style={styles.subtitle}>{slide.subtitle}</Text>

        <TouchableOpacity style={styles.button} onPress={goNext}>
          <Text style={styles.buttonText}>
            {isLastSlide ? 'Get Started →' : 'Next →'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
  },

  skipBtn: {
    backgroundColor: '#111',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 7,
  },

  skipText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },

  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },

  blobWrap: {
    width: width * 0.78,
    height: width * 0.78,
    alignItems: 'center',
    justifyContent: 'center',
  },

  blob: {
    position: 'absolute',
    width: '88%',
    height: '88%',
    borderRadius: 999,
    backgroundColor: '#DFF0FA',
  },

  image: {
    width: '80%',
    height: '80%',
  },

  bottom: {
    paddingHorizontal: 24,
  },

  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  title: {
    fontSize: 30,
    lineHeight: 38,
    marginBottom: 10,
  },

  titleBlack: {
    color: '#111',
    fontWeight: '800',
  },

  titleAccent: {
    color: ORANGE,
    fontWeight: '800',
    fontStyle: 'italic',
  },

  subtitle: {
    fontSize: 14,
    color: '#777',
    lineHeight: 20,
    marginBottom: 25,
  },

  button: {
    height: 56,
    borderRadius: 14,
    backgroundColor: ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});