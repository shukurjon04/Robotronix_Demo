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
            <div className="min-h-screen bg-dark pt-24 pb-12 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="fas fa-shopping-cart text-5xl text-gray-500"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-2">Savatingiz bo'sh</h2>
                    <p className="text-gray-400 mb-8">Xaridni boshlash uchun mahsulotlar bo'limiga o'ting.</p>
                    <Link to="/products" className="btn-primary inline-flex">
                        <i className="fas fa-store mr-2"></i>
                        Mahsulotlarni ko'rish
                    </Link>
                </div>
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
        <div className="min-h-screen bg-dark pt-24 pb-12">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold text-white mb-8">
                    <i className="fas fa-shopping-cart mr-3 text-primary"></i>Savat
                </h1>
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.product.id} className="bg-dark-card border border-gray-800 rounded-xl p-4 flex items-center gap-4 hover:border-gray-700 transition-colors">
                                <div className="w-20 h-20 rounded-lg bg-gray-800/50 overflow-hidden flex-shrink-0">
                                    <img
                                        src={item.product.imageUrl || '/assets/placeholder-product.jpg'}
                                        alt={item.product.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-grow min-w-0">
                                    <h3 className="text-white font-semibold truncate">{item.product.title}</h3>
                                    <p className="text-gray-400 text-sm">{item.product.price?.toLocaleString() || '0'} so'm</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                        className="w-8 h-8 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors flex items-center justify-center"
                                    >-</button>
                                    <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                        className="w-8 h-8 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors flex items-center justify-center"
                                    >+</button>
                                </div>
                                <div className="text-white font-bold min-w-[100px] text-right">
                                    {((item.product.price || 0) * item.quantity).toLocaleString()} so'm
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="w-8 h-8 rounded-lg text-gray-500 hover:bg-red-500/10 hover:text-red-500 transition-colors flex items-center justify-center"
                                >
                                    <i className="fas fa-trash-alt text-sm"></i>
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-dark-card border border-gray-800 rounded-xl p-6 sticky top-24">
                            <h3 className="text-xl font-bold text-white mb-6">Buyurtma tafsilotlari</h3>
                            <div className="flex justify-between text-lg mb-6 pb-4 border-b border-gray-800">
                                <span className="text-gray-400">Jami:</span>
                                <span className="text-white font-bold">{getCartTotal()?.toLocaleString() || '0'} so'm</span>
                            </div>

                            <form onSubmit={handlePlaceOrder} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Yetkazib berish manzili:</label>
                                    <input
                                        type="text"
                                        required
                                        value={orderData.shippingAddress}
                                        onChange={(e) => setOrderData({ ...orderData, shippingAddress: e.target.value })}
                                        placeholder="Shahar, tuman, ko'cha..."
                                        className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Telefon raqami:</label>
                                    <input
                                        type="tel"
                                        required
                                        value={orderData.contactPhone}
                                        onChange={(e) => setOrderData({ ...orderData, contactPhone: e.target.value })}
                                        placeholder="+998 90 123 45 67"
                                        className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                    />
                                </div>
                                <button type="submit" className="btn-primary w-full justify-center py-3" disabled={isOrdering}>
                                    <i className={`fas ${isOrdering ? 'fa-spinner fa-spin' : 'fa-credit-card'} mr-2`}></i>
                                    {isOrdering ? 'Yuborilmoqda...' : 'Buyurtma berish'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
