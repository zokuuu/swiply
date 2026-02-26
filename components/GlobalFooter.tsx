import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../styles/ThemeContext';
import { useLikesStore } from '../store/useLikesStore';
import { homeStyles } from '../styles/home.styles';

export default function GlobalFooter() {
  const router = useRouter();
  const pathname = usePathname();
  const { colors } = useTheme();
  const { likedItems } = useLikesStore();

  const getActiveTab = () => {
    if (pathname === '/') return 'swipe';
    if (pathname === '/likes') return 'likes';
    if (pathname === '/profile') return 'profile';
    if (pathname?.includes('/item/')) return 'swipe';
    if (pathname?.includes('/seller/')) return 'swipe';
    if (pathname === '/categories') return 'categories';
    if (pathname === '/search') return 'search';
    return 'swipe';
  };

  const activeTab = getActiveTab();

  const navigateTo = (route: string, tab: string) => {
    router.push(route as any);
  };

  return (
    <View style={[homeStyles.footer, { backgroundColor: colors.cardBackground }]} pointerEvents="auto">
      <TouchableOpacity
        style={[
          homeStyles.footerItem,
        ]}
        onPress={() => navigateTo('/', 'swipe')}
        activeOpacity={0.7}
      >
        <Ionicons
          name={activeTab === 'swipe' ? 'infinite' : 'infinite-sharp'}
          size={24}
          color={activeTab === 'swipe' ? colors.primary : colors.gray}
          style={homeStyles.footerIcon}
        />
        <Text style={[
          homeStyles.footerLabel,
          { color: activeTab === 'swipe' ? colors.primary : colors.textSecondary }
        ]}>
          Swipe!
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          homeStyles.footerItem,
        ]}
        onPress={() => navigateTo('/categories', 'categories')}
        activeOpacity={0.7}
      >
        <Ionicons
          name={activeTab === 'categories' ? 'grid' : 'grid-outline'}
          size={24}
          color={activeTab === 'categories' ? colors.primary : colors.gray}
          style={homeStyles.footerIcon}
        />
        <Text style={[
          homeStyles.footerLabel,
          { color: activeTab === 'categories' ? colors.primary : colors.textSecondary }
        ]}>
          Categories
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          homeStyles.footerItem,
        ]}
        onPress={() => navigateTo('/search', 'search')}
        activeOpacity={0.7}
      >
        <Ionicons
          name={activeTab === 'search' ? 'search' : 'search-outline'}
          size={24}
          color={activeTab === 'search' ? colors.primary : colors.gray}
          style={homeStyles.footerIcon}
        />
        <Text style={[
          homeStyles.footerLabel,
          { color: activeTab === 'search' ? colors.primary : colors.textSecondary }
        ]}>
          Search
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          homeStyles.footerItem,
        ]}
        onPress={() => navigateTo('/likes', 'likes')}
        activeOpacity={0.7}
      >
        <View>
          <Ionicons
            name={activeTab === 'likes' ? 'heart' : 'heart-outline'}
            size={24}
            color={activeTab === 'likes' ? colors.primary : colors.gray}
            style={homeStyles.footerIcon}
          />
          {likedItems.length > 0 && (
            <View style={[homeStyles.badge, { backgroundColor: colors.accent }]}>
              <Text style={homeStyles.badgeText}>{likedItems.length}</Text>
            </View>
          )}
        </View>
        <Text style={[
          homeStyles.footerLabel,
          { color: activeTab === 'likes' ? colors.primary : colors.textSecondary }
        ]}>
          Likes
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          homeStyles.footerItem,
        ]}
        onPress={() => navigateTo('/profile', 'profile')}
        activeOpacity={0.7}
      >
        <Ionicons
          name={activeTab === 'profile' ? 'person' : 'person-outline'}
          size={24}
          color={activeTab === 'profile' ? colors.primary : colors.gray}
          style={homeStyles.footerIcon}
        />
        <Text style={[
          homeStyles.footerLabel,
          { color: activeTab === 'profile' ? colors.primary : colors.textSecondary }
        ]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
}
