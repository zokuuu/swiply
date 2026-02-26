import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../styles/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import PageLayout from '../components/PageLayout';
import { profileStyles } from '../styles/profile.styles';

export default function ProfileScreen() {
  const router = useRouter();
  const { colors, theme } = useTheme();

  const dynamicStyles = {
    header: {
      backgroundColor: colors.cardBackground,
    },
    statsContainer: {
      backgroundColor: colors.cardBackground,
    },
    menuContainer: {
      backgroundColor: colors.cardBackground,
    },
  };

  return (
    <PageLayout>
      <ScrollView style={[profileStyles.container, { backgroundColor: colors.background }]}>
        <View style={[profileStyles.header, dynamicStyles.header]}>
          <TouchableOpacity
            style={profileStyles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>

          <View style={profileStyles.headerContent}>
            <View style={profileStyles.avatarContainer}>
              <View style={[profileStyles.avatarPlaceholder, { borderColor: colors.primary }]}>
                <Ionicons name="person" size={60} color={colors.primary} />
              </View>
              <TouchableOpacity style={[profileStyles.editButton, { backgroundColor: colors.primary }]}>
                <Ionicons name="camera" size={14} color={colors.white} />
              </TouchableOpacity>
            </View>
            <Text style={[profileStyles.name, { color: colors.text }]}>Jone Dow</Text>
            <Text style={[profileStyles.username, { color: colors.primary }]}>@happyminimalist</Text>
            <Text style={[profileStyles.bio, { color: colors.textSecondary }]}>
              Simple life without disctractions. Collect interesting staff. Swiply help me with it 💓
            </Text>
          </View>
        </View>

        <View style={[profileStyles.statsContainer, dynamicStyles.statsContainer]}>
          <View style={profileStyles.statItem}>
            <Text style={[profileStyles.statNumber, { color: colors.primary }]}>47</Text>
            <Text style={[profileStyles.statLabel, { color: colors.textSecondary }]}>Swipes</Text>
          </View>
          <View style={profileStyles.statItem}>
            <Text style={[profileStyles.statNumber, { color: colors.primary }]}>12</Text>
            <Text style={[profileStyles.statLabel, { color: colors.textSecondary }]}>Likes</Text>
          </View>
          <View style={profileStyles.statItem}>
            <Text style={[profileStyles.statNumber, { color: colors.primary }]}>3</Text>
            <Text style={[profileStyles.statLabel, { color: colors.textSecondary }]}>Matches</Text>
          </View>
        </View>

        <ThemeToggle />

        <View style={[profileStyles.menuContainer, dynamicStyles.menuContainer]}>
          <TouchableOpacity style={profileStyles.menuItem}>
            <Ionicons name="settings-outline" size={22} color={colors.primary} />
            <Text style={[profileStyles.menuText, { color: colors.text }]}>Settings</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
          </TouchableOpacity>

          <TouchableOpacity
            style={profileStyles.menuItem}
            onPress={() => router.push('/likes')}
          >
            <Ionicons name="heart-outline" size={22} color={colors.primary} />
            <Text style={[profileStyles.menuText, { color: colors.text }]}>Likes</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
          </TouchableOpacity>

          <TouchableOpacity style={profileStyles.menuItem}>
            <Ionicons name="notifications-outline" size={22} color={colors.primary} />
            <Text style={[profileStyles.menuText, { color: colors.text }]}>Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
          </TouchableOpacity>

          <TouchableOpacity style={[profileStyles.menuItem, profileStyles.menuItemLast]}>
            <Ionicons name="help-circle-outline" size={22} color={colors.primary} />
            <Text style={[profileStyles.menuText, { color: colors.text }]}>Help</Text>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[profileStyles.menuContainer, { marginTop: 20, marginBottom: 30 }]}>
          <View style={[profileStyles.menuItem, profileStyles.menuItemLast]}>
            <Ionicons name="log-out-outline" size={22} color={colors.error} />
            <Text style={[profileStyles.menuText, profileStyles.logoutText, { color: colors.error }]}>
              Log out
            </Text>
            <Ionicons name="chevron-forward" size={20} color={colors.gray} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </PageLayout>
  );
}
