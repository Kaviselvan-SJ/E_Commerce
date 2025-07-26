import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      navigate('/admin/dashboard');
    } else {
      alert('Incorrect password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleLogin} className="bg-white dark:bg-neutral-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 dark:text-gray-100">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded focus:outline-none dark:bg-neutral-700 dark:text-white"
        />
        <button type="submit" className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
          Login
        </button>
      </form>
    </div>
  );
}
