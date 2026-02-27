import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../styles/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <View style={[styles.container, {
      backgroundColor: colors.cardBackground,
      borderColor: colors.border,
    }]}>
      <Text style={[styles.title, { color: colors.text }]}>Appearance</Text>

      <View style={styles.options}>
        {(['light', 'dark'] as const).map((t) => {
          const isActive = theme === t;
          const isLight = t === 'light';
          return (
            <TouchableOpacity
              key={t}
              style={[
                styles.option,
                {
                  borderColor: isActive ? colors.primary : colors.border,
                  backgroundColor: isActive ? colors.primary + '12' : 'transparent',
                  borderWidth: isActive ? 2 : 1,
                },
              ]}
              onPress={() => !isActive && toggleTheme()}
              activeOpacity={0.7}
            >
              {isActive && (
                <View style={[styles.checkWrap, { backgroundColor: colors.primary }]}>
                  <Ionicons name="checkmark" size={10} color="#fff" />
                </View>
              )}
              <View style={[
                styles.iconCircle,
                { backgroundColor: isLight ? '#F4F4FB' : '#0D0D14' },
              ]}>
                <Ionicons
                  name={isLight ? 'sunny-outline' : 'moon-outline'}
                  size={22}
                  color={isActive ? colors.primary : colors.textSecondary}
                />
              </View>
              <Text style={[
                styles.optionLabel,
                { color: isActive ? colors.primary : colors.textSecondary },
                isActive && { fontWeight: '700' },
              ]}>
                {isLight ? 'Light' : 'Dark'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  options: {
    flexDirection: 'row',
    gap: 10,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    position: 'relative',
  },
  checkWrap: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
});
