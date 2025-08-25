import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../components/NavBar'
import { Footer } from './Fotter';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

  export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const { addToCart, removeFromCart, isInCart } = useCart();


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

    useEffect(() => {
      const fetchSimilar = async () => {
        if (product?.category) {
          try {
            const res = await axios.get(
              `http://localhost:5000/api/products/category/${product.category}`
            );
            const filtered = res.data.filter(p => p._id !== product._id);
            setSimilarProducts(filtered);
          } catch (err) {
            console.error('Error fetching similar products:', err);
          }
        }
      };
      fetchSimilar();
    }, [product]);

    if (!product) {
      return <div className="text-center p-10">Loading...</div>;
    }

    return (
      <>
      <Navbar/>
      <section className="min-h-screen px-4 py-24">
        

        {/* Product Card */}
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-10 shadow-lg rounded-xl p-6">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full lg:w-[450px] h-[400px] rounded-lg shadow-md object-cover object-center"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />

          <div className="flex flex-col justify-between gap-6 w-full">
            <div>
              <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
              <p className="text-xl text-red-600 font-semibold mb-2">Price: ₹{product.price}</p>
              <p className="mb-4 whitespace-pre-line text-justify leading-relaxed">
                <strong>Description:</strong> {product.description || 'No description provided.'}
              </p>
            </div>
            <div className="flex gap-4 mt-4">
              <button
                className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg font-medium"
                onClick={() => navigate("/checkout", { state: { product, quantity: 1 } })}
              >
                Order Now
              </button>
              {isInCart(product._id) ? (
                <button
                  className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-medium"
                  onClick={() => {
                    removeFromCart(product._id);
                    toast.info("Removed from cart!");
                  }}
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg font-medium"
                  onClick={() => {
                    addToCart(product);
                    toast.success("Added to cart!");
                  }}
                >
                  Add to Cart
                </button>
)}

            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-16 max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Similar Products</h3>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {similarProducts.map(similar => (
                <Link
                  to={`/product/${similar._id}`}
                  key={similar._id}
                  className="min-w-[250px] shadow rounded-lg p-4 hover:scale-105 transition-transform"
                >
                  <img
                    src={similar.imageUrl}
                    alt={similar.name}
                    className="w-full h-[160px] object-cover rounded"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/250x160?text=No+Image';
                    }}
                  />
                  <div className="mt-3">
                    <h4 className="text-lg font-semibold">{similar.name}</h4>
                    <p className="text-red-600 font-medium">₹{similar.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
      <Footer/>
      </>
    );
}
