'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Users } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Event } from '@/lib/supabase';
import Image from 'next/image';

interface EventCardProps {
  event: Event;
  index: number;
}

export function EventCard({ event, index }: EventCardProps) {
  const formattedDate = format(new Date(event.date), "d 'de' MMMM, yyyy", { locale: es });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1, type: "spring" }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative bg-gradient-to-br from-[#1A1A1A] via-[#0A0A0A] to-[#1A1A1A] border-2 border-[#FFD60A]/20 rounded-2xl overflow-hidden hover:border-[#FFD60A] transition-all shadow-xl hover:shadow-2xl hover:shadow-[#FFD60A]/30"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD60A]/0 to-[#FFD60A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative h-56 bg-gradient-to-br from-[#FFD60A]/20 to-[#D90429]/20 overflow-hidden">
        {event.gallery && event.gallery.length > 0 ? (
          <Image
            src={event.gallery[0]}
            alt={event.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Calendar className="h-20 w-20 text-[#FFD60A]/50 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-gradient-to-r from-[#FFD60A] to-[#FFA500] text-[#0A0A0A] text-xs font-bold rounded-full shadow-lg">
            REALIZADO
          </span>
        </div>
      </div>

      <div className="relative p-6">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#FFD60A]/30 to-transparent" />

        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#FFD60A] transition-colors duration-300">
          {event.name}
        </h3>
        <div className="space-y-3 text-sm text-white/70 group-hover:text-white/90 transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FFD60A]/10 rounded-lg group-hover:bg-[#FFD60A]/20 transition-colors">
              <Calendar className="h-4 w-4 text-[#FFD60A]" />
            </div>
            <span className="font-medium">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FFD60A]/10 rounded-lg group-hover:bg-[#FFD60A]/20 transition-colors">
              <MapPin className="h-4 w-4 text-[#FFD60A]" />
            </div>
            <span className="font-medium">{event.venue}, {event.city}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FFD60A]/10 rounded-lg group-hover:bg-[#FFD60A]/20 transition-colors">
              <Users className="h-4 w-4 text-[#FFD60A]" />
            </div>
            <span className="font-medium">{event.capacity} personas</span>
          </div>
        </div>
        {event.highlights && event.highlights.length > 0 && (
          <div className="mt-5 pt-5 border-t border-[#FFD60A]/20 group-hover:border-[#FFD60A]/40 transition-colors">
            <p className="text-xs text-[#FFD60A] font-bold mb-3 tracking-wider">DESTACADOS</p>
            <ul className="space-y-2">
              {event.highlights.slice(0, 2).map((highlight, i) => (
                <li key={i} className="text-sm text-white/70 group-hover:text-white/90 flex items-start gap-2 transition-colors">
                  <span className="text-[#FFD60A] mt-1">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </motion.div>
  );
}
