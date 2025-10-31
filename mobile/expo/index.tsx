import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles, ArrowRight, Shirt } from 'lucide-react-native';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const fadeInValue = useSharedValue(0);
  const slideUpValue = useSharedValue(50);
  const sparkleRotation = useSharedValue(0);

  useEffect(() => {
    fadeInValue.value = withTiming(1, { duration: 1000 });
    slideUpValue.value = withTiming(0, { duration: 800 });
    sparkleRotation.value = withRepeat(
      withSequence(
        withTiming(360, { duration: 3000 }),
        withTiming(0, { duration: 0 })
      ),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeInValue.value,
      transform: [{ translateY: slideUpValue.value }],
    };
  });

  const sparkleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${sparkleRotation.value}deg` }],
    };
  });

  const handleStartDesign = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    router.push('/design');
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg' }}
        style={styles.backgroundImage}
        blurRadius={3}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
          style={styles.overlay}
        >
          <Animated.View style={[styles.content, animatedStyle]}>
            <View style={styles.headerContainer}>
              <Animated.View style={sparkleStyle}>
                <Sparkles size={32} color="#FF6B35" />
              </Animated.View>
              <Text style={styles.logo}>CIGAM</Text>
            </View>

            <View style={styles.mainContent}>
              <Shirt size={80} color="#FF6B35" style={styles.mainIcon} />
              
              <Text style={styles.title}>
                Diseña Tu Polera{'\n'}Perfecta
              </Text>
              
              <Text style={styles.subtitle}>
                Crea diseños únicos con nuestra tecnología 3D avanzada.{'\n'}
                Sube tu diseño, elige entre plantillas gratuitas o{'\n'}
                diseña con inteligencia artificial.
              </Text>

              <View style={styles.featuresContainer}>
                <View style={styles.feature}>
                  <View style={styles.featureIcon}>
                    <Sparkles size={20} color="#FF6B35" />
                  </View>
                  <Text style={styles.featureText}>Vista 3D en tiempo real</Text>
                </View>
                
                <View style={styles.feature}>
                  <View style={styles.featureIcon}>
                    <Shirt size={20} color="#FF6B35" />
                  </View>
                  <Text style={styles.featureText}>Poleras oversized premium</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity
              style={styles.startButton}
              onPress={handleStartDesign}
              activeOpacity={0.9}
            >
              <LinearGradient
                colors={['#FF6B35', '#FF8A50']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Diseña Tu Polera</Text>
                <ArrowRight size={24} color="#000" />
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginLeft: 12,
    letterSpacing: 3,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  mainIcon: {
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  featuresContainer: {
    gap: 16,
    marginBottom: 20,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 53, 0.3)',
  },
  featureIcon: {
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  startButton: {
    marginTop: 20,
    borderRadius: 16,
    elevation: 8,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 16,
    gap: 12,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#000000',
  },
});