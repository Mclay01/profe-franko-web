'use client';

import { useState } from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const formSchema = z.object({
  role: z.enum(['peleador', 'arbitro', 'entrenador', 'club', 'federacion']),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(8, 'Teléfono inválido'),
  organization: z.string().optional(),
  city: z.string().min(2, 'La ciudad es requerida'),
  country: z.string().min(2, 'El país es requerido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactoPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: 'peleador',
      country: 'Chile',
    },
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Error al enviar el formulario');

      toast.success('¡Mensaje enviado con éxito!', {
        description: 'Te contactaremos pronto.',
      });
      reset();
    } catch (error) {
      toast.error('Error al enviar el mensaje', {
        description: 'Por favor intenta nuevamente.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
    

      <section className="py-20 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Mail className="h-16 w-16 text-[#FFD60A] mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-[var(--font-saira)]">
              Contacto
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Completa el formulario y te responderé a la brevedad
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto bg-[#1A1A1A] border border-[#FFD60A]/20 rounded-lg p-8"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="role" className="text-white">
                  ¿Quién eres? <span className="text-[#D90429]">*</span>
                </Label>
                <Select
                  value={selectedRole}
                  onValueChange={(value) => setValue('role', value as any)}
                >
                  <SelectTrigger className="bg-[#0A0A0A] border-[#FFD60A]/20 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0A0A0A] border-[#FFD60A]/20 text-white">
                    <SelectItem value="peleador">Peleador</SelectItem>
                    <SelectItem value="arbitro">Árbitro</SelectItem>
                    <SelectItem value="entrenador">Entrenador</SelectItem>
                    <SelectItem value="club">Club</SelectItem>
                    <SelectItem value="federacion">Federación</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-[#D90429] text-sm">{errors.role.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Nombre completo <span className="text-[#D90429]">*</span>
                </Label>
                <Input
                  id="name"
                  {...register('name')}
                  className="bg-[#0A0A0A] border-[#FFD60A]/20 text-white"
                  placeholder="Juan Pérez"
                />
                {errors.name && (
                  <p className="text-[#D90429] text-sm">{errors.name.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email <span className="text-[#D90429]">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    className="bg-[#0A0A0A] border-[#FFD60A]/20 text-white"
                    placeholder="juan@ejemplo.com"
                  />
                  {errors.email && (
                    <p className="text-[#D90429] text-sm">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Teléfono <span className="text-[#D90429]">*</span>
                  </Label>
                  <Input
                    id="phone"
                    {...register('phone')}
                    className="bg-[#0A0A0A] border-[#FFD60A]/20 text-white"
                    placeholder="+56 9 1234 5678"
                  />
                  {errors.phone && (
                    <p className="text-[#D90429] text-sm">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization" className="text-white">
                  Organización (opcional)
                </Label>
                <Input
                  id="organization"
                  {...register('organization')}
                  className="bg-[#0A0A0A] border-[#FFD60A]/20 text-white"
                  placeholder="Nombre del club o federación"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-white">
                    Ciudad <span className="text-[#D90429]">*</span>
                  </Label>
                  <Input
                    id="city"
                    {...register('city')}
                    className="bg-[#0A0A0A] border-[#FFD60A]/20 text-white"
                    placeholder="Santiago"
                  />
                  {errors.city && (
                    <p className="text-[#D90429] text-sm">{errors.city.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="text-white">
                    País <span className="text-[#D90429]">*</span>
                  </Label>
                  <Input
                    id="country"
                    {...register('country')}
                    className="bg-[#0A0A0A] border-[#FFD60A]/20 text-white"
                    placeholder="Chile"
                  />
                  {errors.country && (
                    <p className="text-[#D90429] text-sm">{errors.country.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-white">
                  Mensaje <span className="text-[#D90429]">*</span>
                </Label>
                <Textarea
                  id="message"
                  {...register('message')}
                  className="bg-[#0A0A0A] border-[#FFD60A]/20 text-white min-h-[150px]"
                  placeholder="Cuéntame en qué te puedo ayudar..."
                />
                {errors.message && (
                  <p className="text-[#D90429] text-sm">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#FFD60A] text-[#0A0A0A] hover:bg-[#FFD60A]/90 font-semibold text-lg py-6"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
