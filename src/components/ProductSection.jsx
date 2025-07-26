import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function ProductSection() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="px-6 py-12 bg-gray-100 dark:bg-neutral-900 min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
        Our Products
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-48 w-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
              }}
            />

            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {product.name}
              </h3>
              <p className="text-red-600 font-bold text-lg mt-2">₹{product.price}</p>

              <button
                className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors w-full"
                onClick={() => navigate(`/product/${product._id}`)}

              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
