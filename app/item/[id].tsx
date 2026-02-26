import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../styles/ThemeContext';
import { ITEMS } from '../../data/items';
import { cardStyles } from '../../styles/card.styles';
import PageLayout from '../../components/PageLayout';

const { width } = Dimensions.get('window');

export default function ItemDetailScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { id } = useLocalSearchParams();

  const item = ITEMS.find(item => item.id === id);

  if (!item) {
    return (
      <PageLayout>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
          <Ionicons name="alert-circle-outline" size={60} color={colors.error} />
          <Text style={{ color: colors.text, marginTop: 16, fontSize: 18 }}>Товар не найден</Text>
        </View>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            position: 'absolute',
            top: 50,
            left: 20,
            zIndex: 10,
            backgroundColor: colors.cardBackground + 'CC',
            borderRadius: 25,
            padding: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>

        <Image
          source={{ uri: item.image }}
          style={{ width, height: width * 0.8, resizeMode: 'cover' }}
        />

        <View style={{ padding: 20 }}>
          <Text style={[cardStyles.name, { color: colors.text, fontSize: 28 }]}>{item.name}</Text>
          <Text style={[cardStyles.price, { color: colors.primary, fontSize: 26 }]}>{item.price}</Text>

          {(item.distance || item.address) && (
            <View style={cardStyles.locationContainer}>
              {item.distance && (
                <View style={cardStyles.locationRow}>
                  <Ionicons name="location-outline" size={18} color={colors.primary} />
                  <Text style={[cardStyles.locationText, { color: colors.textSecondary, fontSize: 15 }]}>
                    {item.distance}
                  </Text>
                </View>
              )}
              {item.address && (
                <View style={cardStyles.locationRow}>
                  <Ionicons name="home-outline" size={18} color={colors.primary} />
                  <Text style={[cardStyles.locationText, { color: colors.textSecondary, fontSize: 15 }]}>
                    {item.address}
                  </Text>
                </View>
              )}
            </View>
          )}

          <View style={[cardStyles.categoryBadge, { backgroundColor: colors.primary, alignSelf: 'flex-start', marginTop: 10 }]}>
            <Text style={cardStyles.categoryText}>{item.category}</Text>
          </View>

          <View style={[cardStyles.sellerContainer, { marginTop: 20 }]}>
            <Text style={[cardStyles.sectionTitle, { color: colors.text, fontSize: 18 }]}>Seller</Text>
            <TouchableOpacity
              onPress={() => router.push(`/seller/${item.seller.id}`)}
              style={cardStyles.sellerInfo}
              activeOpacity={0.7}
            >
              <Image source={{ uri: item.seller.avatar }} style={[cardStyles.sellerAvatar, { width: 60, height: 60, borderRadius: 30 }]} />
              <View style={cardStyles.sellerDetails}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={[cardStyles.sellerName, { color: colors.text, fontSize: 18 }]}>{item.seller.name}</Text>
                  {item.seller.verified && (
                    <Ionicons name="checkmark-circle" size={18} color={colors.primary} style={{ marginLeft: 4 }} />
                  )}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={[cardStyles.sellerRating, { color: colors.textSecondary, fontSize: 14, marginLeft: 4 }]}>
                    {item.seller.rating} ({item.seller.reviews} reviews)
                  </Text>
                </View>
                {item.seller.joinedDate && (
                  <Text style={{ color: colors.textSecondary, fontSize: 13, marginTop: 4 }}>
                    On Swiply с {item.seller.joinedDate}
                  </Text>
                )}
              </View>
              <Ionicons name="chevron-forward" size={24} color={colors.gray} />
            </TouchableOpacity>
          </View>

          <View style={[cardStyles.divider, { backgroundColor: colors.border, marginVertical: 20 }]} />

          <Text style={[cardStyles.sectionTitle, { color: colors.text, fontSize: 20 }]}>Description</Text>
          <Text style={[cardStyles.fullDescription, { color: colors.textSecondary, fontSize: 16, lineHeight: 24 }]}>
            {item.fullDescription || item.description}
          </Text>

          {item.features && item.features.length > 0 && (
            <>
              <Text style={[cardStyles.sectionTitle, { color: colors.text, fontSize: 20, marginTop: 25 }]}>
                Features
              </Text>
              <View style={cardStyles.featuresContainer}>
                {item.features.map((feature, index) => (
                  <View key={index} style={[cardStyles.featureTag, { backgroundColor: colors.primaryLight }]}>
                    <Text style={cardStyles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {item.delivery !== undefined && (
            <>
              <Text style={[cardStyles.sectionTitle, { color: colors.text, fontSize: 20, marginTop: 25 }]}>
                Delivery
              </Text>
              <View style={cardStyles.deliveryContainer}>
                <Ionicons
                  name={item.delivery ? "checkmark-circle" : "close-circle"}
                  size={24}
                  color={item.delivery ? colors.success : colors.error}
                />
                <Text style={[cardStyles.deliveryText, { color: colors.textSecondary, fontSize: 16, marginLeft: 10 }]}>
                  {item.delivery ? 'Delivery' : 'Pickup'}
                </Text>
              </View>
            </>
          )}

          {item.paymentMethods && (
            <>
              <Text style={[cardStyles.sectionTitle, { color: colors.text, fontSize: 20, marginTop: 25 }]}>
                Payment
              </Text>
              <View style={cardStyles.paymentContainer}>
                {item.paymentMethods.card && (
                  <View style={[cardStyles.paymentBadge, { backgroundColor: colors.lightGray }]}>
                    <Ionicons name="card-outline" size={18} color={colors.success} />
                    <Text style={[cardStyles.paymentText, { color: colors.textSecondary }]}>Card</Text>
                  </View>
                )}
                {item.paymentMethods.cash && (
                  <View style={[cardStyles.paymentBadge, { backgroundColor: colors.lightGray }]}>
                    <Ionicons name="cash-outline" size={18} color={colors.success} />
                    <Text style={[cardStyles.paymentText, { color: colors.textSecondary }]}>Cash</Text>
                  </View>
                )}
                {item.paymentMethods.online && (
                  <View style={[cardStyles.paymentBadge, { backgroundColor: colors.lightGray }]}>
                    <Ionicons name="globe-outline" size={18} color={colors.success} />
                    <Text style={[cardStyles.paymentText, { color: colors.textSecondary }]}>Online</Text>
                  </View>
                )}
              </View>
            </>
          )}

          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 16,
              borderRadius: 30,
              marginTop: 30,
              marginBottom: 10,
            }}
            activeOpacity={0.8}
            onPress={() => Alert.alert('Chat', 'Chat with seller here')}
          >
            <Ionicons name="chatbubble-outline" size={22} color="#fff" />
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600', marginLeft: 10 }}>
              Chat with seller
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </PageLayout>
  );
}
