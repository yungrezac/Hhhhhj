import { View, Text, StyleSheet, Pressable, ImageBackground, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { MessageCircle, Zap, Users, Camera } from 'lucide-react-native';
import { useTelegramAuth } from '@/hooks/useTelegramAuth';

export default function AuthScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const { initiateTelegramAuth } = useTelegramAuth();

  const handleTelegramLogin = async () => {
    if (Platform.OS === 'web') {
      setIsLoading(true);
      try {
        await initiateTelegramAuth();
        router.replace('/(tabs)');
      } catch (error) {
        console.error('Auth error:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      // For mobile, we'll implement deep linking or WebView
      router.replace('/(tabs)');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/1171743/pexels-photo-1171743.jpeg' }}
      style={styles.container}
      resizeMode="cover"
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
        style={styles.overlay}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.logo}>Wells</Text>
            <Text style={styles.tagline}>Connect. Share. Ride.</Text>
            <Text style={styles.subtitle}>
              The ultimate social network for rollers, skaters, and BMX riders
            </Text>
          </View>

          <View style={styles.features}>
            <View style={styles.feature}>
              <Camera color="#00D4FF" size={24} />
              <Text style={styles.featureText}>Share your best tricks</Text>
            </View>
            <View style={styles.feature}>
              <Users color="#39FF14" size={24} />
              <Text style={styles.featureText}>Connect with riders</Text>
            </View>
            <View style={styles.feature}>
              <Zap color="#FF6B35" size={24} />
              <Text style={styles.featureText}>Discover new spots</Text>
            </View>
          </View>

          <View style={styles.authSection}>
            <Pressable
              style={[styles.telegramButton, isLoading && styles.buttonDisabled]}
              onPress={handleTelegramLogin}
              disabled={isLoading}
            >
              <LinearGradient
                colors={['#00D4FF', '#0099CC']}
                style={styles.buttonGradient}
              >
                <MessageCircle color="#FFFFFF" size={20} />
                <Text style={styles.buttonText}>
                  {isLoading ? 'Connecting...' : 'Continue with Telegram'}
                </Text>
              </LinearGradient>
            </Pressable>
            
            <Text style={styles.disclaimer}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
  },
  logo: {
    fontSize: 56,
    fontFamily: 'Poppins-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -2,
  },
  tagline: {
    fontSize: 20,
    fontFamily: 'Inter-Medium',
    color: '#00D4FF',
    marginTop: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#CCCCCC',
    textAlign: 'center',
    marginTop: 16,
    lineHeight: 24,
  },
  features: {
    gap: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  featureText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginLeft: 16,
  },
  authSection: {
    gap: 16,
  },
  telegramButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    gap: 12,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  disclaimer: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999999',
    textAlign: 'center',
    lineHeight: 16,
  },
});