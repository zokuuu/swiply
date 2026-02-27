import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../styles/ThemeContext';
import { useLikesStore } from '../store/useLikesStore';
import PageLayout from '../components/PageLayout';

export default function LikesScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { likedItems, removeLike } = useLikesStore();

  const handleItemPress = (itemId: string) => router.push(`/item/${itemId}`);

  const handleRemove = (itemId: string, itemName: string, event: any) => {
    event.stopPropagation();
    Alert.alert('Remove', `Delete "${itemName}" from likes?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', onPress: () => removeLike(itemId), style: 'destructive' },
    ]);
  };

  const handleClearAll = () => {
    Alert.alert('Clear all', 'Remove all items from likes?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear',
        onPress: () => likedItems.forEach(item => removeLike(item.id)),
        style: 'destructive',
      },
    ]);
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.card, {
        backgroundColor: colors.cardBackground,
        borderColor: colors.border,
      }]}
      onPress={() => handleItemPress(item.id)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.image }} style={styles.thumb} />

      <View style={styles.info}>
        <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[styles.price, { color: colors.primary }]}>{item.price}</Text>
        <Text style={[styles.category, { color: colors.textSecondary }]} numberOfLines={1}>
          {item.category.toUpperCase()}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.deleteBtn, { borderColor: colors.border }]}
        onPress={(e) => handleRemove(item.id, item.name, e)}
      >
        <Ionicons name="trash-outline" size={16} color={colors.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <PageLayout>
      <View style={[styles.container, { backgroundColor: colors.background }]}>

        <View style={[styles.header, {
          backgroundColor: colors.cardBackground,
          borderBottomColor: colors.border,
        }]}>
          <TouchableOpacity
            style={[styles.iconBtn, { borderColor: colors.border }]}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back-outline" size={18} color={colors.textSecondary} />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Liked Items</Text>
            {likedItems.length > 0 && (
              <View style={[styles.countBadge, { backgroundColor: colors.primary + '22', borderColor: colors.primary + '44' }]}>
                <Text style={[styles.countText, { color: colors.primary }]}>{likedItems.length}</Text>
              </View>
            )}
          </View>

          {likedItems.length > 0 ? (
            <TouchableOpacity
              style={[styles.iconBtn, { borderColor: colors.error + '44' }]}
              onPress={handleClearAll}
            >
              <Ionicons name="trash-outline" size={18} color={colors.error} />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconBtn} />
          )}
        </View>

        <FlatList
          data={likedItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={[styles.emptyIconWrap, { borderColor: colors.border }]}>
                <Ionicons name="heart-outline" size={40} color={colors.primary} />
              </View>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>Nothing here yet</Text>
              <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
                Products you like will appear here.
              </Text>
              <TouchableOpacity
                style={[styles.swipeBtn, { backgroundColor: colors.primary }]}
                onPress={() => router.push('/')}
                activeOpacity={0.8}
              >
                <Ionicons name="infinite-outline" size={16} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.swipeBtnText}>Start swiping</Text>
              </TouchableOpacity>
            </View>
          }
        />

      </View>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 14,
    borderBottomWidth: 1,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  countBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    borderWidth: 1,
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
  },
  list: {
    padding: 16,
    paddingBottom: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  thumb: {
    width: 72,
    height: 72,
    borderRadius: 12,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  category: {
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  // Empty
  emptyContainer: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: 40,
  },
  emptyIconWrap: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  swipeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingVertical: 13,
    borderRadius: 14,
  },
  swipeBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
