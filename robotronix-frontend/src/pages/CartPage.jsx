import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const CartPage = () => {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [isOrdering, setIsOrdering] = useState(false);
    const [orderData, setOrderData] = useState({
        shippingAddress: '',
        contactPhone: ''
    });

    if (cartItems.length === 0) {
        return (
            <div className="cart-empty">
                <h2>Savatingiz bo'sh</h2>
                <p>Xaridni boshlash uchun mahsulotlar bo'limiga o'ting.</p>
                <Link to="/products" className="btn-primary">Mahsulotlarni ko'rish</Link>
            </div>
        );
    }

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate('/login?redirect=/cart');
            return;
        }

        try {
            setIsOrdering(true);
            const items = cartItems.map(item => ({
                productId: item.product.id,
                quantity: item.quantity
            }));

            await api.post('/orders', {
                items,
                ...orderData
            });

            alert('Buyurtmangiz muvaffaqiyatli qabul qilindi!');
            clearCart();
            navigate('/');
        } catch (error) {
            alert('Buyurtma berishda xatolik yuz berdi: ' + (error.response?.data?.message || error.message));
        } finally {
            setIsOrdering(false);
        }
    };

    return (
        <div className="cart-container">
            <h1>Savat</h1>
            <div className="cart-grid">
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <div key={item.product.id} className="cart-item">
                            <img src={item.product.imageUrl || '/assets/placeholder-product.jpg'} alt={item.product.title} />
                            <div className="item-info">
                                <h3>{item.product.title}</h3>
                                <p>{item.product.price?.toLocaleString() || '0'} so'm</p>
                            </div>
                            <div className="item-quantity">
                                <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                            </div>
                            <div className="item-total">
                                {((item.product.price || 0) * item.quantity).toLocaleString()} so'm
                            </div>
                            <button onClick={() => removeFromCart(item.product.id)} className="btn-remove">×</button>
                        </div>
                    ))}
                </div>

                <div className="cart-summary">
                    <h3>Buyurtma tafsilotlari</h3>
                    <div className="summary-row">
                        <span>Jami:</span>
                        <span>{getCartTotal()?.toLocaleString() || '0'} so'm</span>
                    </div>

                    <form onSubmit={handlePlaceOrder} className="checkout-form">
                        <div className="form-group">
                            <label>Yetkazib berish manzili:</label>
                            <input
                                type="text"
                                required
                                value={orderData.shippingAddress}
                                onChange={(e) => setOrderData({ ...orderData, shippingAddress: e.target.value })}
                                placeholder="Shahar, tuman, ko'cha..."
                            />
                        </div>
                        <div className="form-group">
                            <label>Telefon raqami:</label>
                            <input
                                type="tel"
                                required
                                value={orderData.contactPhone}
                                onChange={(e) => setOrderData({ ...orderData, contactPhone: e.target.value })}
                                placeholder="+998 90 123 45 67"
                            />
                        </div>
                        <button type="submit" className="btn-primary btn-full" disabled={isOrdering}>
                            {isOrdering ? 'Yuborilmoqda...' : 'Buyurtma berish'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
