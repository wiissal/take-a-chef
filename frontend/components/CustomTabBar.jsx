import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/theme';

export default function CustomTabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = state.index === index;

        // Skip hidden tabs
        if (options.href === null) return null;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabBarButton
            key={route.key}
            isFocused={isFocused}
            options={options}
            onPress={onPress}
            label={label}
          />
        );
      })}
    </View>
  );
}

function TabBarButton({ isFocused, options, onPress, label }) {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const translateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isFocused) {
      // Scale up and slide up with bounce
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1.2,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(translateValue, {
          toValue: -5,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Scale back and slide down
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(translateValue, {
          toValue: 0,
          friction: 3,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isFocused]);
  // Safety check: if no tabBarIcon, don't render
  if (!options.tabBarIcon) {
    return null;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.tabButton}
    >
      <Animated.View
        style={[
          styles.iconContainer,
          {
            transform: [
              { scale: scaleValue },
              { translateY: translateValue },
            ],
          },
        ]}
      >
        {options.tabBarIcon({
          color: isFocused ? COLORS.primary : COLORS.gray,
          size: 26,
          focused: isFocused,
        })}
      </Animated.View>
      <Text
        style={[
          styles.label,
          { color: isFocused ? COLORS.primary : COLORS.gray },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    height: 70,
    paddingBottom: 10,
    paddingTop: 10,
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
  },
});