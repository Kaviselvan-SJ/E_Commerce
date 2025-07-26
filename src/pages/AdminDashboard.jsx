import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navbar } from '../components/NavBar';
import { Footer } from '../components/Fotter';

export default function AdminDashboard() {
  const [form, setForm] = useState({
    productId: '',
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    imageUrl: '',
    category: '',
  });

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', form);
      alert('Product added successfully');
      setForm({
        productId: '',
        name: '',
        description: '',
        quantity: 0,
        price: 0,
        imageUrl: '',
        category: '',
      });
      fetchProducts(); // Refresh list
    } catch (err) {
      console.error(err);
      alert('Error adding product');
    }
  };

 const handleDelete = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    alert('Product deleted');
    setProducts(products.filter(p => p._id !== id));
  } catch (err) {
    console.error(err);
    alert('Error deleting product');
  }
};


  return (
    <>
      <Navbar />
      <div className="min-h-screen p-10 md:p-24">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Add Product</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {[
            { label: 'Product ID', name: 'productId' },
            { label: 'Name', name: 'name' },
            { label: 'Description', name: 'description', textarea: true },
            { label: 'Quantity', name: 'quantity', type: 'number' },
            { label: 'Price', name: 'price', type: 'number' },
            { label: 'Image URL', name: 'imageUrl' },
          ].map(({ label, name, type = 'text', textarea }) => (
            <div key={name}>
              <label className="block mb-1 font-semibold">{label}</label>
              {textarea ? (
                <textarea
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-3 py-2 border rounded resize-y"
                  required
                />
              ) : (
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              )}
            </div>
          ))}

          <div>
            <label className="block mb-1 font-semibold">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded "
              required
            >
              <option value="">Select category</option>
              <option value="oil">Oil</option>
              <option value="battery">Battery</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
            >
              Add Product
            </button>
          </div>
        </form>

        {/* Product List */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">All Products</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div key={product._id} className="border p-4 rounded shadow">
                <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover rounded mb-2" />
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className=" mb-1">ID: {product.productId}</p>
                <p className=" mb-1">Qty: {product.quantity}</p>
                <p className=" mb-1">Price: ₹{product.price}</p>
                <p className=" mb-1">Category: {product.category}</p>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="mt-2 bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
