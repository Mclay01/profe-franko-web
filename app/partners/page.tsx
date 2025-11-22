'use client';

import { useEffect, useState, useCallback } from 'react';
import { PartnerCard } from '@/components/partner-card';
import { supabase, Partner } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Users, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'club' | 'federacion' | 'partner'>('all');

  useEffect(() => {
    loadPartners();
  }, []);

  const loadPartners = async () => {
    const { data } = await supabase
      .from('partners')
      .select('*')
      .order('featured', { ascending: false });

    if (data) {
      setPartners(data);
    }
  };

  const filterPartners = useCallback(() => {
    let filtered = partners;

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter((p) => p.type === selectedType);
    }

    setFilteredPartners(filtered);
  }, [partners, searchTerm, selectedType]);

  useEffect(() => {
    filterPartners();
  }, [filterPartners]);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">


      <section className="py-20 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Users className="h-16 w-16 text-[#FFD60A] mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-[var(--font-saira)]">
              Partners
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Clubes, federaciones y organizaciones aliadas en el desarrollo del boxeo chileno
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
              <Input
                type="text"
                placeholder="Buscar por nombre o ciudad..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[#0A0A0A] border-[#FFD60A]/20 text-white"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedType === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedType('all')}
                className={
                  selectedType === 'all'
                    ? 'bg-[#FFD60A] text-[#0A0A0A]'
                    : 'border-[#FFD60A]/20 text-white hover:border-[#FFD60A]'
                }
              >
                Todos
              </Button>
              <Button
                variant={selectedType === 'club' ? 'default' : 'outline'}
                onClick={() => setSelectedType('club')}
                className={
                  selectedType === 'club'
                    ? 'bg-[#FFD60A] text-[#0A0A0A]'
                    : 'border-[#FFD60A]/20 text-white hover:border-[#FFD60A]'
                }
              >
                Clubes
              </Button>
              <Button
                variant={selectedType === 'federacion' ? 'default' : 'outline'}
                onClick={() => setSelectedType('federacion')}
                className={
                  selectedType === 'federacion'
                    ? 'bg-[#FFD60A] text-[#0A0A0A]'
                    : 'border-[#FFD60A]/20 text-white hover:border-[#FFD60A]'
                }
              >
                Federaciones
              </Button>
              <Button
                variant={selectedType === 'partner' ? 'default' : 'outline'}
                onClick={() => setSelectedType('partner')}
                className={
                  selectedType === 'partner'
                    ? 'bg-[#FFD60A] text-[#0A0A0A]'
                    : 'border-[#FFD60A]/20 text-white hover:border-[#FFD60A]'
                }
              >
                Partners
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#0A0A0A]">
        <div className="container mx-auto px-4">
          {filteredPartners.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPartners.map((partner, index) => (
                <PartnerCard key={partner.id} partner={partner} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-white/70 text-lg">
                No se encontraron partners con los filtros seleccionados.
              </p>
            </div>
          )}
        </div>
      </section>

    </div>
  );
}
