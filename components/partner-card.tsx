'use client';

import { motion } from 'framer-motion';
import { Partner } from '@/lib/supabase';
import { MapPin, ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface PartnerCardProps {
  partner: Partner;
  index: number;
}

export function PartnerCard({ partner, index }: PartnerCardProps) {
  const typeLabels = {
    club: 'Club',
    federacion: 'Federación',
    partner: 'Partner',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border-2 border-[#FFD60A]/20 rounded-2xl p-6 hover:border-[#FFD60A] transition-all overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#FFD60A]/20"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#FFD60A]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD60A]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative h-32 mb-4 flex items-center justify-center bg-gradient-to-br from-white/5 to-white/0 rounded-xl border border-white/5 group-hover:border-[#FFD60A]/30 transition-all duration-300 backdrop-blur-sm">
        {partner.logo_url ? (
          <Image
            src={partner.logo_url}
            alt={partner.name}
            width={120}
            height={120}
            className="object-contain group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="text-[#FFD60A] text-4xl font-black group-hover:scale-110 transition-transform duration-500">
            {partner.name.substring(0, 2).toUpperCase()}
          </div>
        )}
      </div>
      <div className="relative">
        <motion.span
          className="inline-block px-3 py-1 text-xs font-bold text-[#0A0A0A] bg-gradient-to-r from-[#FFD60A] to-[#FFA500] rounded-full mb-3 shadow-md"
          whileHover={{ scale: 1.1 }}
        >
          {typeLabels[partner.type]}
        </motion.span>
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#FFD60A] transition-colors duration-300">
          {partner.name}
        </h3>
        <div className="flex items-center gap-2 text-sm text-white/70 mb-3 group-hover:text-white/90 transition-colors">
          <MapPin className="h-4 w-4 text-[#FFD60A] group-hover:scale-110 transition-transform" />
          <span>{partner.city}</span>
        </div>
        {partner.website && (
          <a
            href={partner.website}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-[#FFD60A] hover:text-[#FFA500] font-semibold transition-colors group/link"
          >
            Sitio web
            <ExternalLink className="h-3 w-3 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
          </a>
        )}
      </div>
    </motion.div>
  );
}
