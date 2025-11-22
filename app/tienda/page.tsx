'use client';

import { useState, useEffect, useCallback } from 'react';
import { ProductGrid } from '@/components/product-grid';
import { supabase, Product } from '@/lib/supabase';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingBag, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TiendaPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);

  const loadProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });

    if (data) {
      setProducts(data);
      const categorySet = new Set(data.map((p) => p.category));
      const uniqueCategories = Array.from(categorySet);
      setCategories(uniqueCategories);
    }
  };

  const filterProducts = useCallback(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 bg-gradient-to-br from-[#FFD60A] to-[#FFA500]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ShoppingBag className="h-16 w-16 text-[#0A0A0A] mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-[#0A0A0A] mb-4 font-[var(--font-saira)]">
              Tienda Olymphus
            </h1>
            <p className="text-xl text-[#0A0A0A]/80 max-w-2xl mx-auto">
              Equipamiento profesional de boxeo. Patrocinador oficial.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-64 bg-white">
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No se encontraron productos.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
