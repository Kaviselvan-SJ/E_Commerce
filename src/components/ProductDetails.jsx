import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div className="text-center text-gray-600 dark:text-gray-300 p-10">Loading...</div>;
  }

  return (
    <section className="min-h-screen px-6 py-10 bg-white dark:bg-neutral-900 text-gray-800 dark:text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600 rounded"
      >
        ← Back
      </button>

      <div className="flex flex-col lg:flex-row gap-10">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full lg:w-1/2 h-auto rounded-lg shadow-md object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
          }}
        />

        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-xl text-red-600 font-semibold">₹{product.price}</p>
          <p><strong>Quantity Available:</strong> {product.quantity}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            {product.description || 'No description provided.'}
          </p>
        </div>
      </div>
    </section>
  );
}
