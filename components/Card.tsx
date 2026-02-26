import React, { useRef, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../styles/ThemeContext';
import { cardStyles } from '../styles/card.styles';

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
    paymentMethods?: {
      card: boolean;
      cash: boolean;
      online?: boolean;
    };
    features?: string[];
    seller: {
      id: string;
      name: string;
      avatar: string;
      rating: number;
      reviews: number;
      verified: boolean;
      joinedDate?: string;
    };
  };
}

export default function Card({ item }: CardProps) {
  const { colors } = useTheme();
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  if (!item) {
    return (
      <View style={[cardStyles.card, { backgroundColor: colors.cardBackground }]}>
        <View style={[cardStyles.image, { justifyContent: 'center', alignItems: 'center', backgroundColor: colors.lightGray }]}>
          <Ionicons name="image-outline" size={50} color={colors.gray} />
        </View>
        <View style={[cardStyles.infoContainer, { backgroundColor: colors.cardBackground }]}>
          <Text style={[cardStyles.name, { color: colors.text }]}>Loading...</Text>
        </View>
      </View>
    );
  }

  const handlePress = () => {
    if (!isScrolling) {
      router.push(`/item/${item.id}`);
    }
  };

  const handleSellerPress = (e: any) => {
    e.stopPropagation();
    router.push(`/seller/${item.seller.id}`);
  };

  const handleScrollBegin = () => {
    setIsScrolling(true);
  };

  const handleScrollEnd = () => {
    setTimeout(() => setIsScrolling(false), 100);
  };

  return (
    <View style={[cardStyles.card, { backgroundColor: colors.cardBackground }]}>
      <Image source={{ uri: item.image }} style={cardStyles.image} />

      <View style={cardStyles.overlay}>
        <View style={[cardStyles.categoryBadge, { backgroundColor: colors.primary + 'CC' }]}>
          <Text style={cardStyles.categoryText}>{item.category}</Text>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={[cardStyles.infoContainer, { backgroundColor: colors.cardBackground }]}
        showsVerticalScrollIndicator={true}
        bounces={true}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        onScrollBeginDrag={handleScrollBegin}
        onScrollEndDrag={handleScrollEnd}
        onMomentumScrollEnd={handleScrollEnd}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handlePress}
        >
          <View pointerEvents="auto">
            <Text style={[cardStyles.name, { color: colors.text }]}>{item.name}</Text>
            <Text style={[cardStyles.price, { color: colors.primary }]}>{item.price}</Text>

            {(item.distance || item.address) && (
              <View style={cardStyles.locationContainer}>
                {item.distance && (
                  <View style={cardStyles.locationRow}>
                    <Ionicons name="location-outline" size={16} color={colors.primary} />
                    <Text style={[cardStyles.locationText, { color: colors.textSecondary }]}>
                      {item.distance}
                    </Text>
                  </View>
                )}
                {item.address && (
                  <View style={cardStyles.locationRow}>
                    <Ionicons name="home-outline" size={16} color={colors.primary} />
                    <Text style={[cardStyles.locationText, { color: colors.textSecondary }]}>
                      {item.address}
                    </Text>
                  </View>
                )}
              </View>
            )}

            <View style={cardStyles.sellerContainer}>
              <TouchableOpacity
                onPress={handleSellerPress}
                style={cardStyles.sellerInfo}
              >
                <Image source={{ uri: item.seller.avatar }} style={cardStyles.sellerAvatar} />
                <View style={cardStyles.sellerDetails}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[cardStyles.sellerName, { color: colors.text }]}>{item.seller.name}</Text>
                    {item.seller.verified && (
                      <Ionicons name="checkmark-circle" size={14} color={colors.primary} style={{ marginLeft: 4 }} />
                    )}
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={[cardStyles.sellerRating, { color: colors.textSecondary }]}>
                      {item.seller.rating} ({item.seller.reviews})
                    </Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.gray} />
              </TouchableOpacity>
            </View>

            <View style={[cardStyles.divider, { backgroundColor: colors.border }]} />

            <Text style={[cardStyles.sectionTitle, { color: colors.text }]}>Description</Text>
            <Text style={[cardStyles.fullDescription, { color: colors.textSecondary }]}>
              {item.fullDescription || item.description}
            </Text>

            {item.features && item.features.length > 0 && (
              <>
                <Text style={[cardStyles.sectionTitle, { color: colors.text, marginTop: 16 }]}>
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
                <Text style={[cardStyles.sectionTitle, { color: colors.text, marginTop: 16 }]}>
                  Delivery
                </Text>
                <View style={cardStyles.deliveryContainer}>
                  <Ionicons
                    name={item.delivery ? "checkmark-circle" : "close-circle"}
                    size={20}
                    color={item.delivery ? colors.success : colors.error}
                  />
                  <Text style={[cardStyles.deliveryText, { color: colors.textSecondary }]}>
                    {item.delivery ? 'Delivery available' : 'Pick up'}
                  </Text>
                </View>
              </>
            )}

            {item.paymentMethods && (
              <>
                <Text style={[cardStyles.sectionTitle, { color: colors.text, marginTop: 16 }]}>
                  Payment
                </Text>
                <View style={cardStyles.paymentContainer}>
                  {item.paymentMethods.card && (
                    <View style={[cardStyles.paymentBadge, { backgroundColor: colors.lightGray }]}>
                      <Ionicons name="card-outline" size={16} color={colors.success} />
                      <Text style={[cardStyles.paymentText, { color: colors.textSecondary }]}>Card</Text>
                    </View>
                  )}
                  {item.paymentMethods.cash && (
                    <View style={[cardStyles.paymentBadge, { backgroundColor: colors.lightGray }]}>
                      <Ionicons name="cash-outline" size={16} color={colors.success} />
                      <Text style={[cardStyles.paymentText, { color: colors.textSecondary }]}>Cash</Text>
                    </View>
                  )}
                  {item.paymentMethods.online && (
                    <View style={[cardStyles.paymentBadge, { backgroundColor: colors.lightGray }]}>
                      <Ionicons name="globe-outline" size={16} color={colors.success} />
                      <Text style={[cardStyles.paymentText, { color: colors.textSecondary }]}>Online</Text>
                    </View>
                  )}
                </View>
              </>
            )}

            <View style={cardStyles.hintContainer}>
              <Ionicons name="hand-left-outline" size={20} color={colors.gray} />
              <Text style={[cardStyles.hintText, { color: colors.gray }]}>
                Swipe to select • Tap for details
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
