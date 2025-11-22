'use client';

import { useState, type ChangeEvent } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Zap,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

type BoxingEventQuoteForm = {
  client_name: string;
  client_email: string;
  client_phone: string;
  event_date: string;
  event_time: string;
  venue_name: string;
  venue_address: string;
  event_type: string;
  number_of_fights: number;
  expected_attendance: number;
  ring_needed: boolean;
  equipment_needed: string[];
  additional_services: string[];
  budget_range: string;
  special_requirements: string;
};

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

export default function BoxingQuoteForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BoxingEventQuoteForm>({
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

  const [submitStatus, setSubmitStatus] =
    useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value, 10) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelect = (
    value: string,
    field: 'equipment_needed' | 'additional_services',
  ) => {
    setFormData(prev => {
      const currentValues = prev[field];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(item => item !== value)
        : [...currentValues, value];
      return { ...prev, [field]: newValues };
    });
  };

  const handleSubmit = async () => {
    if (currentStep !== 4 || submitStatus === 'loading') return;

    setSubmitStatus('loading');
    setErrorMessage('');

    try {
      const apiResponse = await fetch('/api/event-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!apiResponse.ok) {
        let errorText = 'Error al enviar la cotización';
        try {
          const errorData = await apiResponse.json();
          if (errorData?.error) errorText = errorData.error;
        } catch {
          // ignoramos fallo al parsear JSON
        }
        throw new Error(errorText);
      }

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

      setTimeout(() => {
        setSubmitStatus('idle');
        setCurrentStep(1);
      }, 5000);
    } catch (error) {
      console.error('Error al enviar la cotización:', error);
      setSubmitStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Error al enviar la cotización',
      );
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.client_name.trim() !== '' &&
          formData.client_email.trim() !== '' &&
          formData.client_phone.trim() !== ''
        );
      case 2:
        return (
          formData.event_date &&
          formData.event_time &&
          formData.event_type &&
          formData.number_of_fights > 0 &&
          formData.expected_attendance >= 0 &&
          formData.budget_range
        );
      case 3:
        return (
          formData.venue_name.trim() !== '' &&
          formData.venue_address.trim() !== ''
        );
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < 4 && isStepValid()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-neutral-950 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(234,179,8,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(234,179,8,0.08),transparent_40%)]" />

      <div className="relative z-10 py-8 md:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* HEADER */}
          <div className="mb-8 md:mb-9">
            <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 mb-2 tracking-tight">
              Cotización de Eventos
            </h1>
            <p className="text-sm md:text-base text-zinc-400 font-light">
              Complete el formulario para recibir una cotización personalizada
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={e => e.preventDefault()}
            className="bg-zinc-900/50 backdrop-blur-xl rounded-xl shadow-lg border border-zinc-800/50 overflow-hidden"
          >
            {/* HEADER STEP BAR */}
            <div className="relative bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-500 px-5 py-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transform translate-x-full animate-shimmer" />
              <div className="flex items-center justify-between relative z-10 gap-3">
                <h2 className="text-base md:text-lg font-semibold text-white flex items-center gap-2">
                  {currentStep === 1 && (
                    <>
                      <Users className="w-4 h-4 md:w-5 md:h-5" />
                      Información del Cliente
                    </>
                  )}
                  {currentStep === 2 && (
                    <>
                      <Calendar className="w-4 h-4 md:w-5 md:h-5" />
                      Detalles del Evento
                    </>
                  )}
                  {currentStep === 3 && (
                    <>
                      <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                      Ubicación
                    </>
                  )}
                  {currentStep === 4 && (
                    <>
                      <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                      Servicios y Requerimientos
                    </>
                  )}
                </h2>
                <div className="text-[11px] md:text-xs text-white font-medium">
                  Paso {currentStep} de 4
                </div>
              </div>
              <div className="mt-2.5 flex gap-1 relative z-10">
                {[1, 2, 3, 4].map(step => (
                  <div
                    key={step}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      step <= currentStep ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-5 md:p-6 space-y-5">
              {/* PASO 1 */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="client_name"
                      className="block text-[11px] md:text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wide"
                    >
                      Nombre Completo 
                    </label>
                    <input
                      type="text"
                      id="client_name"
                      name="client_name"
                      required
                      value={formData.client_name}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 md:py-2.5 bg-zinc-800/50 border border-zinc-700 text-xs md:text-sm text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all.duration-200 placeholder-zinc-500"
                      placeholder="Ingrese su nombre completo"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="client_email"
                      className="block text-[11px] md:text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wide"
                    >
                      Email 
                    </label>
                    <input
                      type="email"
                      id="client_email"
                      name="client_email"
                      required
                      value={formData.client_email}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 md:py-2.5 bg-zinc-800/50 border border-zinc-700 text-xs md:text-sm text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all.duration-200 placeholder-zinc-500"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="client_phone"
                      className="block text-[11px] md:text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wide"
                    >
                      Teléfono 
                    </label>
                    <input
                      type="tel"
                      id="client_phone"
                      name="client_phone"
                      required
                      value={formData.client_phone}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 md:py-2.5 bg-zinc-800/50 border.border-zinc-700 text-xs md:text-sm text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all.duration-200 placeholder-zinc-500"
                      placeholder="+56 9 1234 5678"
                    />
                  </div>
                </div>
              )}

              {/* PASO 2 */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="event_date"
                        className="block text-[11px] md:text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wide"
                      >
                        Fecha del Evento 
                      </label>
                      <input
                        type="date"
                        id="event_date"
                        name="event_date"
                        required
                        value={formData.event_date}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 md:py-2.5 bg-zinc-800/50 border border-zinc-700 text-xs md:text-sm text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all.duration-200"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="event_time"
                        className="block text-[11px] md:text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wide flex items-center gap-1"
                      >
                        <Clock className="w-3 h-3" />
                        Hora del Evento 
                      </label>
                      <input
                        type="time"
                        id="event_time"
                        name="event_time"
                        required
                        value={formData.event_time}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 md:py-2.5 bg-zinc-800/50 border border-zinc-700 text-xs md:text-sm text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all.duration-200"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="event_type"
                      className="block text-[11px] md:text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wide"
                    >
                      Tipo de Evento 
                    </label>
                    <select
                      id="event_type"
                      name="event_type"
                      required
                      value={formData.event_type}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 md:py-2.5 bg-zinc-800/50 border border-zinc-700 text-xs md:text-sm text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all.duration-200"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="amateur">Amateur</option>
                      <option value="profesional">Profesional</option>
                      <option value="exhibicion">Exhibición</option>
                      <option value="entrenamiento">Entrenamiento/Sparring</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="number_of_fights"
                        className="block text-[11px] md:text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wide"
                      >
                        Número de Peleas 
                      </label>
                      <input
                        type="number"
                        id="number_of_fights"
                        name="number_of_fights"
                        required
                        min={1}
                        value={formData.number_of_fights}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 md:py-2.5 bg-zinc-800/50 border.border-zinc-700 text-xs md:text-sm text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all.duration-200"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="expected_attendance"
                        className="block text-[11px] md:text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wide flex items-center gap-1"
                      >
                        <Users className="w-3 h-3" />
                        Cantidad de publico (aprox.) 
                      </label>
                      <input
                        type="number"
                        id="expected_attendance"
                        name="expected_attendance"
                        required
                        min={0}
                        value={formData.expected_attendance}
                        onChange={handleInputChange}
                        className="w-full px-3.5 py-2 md:py-2.5 bg-zinc-800/50 border border-zinc-700 text-xs md:text-sm text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all.duration-200 placeholder-zinc-500"
                        placeholder="Ej: 1500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="budget_range"
                      className="block text-[11px] md:text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wide flex items-center gap-1"
                    >
                      <DollarSign className="w-3 h-3" />
                      Presupuesto 
                    </label>
                    <select
                      id="budget_range"
                      name="budget_range"
                      required
                      value={formData.budget_range}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 md:py-2.5 bg-zinc-800/50 border border-zinc-700 text-xs md:text-sm text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all.duration-200"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="0-5000 USD">$0 - $5,000 USD</option>
                      <option value="5000-10000 USD">
                        $5,000 - $10,000 USD
                      </option>
                      <option value="10000-25000 USD">
                        $10,000 - $25,000 USD
                      </option>
                      <option value="25000-50000 USD">
                        $25,000 - $50,000 USD
                      </option>
                      <option value="50000+ USD">$50,000+ USD</option>
                    </select>
                  </div>
                </div>
              )}

              {/* PASO 3 */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="venue_name"
                      className="block text-[11px] md:text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wide"
                    >
                      Nombre del Lugar 
                    </label>
                    <input
                      type="text"
                      id="venue_name"
                      name="venue_name"
                      required
                      value={formData.venue_name}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 md:py-2.5 bg-zinc-800/50 border border-zinc-700 text-xs md:text-sm text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all.duration-200 placeholder-zinc-500"
                      placeholder="Arena, gimnasio, club, etc."
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="venue_address"
                      className="block text-[11px] md:text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wide"
                    >
                      Dirección Completa 
                    </label>
                    <input
                      type="text"
                      id="venue_address"
                      name="venue_address"
                      required
                      value={formData.venue_address}
                      onChange={handleInputChange}
                      className="w-full px-3.5 py-2 md:py-2.5 bg-zinc-800/50 border border-zinc-700 text-xs md:text-sm text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all.duration-200 placeholder-zinc-500"
                      placeholder="Calle, número, comuna, ciudad"
                    />
                  </div>

                  <div className="flex items-center bg-zinc-800/30 px-3.5 py-2.5 rounded-lg border border-zinc-700">
                    <input
                      type="checkbox"
                      id="ring_needed"
                      name="ring_needed"
                      checked={formData.ring_needed}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-yellow-500 bg-zinc-800 border border-zinc-600 rounded focus:ring-yellow-500 focus:ring-2"
                    />
                    <label
                      htmlFor="ring_needed"
                      className="ml-3 text-xs md:text-sm font-medium text-zinc-300"
                    >
                      Se requiere ring de boxeo profesional
                    </label>
                  </div>
                </div>
              )}

              {/* PASO 4 */}
              {currentStep === 4 && (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-white mb-2.5">
                      Equipo Necesario
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                      {EQUIPMENT_OPTIONS.map(item => (
                        <label
                          key={item}
                          className="flex items-center space-x-2 px-2.5 py-2 bg-zinc-800/30 border border-zinc-700 rounded-lg hover:bg-zinc-800/50 hover:border-yellow-500/50 cursor-pointer transition-all.duration-200 group"
                        >
                          <input
                            type="checkbox"
                            checked={formData.equipment_needed.includes(item)}
                            onChange={() =>
                              handleMultiSelect(item, 'equipment_needed')
                            }
                            className="w-4 h-4 text-yellow-500 bg-zinc-800 border border-zinc-600 rounded focus:ring-yellow-500 focus:ring-2"
                          />
                          <span className="text-[11px] md:text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">
                            {item}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm md:text-base font-semibold text-white mb-2.5">
                      Servicios Adicionales
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {ADDITIONAL_SERVICES.map(service => (
                        <label
                          key={service}
                          className="flex items-center space-x-2 px-2.5 py-2 bg-zinc-800/30 border border-zinc-700 rounded-lg hover:bg-zinc-800/50 hover:border-yellow-500/50 cursor-pointer transition-all.duration-200 group"
                        >
                          <input
                            type="checkbox"
                            checked={formData.additional_services.includes(
                              service,
                            )}
                            onChange={() =>
                              handleMultiSelect(service, 'additional_services')
                            }
                            className="w-4 h-4 text-yellow-500 bg-zinc-800 border border-zinc-600 rounded focus:ring-yellow-500 focus:ring-2"
                          />
                          <span className="text-[11px] md:text-xs font-medium text-zinc-300 group-hover:text-white transition-colors">
                            {service}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="special_requirements"
                      className="block text-[11px] md:text-xs font-semibold text-zinc-300 mb-1.5 uppercase tracking-wide"
                    >
                      Requerimientos Especiales
                    </label>
                    <textarea
                      id="special_requirements"
                      name="special_requirements"
                      value={formData.special_requirements}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-3.5 py-2.5 bg-zinc-800/50 border border-zinc-700 text-xs md:text-sm text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500.transition-all.duration-200 resize-none placeholder-zinc-500"
                      placeholder="Describa cualquier requerimiento especial..."
                    />
                  </div>
                </div>
              )}

              {/* ALERTAS */}
              {submitStatus === 'success' && (
                <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/50 rounded-lg p-3.5 md:p-4 flex items-start gap-2.5 animate-fade-in">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-400 text-xs md:text-sm mb-0.5">
                      Cotización enviada exitosamente
                    </h4>
                    <p className="text-[11px] md:text-xs text-green-300/80">
                      Nuestro equipo revisará su solicitud y nos pondremos en
                      contacto con usted en las próximas 24-48 horas.
                    </p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/50 rounded-lg p-3.5 md:p-4 flex items-start gap-2.5 animate-fade-in">
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-red-400 text-xs md:text-sm mb-0.5">
                      Error al enviar
                    </h4>
                    <p className="text-[11px] md:text-xs text-red-300/80">
                      {errorMessage}
                    </p>
                  </div>
                </div>
              )}

              {/* BOTONES NAVEGACIÓN */}
              <div className="flex flex-col sm:flex-row gap-2.5 mt-3">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex-1 bg-zinc-800 text-white text-xs md:text-sm font-medium py-2 md:py-2.5 px-3.5 rounded-lg hover:bg-zinc-700 transition-all duration-300 flex items-center justify-center gap-1.5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </button>
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!isStepValid()}
                    className="flex-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-500 text-black text-xs md:text-sm font-semibold py-2 md:py-2.5 px-3.5 rounded-lg hover:from-yellow-400 hover:via-yellow-300 hover:to-amber-400 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 shadow-md shadow-yellow-500/30"
                  >
                    Siguiente
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitStatus === 'loading'}
                    className="flex-1 bg-gradient-to-r from-yellow-500 via-yellow-400 to-amber-500 text-black text-xs md:text-sm font-semibold py-2 md:py-2.5 px-3.5 rounded-lg hover:from-yellow-400 hover:via-yellow-300 hover:to-amber-400 transition-all duration-300 disabled:opacity-50.disabled:cursor-not-allowed shadow-md shadow-yellow-500/30 flex items-center justify-center gap-1.5"
                  >
                    {submitStatus === 'loading' ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4" />
                        Solicitar Cotización
                      </>
                    )}
                  </button>
                )}
              </div>

            </div>
          </form>

          {/* FOOTER */}
          <div className="mt-5 text-center">
            <p className="text-zinc-500 text-[11px] md:text-xs">
              * Campos obligatorios. Su información será tratada con total
              confidencialidad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
