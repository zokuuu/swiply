import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../styles/ThemeContext';
import { useLikesStore } from '../store/useLikesStore';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const TABS: { key: string; route: string; label: string; icon: IoniconName; iconActive: IoniconName }[] = [
  { key: 'swipe', route: '/', label: 'Swipe', icon: 'infinite-outline', iconActive: 'infinite' },
  { key: 'categories', route: '/categories', label: 'Categories', icon: 'grid-outline', iconActive: 'grid' },
  { key: 'search', route: '/search', label: 'Search', icon: 'search-outline', iconActive: 'search' },
  { key: 'likes', route: '/likes', label: 'Likes', icon: 'heart-outline', iconActive: 'heart' },
  { key: 'profile', route: '/profile', label: 'Profile', icon: 'person-outline', iconActive: 'person' },
];

export default function GlobalFooter() {
  const router = useRouter();
  const pathname = usePathname();
  const { colors } = useTheme();
  const { likedItems } = useLikesStore();

  const getActive = () => {
    if (pathname === '/' || pathname?.includes('/item/') || pathname?.includes('/seller/')) return 'swipe';
    if (pathname === '/likes') return 'likes';
    if (pathname === '/profile') return 'profile';
    if (pathname === '/categories') return 'categories';
    if (pathname === '/search') return 'search';
    return 'swipe';
  };

  const active = getActive();

  return (
    <View style={[styles.bar, {
      backgroundColor: colors.cardBackground,
      borderTopColor: colors.border,
    }]}>
      {TABS.map(tab => {
        const isActive = active === tab.key;
        const color = isActive ? colors.primary : colors.textSecondary;

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tab}
            onPress={() => router.push(tab.route as any)}
            activeOpacity={0.7}
          >
            <View style={styles.iconWrap}>
              <Ionicons
                name={isActive ? tab.iconActive : tab.icon}
                size={22}
                color={color}
              />
              {tab.key === 'likes' && likedItems.length > 0 && (
                <View style={[styles.badge, { backgroundColor: colors.accent }]}>
                  <Text style={styles.badgeText}>
                    {likedItems.length > 9 ? '9+' : String(likedItems.length)}
                  </Text>
                </View>
              )}
            </View>

            <Text style={[
              styles.label,
              { color },
              isActive && styles.labelActive,
            ]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: 10,
    paddingBottom: 28,
    paddingHorizontal: 4,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  iconWrap: {
    position: 'relative',
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.1,
    marginTop: 1,
  },
  labelActive: {
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    minWidth: 15,
    height: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontSize: 8,
    fontWeight: '800',
    color: '#0D0D14',
    lineHeight: 10,
  },
});
