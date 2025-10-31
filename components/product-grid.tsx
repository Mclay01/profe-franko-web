'use client';

import { motion } from 'framer-motion';
import { Product } from '@/lib/supabase';
import { ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.sku}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="relative h-64 bg-gray-100">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <ShoppingCart className="h-16 w-16 text-gray-300" />
              </div>
            )}
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-bold text-lg">AGOTADO</span>
              </div>
            )}
          </div>
          <div className="p-4">
            <span className="text-xs font-semibold text-[#D90429] uppercase">
              {product.category}
            </span>
            <h3 className="text-lg font-bold text-[#0A0A0A] mt-1 mb-2 line-clamp-2">
              {product.title}
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-[#FFD60A]">
                {formatPrice(product.price)}
              </span>
              <Button
                size="sm"
                className="bg-[#0A0A0A] text-[#FFD60A] hover:bg-[#0A0A0A]/90"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
            {product.stock > 0 && product.stock < 5 && (
              <p className="text-xs text-[#D90429] mt-2">
                ¡Solo quedan {product.stock} unidades!
              </p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
