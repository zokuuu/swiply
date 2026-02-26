import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { ThemeProvider } from '../styles/ThemeContext';

export default function Layout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <ThemeProvider>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerTintColor: '#8c76b3',
            headerTitleStyle: {
              fontWeight: '600',
              fontSize: 18,
            },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="item/[id]"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="seller/[id]"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="likes"
            options={{
              title: 'Likes',
              headerBackTitle: 'Back',
              presentation: 'card',
            }}
          />

          <Stack.Screen
            name="profile"
            options={{
              title: 'Profile',
              headerBackTitle: 'Back',
              presentation: 'card',
            }}
          />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
