import { useState, useEffect } from 'react';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/products/ProductCard';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (loading) return (
        <div className="min-h-screen bg-dark pt-24 pb-12 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <section className="min-h-screen bg-dark pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="gradient-text">Mahsulotlarimiz</span>
                    </h2>
                    <p className="text-gray-400 text-lg">Robototexnika va elektronika uchun eng sara qismlar</p>
                </div>

                <div className="max-w-md mx-auto mb-12 relative" data-aos="fade-up" data-aos-delay="100">
                    <input
                        type="text"
                        className="w-full bg-dark-card border border-gray-700 rounded-xl px-5 py-3 pl-12 text-white placeholder-gray-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                        placeholder="Mahsulotlarni qidirish..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={addToCart}
                                data-aos="fade-up"
                                data-aos-delay={(index + 1) * 100}
                            />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-20" data-aos="fade-up">
                            <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                <i className="fas fa-search text-4xl text-gray-500"></i>
                            </div>
                            <p className="text-gray-400 text-lg">So'rovingiz bo'yicha hech narsa topilmadi.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ProductsPage;

