'use client';

import { useState, useEffect } from 'react';
import { EventCard } from '@/components/event-card';
import { supabase, Event } from '@/lib/supabase';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EventosPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    const { data } = await supabase
      .from('events')
      .select('*')
      .eq('status', 'realizado')
      .order('date', { ascending: false });

    if (data) {
      setEvents(data);
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
            <Calendar className="h-16 w-16 text-[#FFD60A] mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-[var(--font-saira)]">
              Eventos Realizados
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Historial completo de eventos de boxeo organizados en Chile
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-white/70 text-lg">
                No hay eventos disponibles en este momento.
              </p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
