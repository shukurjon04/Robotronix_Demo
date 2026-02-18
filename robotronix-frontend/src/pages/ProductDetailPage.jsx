import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product:', error);
                navigate('/products');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id, navigate]);

    if (loading) return (
        <div className="min-h-screen bg-dark pt-24 pb-12 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!product) return (
        <div className="min-h-screen bg-dark pt-24 pb-12 flex items-center justify-center">
            <div className="text-center">
                <i className="fas fa-exclamation-triangle text-5xl text-gray-500 mb-4"></i>
                <p className="text-gray-400 text-lg">Mahsulot topilmadi</p>
            </div>
        </div>
    );

    const handleAction = () => {
        if (!isAuthenticated) {
            navigate(`/login?redirect=/products/${id}`);
        } else {
            addToCart(product, quantity);
        }
    };

    return (
        <div className="min-h-screen bg-dark pt-24 pb-12">
            <div className="container mx-auto px-4">
                <nav className="text-sm text-gray-400 mb-8" data-aos="fade-right">
                    <Link to="/" className="hover:text-primary transition-colors">Bosh sahifa</Link>
                    <i className="fas fa-chevron-right text-[10px] mx-2"></i>
                    <Link to="/products" className="hover:text-primary transition-colors">Mahsulotlar</Link>
                    <i className="fas fa-chevron-right text-[10px] mx-2"></i>
                    <span className="text-white">{product.title}</span>
                </nav>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Image */}
                    <div className="bg-dark-card border border-gray-800 rounded-2xl p-8 flex items-center justify-center" data-aos="zoom-in">
                        <img
                            src={product.imageUrl || '/assets/placeholder-product.jpg'}
                            alt={product.title}
                            className="max-w-full max-h-[400px] object-contain"
                        />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6" data-aos="fade-left">
                        <h1 className="text-3xl font-bold text-white">{product.title}</h1>

                        <div className="flex items-end gap-4">
                            <span className="text-3xl font-bold text-white">{product.price?.toLocaleString() || '0'} so'm</span>
                            {product.oldPrice && (
                                <span className="text-lg text-gray-500 line-through">{product.oldPrice?.toLocaleString()} so'm</span>
                            )}
                        </div>

                        <div className="h-px bg-gray-800"></div>

                        <div>
                            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                                <i className="fas fa-align-left text-primary"></i> Tavsif
                            </h4>
                            <p className="text-gray-400 leading-relaxed">{product.description}</p>
                        </div>

                        {product.features && product.features.length > 0 && (
                            <div data-aos="fade-up">
                                <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                                    <i className="fas fa-star text-primary"></i> Xususiyatlari:
                                </h4>
                                <ul className="space-y-2">
                                    {product.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-gray-400">
                                            <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                                <i className="fas fa-check text-green-500 text-xs"></i>
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="space-y-4 pt-4" data-aos="fade-up">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center bg-dark-card border border-gray-800 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                        className="w-10 h-10 flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                                    >
                                        <i className="fas fa-minus text-sm"></i>
                                    </button>
                                    <span className="w-12 text-center text-white font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(q => q + 1)}
                                        className="w-10 h-10 flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                                    >
                                        <i className="fas fa-plus text-sm"></i>
                                    </button>
                                </div>
                                <button onClick={handleAction} className="btn-primary flex-grow justify-center py-3">
                                    <i className="fas fa-shopping-cart mr-2"></i> Sotib olish
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                                <span className="flex items-center gap-2">
                                    <i className="fas fa-truck text-primary"></i> O'zbekiston bo'ylab yetkazib berish
                                </span>
                                <span className="flex items-center gap-2">
                                    <i className="fas fa-shield-alt text-primary"></i> 1 yillik rasmiy kafolat
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
