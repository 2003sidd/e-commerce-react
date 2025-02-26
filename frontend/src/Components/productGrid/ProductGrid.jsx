
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


export default function ProductGrid({ products }) {
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
            <Link to={`/product/${product.id}`}>
              <div className="relative overflow-hidden rounded-lg">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500"
                />
                {(product.isPopular || product.isLatest) && (
                  <div className="absolute top-2 right-2 bg-black text-white px-3 py-1 rounded-full text-sm">
                    {product.isPopular ? 'Popular' : 'New'}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
              </div>
            </Link>
        ))}
      </div>
    );
  }