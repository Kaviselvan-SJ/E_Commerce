import { useState } from 'react';
import axios from 'axios';
import { Navbar } from '../components/NavBar'
import { Footer } from '../components/Fotter'

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
    } catch (err) {
      console.error(err);
      alert('Error adding product');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="min-h-screen p-24">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard - Add Product</h1>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'Product ID', name: 'productId' },
          { label: 'Name', name: 'name' },
          { label: 'Description', name: 'description', textarea: true },
          { label: 'Quantity', name: 'quantity', type: 'number' },
          { label: 'Price', name: 'price', type: 'number' },
          { label: 'Image URL', name: 'imageUrl' },
          { label: 'Category', name: 'category' }
        ].map(({ label, name, type = 'text', textarea }) => (
          <div key={name}>
            <label className="block mb-1 font-semibold">{label}</label>
            {textarea ? (
              <textarea
                name={name}
                value={form[name]}
                onChange={handleChange}
                rows={3}
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

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
}
