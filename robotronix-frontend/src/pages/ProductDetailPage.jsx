import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useCart } from '../context/CartContext';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
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

    if (loading) return <div className="loading">Yuklanmoqda...</div>;
    if (!product) return <div className="error">Mahsulot topilmadi</div>;

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <div className="product-detail-container">
            <div className="product-detail-grid">
                <div className="product-detail-image">
                    <img src={product.imageUrl || '/assets/placeholder-product.jpg'} alt={product.title} />
                </div>
                <div className="product-detail-content">
                    <nav className="breadcrumb">
                        <Link to="/products">Mahsulotlar</Link> / {product.title}
                    </nav>
                    <h1>{product.title}</h1>
                    <div className="price-section">
                        <span className="price">{product.price?.toLocaleString() || '0'} so'm</span>
                        {product.oldPrice && <span className="old-price">{product.oldPrice?.toLocaleString()} so'm</span>}
                    </div>
                    <p className="description">{product.description}</p>

                    {product.features && product.features.length > 0 && (
                        <div className="features-list">
                            <h4>Xususiyatlari:</h4>
                            <ul>
                                {product.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="purchase-options">
                        <div className="quantity-selector">
                            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity(q => q + 1)}>+</button>
                        </div>
                        <button onClick={handleAddToCart} className="btn-primary btn-large">
                            Savatga qo'shish
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Helper link import for the breadcrumb
import { Link } from 'react-router-dom';

export default ProductDetailPage;
