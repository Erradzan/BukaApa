import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface ProductFilterProps {
  selectedCategory: string;
  searchTerm: string;
  minPrice: string;
  maxPrice: string;
  isDarkMode: boolean;
  onCategoryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMinPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  selectedCategory,
  searchTerm,
  minPrice,
  maxPrice,
  isDarkMode,
  onCategoryChange,
  onSearchChange,
  onMinPriceChange,
  onMaxPriceChange
}) => {
  const { state } = useCart();
  const navigate = useNavigate();
  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  const handleCartIconClick = () => {
    navigate('/cart');
  };

  return (
    <div
      className={`flex flex-col space-y-4 mb-4 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
      }`}
    >
      <div className="flex items-center gap-4 flex-wrap">
        <select
          value={selectedCategory}
          onChange={onCategoryChange}
          className={`p-2 rounded border ${
            isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
          } w-72`}
        >
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
        <input
          type="text"
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search..."
          className={`p-2 rounded border ${
            isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
          } w-72`}
        />
        <input
          type="number"
          value={minPrice}
          onChange={onMinPriceChange}
          placeholder="Min Price"
          className={`p-2 rounded border ${
            isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
          } w-60`}
        />
        <input
          type="number"
          value={maxPrice}
          onChange={onMaxPriceChange}
          placeholder="Max Price"
          className={`p-2 rounded border ${
            isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'border-gray-300'
          } w-60`}
        />
        <div className="relative">
          <FaShoppingCart
            size={46}
            className={`transition-colors duration-200 cursor-pointer ${
              cartItemCount > 0 ? 'text-[#f03846]' : 'text-gray-500'
            }`}
            onClick={handleCartIconClick}
          />
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {cartItemCount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;