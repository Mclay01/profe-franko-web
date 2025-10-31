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
import { ArrowLeft, User, Mail, MapPin, Phone } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CustomerData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  commune: string;
  region: string;
}

export default function CustomerInfoScreen() {
  const router = useRouter();
  const [customerData, setCustomerData] = useState<CustomerData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    commune: '',
    region: '',
  });

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'commune', 'region'];
    for (const field of required) {
      if (!customerData[field as keyof CustomerData].trim()) {
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (!validateForm()) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }

    router.push('/payment');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Información del Cliente</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>Datos Personales</Text>
          
          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <User size={20} color="#FF6B35" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Nombre *"
                placeholderTextColor="#666"
                value={customerData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <User size={20} color="#FF6B35" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Apellido *"
                placeholderTextColor="#666"
                value={customerData.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
              />
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Mail size={20} color="#FF6B35" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico *"
              placeholderTextColor="#666"
              value={customerData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Phone size={20} color="#FF6B35" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Teléfono *"
              placeholderTextColor="#666"
              value={customerData.phone}
              onChangeText={(value) => handleInputChange('phone', value)}
              keyboardType="phone-pad"
            />
          </View>

          <Text style={styles.sectionTitle}>Dirección de Envío</Text>

          <View style={styles.inputContainer}>
            <MapPin size={20} color="#FF6B35" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Dirección *"
              placeholderTextColor="#666"
              value={customerData.address}
              onChangeText={(value) => handleInputChange('address', value)}
            />
          </View>

          <View style={styles.inputRow}>
            <View style={styles.inputContainer}>
              <MapPin size={20} color="#FF6B35" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Comuna *"
                placeholderTextColor="#666"
                value={customerData.commune}
                onChangeText={(value) => handleInputChange('commune', value)}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <MapPin size={20} color="#FF6B35" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Región *"
                placeholderTextColor="#666"
                value={customerData.region}
                onChangeText={(value) => handleInputChange('region', value)}
              />
            </View>
          </View>

          <View style={styles.orderSummaryContainer}>
            <Text style={styles.orderSummaryTitle}>Resumen del Pedido</Text>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Polera oversized (1x)</Text>
                <Text style={styles.summaryPrice}>$15.000</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Diseño personalizado</Text>
                <Text style={styles.summaryPrice}>$2.000</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalPrice}>$17.000</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <LinearGradient
            colors={['#FF6B35', '#FF8A50']}
            style={styles.nextButtonGradient}
          >
            <Text style={styles.nextButtonText}>Continuar al Pago</Text>
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
  formContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 16,
    marginTop: 10,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
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
  orderSummaryContainer: {
    marginTop: 20,
  },
  orderSummaryTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FF6B35',
    marginBottom: 12,
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