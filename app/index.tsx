import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Svg, {
  Defs, LinearGradient, Stop,
  Rect, Path, Circle, Text as SvgText,
} from 'react-native-svg';
import Swiper from 'react-native-deck-swiper';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import GlobalFooter from '../components/GlobalFooter';
import { ITEMS, Item } from '../data/items';
import { homeStyles } from '../styles/home.styles';
import { useTheme } from '../styles/ThemeContext';
import { useLikesStore } from '../store/useLikesStore';

function SwiplyLogo({ primary, accent }: { primary: string; accent: string }) {
  return (
    <Svg width={130} height={38} viewBox="0 0 260 76">
      <Defs>
        <LinearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={primary} stopOpacity="0.5" />
          <Stop offset="1" stopColor={primary} />
        </LinearGradient>
        <LinearGradient id="ag" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor={accent} />
          <Stop offset="1" stopColor={accent} stopOpacity="0.6" />
        </LinearGradient>
      </Defs>
      <Rect x="5" y="9" width="42" height="56" rx="10"
        fill="none" stroke={primary} strokeWidth="1.5"
        transform="rotate(-6 26 37)" opacity="0.3" />
      <Rect x="9" y="7" width="42" height="56" rx="10"
        fill="#13131F" stroke="url(#lg)" strokeWidth="1.8" />
      <Path d="M19 33 L37 33 M31 26 L39 33 L31 40"
        stroke={accent} strokeWidth="2.4"
        strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="15" cy="50" r="2.5"
        fill="none" stroke="#55556A" strokeWidth="1.5" />
      <SvgText x="62" y="50"
        fontFamily="Helvetica Neue" fontSize="34"
        fontWeight="800" letterSpacing="-1"
        fill={primary}>
        swiply
      </SvgText>
      <Rect x="62" y="56" width="72" height="2.5" rx="1.25" fill="url(#ag)" />
    </Svg>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { addLike, addToHistory, getUniqueItems, clearHistory } = useLikesStore();

  const [cards, setCards] = useState<Item[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [swiperKey, setSwiperKey] = useState(0);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    const unique = getUniqueItems(ITEMS);
    setCards(unique.length === 0 ? ITEMS : unique);
    if (unique.length === 0) clearHistory();
    setCurrentIdx(0);
  }, []);

  const remaining = Math.max(0, cards.length - currentIdx);

  const handleSwipeRight = (i: number) => {
    if (cards[i]) { addLike(cards[i]); addToHistory(cards[i].id); }
    setCurrentIdx(n => n + 1);
  };
  const handleSwipeLeft = (i: number) => {
    if (cards[i]) addToHistory(cards[i].id);
    setCurrentIdx(n => n + 1);
  };
  const handleSwipedAll = () => {
    setCards([]);
    Alert.alert('✨ All done!', 'Start over or check your likes?', [
      { text: 'Start again', onPress: () => { clearHistory(); setCards(ITEMS); setCurrentIdx(0); setSwiperKey(k => k + 1); } },
      { text: 'My Likes', onPress: () => router.push('/likes') },
    ]);
  };

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>

      <View style={[homeStyles.header, {
        backgroundColor: colors.cardBackground,
        borderBottomColor: colors.border,
      }]}>
        <TouchableOpacity style={[styles.iconBtn, { borderColor: colors.border }]} activeOpacity={0.7}>
          <Ionicons name="menu-outline" size={20} color={colors.textSecondary} />
        </TouchableOpacity>

        <SwiplyLogo primary={colors.primary} accent={colors.accent} />

        <TouchableOpacity style={[styles.iconBtn, { borderColor: colors.border }]} activeOpacity={0.7}>
          <Ionicons name="notifications-outline" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <View style={styles.counterRow}>
        {remaining > 0 && (
          <Text style={[styles.counterText, { color: colors.textSecondary }]}>
            {remaining} {remaining === 1 ? 'item' : 'items'} left
          </Text>
        )}
      </View>

      <View style={homeStyles.swiperWrapper}>
        <View style={homeStyles.swiperContainer} pointerEvents="box-none">
          {cards.length > 0 ? (
            <Swiper
              key={swiperKey}
              ref={swiperRef}
              cards={cards}
              renderCard={(card) => (!card ? <Card /> : <Card item={card} />)}
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
                    <View style={[styles.overlayCircle, {
                      backgroundColor: colors.error + 'CC',
                    }]}>
                      <Ionicons name="close" size={44} color="#fff" />
                    </View>
                  ),
                  style: { wrapper: styles.overlayWrap },
                },
                right: {
                  element: (
                    <View style={[styles.overlayCircle, {
                      backgroundColor: colors.success + 'CC',
                    }]}>
                      <Ionicons name="heart" size={40} color="#fff" />
                    </View>
                  ),
                  style: { wrapper: styles.overlayWrap },
                },
              }}
            />
          ) : (
            <View style={homeStyles.emptyContainer}>
              <Ionicons name="images-outline" size={64} color={colors.primary} style={homeStyles.emptyIcon} />
              <Text style={[homeStyles.emptyTitle, { color: colors.text }]}>All caught up</Text>
              <Text style={[homeStyles.emptyText, { color: colors.textSecondary }]}>
                You have viewed all available products.
              </Text>
              <TouchableOpacity
                style={[homeStyles.emptyButton, { backgroundColor: colors.primary }]}
                onPress={() => { clearHistory(); setCards(ITEMS); setCurrentIdx(0); setSwiperKey(k => k + 1); }}
                activeOpacity={0.8}
              >
                <Text style={homeStyles.emptyButtonText}>Swipe again</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {cards.length > 0 && remaining > 0 && (
        <View style={[styles.hintsRow, { borderTopColor: colors.border }]}>
          <View style={styles.hint}>
            <Ionicons name="arrow-back-outline" size={16} color={colors.error} />
            <Text style={[styles.hintLabel, { color: colors.error }]}>Pass</Text>
          </View>
          <TouchableOpacity
            style={styles.hintCenter}
            onPress={() => swiperRef.current && router.push(`/item/${cards[currentIdx]?.id}`)}
            activeOpacity={0.7}
          >
            <Ionicons name="swap-horizontal-outline" size={14} color={colors.textTertiary} />
            <Text style={[styles.hintCenterText, { color: colors.textTertiary }]}>
              Tap card for details
            </Text>
          </TouchableOpacity>
          <View style={styles.hint}>
            <Text style={[styles.hintLabel, { color: colors.success }]}>Like</Text>
            <Ionicons name="arrow-forward-outline" size={16} color={colors.success} />
          </View>
        </View>
      )}

      <GlobalFooter />

    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },

  iconBtn: {
    width: 36, height: 36,
    borderRadius: 10, borderWidth: 1,
    justifyContent: 'center', alignItems: 'center',
  },

  counterRow: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },

  overlayCircle: {
    position: 'absolute',
    top: '40%', left: '50%',
    transform: [{ translateX: -40 }],
    width: 80, height: 80, borderRadius: 40,
    justifyContent: 'center', alignItems: 'center',
  },
  overlayWrap: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
  },

  hintsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  hint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: 70,
  },
  hintLabel: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  hintCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  hintCenterText: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
});
