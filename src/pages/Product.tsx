import React, { useEffect, useState, useMemo } from 'react';
import { getProducts } from '../services/Api';
import type { Product } from '../services/Api';
import ProductCard from '../components/Productcard';
import Modal from '../components/Modal';
import withTheme from '../hocs/withTheme';
import ProductFilter from '../components/Productfilter';

interface ProductListProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ProductList: React.FC<ProductListProps> = ({ isDarkMode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
  };

  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearchTerm = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesMinPrice =
        minPrice === '' || product.price >= parseFloat(minPrice);
      const matchesMaxPrice =
        maxPrice === '' || product.price <= parseFloat(maxPrice);

      return (
        matchesCategory &&
        matchesSearchTerm &&
        matchesMinPrice &&
        matchesMaxPrice
      );
    });
  }, [products, selectedCategory, searchTerm, minPrice, maxPrice]);

  return (
    <div className={`w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container max-w-full mx-auto p-4 pt-[100px]">
        <h1 className="text-2xl font-bold mb-4">Products</h1>

        <ProductFilter
          selectedCategory={selectedCategory}
          searchTerm={searchTerm}
          minPrice={minPrice}
          maxPrice={maxPrice}
          isDarkMode={isDarkMode}
          onCategoryChange={handleCategoryChange}
          onSearchChange={handleSearchChange}
          onMinPriceChange={handleMinPriceChange}
          onMaxPriceChange={handleMaxPriceChange}
        />

        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => handleOpenModal(product)}
              />
            ))}
          </div>
        )}

        {selectedProduct && (
          <Modal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            product={selectedProduct}
          />
        )}
      </div>
    </div>
  );
};

export default withTheme(ProductList);