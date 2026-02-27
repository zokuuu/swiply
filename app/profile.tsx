import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../styles/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import PageLayout from '../components/PageLayout';

export default function ProfileScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const menuItems = [
    { icon: 'settings-outline', label: 'Settings', onPress: () => { } },
    { icon: 'heart-outline', label: 'Likes', onPress: () => router.push('/likes') },
    { icon: 'notifications-outline', label: 'Notifications', onPress: () => { } },
    { icon: 'help-circle-outline', label: 'Help', onPress: () => { } },
  ];

  return (
    <PageLayout>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
      >

        <View style={[styles.header, {
          backgroundColor: colors.cardBackground,
          borderBottomColor: colors.border,
        }]}>
          <TouchableOpacity
            style={[styles.backBtn, { borderColor: colors.border }]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back-outline" size={18} color={colors.textSecondary} />
          </TouchableOpacity>

          <View style={styles.headerContent}>
            <View style={styles.avatarWrap}>
              <View style={[styles.avatar, {
                borderColor: colors.primary,
                backgroundColor: colors.primary + '18',
              }]}>
                <Ionicons name="person-outline" size={44} color={colors.primary} />
              </View>
              <TouchableOpacity style={[styles.avatarEditBtn, {
                backgroundColor: colors.primary,
                borderColor: colors.cardBackground,
              }]}>
                <Ionicons name="camera-outline" size={12} color="#fff" />
              </TouchableOpacity>
            </View>

            <Text style={[styles.name, { color: colors.text }]}>Jone Dow</Text>
            <Text style={[styles.username, { color: colors.primary }]}>@happyminimalist</Text>
            <Text style={[styles.bio, { color: colors.textSecondary }]}>
              Simple life without distractions.{'\n'}Collecting interesting things with Swiply 💙
            </Text>
          </View>
        </View>

        <View style={[styles.statsRow, {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        }]}>
          {[
            { value: '47', label: 'Swipes' },
            { value: '12', label: 'Likes' },
            { value: '3', label: 'Matches' },
          ].map((stat, i, arr) => (
            <React.Fragment key={stat.label}>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.primary }]}>{stat.value}</Text>
                <Text style={[styles.statLabel, { color: colors.textSecondary }]}>{stat.label}</Text>
              </View>
              {i < arr.length - 1 && (
                <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
              )}
            </React.Fragment>
          ))}
        </View>

        <ThemeToggle />

        <View style={[styles.menuCard, {
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        }]}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.menuItem,
                { borderBottomColor: colors.border },
                index === menuItems.length - 1 && styles.menuItemLast,
              ]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIconWrap, { backgroundColor: colors.primary + '18' }]}>
                <Ionicons name={item.icon as any} size={18} color={colors.primary} />
              </View>
              <Text style={[styles.menuLabel, { color: colors.text }]}>{item.label}</Text>
              <Ionicons name="chevron-forward-outline" size={16} color={colors.textTertiary} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.logoutBtn, {
            backgroundColor: colors.cardBackground,
            borderColor: colors.error + '44',
          }]}
          onPress={() => Alert.alert('Log out', 'Are you sure?', [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Log out', style: 'destructive' },
          ])}
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={18} color={colors.error} />
          <Text style={[styles.logoutText, { color: colors.error }]}>Log out</Text>
        </TouchableOpacity>

        <View style={{ height: 24 }} />
      </ScrollView>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 54,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEditBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.2,
    marginBottom: 4,
  },
  username: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  bio: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    borderWidth: 1,
    paddingVertical: 18,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 3,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  statDivider: {
    width: 1,
    height: 32,
  },
  menuCard: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    gap: 12,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginHorizontal: 20,
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
