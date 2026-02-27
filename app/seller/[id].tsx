import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../styles/ThemeContext';
import { SELLERS } from '../../data/items';
import PageLayout from '../../components/PageLayout';

export default function SellerScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { id } = useLocalSearchParams();
  const seller = SELLERS[id as string];

  if (!seller) {
    return (
      <PageLayout>
        <View style={[styles.notFound, { backgroundColor: colors.background }]}>
          <Ionicons name="alert-circle-outline" size={56} color={colors.error} />
          <Text style={[styles.notFoundText, { color: colors.text }]}>Seller not found</Text>
        </View>
      </PageLayout>
    );
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => {
      const full = i < Math.floor(rating);
      const half = !full && i === Math.floor(rating) && rating % 1 >= 0.5;
      return (
        <Ionicons
          key={i}
          name={full ? 'star' : half ? 'star-half' : 'star-outline'}
          size={16}
          color={colors.accent}
        />
      );
    });
  };

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

          <View style={styles.profileWrap}>
            <Image
              source={{ uri: seller.avatar }}
              style={[styles.avatar, { borderColor: colors.primary }]}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <Text style={[styles.sellerName, { color: colors.text }]}>{seller.name}</Text>
              {seller.verified && (
                <Ionicons name="checkmark-circle-outline" size={20} color={colors.primary} />
              )}
            </View>
            <View style={{ flexDirection: 'row', gap: 4, marginBottom: 6 }}>
              {renderStars(seller.rating)}
              <Text style={[styles.ratingText, { color: colors.textSecondary }]}>
                {seller.rating.toFixed(1)} · {seller.reviews} reviews
              </Text>
            </View>
            <Text style={[styles.joinDate, { color: colors.textTertiary }]}>
              On Swiply since {seller.joinedDate}
            </Text>
          </View>
        </View>

        <View style={styles.content}>

          <View style={[styles.statsRow, {
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          }]}>
            <View style={styles.statItem}>
              <Ionicons name="chatbubble-outline" size={18} color={colors.primary} style={{ marginBottom: 6 }} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {seller.response_rate ?? 0}%
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Response</Text>
            </View>
            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={18} color={colors.primary} style={{ marginBottom: 6 }} />
              <Text style={[styles.statValue, { color: colors.text }]}>
                {seller.response_time ?? '—'}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Avg. reply</Text>
            </View>
          </View>

          <View style={[styles.card, {
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          }]}>
            <Text style={[styles.cardTitle, { color: colors.textSecondary }]}>About</Text>
            <Text style={[styles.cardBody, { color: colors.text }]}>{seller.description}</Text>
          </View>

          <View style={[styles.card, {
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          }]}>
            <Text style={[styles.cardTitle, { color: colors.textSecondary }]}>Listings</Text>
            <View style={styles.emptyListings}>
              <Ionicons name="bag-outline" size={32} color={colors.textTertiary} />
              <Text style={[styles.emptyListingsText, { color: colors.textTertiary }]}>
                No active listings
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.ctaBtn, { backgroundColor: colors.primary }]}
            onPress={() => Alert.alert('Chat', `Chat with ${seller.name}`)}
            activeOpacity={0.8}
          >
            <Ionicons name="chatbubble-outline" size={18} color="#fff" />
            <Text style={styles.ctaBtnText}>Chat with {seller.name}</Text>
          </TouchableOpacity>

          <View style={{ height: 20 }} />
        </View>
      </ScrollView>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  notFound: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  notFoundText: { fontSize: 16, fontWeight: '600' },
  header: {
    paddingTop: 54,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  backBtn: {
    position: 'absolute', top: 54, left: 20,
    width: 36, height: 36, borderRadius: 10, borderWidth: 1,
    justifyContent: 'center', alignItems: 'center',
  },
  profileWrap: { alignItems: 'center', marginTop: 8 },
  avatar: {
    width: 100, height: 100, borderRadius: 50, borderWidth: 2, marginBottom: 14,
  },
  sellerName: { fontSize: 24, fontWeight: '800', letterSpacing: 0.2 },
  ratingText: { fontSize: 13, marginLeft: 4 },
  joinDate: { fontSize: 12 },
  content: { padding: 16 },
  statsRow: {
    flexDirection: 'row', borderRadius: 16, borderWidth: 1,
    marginBottom: 12, overflow: 'hidden',
  },
  statItem: {
    flex: 1, alignItems: 'center', paddingVertical: 16,
  },
  statValue: { fontSize: 17, fontWeight: '800', marginBottom: 3 },
  statLabel: { fontSize: 11, fontWeight: '600', letterSpacing: 0.5, textTransform: 'uppercase' },
  statDivider: { width: 1 },
  card: {
    borderRadius: 16, borderWidth: 1, padding: 16, marginBottom: 12,
  },
  cardTitle: {
    fontSize: 11, fontWeight: '700', letterSpacing: 1.5,
    textTransform: 'uppercase', marginBottom: 10,
  },
  cardBody: { fontSize: 14, lineHeight: 22 },
  emptyListings: { alignItems: 'center', paddingVertical: 24, gap: 8 },
  emptyListingsText: { fontSize: 13 },
  ctaBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, paddingVertical: 16, borderRadius: 14, marginTop: 4,
  },
  ctaBtnText: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
});
