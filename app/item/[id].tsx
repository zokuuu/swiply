import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, Alert, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../styles/ThemeContext';
import { ITEMS } from '../../data/items';
import PageLayout from '../../components/PageLayout';
import { useLikesStore } from '../../store/useLikesStore';

const { width } = Dimensions.get('window');

export default function ItemDetailScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { id } = useLocalSearchParams();
  const { isLiked, addLike, removeLike } = useLikesStore();

  const item = ITEMS.find(i => i.id === id);
  const liked = item ? isLiked(item.id) : false;

  if (!item) {
    return (
      <PageLayout>
        <View style={[styles.notFound, { backgroundColor: colors.background }]}>
          <Ionicons name="alert-circle-outline" size={56} color={colors.error} />
          <Text style={[styles.notFoundText, { color: colors.text }]}>Item not found</Text>
        </View>
      </PageLayout>
    );
  }

  const toggleLike = () => {
    if (liked) removeLike(item.id);
    else addLike(item);
  };

  return (
    <PageLayout>
      <ScrollView
        style={[styles.container, { backgroundColor: colors.background }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageWrap}>
          <Image source={{ uri: item.image }} style={styles.image} />

          <TouchableOpacity
            style={[styles.floatBtn, {
              backgroundColor: colors.cardBackground + 'F0',
              borderColor: colors.border,
            }]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back-outline" size={20} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.floatBtnRight, {
              backgroundColor: colors.cardBackground + 'F0',
              borderColor: liked ? colors.accent + '88' : colors.border,
            }]}
            onPress={toggleLike}
          >
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={20}
              color={liked ? colors.accent : colors.textSecondary}
            />
          </TouchableOpacity>

          <View style={[styles.catBadge, {
            backgroundColor: colors.cardBackground + 'E6',
            borderColor: colors.border,
          }]}>
            <Text style={[styles.catText, { color: colors.primary }]}>
              {item.category.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={[styles.content, { backgroundColor: colors.background }]}>

          <Text style={[styles.name, { color: colors.text }]}>{item.name}</Text>
          <Text style={[styles.price, { color: colors.primary }]}>{item.price}</Text>

          {(item.distance || item.address) && (
            <View style={styles.locationRow}>
              {item.distance && (
                <View style={styles.locationItem}>
                  <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
                  <Text style={[styles.locationText, { color: colors.textSecondary }]}>{item.distance}</Text>
                </View>
              )}
              {item.address && (
                <View style={styles.locationItem}>
                  <Ionicons name="home-outline" size={14} color={colors.textSecondary} />
                  <Text style={[styles.locationText, { color: colors.textSecondary }]}>{item.address}</Text>
                </View>
              )}
            </View>
          )}

          <View style={[styles.section, { borderColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Seller</Text>
            <TouchableOpacity
              style={[styles.sellerCard, {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              }]}
              onPress={() => router.push(`/seller/${item.seller.id}`)}
              activeOpacity={0.7}
            >
              <Image
                source={{ uri: item.seller.avatar }}
                style={[styles.sellerAvatar, { borderColor: colors.primary + '66' }]}
              />
              <View style={styles.sellerInfo}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={[styles.sellerName, { color: colors.text }]}>{item.seller.name}</Text>
                  {item.seller.verified && (
                    <Ionicons name="checkmark-circle-outline" size={16} color={colors.primary} />
                  )}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 }}>
                  <Ionicons name="star" size={13} color={colors.accent} />
                  <Text style={[styles.sellerRating, { color: colors.textSecondary }]}>
                    {item.seller.rating} · {item.seller.reviews} reviews
                  </Text>
                </View>
                {item.seller.joinedDate && (
                  <Text style={[styles.sellerDate, { color: colors.textTertiary }]}>
                    On Swiply since {item.seller.joinedDate}
                  </Text>
                )}
              </View>
              <Ionicons name="chevron-forward-outline" size={16} color={colors.textTertiary} />
            </TouchableOpacity>
          </View>

          <View style={[styles.section, { borderColor: colors.border }]}>
            <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Description</Text>
            <Text style={[styles.description, { color: colors.text }]}>
              {item.fullDescription || item.description}
            </Text>
          </View>

          {item.features && item.features.length > 0 && (
            <View style={[styles.section, { borderColor: colors.border }]}>
              <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>Features</Text>
              <View style={styles.tagsRow}>
                {item.features.map((f, i) => (
                  <View key={i} style={[styles.tag, {
                    backgroundColor: colors.primary + '18',
                    borderColor: colors.primary + '44',
                  }]}>
                    <Text style={[styles.tagText, { color: colors.primary }]}>{f}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.infoGrid}>
            {item.delivery !== undefined && (
              <View style={[styles.infoBlock, {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              }]}>
                <Text style={[styles.infoBlockTitle, { color: colors.textSecondary }]}>Delivery</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 6 }}>
                  <Ionicons
                    name={item.delivery ? 'checkmark-circle-outline' : 'close-circle-outline'}
                    size={18}
                    color={item.delivery ? colors.success : colors.error}
                  />
                  <Text style={[styles.infoBlockText, { color: colors.text }]}>
                    {item.delivery ? 'Available' : 'Pick up'}
                  </Text>
                </View>
              </View>
            )}
            {item.paymentMethods && (
              <View style={[styles.infoBlock, {
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              }]}>
                <Text style={[styles.infoBlockTitle, { color: colors.textSecondary }]}>Payment</Text>
                <View style={{ flexDirection: 'row', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
                  {item.paymentMethods.card && (
                    <View style={[styles.payBadge, { backgroundColor: colors.success + '18', borderColor: colors.success + '44' }]}>
                      <Ionicons name="card-outline" size={12} color={colors.success} />
                      <Text style={[styles.payText, { color: colors.success }]}>Card</Text>
                    </View>
                  )}
                  {item.paymentMethods.cash && (
                    <View style={[styles.payBadge, { backgroundColor: colors.success + '18', borderColor: colors.success + '44' }]}>
                      <Ionicons name="cash-outline" size={12} color={colors.success} />
                      <Text style={[styles.payText, { color: colors.success }]}>Cash</Text>
                    </View>
                  )}
                  {item.paymentMethods.online && (
                    <View style={[styles.payBadge, { backgroundColor: colors.success + '18', borderColor: colors.success + '44' }]}>
                      <Ionicons name="globe-outline" size={12} color={colors.success} />
                      <Text style={[styles.payText, { color: colors.success }]}>Online</Text>
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>

          <TouchableOpacity
            style={[styles.ctaBtn, { backgroundColor: colors.primary }]}
            onPress={() => Alert.alert('Chat', 'Chat with seller')}
            activeOpacity={0.8}
          >
            <Ionicons name="chatbubble-outline" size={18} color="#fff" />
            <Text style={styles.ctaBtnText}>Chat with seller</Text>
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
  imageWrap: { position: 'relative' },
  image: { width, height: width * 0.75, resizeMode: 'cover' },
  floatBtn: {
    position: 'absolute', top: 52, left: 20,
    width: 40, height: 40, borderRadius: 12, borderWidth: 1,
    justifyContent: 'center', alignItems: 'center',
  },
  floatBtnRight: {
    position: 'absolute', top: 52, right: 20,
    width: 40, height: 40, borderRadius: 12, borderWidth: 1,
    justifyContent: 'center', alignItems: 'center',
  },
  catBadge: {
    position: 'absolute', bottom: 14, right: 14,
    paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 20, borderWidth: 1,
  },
  catText: { fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  content: { padding: 20 },
  name: { fontSize: 26, fontWeight: '800', letterSpacing: 0.2, marginBottom: 4 },
  price: { fontSize: 24, fontWeight: '800', marginBottom: 12 },
  locationRow: { flexDirection: 'row', gap: 16, marginBottom: 4 },
  locationItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: { fontSize: 13 },
  section: { marginTop: 20, paddingTop: 20, borderTopWidth: 1 },
  sectionTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 },
  sellerCard: {
    flexDirection: 'row', alignItems: 'center',
    padding: 12, borderRadius: 14, borderWidth: 1,
  },
  sellerAvatar: { width: 52, height: 52, borderRadius: 26, borderWidth: 2, marginRight: 12 },
  sellerInfo: { flex: 1 },
  sellerName: { fontSize: 16, fontWeight: '700' },
  sellerRating: { fontSize: 13 },
  sellerDate: { fontSize: 11, marginTop: 2 },
  description: { fontSize: 15, lineHeight: 24 },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  tag: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1 },
  tagText: { fontSize: 12, fontWeight: '600' },
  infoGrid: { flexDirection: 'row', gap: 12, marginTop: 20 },
  infoBlock: { flex: 1, padding: 14, borderRadius: 14, borderWidth: 1 },
  infoBlockTitle: { fontSize: 10, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase' },
  infoBlockText: { fontSize: 14, fontWeight: '600' },
  payBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, borderWidth: 1 },
  payText: { fontSize: 11, fontWeight: '600' },
  ctaBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 10, paddingVertical: 16, borderRadius: 14, marginTop: 24,
  },
  ctaBtnText: { color: '#fff', fontSize: 15, fontWeight: '700', letterSpacing: 0.5 },
});
