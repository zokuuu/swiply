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
              backgroundColor: '#13131F',
            },
            headerTintColor: '#6C8EFF',
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 16,
              letterSpacing: 0.5,
            },
            headerShadowVisible: false,
          }}
        >
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="item/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="seller/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="likes" options={{ headerShown: false }} />
          <Stack.Screen name="profile" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
