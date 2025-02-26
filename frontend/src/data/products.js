export const products = [
    {
      id: '1',
      name: 'Classic Runner',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
        'https://images.unsplash.com/photo-1607522370275-f14206abe5d3',
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a',
        'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519'
      ],
      category: 'Running',
      gender: 'men',
      isPopular: true,
      description: 'Experience ultimate comfort and performance with our Classic Runner. Featuring advanced cushioning technology and breathable mesh upper, these shoes are perfect for both serious runners and casual wear.',
      specifications: {
        'Upper Material': 'Engineered Mesh',
        'Sole': 'Rubber',
        'Cushioning': 'Responsive Foam',
        'Weight': '280g',
        'Closure': 'Lace-up',
        'Style': 'Athletic'
      },
      sizes: ['7', '8', '9', '10', '11', '12'],
      colors: ['Black', 'White', 'Gray'],
      sku: 'CR-001-BLK',
      stock: 45
    },
    {
      id: '2',
      name: 'Urban Style',
      price: 149.99,
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
      images: [
        'https://images.unsplash.com/photo-1549298916-b41d501d3772',
        'https://images.unsplash.com/photo-1520256862855-398228c41684',
        'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77',
        'https://images.unsplash.com/photo-1560769629-975ec94e6a86'
      ],
      category: 'Casual',
      gender: 'men',
      isLatest: true,
      description: 'Step out in style with our Urban Style sneakers. These versatile shoes combine contemporary design with all-day comfort, making them perfect for modern city life.',
      specifications: {
        'Upper Material': 'Premium Leather',
        'Sole': 'EVA',
        'Cushioning': 'Memory Foam',
        'Weight': '320g',
        'Closure': 'Lace-up',
        'Style': 'Casual'
      },
      sizes: ['7', '8', '9', '10', '11'],
      colors: ['White', 'Black', 'Navy'],
      sku: 'US-002-WHT',
      stock: 30
    },
    {
      id: '3',
      name: 'Elegant Walk',
      price: 159.99,
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77',
      category: 'Formal',
      gender: 'women',
      isPopular: true
    },
    {
      id: '4',
      name: 'Sport Elite',
      price: 179.99,
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86',
      category: 'Sport',
      gender: 'women',
      isLatest: true
    }
  ];