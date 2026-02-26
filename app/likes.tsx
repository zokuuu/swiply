import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../styles/ThemeContext';
import { useLikesStore } from '../store/useLikesStore';
import PageLayout from '../components/PageLayout';
import { likesStyles } from '../styles/likes.styles';

export default function LikesScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { likedItems, removeLike } = useLikesStore();

  const handleItemPress = (itemId: string) => {
    router.push(`/item/${itemId}`);
  };

  const handleRemoveItem = (itemId: string, itemName: string, event: any) => {
    event.stopPropagation();

    Alert.alert(
      'Remove',
      `Delete "${itemName}" from likes?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => removeLike(itemId),
          style: 'destructive'
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[likesStyles.itemCard, { backgroundColor: colors.cardBackground }]}
      onPress={() => handleItemPress(item.id)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.image }} style={likesStyles.itemImage} />

      <View style={likesStyles.itemInfo}>
        <Text style={[likesStyles.itemName, { color: colors.text }]} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={[likesStyles.itemPrice, { color: colors.primary }]}>{item.price}</Text>
        <Text style={[likesStyles.itemCategory, { color: colors.textSecondary }]} numberOfLines={1}>
          {item.category}
        </Text>
      </View>

      <TouchableOpacity
        style={likesStyles.deleteButton}
        onPress={(e) => handleRemoveItem(item.id, item.name, e)}
      >
        <Ionicons name="close-circle" size={24} color={colors.error} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <PageLayout>
      <View style={[likesStyles.container, { backgroundColor: colors.background }]}>
        <View style={[likesStyles.header, { backgroundColor: colors.cardBackground }]}>
          <TouchableOpacity onPress={() => router.back()} style={likesStyles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>

          <Text style={[likesStyles.headerTitle, { color: colors.primary }]}>
            Likes {likedItems.length > 0 ? `(${likedItems.length})` : ''}
          </Text>

          {likedItems.length > 0 && (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Clear likes',
                  'Remove all staff from likes?',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Clear',
                      onPress: () => likedItems.forEach(item => removeLike(item.id)),
                      style: 'destructive'
                    }
                  ]
                );
              }}
              style={likesStyles.clearButton}
            >
              <Ionicons name="trash-outline" size={22} color={colors.error} />
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={likedItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={likesStyles.list}
          ListEmptyComponent={
            <View style={likesStyles.emptyContainer}>
              <Ionicons name="heart-outline" size={80} color={colors.primaryLight} style={likesStyles.emptyIcon} />
              <Text style={[likesStyles.emptyTitle, { color: colors.primary }]}>Empty. Waiting you 😔</Text>
              <Text style={[likesStyles.emptyText, { color: colors.textSecondary }]}>
                Products you like will appear here.
              </Text>
              <TouchableOpacity
                style={[likesStyles.swipeButton, { backgroundColor: colors.primary }]}
                onPress={() => router.push('/')}
                activeOpacity={0.7}
              >
                <Text style={likesStyles.swipeButtonText}>Start swipe!</Text>
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </PageLayout>
  );
}
