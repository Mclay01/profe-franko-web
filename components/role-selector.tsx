'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase, ServiceRole } from '@/lib/supabase';

interface RoleSelectorProps {
  onSelectRole: (role: string) => void;
}

const roleColors: Record<string, string> = {
  'peleador': 'from-[#FFD60A] to-[#FFA500]',
  'arbitro': 'from-[#D90429] to-[#FF6B6B]',
  'entrenador': 'from-[#FFD60A] to-[#D90429]',
  'club': 'from-[#0A0A0A] to-[#333333]',
  'federacion': 'from-[#333333] to-[#0A0A0A]',
};

export function RoleSelector({ onSelectRole }: RoleSelectorProps) {
  const [roles, setRoles] = useState<ServiceRole[]>([]);

  useEffect(() => {
    loadRoles();
  }, []);

  const loadRoles = async () => {
    const { data } = await supabase
      .from('service_roles')
      .select('*')
      .eq('active', true)
      .order('order_index', { ascending: true });

    if (data) setRoles(data);
  };
  return (
    <section id="contacto" className="py-20 bg-[#0A0A0A]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Quién eres?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Selecciona tu perfil y conversemos sobre cómo puedo ayudarte
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 max-w-5xl mx-auto">
          {roles.map((role, index) => {
            const IconComponent = (LucideIcons as any)[role.icon] || User;
            const colorGradient = roleColors[role.role_key] || 'from-[#FFD60A] to-[#FFA500]';
            return (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Button
                onClick={() => onSelectRole(role.role_key)}
                className={`w-full h-auto flex flex-col items-center gap-3 p-6 bg-gradient-to-br ${colorGradient} text-white hover:scale-105 transition-transform border-2 border-transparent hover:border-[#FFD60A]`}
              >
                <IconComponent className="h-8 w-8" />
                <span className="font-semibold">{role.title}</span>
              </Button>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
