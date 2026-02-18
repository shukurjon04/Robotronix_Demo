import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProductCard = ({ product, onAddToCart }) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleAction = () => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            onAddToCart(product);
        }
    };

    return (
        <div className="bg-dark-card rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 group flex flex-col overflow-hidden" data-aos="fade-up">
            <div className="relative h-56 bg-gray-800/50 p-6 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent opacity-50"></div>
                <img
                    src={product.imageUrl || '/assets/images/placeholder.svg'}
                    alt={product.title}
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500 relative z-10"
                />
                {product.badge && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-20">
                        {product.badge}
                    </div>
                )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{product.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>

                {product.features && product.features.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {product.features.map((feature, idx) => (
                            <span key={idx} className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                                {feature}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-auto">
                    <div className="flex items-end gap-3 mb-4">
                        <span className="text-2xl font-bold text-white">
                            {product.price ? parseFloat(product.price).toLocaleString() : '0'} so'm
                        </span>
                        {product.oldPrice && (
                            <span className="text-sm text-gray-500 line-through mb-1 ml-auto">
                                {parseFloat(product.oldPrice).toLocaleString()} so'm
                            </span>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="btn-primary justify-center py-2 text-sm" onClick={handleAction}>
                            <i className="fas fa-shopping-cart mr-1"></i>
                            Sotib olish
                        </button>
                        <Link to={`/products/${product.id}`} className="btn-outline justify-center py-2 text-sm">Batafsil</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
