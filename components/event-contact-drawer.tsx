'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { supabase } from '../lib/supabase';
import type { BoxingEventQuote } from '../types/quote';

const EQUIPMENT_OPTIONS = [
  'Guantes de boxeo',
  'Protectores bucales',
  'Vendas',
  'Cronómetro',
  'Campana',
  'Sillas de esquina',
  'Cubetas y toallas',
  'Botiquín médico',
];

const ADDITIONAL_SERVICES = [
  'Árbitro profesional',
  'Jueces oficiales',
  'Médico en sitio',
  'Ambulancia standby',
  'Pesaje oficial',
  'Seguridad',
  'Fotografía profesional',
  'Video en vivo',
  'Presentador/MC',
  'Sistema de sonido',
  'Iluminación profesional',
];

interface EventContactDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EventContactDrawer({ open, onOpenChange }: EventContactDrawerProps) {
  const [formData, setFormData] = useState<Omit<BoxingEventQuote, 'id' | 'created_at'>>({
    client_name: '',
    client_email: '',
    client_phone: '',
    event_date: '',
    event_time: '',
    venue_name: '',
    venue_address: '',
    event_type: '',
    number_of_fights: 1,
    expected_attendance: 0,
    ring_needed: true,
    equipment_needed: [],
    additional_services: [],
    budget_range: '',
    special_requirements: '',
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelect = (
    value: string,
    field: 'equipment_needed' | 'additional_services'
  ) => {
    setFormData(prev => {
      const currentValues = prev[field];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      return { ...prev, [field]: newValues };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      const { error } = await supabase.from('boxing_event_quotes').insert([formData]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        client_name: '',
        client_email: '',
        client_phone: '',
        event_date: '',
        event_time: '',
        venue_name: '',
        venue_address: '',
        event_type: '',
        number_of_fights: 1,
        expected_attendance: 0,
        ring_needed: true,
        equipment_needed: [],
        additional_services: [],
        budget_range: '',
        special_requirements: '',
      });

      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Error al enviar la cotización'
      );
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-[#FFD60A]/20 text-slate-100 overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-2xl text-white">
            Cotización de Evento de Boxeo
          </SheetTitle>
          <SheetDescription className="text-slate-300">
            Completa los datos de tu evento para recibir una cotización personalizada.
          </SheetDescription>
        </SheetHeader>

        <div className="max-w-4xl mx-auto pb-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-500 mb-4">
              <div className="text-white text-4xl">🥊</div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Detalles de tu Evento
            </h1>
            <p className="text-sm text-slate-300">
              Completa el formulario para recibir una propuesta a medida para tu show de boxeo.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-6">
              <h2 className="text-2xl font-bold text-white">Información del Cliente</h2>
            </div>

            <div className="p-8 space-y-8">
              {/* Datos cliente */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="client_name"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="client_name"
                    name="client_name"
                    required
                    value={formData.client_name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                    placeholder="Juan Pérez"
                  />
                </div>

                <div>
                  <label
                    htmlFor="client_email"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="client_email"
                    name="client_email"
                    required
                    value={formData.client_email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                    placeholder="correo@ejemplo.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="client_phone"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="client_phone"
                    name="client_phone"
                    required
                    value={formData.client_phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent.transition"
                    placeholder="+56 9 1234 5678"
                  />
                </div>
              </div>

              {/* Detalles del evento */}
              <div className="border-t border-gray-200 pt-8">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-6 h-6 text-yellow-600" />
                  <h3 className="text-xl font-bold text-gray-900">Detalles del Evento</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="event_date"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Fecha del Evento *
                    </label>
                    <input
                      type="date"
                      id="event_date"
                      name="event_date"
                      required
                      value={formData.event_date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent.transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="event_time"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      <Clock className="w-4 h-4 inline mr-1" />
                      Hora del Evento *
                    </label>
                    <input
                      type="time"
                      id="event_time"
                      name="event_time"
                      required
                      value={formData.event_time}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent.transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="event_type"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Tipo de Evento *
                    </label>
                    <select
                      id="event_type"
                      name="event_type"
                      required
                      value={formData.event_type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent.transition"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="amateur">Amateur</option>
                      <option value="profesional">Profesional</option>
                      <option value="exhibicion">Exhibición</option>
                      <option value="entrenamiento">Entrenamiento/Sparring</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="number_of_fights"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Número de Peleas *
                    </label>
                    <input
                      type="number"
                      id="number_of_fights"
                      name="number_of_fights"
                      required
                      min="1"
                      value={formData.number_of_fights}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent.transition"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="expected_attendance"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      <Users className="w-4 h-4 inline mr-1" />
                      Asistencia Esperada *
                    </label>
                    <input
                      type="number"
                      id="expected_attendance"
                      name="expected_attendance"
                      required
                      min="0"
                      value={formData.expected_attendance}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent.transition"
                      placeholder="Número de personas"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="budget_range"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      <DollarSign className="w-4 h-4 inline mr-1" />
                      Presupuesto *
                    </label>
                    <select
                      id="budget_range"
                      name="budget_range"
                      required
                      value={formData.budget_range}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent.transition"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="0-50000">$0 - $50,000</option>
                      <option value="50000-100000">$50,000 - $100,000</option>
                      <option value="100000-250000">$100,000 - $250,000</option>
                      <option value="250000-500000">$250,000 - $500,000</option>
                      <option value="500000+">$500,000+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Ubicación */}
              <div className="border-t border-gray-200 pt-8">
                <div className="flex items-center gap-3 mb-6">
                  <MapPin className="w-6 h-6 text-yellow-600" />
                  <h3 className="text-xl font-bold text-gray-900">Ubicación del Evento</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="venue_name"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Nombre del Lugar *
                    </label>
                    <input
                      type="text"
                      id="venue_name"
                      name="venue_name"
                      required
                      value={formData.venue_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent.transition"
                      placeholder="Gimnasio, arena, club, etc."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="venue_address"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Dirección Completa *
                    </label>
                    <input
                      type="text"
                      id="venue_address"
                      name="venue_address"
                      required
                      value={formData.venue_address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent.transition"
                      placeholder="Calle, número, ciudad, región"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="ring_needed"
                      name="ring_needed"
                      checked={formData.ring_needed}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                    />
                    <label
                      htmlFor="ring_needed"
                      className="ml-3 text-sm font-semibold text-gray-700"
                    >
                      Se requiere ring de boxeo
                    </label>
                  </div>
                </div>
              </div>

              {/* Equipo necesario */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Equipo Necesario</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {EQUIPMENT_OPTIONS.map(item => (
                    <label
                      key={item}
                      className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                    >
                      <input
                        type="checkbox"
                        checked={formData.equipment_needed.includes(item)}
                        onChange={() => handleMultiSelect(item, 'equipment_needed')}
                        className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                      />
                      <span className="text-sm text-gray-700">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Servicios adicionales */}
              <div className="border-t border-gray-200 pt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Servicios Adicionales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {ADDITIONAL_SERVICES.map(service => (
                    <label
                      key={service}
                      className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                    >
                      <input
                        type="checkbox"
                        checked={formData.additional_services.includes(service)}
                        onChange={() => handleMultiSelect(service, 'additional_services')}
                        className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
                      />
                      <span className="text-sm text-gray-700">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Requerimientos especiales */}
              <div className="border-t border-gray-200 pt-8">
                <label
                  htmlFor="special_requirements"
                  className="block text-sm font-semibold text-gray-700.mb-2"
                >
                  Requerimientos Especiales
                </label>
                <textarea
                  id="special_requirements"
                  name="special_requirements"
                  value={formData.special_requirements}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent.transition resize-none"
                  placeholder="Cualquier información adicional que debamos saber sobre tu evento..."
                />
              </div>

              {/* Mensajes de estado */}
              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900">
                      ¡Cotización enviada exitosamente!
                    </h4>
                    <p className="text-sm text-green-700 mt-1">
                      Me pondré en contacto contigo en las próximas 24 horas.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-900">Error al enviar</h4>
                    <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Botón submit */}
              <button
                type="submit"
                disabled={submitStatus === 'loading'}
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-4 px-6 rounded-lg hover:from-yellow-600 hover:to-yellow-700 focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {submitStatus === 'loading' ? 'Enviando...' : 'Solicitar Cotización'}
              </button>
            </div>
          </form>

          <p className="text-center text-slate-400 mt-4 text-xs">
            * Campos obligatorios. Tu información será tratada de forma confidencial.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
