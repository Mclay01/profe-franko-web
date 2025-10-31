import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  console.log('🌱 Starting database seed...');

  const partners = [
    {
      name: 'Club de Boxeo Los Leones',
      type: 'club',
      city: 'Santiago',
      logo_url: 'https://images.pexels.com/photos/163403/box-sport-men-training-163403.jpeg?auto=compress&cs=tinysrgb&w=200',
      website: 'https://clubleones.cl',
      featured: true,
    },
    {
      name: 'Academia Champions',
      type: 'club',
      city: 'Valparaíso',
      logo_url: 'https://images.pexels.com/photos/260409/pexels-photo-260409.jpeg?auto=compress&cs=tinysrgb&w=200',
      website: 'https://academiachampions.cl',
      featured: true,
    },
    {
      name: 'Gimnasio Iron Fist',
      type: 'club',
      city: 'Concepción',
      logo_url: 'https://images.pexels.com/photos/7991185/pexels-photo-7991185.jpeg?auto=compress&cs=tinysrgb&w=200',
      website: null,
      featured: false,
    },
    {
      name: 'Federación Chilena de Boxeo',
      type: 'federacion',
      city: 'Santiago',
      logo_url: 'https://images.pexels.com/photos/4753925/pexels-photo-4753925.jpeg?auto=compress&cs=tinysrgb&w=200',
      website: 'https://fechibo.cl',
      featured: true,
    },
    {
      name: 'Asociación de Boxeo Región Metropolitana',
      type: 'federacion',
      city: 'Santiago',
      logo_url: 'https://images.pexels.com/photos/4761779/pexels-photo-4761779.jpeg?auto=compress&cs=tinysrgb&w=200',
      website: null,
      featured: true,
    },
    {
      name: 'Deportes Knockout',
      type: 'partner',
      city: 'Santiago',
      logo_url: 'https://images.pexels.com/photos/4754146/pexels-photo-4754146.jpeg?auto=compress&cs=tinysrgb&w=200',
      website: 'https://deportesknockout.cl',
      featured: false,
    },
    {
      name: 'Boxing Gym Sur',
      type: 'club',
      city: 'Temuco',
      logo_url: 'https://images.pexels.com/photos/4761763/pexels-photo-4761763.jpeg?auto=compress&cs=tinysrgb&w=200',
      website: null,
      featured: false,
    },
    {
      name: 'Ring Master Equipamiento',
      type: 'partner',
      city: 'Santiago',
      logo_url: 'https://images.pexels.com/photos/7991156/pexels-photo-7991156.jpeg?auto=compress&cs=tinysrgb&w=200',
      website: 'https://ringmaster.cl',
      featured: false,
    },
  ];

  console.log('Inserting partners...');
  const { error: partnersError } = await supabase.from('partners').insert(partners);
  if (partnersError) console.error('Error inserting partners:', partnersError);
  else console.log('✅ Partners inserted');

  const events = [
    {
      slug: 'noche-de-campeones-2024',
      name: 'Noche de Campeones 2024',
      date: '2024-03-15',
      venue: 'Estadio Nacional',
      city: 'Santiago',
      capacity: 3000,
      gallery: [
        'https://images.pexels.com/photos/163403/box-sport-men-training-163403.jpeg?auto=compress&cs=tinysrgb&w=600',
        'https://images.pexels.com/photos/260409/pexels-photo-260409.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      highlights: ['12 peleas profesionales', 'Título nacional en juego', 'Más de 2,500 asistentes'],
      status: 'realizado',
    },
    {
      slug: 'copa-del-pacifico-2024',
      name: 'Copa del Pacífico 2024',
      date: '2024-05-20',
      venue: 'Centro de Eventos Espacio Riesco',
      city: 'Santiago',
      capacity: 2000,
      gallery: [
        'https://images.pexels.com/photos/4753925/pexels-photo-4753925.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      highlights: ['Torneo internacional', '8 países participantes'],
      status: 'realizado',
    },
    {
      slug: 'velada-regional-valparaiso',
      name: 'Velada Regional Valparaíso',
      date: '2024-07-10',
      venue: 'Gimnasio Municipal',
      city: 'Valparaíso',
      capacity: 800,
      gallery: [
        'https://images.pexels.com/photos/4761779/pexels-photo-4761779.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      highlights: ['10 peleas amateur', 'Promesas locales'],
      status: 'realizado',
    },
    {
      slug: 'campeonato-nacional-2023',
      name: 'Campeonato Nacional 2023',
      date: '2023-11-25',
      venue: 'Movistar Arena',
      city: 'Santiago',
      capacity: 5000,
      gallery: [
        'https://images.pexels.com/photos/4754146/pexels-photo-4754146.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      highlights: ['Evento más grande del año', '15 peleas', 'Transmisión nacional'],
      status: 'realizado',
    },
    {
      slug: 'torneo-nuevas-promesas-2024',
      name: 'Torneo Nuevas Promesas 2024',
      date: '2024-02-14',
      venue: 'Club Deportivo Universidad Católica',
      city: 'Santiago',
      capacity: 1200,
      gallery: [
        'https://images.pexels.com/photos/7991185/pexels-photo-7991185.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      highlights: ['Jóvenes talentos', 'Categorías juveniles'],
      status: 'realizado',
    },
    {
      slug: 'gran-velada-concepcion',
      name: 'Gran Velada Concepción',
      date: '2024-08-30',
      venue: 'Teatro Universidad de Concepción',
      city: 'Concepción',
      capacity: 1500,
      gallery: [
        'https://images.pexels.com/photos/4761763/pexels-photo-4761763.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      highlights: ['Primera velada profesional en la región', '8 combates'],
      status: 'realizado',
    },
  ];

  console.log('Inserting events...');
  const { error: eventsError } = await supabase.from('events').insert(events);
  if (eventsError) console.error('Error inserting events:', eventsError);
  else console.log('✅ Events inserted');

  const certificates = [
    {
      title: 'Certificación Nacional de Organizador de Eventos Deportivos',
      issuer: 'Ministerio del Deporte de Chile',
      date: '2020-06-15',
      file_url: '#',
    },
    {
      title: 'Curso Avanzado de Gestión Deportiva',
      issuer: 'Universidad de Chile',
      date: '2019-12-10',
      file_url: '#',
    },
    {
      title: 'Certificado Internacional de Árbitro de Boxeo',
      issuer: 'Asociación Internacional de Boxeo Amateur (AIBA)',
      date: '2018-08-20',
      file_url: '#',
    },
    {
      title: 'Diplomado en Marketing Deportivo',
      issuer: 'Pontificia Universidad Católica de Chile',
      date: '2021-03-25',
      file_url: '#',
    },
    {
      title: 'Reconocimiento por Trayectoria en el Boxeo Chileno',
      issuer: 'Federación Chilena de Boxeo',
      date: '2023-11-05',
      file_url: '#',
    },
  ];

  console.log('Inserting certificates...');
  const { error: certificatesError } = await supabase.from('certificates').insert(certificates);
  if (certificatesError) console.error('Error inserting certificates:', certificatesError);
  else console.log('✅ Certificates inserted');

  const products = [
    {
      sku: 'OLY-GLOVE-001',
      title: 'Guantes de Boxeo Profesionales Olymphus Pro',
      slug: 'guantes-boxeo-profesionales-olymphus-pro',
      price: 89990,
      images: [
        'https://images.pexels.com/photos/163403/box-sport-men-training-163403.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      category: 'Guantes',
      stock: 25,
      published: true,
    },
    {
      sku: 'OLY-GLOVE-002',
      title: 'Guantes de Entrenamiento Amateur',
      slug: 'guantes-entrenamiento-amateur',
      price: 49990,
      images: [
        'https://images.pexels.com/photos/260409/pexels-photo-260409.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      category: 'Guantes',
      stock: 40,
      published: true,
    },
    {
      sku: 'OLY-BAG-001',
      title: 'Saco de Boxeo Pesado 50kg',
      slug: 'saco-boxeo-pesado-50kg',
      price: 129990,
      images: [
        'https://images.pexels.com/photos/4761779/pexels-photo-4761779.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      category: 'Equipamiento',
      stock: 15,
      published: true,
    },
    {
      sku: 'OLY-WRAP-001',
      title: 'Vendas para Manos Profesionales (Pack 2)',
      slug: 'vendas-manos-profesionales-pack',
      price: 15990,
      images: [
        'https://images.pexels.com/photos/4754146/pexels-photo-4754146.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      category: 'Accesorios',
      stock: 100,
      published: true,
    },
    {
      sku: 'OLY-PROT-001',
      title: 'Protector Bucal Personalizable',
      slug: 'protector-bucal-personalizable',
      price: 19990,
      images: [
        'https://images.pexels.com/photos/4753925/pexels-photo-4753925.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      category: 'Protección',
      stock: 60,
      published: true,
    },
    {
      sku: 'OLY-HELM-001',
      title: 'Casco de Entrenamiento Reforzado',
      slug: 'casco-entrenamiento-reforzado',
      price: 69990,
      images: [
        'https://images.pexels.com/photos/7991185/pexels-photo-7991185.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      category: 'Protección',
      stock: 30,
      published: true,
    },
    {
      sku: 'OLY-SHOE-001',
      title: 'Botas de Boxeo Alto Rendimiento',
      slug: 'botas-boxeo-alto-rendimiento',
      price: 79990,
      images: [
        'https://images.pexels.com/photos/4761763/pexels-photo-4761763.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      category: 'Calzado',
      stock: 20,
      published: true,
    },
    {
      sku: 'OLY-SHORT-001',
      title: 'Short de Boxeo Olymphus Classic',
      slug: 'short-boxeo-olymphus-classic',
      price: 39990,
      images: [
        'https://images.pexels.com/photos/7991156/pexels-photo-7991156.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      category: 'Indumentaria',
      stock: 50,
      published: true,
    },
    {
      sku: 'OLY-ROPE-001',
      title: 'Cuerda de Saltar Profesional Ajustable',
      slug: 'cuerda-saltar-profesional-ajustable',
      price: 12990,
      images: [
        'https://images.pexels.com/photos/163403/box-sport-men-training-163403.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      category: 'Accesorios',
      stock: 80,
      published: true,
    },
    {
      sku: 'OLY-PROT-002',
      title: 'Protector de Pecho para Mujer',
      slug: 'protector-pecho-mujer',
      price: 45990,
      images: [
        'https://images.pexels.com/photos/4753925/pexels-photo-4753925.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      category: 'Protección',
      stock: 25,
      published: true,
    },
    {
      sku: 'OLY-BAG-002',
      title: 'Bolso Deportivo Olymphus Pro',
      slug: 'bolso-deportivo-olymphus-pro',
      price: 54990,
      images: [
        'https://images.pexels.com/photos/4761779/pexels-photo-4761779.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      category: 'Accesorios',
      stock: 35,
      published: true,
    },
    {
      sku: 'OLY-GLOVE-003',
      title: 'Manoplas de Entrenador Acolchadas',
      slug: 'manoplas-entrenador-acolchadas',
      price: 59990,
      images: [
        'https://images.pexels.com/photos/260409/pexels-photo-260409.jpeg?auto=compress&cs=tinysrgb&w=600',
      ],
      category: 'Equipamiento',
      stock: 3,
      published: true,
    },
  ];

  console.log('Inserting products...');
  const { error: productsError } = await supabase.from('products').insert(products);
  if (productsError) console.error('Error inserting products:', productsError);
  else console.log('✅ Products inserted');

  console.log('🎉 Seed completed successfully!');
}

seed().catch(console.error);
