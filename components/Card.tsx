import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../styles/ThemeContext';

const { width, height } = Dimensions.get('window');

interface CardProps {
  item?: {
    id: string;
    name: string;
    price: string;
    category: string;
    image: string;
    description: string;
    fullDescription?: string;
    distance?: string;
    address?: string;
    delivery?: boolean;
    paymentMethods?: { card: boolean; cash: boolean; online?: boolean };
    features?: string[];
    seller: {
      id: string;
      name: string;
      avatar: string;
      rating: number;
      reviews: number;
      verified: boolean;
    };
  };
}

function Stars({ rating }: { rating: number }) {
  const { colors } = useTheme();
  return (
    <View style={styles.starsRow}>
      {[1, 2, 3, 4, 5].map(i => (
        <Ionicons
          key={i}
          name={i <= Math.round(rating) ? 'star' : 'star-outline'}
          size={12}
          color={colors.accent}
        />
      ))}
    </View>
  );
}

function Avatar({ name, uri, color }: { name: string; uri: string; color: string }) {
  const initial = name.charAt(0).toUpperCase();
  const [failed, setFailed] = React.useState(false);

  if (uri && !failed) {
    return (
      <Image
        source={{ uri }}
        style={[styles.avatarImg, { borderColor: color + '66' }]}
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <View style={[styles.avatarCircle, { backgroundColor: color + '33', borderColor: color + '66', borderWidth: 1 }]}>
      <Text style={[styles.avatarText, { color }]}>{initial}</Text>
    </View>
  );
}

export default function Card({ item }: CardProps) {
  const { colors } = useTheme();
  const router = useRouter();

  if (!item) {
    return (
      <View style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}>
        <View style={[styles.image, { backgroundColor: colors.border }]} />
        <View style={styles.info}>
          <View style={[styles.skeletonLine, { width: '70%', backgroundColor: colors.border }]} />
          <View style={[styles.skeletonLine, { width: '40%', backgroundColor: colors.border, marginTop: 6 }]} />
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.95}
      onPress={() => router.push(`/item/${item.id}`)}
      style={[styles.card, { backgroundColor: colors.cardBackground, borderColor: colors.border }]}
    >
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.badgeWrap}>
        <View style={[styles.badge, {
          backgroundColor: colors.background + 'E8',
          borderColor: colors.border,
        }]}>
          <Text style={[styles.badgeText, { color: colors.primary }]}>
            {item.category.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={[styles.info, { backgroundColor: colors.cardBackground }]}>

        <Text style={[styles.name, { color: colors.text }]} numberOfLines={2}>
          {item.name}
        </Text>

        <Text style={[styles.price, { color: colors.primary }]}>
          {item.price}
        </Text>

        <View style={[styles.sellerRow, { borderTopColor: colors.border }]}>
          <Avatar name={item.seller.name} uri={item.seller.avatar} color={colors.primary} />

          <Text style={[styles.sellerName, { color: colors.text }]} numberOfLines={1}>
            {item.seller.name}
          </Text>

          {item.seller.verified && (
            <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
          )}

          <Stars rating={item.seller.rating} />
        </View>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width * 0.88,
    height: height * 0.56,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    alignSelf: 'center',
  },

  image: {
    width: '100%',
    height: '58%',
    resizeMode: 'cover',
  },

  badgeWrap: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },

  info: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.2,
    lineHeight: 24,
  },
  price: {
    fontSize: 24,
    fontWeight: '800',
    marginTop: 2,
  },

  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  avatarImg: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
  },
  avatarCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '800',
  },
  sellerName: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 1,
  },

  skeletonLine: {
    height: 14,
    borderRadius: 7,
  },
});
