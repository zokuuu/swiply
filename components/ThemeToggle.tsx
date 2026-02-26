import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../styles/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.cardBackground }]}>
      <Text style={[styles.title, { color: colors.text }]}>Appearance</Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            theme === 'light' && styles.optionActive,
            { borderColor: colors.border }
          ]}
          onPress={() => theme !== 'light' && toggleTheme()}
          activeOpacity={0.7}
        >
          <View style={[styles.iconCircle, { backgroundColor: '#faf9ff' }]}>
            <Ionicons
              name="sunny"
              size={24}
              color={theme === 'light' ? colors.primary : colors.gray}
            />
          </View>
          <Text style={[
            styles.optionText,
            { color: theme === 'light' ? colors.primary : colors.textSecondary }
          ]}>
            Light
          </Text>
          {theme === 'light' && (
            <Ionicons name="checkmark-circle" size={20} color={colors.primary} style={styles.checkIcon} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            theme === 'dark' && styles.optionActive,
            { borderColor: colors.border }
          ]}
          onPress={() => theme !== 'dark' && toggleTheme()}
          activeOpacity={0.7}
        >
          <View style={[styles.iconCircle, { backgroundColor: '#1a1a2e' }]}>
            <Ionicons
              name="moon"
              size={24}
              color={theme === 'dark' ? colors.primary : colors.gray}
            />
          </View>
          <Text style={[
            styles.optionText,
            { color: theme === 'dark' ? colors.primary : colors.textSecondary }
          ]}>
            Dark
          </Text>
          {theme === 'dark' && (
            <Ionicons name="checkmark-circle" size={20} color={colors.primary} style={styles.checkIcon} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  option: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    marginHorizontal: 5,
    position: 'relative',
  },
  optionActive: {
    borderWidth: 2,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  checkIcon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});
