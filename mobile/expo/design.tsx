import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Upload, Palette, Bot, X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';

interface OrderSummary {
  basePrice: number;
  designPrice: number;
  removeBackgroundPrice: number;
  total: number;
}

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];
const COLORS = [
  { name: 'Negro', color: '#000000' },
  { name: 'Blanco', color: '#FFFFFF' },
  { name: 'Gris', color: '#808080' },
  { name: 'Azul', color: '#1E40AF' },
  { name: 'Rojo', color: '#DC2626' },
];

const FREE_DESIGNS = [
  { id: 1, name: 'Minimalista', image: 'https://images.pexels.com/photos/1148957/pexels-photo-1148957.jpeg' },
  { id: 2, name: 'Abstracto', image: 'https://images.pexels.com/photos/2693208/pexels-photo-2693208.jpeg' },
  { id: 3, name: 'Geométrico', image: 'https://images.pexels.com/photos/1570779/pexels-photo-1570779.jpeg' },
];

export default function DesignScreen() {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [quantity, setQuantity] = useState(1);
  const [hasDesign, setHasDesign] = useState<boolean | null>(null);
  const [description, setDescription] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFreeDesign, setSelectedFreeDesign] = useState<number | null>(null);
  const [removeBackground, setRemoveBackground] = useState(false);
  const [hasSubscription] = useState(false); // Simular estado de suscripción

  const calculateOrderSummary = (): OrderSummary => {
    const basePrice = 15000; // Precio base de la polera
    let designPrice = 0;
    let removeBackgroundPrice = 0;

    // Precio por diseño
    if (hasDesign === true && uploadedImage) {
      designPrice = 2000;
    } else if (hasDesign === false && (selectedFreeDesign || description.trim())) {
      designPrice = 2000;
    }

    // Precio por quitar fondo
    if (removeBackground && !hasSubscription) {
      removeBackgroundPrice = 200;
    }

    const total = (basePrice + designPrice + removeBackgroundPrice) * quantity;

    return {
      basePrice: basePrice * quantity,
      designPrice: designPrice * quantity,
      removeBackgroundPrice: removeBackgroundPrice * quantity,
      total,
    };
  };

  const orderSummary = calculateOrderSummary();

  const handleImagePicker = async () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUploadedImage(result.assets[0].uri);
    }
  };

  const handleNext = () => {
    if (hasDesign === null) {
      Alert.alert('Error', 'Por favor selecciona una opción de diseño');
      return;
    }

    if (hasDesign === true && !uploadedImage) {
      Alert.alert('Error', 'Por favor sube tu diseño');
      return;
    }

    if (hasDesign === false && !selectedFreeDesign && !description.trim()) {
      Alert.alert('Error', 'Por favor describe tu diseño o selecciona una plantilla');
      return;
    }

    router.push('/customer-info');
  };

  const handleAIDesign = () => {
    router.push('/ai-design');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Diseña Tu Polera</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Maqueta 3D */}
        <View style={styles.mockupContainer}>
          <View style={styles.tshirtMockup}>
            <View style={[styles.tshirt, { backgroundColor: selectedColor.color }]}>
              {uploadedImage && (
                <Image source={{ uri: uploadedImage }} style={styles.designOnShirt} />
              )}
              {selectedFreeDesign && (
                <Image 
                  source={{ uri: FREE_DESIGNS.find(d => d.id === selectedFreeDesign)?.image }} 
                  style={styles.designOnShirt} 
                />
              )}
            </View>
          </View>
        </View>

        {/* Opciones de Diseño */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Opciones de Diseño</Text>
          
          <View style={styles.designOptions}>
            <TouchableOpacity
              style={[
                styles.designOption,
                hasDesign === true && styles.designOptionSelected,
              ]}
              onPress={() => setHasDesign(true)}
            >
              <Upload size={24} color={hasDesign === true ? "#000" : "#FF6B35"} />
              <Text style={[
                styles.designOptionText,
                hasDesign === true && styles.designOptionTextSelected,
              ]}>
                Tengo Diseño
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.designOption,
                hasDesign === false && styles.designOptionSelected,
              ]}
              onPress={() => setHasDesign(false)}
            >
              <Palette size={24} color={hasDesign === false ? "#000" : "#FF6B35"} />
              <Text style={[
                styles.designOptionText,
                hasDesign === false && styles.designOptionTextSelected,
              ]}>
                No Tengo Diseño
              </Text>
            </TouchableOpacity>
          </View>

          {/* Opciones según selección */}
          {hasDesign === true && (
            <View style={styles.uploadSection}>
              <TouchableOpacity style={styles.uploadButton} onPress={handleImagePicker}>
                <Upload size={20} color="#000" />
                <Text style={styles.uploadButtonText}>Subir Diseño</Text>
              </TouchableOpacity>

              {uploadedImage && (
                <View style={styles.uploadedImageContainer}>
                  <Image source={{ uri: uploadedImage }} style={styles.uploadedImage} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => setUploadedImage(null)}
                  >
                    <X size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              )}

              <View style={styles.backgroundRemovalSection}>
                <TouchableOpacity
                  style={[
                    styles.toggleButton,
                    removeBackground && styles.toggleButtonActive,
                  ]}
                  onPress={() => setRemoveBackground(!removeBackground)}
                >
                  <Text style={[
                    styles.toggleButtonText,
                    removeBackground && styles.toggleButtonTextActive,
                  ]}>
                    Quitar Fondo
                  </Text>
                  <Text style={styles.priceText}>
                    {hasSubscription ? 'GRATIS' : '$200'}
                  </Text>
                </TouchableOpacity>
              </View>

              <TextInput
                style={styles.descriptionInput}
                placeholder="Descripción adicional (opcional)"
                placeholderTextColor="#999"
                value={description}
                onChangeText={setDescription}
                multiline
              />
            </View>
          )}

          {hasDesign === false && (
            <View style={styles.noDesignSection}>
              <Text style={styles.subsectionTitle}>Diseños Gratuitos</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.freeDesignsContainer}>
                {FREE_DESIGNS.map((design) => (
                  <TouchableOpacity
                    key={design.id}
                    style={[
                      styles.freeDesignCard,
                      selectedFreeDesign === design.id && styles.freeDesignCardSelected,
                    ]}
                    onPress={() => setSelectedFreeDesign(design.id)}
                  >
                    <Image source={{ uri: design.image }} style={styles.freeDesignImage} />
                    <Text style={styles.freeDesignName}>{design.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TouchableOpacity style={styles.aiDesignButton} onPress={handleAIDesign}>
                <Bot size={20} color="#000" />
                <Text style={styles.aiDesignButtonText}>Diseñalo con IA</Text>
              </TouchableOpacity>

              <TextInput
                style={styles.descriptionInput}
                placeholder="Describe tu diseño (obligatorio si no seleccionas plantilla)"
                placeholderTextColor="#999"
                value={description}
                onChangeText={setDescription}
                multiline
              />
            </View>
          )}
        </View>

        {/* Tallas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Talla</Text>
          <View style={styles.sizeContainer}>
            {SIZES.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.sizeButton,
                  selectedSize === size && styles.sizeButtonSelected,
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text style={[
                  styles.sizeButtonText,
                  selectedSize === size && styles.sizeButtonTextSelected,
                ]}>
                  {size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Colores */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Color</Text>
          <View style={styles.colorContainer}>
            {COLORS.map((color) => (
              <TouchableOpacity
                key={color.name}
                style={[
                  styles.colorButton,
                  { backgroundColor: color.color },
                  selectedColor.name === color.name && styles.colorButtonSelected,
                ]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </View>
        </View>

        {/* Cantidad */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Cantidad</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Resumen del Pedido */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen del Pedido</Text>
          <View style={styles.orderSummary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Polera oversized ({quantity}x)</Text>
              <Text style={styles.summaryPrice}>${orderSummary.basePrice.toLocaleString()}</Text>
            </View>
            {orderSummary.designPrice > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Diseño personalizado</Text>
                <Text style={styles.summaryPrice}>${orderSummary.designPrice.toLocaleString()}</Text>
              </View>
            )}
            {orderSummary.removeBackgroundPrice > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Quitar fondo</Text>
                <Text style={styles.summaryPrice}>${orderSummary.removeBackgroundPrice.toLocaleString()}</Text>
              </View>
            )}
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalPrice}>${orderSummary.total.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <LinearGradient
            colors={['#FF6B35', '#FF8A50']}
            style={styles.nextButtonGradient}
          >
            <Text style={styles.nextButtonText}>Siguiente</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
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
  scrollContainer: {
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
  },
  designOnShirt: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  subsectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
    marginBottom: 12,
  },
  designOptions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  designOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF6B35',
    backgroundColor: 'transparent',
    gap: 8,
  },
  designOptionSelected: {
    backgroundColor: '#FF6B35',
  },
  designOptionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
  },
  designOptionTextSelected: {
    color: '#000',
  },
  uploadSection: {
    gap: 16,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#FF6B35',
    gap: 8,
  },
  uploadButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
  },
  uploadedImageContainer: {
    position: 'relative',
    alignSelf: 'center',
  },
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundRemovalSection: {
    marginTop: 8,
  },
  toggleButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#222',
  },
  toggleButtonActive: {
    borderColor: '#FF6B35',
    backgroundColor: '#FF6B35',
  },
  toggleButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  toggleButtonTextActive: {
    color: '#000',
  },
  priceText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#FF6B35',
  },
  noDesignSection: {
    gap: 16,
  },
  freeDesignsContainer: {
    marginBottom: 16,
  },
  freeDesignCard: {
    width: 100,
    marginRight: 12,
    alignItems: 'center',
    padding: 8,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#333',
    backgroundColor: '#222',
  },
  freeDesignCardSelected: {
    borderColor: '#FF6B35',
    backgroundColor: '#FF6B35',
  },
  freeDesignImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 8,
  },
  freeDesignName: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  aiDesignButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#333',
    gap: 8,
  },
  aiDesignButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FF6B35',
  },
  descriptionInput: {
    backgroundColor: '#222',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  sizeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  sizeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#333',
    backgroundColor: '#222',
    alignItems: 'center',
  },
  sizeButtonSelected: {
    borderColor: '#FF6B35',
    backgroundColor: '#FF6B35',
  },
  sizeButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  sizeButtonTextSelected: {
    color: '#000',
  },
  colorContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorButtonSelected: {
    borderColor: '#FF6B35',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#000',
  },
  quantityText: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    minWidth: 40,
    textAlign: 'center',
  },
  orderSummary: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#CCCCCC',
  },
  summaryPrice: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#333',
    marginTop: 8,
    paddingTop: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
  },
  totalPrice: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
  },
  nextButton: {
    margin: 20,
    borderRadius: 12,
    elevation: 8,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  nextButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#000',
  },
});