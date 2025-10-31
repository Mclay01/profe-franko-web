import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Bot, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

export default function AIDesignScreen() {
  const router = useRouter();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDesign, setGeneratedDesign] = useState<string | null>(null);

  const handleGenerateDesign = async () => {
    if (!prompt.trim()) {
      Alert.alert('Error', 'Por favor describe tu diseño');
      return;
    }

    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }

    setIsGenerating(true);
    
    // Simular generación de diseño con IA
    setTimeout(() => {
      setGeneratedDesign('https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg');
      setIsGenerating(false);
    }, 3000);
  };

  const handleUseDesign = () => {
    // Aquí normalmente pasarías el diseño generado de vuelta a la pantalla anterior
    Alert.alert('Éxito', 'Diseño aplicado a tu polera', [
      { text: 'OK', onPress: () => router.back() }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Diseño con IA</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* Maqueta 3D */}
        <View style={styles.mockupContainer}>
          <View style={styles.tshirtMockup}>
            <View style={styles.tshirt}>
              {generatedDesign && (
                <View style={styles.designPreview}>
                  <Text style={styles.designPreviewText}>Diseño Generado</Text>
                </View>
              )}
              {isGenerating && (
                <View style={styles.generatingIndicator}>
                  <Bot size={40} color="#FF6B35" />
                  <Text style={styles.generatingText}>Generando...</Text>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* Descripción del diseño */}
        <View style={styles.promptSection}>
          <Text style={styles.sectionTitle}>Describe tu diseño</Text>
          <Text style={styles.helpText}>
            Sé específico: colores, estilo, elementos, tema, etc.
          </Text>
          
          <TextInput
            style={styles.promptInput}
            placeholder="Ej: Un logo de tigre minimalista en colores neón con fondo transparente..."
            placeholderTextColor="#666"
            value={prompt}
            onChangeText={setPrompt}
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity
            style={[styles.generateButton, isGenerating && styles.generateButtonDisabled]}
            onPress={handleGenerateDesign}
            disabled={isGenerating}
          >
            <LinearGradient
              colors={isGenerating ? ['#666', '#666'] : ['#FF6B35', '#FF8A50']}
              style={styles.generateButtonGradient}
            >
              {isGenerating ? (
                <Sparkles size={20} color="#FFFFFF" />
              ) : (
                <Bot size={20} color="#000" />
              )}
              <Text style={[
                styles.generateButtonText,
                isGenerating && styles.generateButtonTextDisabled
              ]}>
                {isGenerating ? 'Generando Diseño...' : 'Generar Diseño'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {generatedDesign && (
            <TouchableOpacity style={styles.useDesignButton} onPress={handleUseDesign}>
              <Text style={styles.useDesignButtonText}>Usar Este Diseño</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.pricingInfo}>
          <Text style={styles.pricingTitle}>Información de Precios</Text>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Diseño con IA</Text>
            <Text style={styles.pricingPrice}>$2.000</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#000000',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    backgroundColor: '#111111',
  },
  mockupContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  tshirtMockup: {
    width: 200,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tshirt: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
    backgroundColor: '#FFFFFF',
  },
  designPreview: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  designPreviewText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
    textAlign: 'center',
  },
  generatingIndicator: {
    alignItems: 'center',
    gap: 8,
  },
  generatingText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
  },
  promptSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#CCCCCC',
    marginBottom: 16,
  },
  promptInput: {
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  generateButton: {
    borderRadius: 12,
    marginBottom: 16,
  },
  generateButtonDisabled: {
    opacity: 0.7,
  },
  generateButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    gap: 8,
  },
  generateButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#000',
  },
  generateButtonTextDisabled: {
    color: '#FFFFFF',
  },
  useDesignButton: {
    backgroundColor: '#333',
    borderWidth: 2,
    borderColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  useDesignButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
  },
  pricingInfo: {
    padding: 20,
    backgroundColor: '#222',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  pricingTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
    marginBottom: 12,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pricingLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#CCCCCC',
  },
  pricingPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
});