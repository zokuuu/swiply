import { StyleSheet } from 'react-native';

export const likesStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 14,
    borderBottomWidth: 1,
    // backgroundColor & borderBottomColor inline
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  backButton: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    // borderColor inline
  },
  clearButton: {
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    // borderColor inline (error/muted)
  },
  list: {
    padding: 16,
  },
  itemCard: {
    flexDirection: 'row',
    borderRadius: 16,
    marginBottom: 10,
    padding: 12,
    borderWidth: 1,
    // backgroundColor & borderColor inline
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    alignItems: 'center',
  },
  itemImage: {
    width: 76,
    height: 76,
    borderRadius: 12,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 3,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 3,
    // color inline (primary)
  },
  itemCategory: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    // color inline (textSecondary)
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingTop: 80,
  },
  emptyIcon: {
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  swipeButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
    // backgroundColor inline
  },
  swipeButtonText: {
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
