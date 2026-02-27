import { StyleSheet } from 'react-native';

export const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    paddingBottom: 20,
    borderBottomWidth: 1,
    // backgroundColor & borderBottomColor inline
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    padding: 8,
    borderRadius: 10,
    borderWidth: 1,
    // borderColor inline
  },
  headerContent: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 20,
  },
  avatarContainer: {
    marginBottom: 16,
    position: 'relative',
  },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    // borderColor inline (primary)
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    // backgroundColor & borderColor inline
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 3,
    letterSpacing: 0.3,
  },
  username: {
    fontSize: 13,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  bio: {
    fontSize: 13,
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 18,
    marginTop: 16,
    marginHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    // backgroundColor & borderColor inline
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 3,
    // color inline (primary)
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  menuContainer: {
    marginTop: 16,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    // backgroundColor & borderColor inline
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    // borderBottomColor inline
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    marginLeft: 12,
    fontWeight: '500',
  },
  logoutText: {
    fontWeight: '600',
  },
});
