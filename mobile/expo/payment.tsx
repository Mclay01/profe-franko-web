import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, CreditCard, Lock, CircleCheck as CheckCircle, User } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PaymentData {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

export default function PaymentScreen() {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState<PaymentData>({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (field: keyof PaymentData, value: string) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const validateForm = () => {
    const { cardNumber, expiryDate, cvv, cardName } = paymentData;
    return cardNumber.replace(/\s/g, '').length === 16 &&
           expiryDate.length === 5 &&
           cvv.length === 3 &&
           cardName.trim().length > 0;
  };

  const handlePayment = async () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Por favor completa todos los campos de pago correctamente');
      return;
    }

    setIsProcessing(true);

    // Simular procesamiento de pago
    setTimeout(() => {
      setIsProcessing(false);
      Alert.alert(
        'Pago Exitoso',
        'Tu pedido ha sido confirmado. Recibirás un email con los detalles.',
        [
          {
            text: 'OK',
            onPress: () => router.push('/'),
          }
        ]
      );
    }, 3000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pago</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Resumen Final del Pedido */}
          <View style={styles.orderSummaryContainer}>
            <Text style={styles.sectionTitle}>Resumen del Pedido</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Polera oversized (1x)</Text>
                <Text style={styles.summaryPrice}>$15.000</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Diseño personalizado</Text>
                <Text style={styles.summaryPrice}>$2.000</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Envío</Text>
                <Text style={styles.summaryPrice}>GRATIS</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total a Pagar</Text>
                <Text style={styles.totalPrice}>$17.000</Text>
              </View>
            </View>
          </View>

          {/* Información de Pago */}
          <View style={styles.paymentSection}>
            <Text style={styles.sectionTitle}>Información de Pago</Text>
            
            <View style={styles.securityBadge}>
              <Lock size={16} color="#4ADE80" />
              <Text style={styles.securityText}>Pago 100% Seguro</Text>
            </View>

            <View style={styles.inputContainer}>
              <CreditCard size={20} color="#FF6B35" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Número de Tarjeta"
                placeholderTextColor="#666"
                value={paymentData.cardNumber}
                onChangeText={(value) => handleInputChange('cardNumber', formatCardNumber(value))}
                keyboardType="numeric"
                maxLength={19}
              />
            </View>

            <View style={styles.inputContainer}>
              <User size={20} color="#FF6B35" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nombre en la Tarjeta"
                placeholderTextColor="#666"
                value={paymentData.cardName}
                onChangeText={(value) => handleInputChange('cardName', value)}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputRow}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="MM/AA"
                  placeholderTextColor="#666"
                  value={paymentData.expiryDate}
                  onChangeText={(value) => handleInputChange('expiryDate', formatExpiryDate(value))}
                  keyboardType="numeric"
                  maxLength={5}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="CVV"
                  placeholderTextColor="#666"
                  value={paymentData.cvv}
                  onChangeText={(value) => handleInputChange('cvv', value)}
                  keyboardType="numeric"
                  maxLength={3}
                  secureTextEntry
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.payButton, isProcessing && styles.payButtonDisabled]}
            onPress={handlePayment}
            disabled={isProcessing}
          >
            <LinearGradient
              colors={isProcessing ? ['#666', '#666'] : ['#FF6B35', '#FF8A50']}
              style={styles.payButtonGradient}
            >
              {isProcessing ? (
                <Text style={styles.payButtonTextProcessing}>Procesando Pago...</Text>
              ) : (
                <>
                  <CheckCircle size={24} color="#000" />
                  <Text style={styles.payButtonText}>Confirmar Pedido - $17.000</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            Al confirmar tu pedido, aceptas nuestros términos y condiciones.
            Tu pedido será procesado en 3-5 días hábiles.
          </Text>
        </View>
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
  content: {
    padding: 20,
  },
  orderSummaryContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  summaryCard: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#333',
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
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
  },
  paymentSection: {
    marginBottom: 30,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(74, 222, 128, 0.1)',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    gap: 8,
  },
  securityText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#4ADE80',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    paddingVertical: 12,
  },
  payButton: {
    borderRadius: 12,
    elevation: 8,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginBottom: 20,
  },
  payButtonDisabled: {
    opacity: 0.7,
  },
  payButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 32,
    borderRadius: 12,
    gap: 12,
  },
  payButtonText: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#000',
  },
  payButtonTextProcessing: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
  },
  disclaimer: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#999',
    textAlign: 'center',
    lineHeight: 16,
  },
});