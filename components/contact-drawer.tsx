'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  role: z.enum(['peleador', 'arbitro', 'entrenador', 'club', 'federacion', 'otros']),
  name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(8, 'Teléfono inválido'),
  organization: z.string().optional(),
  city: z.string().min(2, 'La ciudad es requerida'),
  country: z.string().min(2, 'El país es requerido'),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type FormData = z.infer<typeof formSchema>;

interface ContactDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultRole?: string;
}

const roleLabels: Record<FormData['role'], string> = {
  peleador: 'Peleador',
  arbitro: 'Árbitro',
  entrenador: 'Entrenador',
  club: 'Club',
  federacion: 'Federación',
  otros: 'Otros',
};

const roleMapFromDefault: Record<string, FormData['role']> = {
  peleador: 'peleador',
  'peleador/a': 'peleador',
  árbitro: 'arbitro',
  arbitro: 'arbitro',
  entrenador: 'entrenador',
  club: 'club',
  federación: 'federacion',
  federacion: 'federacion',
  otros: 'otros',
  otro: 'otros',
  'organizador de eventos': 'otros',
};

export function ContactDrawer({ open, onOpenChange, defaultRole }: ContactDrawerProps) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: 'otros',
      country: 'Chile',
    },
  });

  const selectedRole = watch('role');

  // Mapear defaultRole (tarjeta clickeada) al select interno
  useEffect(() => {
    if (!open || !defaultRole) return;
    const key = defaultRole.toString().trim().toLowerCase();
    const mapped = roleMapFromDefault[key];
    if (mapped) {
      setValue('role', mapped);
    }
  }, [open, defaultRole, setValue]);

  // Bloquear scroll de la página de atrás
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const onSubmit = async (data: FormData) => {
    setStatus('idle');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.error || 'No se pudo enviar el mensaje');
      }

      setStatus('success');
      const currentRole = data.role;

      reset({ role: currentRole, country: 'Chile' });

      setTimeout(() => {
        setStatus('idle');
        onOpenChange(false);
      }, 2500);
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Error inesperado al enviar'
      );
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Drawer lateral derecho */}
      <div
        className="
          relative h-full w-full max-w-md
          bg-[#050505] border-l border-white/10 shadow-2xl
          flex flex-col
          sm:rounded-l-2xl sm:my-4 sm:mr-4
        "
      >
        {/* Header fijo */}
        <header className="flex items-start justify-between px-5 py-4 border-b border-white/10 shrink-0">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#FFD60A]">
              Contacto
            </p>
            <h2 className="mt-1 text-lg font-semibold text-white">
              Hablemos de tu proyecto
            </h2>
            <p className="mt-1 text-xs text-white/60">
              Perfil seleccionado:{' '}
              <span className="text-[#FFD60A] font-medium">
                {roleLabels[selectedRole] ?? 'Otros'}
              </span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70 hover:bg.white/10 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </header>

        {/* FORMULARIO SCROLLEABLE (PC y móvil) */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 overflow-y-auto px-5 pb-5 pt-3 space-y-4 pr-3"
        >
          {/* Rol */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-white/70">
              ¿Quién eres?
            </label>
            <select
              value={selectedRole}
              onChange={e =>
                setValue('role', e.target.value as FormData['role'], {
                  shouldValidate: true,
                })
              }
              className="w-full rounded-lg bg-[#111]/80 border border.white/10 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
            >
              <option value="peleador">Peleador</option>
              <option value="arbitro">Árbitro</option>
              <option value="entrenador">Entrenador</option>
              <option value="club">Club</option>
              <option value="federacion">Federación</option>
              <option value="otros">Otros</option>
            </select>
            {errors.role && (
              <p className="text-xs text-red-400">{errors.role.message}</p>
            )}
          </div>

          {/* Nombre */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-white/70">
              Nombre completo 
            </label>
            <input
              type="text"
              {...register('name')}
              className="w-full rounded-lg bg-[#111]/80 border border.white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
              placeholder="Juan Pérez"
            />
            {errors.name && (
              <p className="text-xs text-red-400">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-white/70">
              Email 
            </label>
            <input
              type="email"
              {...register('email')}
              className="w-full rounded-lg bg-[#111]/80 border border.white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
              placeholder="juan@ejemplo.com"
            />
            {errors.email && (
              <p className="text-xs text-red-400">{errors.email.message}</p>
            )}
          </div>

          {/* Teléfono */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-white/70">
              Teléfono / WhatsApp 
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="w-full rounded-lg bg-[#111]/80 border border.white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
              placeholder="+56 9 1234 5678"
            />
            {errors.phone && (
              <p className="text-xs text-red-400">{errors.phone.message}</p>
            )}
          </div>

          {/* Organización */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-white/70">
              Organización (opcional)
            </label>
            <input
              type="text"
              {...register('organization')}
              className="w-full rounded-lg bg-[#111]/80 border border.white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
              placeholder="Nombre del club o federación"
            />
          </div>

          {/* Ciudad / País */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-white/70">
                Ciudad 
              </label>
              <input
                type="text"
                {...register('city')}
                className="w-full rounded-lg bg-[#111]/80 border border.white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                placeholder="Santiago"
              />
              {errors.city && (
                <p className="text-xs text-red-400">{errors.city.message}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-white/70">
                País 
              </label>
              <input
                type="text"
                {...register('country')}
                className="w-full rounded-lg bg-[#111]/80 border border.white/10 px-3 py-2.5 text-sm text-white placeholder:text.white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                placeholder="Chile"
              />
              {errors.country && (
                <p className="text-xs text-red-400">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>

          {/* Mensaje */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-white/70">
              Mensaje 
            </label>
            <textarea
              rows={4}
              {...register('message')}
              className="w-full rounded-lg bg-[#111]/80 border border.white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent resize-none"
              placeholder="Cuéntame en qué te puedo ayudar..."
            />
            {errors.message && (
              <p className="text-xs text-red-400">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Estados */}
          {status === 'success' && (
            <div className="mt-1 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2.5 text-left text-xs text-emerald-200 flex items-start gap-2">
              <span className="mt-0.5">✅</span>
              <span>
                Mensaje enviado correctamente. Te responderé pronto al correo
                que indicaste.
              </span>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-1 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2.5 text-left text-xs text-red-200 flex items-start gap-2">
              <span className="mt-0.5">⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Botón de envío (al final, también scrolleable) */}
          <div className="pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#FFD60A] to-[#FFA500] text-[#0A0A0A] hover:from-[#FFA500] hover:to-[#FFD60A] font-bold text-sm py-3.5 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Enviar mensaje
                </>
              )}
            </Button>
            <p className="mt-2 text-[10px] text-white/35 text-center">
              Tu mensaje llega directo al correo del Profe. Sin spam, sin cosas
              raras.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
