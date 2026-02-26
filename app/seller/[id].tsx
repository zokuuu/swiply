import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../styles/ThemeContext';
import { SELLERS } from '../../data/items';
import { cardStyles } from '../../styles/card.styles';
import PageLayout from '../../components/PageLayout';

export default function SellerScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { id } = useLocalSearchParams();

  const seller = SELLERS[id as string];

  if (!seller) {
    return (
      <PageLayout>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
          <Ionicons name="alert-circle-outline" size={60} color={colors.error} />
          <Text style={{ color: colors.text, marginTop: 16, fontSize: 18 }}>Seller not found</Text>
        </View>
      </PageLayout>
    );
  }

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(seller.rating);
    const hasHalfStar = seller.rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Ionicons key={i} name="star" size={18} color="#FFD700" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Ionicons key={i} name="star-half" size={18} color="#FFD700" />);
      } else {
        stars.push(<Ionicons key={i} name="star-outline" size={18} color="#FFD700" />);
      }
    }
    return stars;
  };

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

        <View style={{
          backgroundColor: colors.cardBackground,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          paddingTop: 60,
          paddingBottom: 30,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        }}>
          <Image
            source={{ uri: seller.avatar }}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              borderWidth: 3,
              borderColor: colors.primary,
              marginBottom: 16,
            }}
          />

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <Text style={{ fontSize: 28, fontWeight: 'bold', color: colors.text, marginRight: 8 }}>
              {seller.name}
            </Text>
            {seller.verified && (
              <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
            )}
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', marginRight: 8 }}>
              {renderStars()}
            </View>
            <Text style={{ color: colors.textSecondary, fontSize: 16 }}>
              {seller.rating.toFixed(1)} ({seller.reviews} reviews)
            </Text>
          </View>

          <Text style={{ color: colors.textSecondary, fontSize: 14 }}>
            On Swiply since {seller.joinedDate}
          </Text>
        </View>

        <View style={{ padding: 20 }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: colors.cardBackground,
            borderRadius: 20,
            padding: 20,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}>
            <View style={{ alignItems: 'center' }}>
              <Ionicons name="chatbubble-outline" size={24} color={colors.primary} />
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: colors.text, marginTop: 8 }}>
                {seller.response_rate || 0}%
              </Text>
              <Text style={{ fontSize: 12, color: colors.textSecondary }}>answers</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
              <Ionicons name="time-outline" size={24} color={colors.primary} />
              <Text style={{ fontSize: 14, fontWeight: 'bold', color: colors.text, marginTop: 8, textAlign: 'center' }}>
                {seller.response_time || '—'}
              </Text>
              <Text style={{ fontSize: 12, color: colors.textSecondary }}>response time</Text>
            </View>
          </View>

          <View style={{
            backgroundColor: colors.cardBackground,
            borderRadius: 20,
            padding: 20,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 12 }}>
              About
            </Text>
            <Text style={{ fontSize: 16, color: colors.textSecondary, lineHeight: 24 }}>
              {seller.description}
            </Text>
          </View>

          <View style={{
            backgroundColor: colors.cardBackground,
            borderRadius: 20,
            padding: 20,
            marginBottom: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 12 }}>
              Seller goods
            </Text>
            <Text style={{ fontSize: 14, color: colors.textSecondary, textAlign: 'center', paddingVertical: 20 }}>
              Goods of seller
            </Text>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: colors.primary,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: 16,
              borderRadius: 30,
              marginTop: 10,
              marginBottom: 20,
            }}
            activeOpacity={0.8}
            onPress={() => Alert.alert('Chat', 'Chat with seller')}
          >
            <Ionicons name="chatbubble-outline" size={22} color="#fff" />
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600', marginLeft: 10 }}>
              Chat
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </PageLayout>
  );
}
