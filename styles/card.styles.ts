import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const cardStyles = StyleSheet.create({
  card: {
    width: width * 0.88,
    height: height * 0.58,
    borderRadius: 20,
    borderWidth: 1,
    overflow: 'hidden',
    alignSelf: 'center',
    // No shadow — border-only style per design system
  },

  // ── Image (top ~55% of card)
  image: {
    width: '100%',
    height: '56%',
    resizeMode: 'cover',
  },

  // ── Category badge on top-right of image
  overlay: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },

  // ── Info area (bottom ~44%)
  infoContainer: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
  },

  // Name
  name: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 2,
  },

  // Price
  price: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 10,
  },

  // ── Seller row
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatarCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#fff',
  },
  sellerName: {
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 1,
  },

  // ── Hint at bottom
  hintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    marginTop: 8,
  },
  hintText: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 0.3,
  },

  // legacy — kept so item detail screen still works
  locationContainer: { marginBottom: 8 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 3 },
  locationText: { fontSize: 12, marginLeft: 5 },
  divider: { height: 1, marginVertical: 10 },
  sectionTitle: { fontSize: 11, fontWeight: '700', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 },
  fullDescription: { fontSize: 13, lineHeight: 20 },
  featuresContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  featureTag: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, marginRight: 6, marginBottom: 6, borderWidth: 1 },
  featureText: { fontSize: 11, fontWeight: '600' },
  deliveryContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  deliveryText: { fontSize: 13, marginLeft: 6 },
  paymentContainer: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 },
  paymentBadge: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, marginRight: 6, marginBottom: 6, borderWidth: 1 },
  paymentText: { fontSize: 11, marginLeft: 4 },
  sellerContainer: { marginTop: 10, paddingTop: 10, borderTopWidth: 1 },
  sellerInfo: { flexDirection: 'row', alignItems: 'center' },
  sellerAvatar: { width: 36, height: 36, borderRadius: 18, marginRight: 10, borderWidth: 1 },
  sellerDetails: { flex: 1 },
  sellerRating: { fontSize: 11, marginLeft: 3 },
});
