import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import PageLayout from '../components/PageLayout';
import { ITEMS, Item } from '../data/items';
import { homeStyles } from '../styles/home.styles';
import { useTheme } from '../styles/ThemeContext';
import { useLikesStore } from '../store/useLikesStore';

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const {
    likedItems,
    addLike,
    addToHistory,
    getUniqueItems,
    clearHistory
  } = useLikesStore();

  const [cards, setCards] = useState<Item[]>([]);
  const [swiperKey, setSwiperKey] = useState(0);
  const [pressedTab, setPressedTab] = useState<string | null>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const uniqueItems = getUniqueItems(ITEMS);

    if (uniqueItems.length === 0) {
      setCards(ITEMS);
      clearHistory();
    } else {
      setCards(uniqueItems);
    }
  }, []);

  const handleSwipeRight = (cardIndex: number) => {
    if (cards[cardIndex]) {
      const likedItem = cards[cardIndex];
      addLike(likedItem);
      addToHistory(likedItem.id);
    }
  };

  const handleSwipeLeft = (cardIndex: number) => {
    if (cards[cardIndex]) {
      const swipedItem = cards[cardIndex];
      addToHistory(swipedItem.id);
    }
  };

  const handleSwipedAll = () => {
    setCards([]);
    Alert.alert(
      '✨ Out of cards',
      'You have viewed all the products. Would you like to see your favorites or start over?',
      [
        {
          text: 'Start again',
          onPress: () => {
            clearHistory();
            setCards(ITEMS);
            setSwiperKey(prev => prev + 1);
          }
        },
        {
          text: 'Likes',
          onPress: () => {
            router.push('/likes');
          }
        }
      ]
    );
  };

  const renderCard = (card: Item, index: number) => {
    if (!card) return <Card />;
    return <Card item={card} />;
  };

  return (
    <PageLayout>
      <View style={[homeStyles.container, { backgroundColor: colors.background }]}>
        <View style={[homeStyles.header, { backgroundColor: colors.cardBackground }]}>
          <View style={homeStyles.headerLeft} />
          <View style={homeStyles.headerCenter}>
            <Text style={[homeStyles.headerTitle, { color: colors.primary }]}>Swiply</Text>
            <Text style={[homeStyles.headerSubtitle, { color: colors.textSecondary }]}>swipe and grab!</Text>
          </View>
          <View style={homeStyles.headerRight} />
        </View>

        <View style={homeStyles.swiperWrapper}>
          <View style={homeStyles.swiperContainer} pointerEvents="box-none">
            {cards.length > 0 ? (
              <Swiper
                key={swiperKey}
                ref={swiperRef}
                cards={cards}
                renderCard={renderCard}
                onSwipedRight={handleSwipeRight}
                onSwipedLeft={handleSwipeLeft}
                onSwipedAll={handleSwipedAll}
                cardIndex={0}
                backgroundColor="transparent"
                stackSize={3}
                stackScale={5}
                stackSeparation={10}
                animateOverlayLabelsOpacity
                animateCardOpacity
                disableTopSwipe
                disableBottomSwipe
                verticalSwipe={false}
                horizontalSwipe={true}
                infinite={false}
                showSecondCard={true}
                swipeBackCard={false}
                useViewOverflow={false}
                overlayLabels={{
                  left: {
                    element: (
                      <View style={{
                        position: 'absolute',
                        top: '40%',
                        left: '50%',
                        transform: [{ translateX: -40 }],
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        backgroundColor: colors.error + 'CC',
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        elevation: 8,
                      }}>
                        <Ionicons name="close" size={50} color="#fff" />
                      </View>
                    ),
                    style: {
                      wrapper: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                      },
                    },
                  },
                  right: {
                    element: (
                      <View style={{
                        position: 'absolute',
                        top: '40%',
                        left: '50%',
                        transform: [{ translateX: -40 }],
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        backgroundColor: colors.success + 'CC',
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        elevation: 8,
                      }}>
                        <Ionicons name="heart" size={45} color="#fff" />
                      </View>
                    ),
                    style: {
                      wrapper: {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                      },
                    },
                  },
                }}
              />
            ) : (
              <View style={homeStyles.emptyContainer}>
                <Ionicons name="images-outline" size={80} color={colors.primaryLight} style={homeStyles.emptyIcon} />
                <Text style={[homeStyles.emptyTitle, { color: colors.primary }]}>Out of stock</Text>
                <Text style={[homeStyles.emptyText, { color: colors.textSecondary }]}>
                  You have viewed all available products.
                </Text>
                <TouchableOpacity
                  style={[homeStyles.emptyButton, { backgroundColor: colors.primary }]}
                  onPress={() => {
                    clearHistory();
                    setCards(ITEMS);
                    setSwiperKey(prev => prev + 1);
                  }}
                  onPressIn={() => setPressedTab('refresh')}
                  onPressOut={() => setPressedTab(null)}
                  activeOpacity={0.7}
                >
                  <Text style={homeStyles.emptyButtonText}>Swipe again</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </PageLayout>
  );
}
