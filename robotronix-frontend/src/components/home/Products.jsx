import { Link } from 'react-router-dom'

const Products = () => {
    const products = [
        {
            id: 1,
            title: 'Robokit RMT-4 (Arduino To\'plami)',
            description: 'Arduino UNO (DIP versiya), datchiklar, motorlar va barcha kerakli qismlar',
            features: ['6-7 sinf uchun', 'Kafolat', 'O\'zbek tilida'],
            price: '450.000 so\'m',
            oldPrice: '520.000 so\'m',
            badge: 'Mashhur',
            badgeColor: 'bg-yellow-500',
            image: '/assets/images/placeholder.svg'
        },
        {
            id: 2,
            title: '5-sinf Maxsus To\'plami',
            description: 'Ventilyator, Mayoq, Smart yoritgich va boshqa loyihalar uchun',
            features: ['5 ta loyiha', 'To\'liq komplekt', 'Qo\'llanma'],
            price: '320.000 so\'m',
            oldPrice: null,
            badge: 'Yangi',
            badgeColor: 'bg-green-500',
            image: '/assets/images/placeholder.svg'
        },
        {
            id: 3,
            title: 'LEGO WeDo 2.0',
            description: 'Boshlang\'ich sinf o\'quvchilari uchun ta\'limiy konstruktor',
            features: ['7-10 yosh', 'Bluetooth', 'Mobil ilova'],
            price: '1.200.000 so\'m',
            oldPrice: null,
            badge: null,
            badgeColor: '',
            image: '/assets/images/placeholder.svg'
        }
    ]

    return (
        <section id="products" className="py-20 bg-dark relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="gradient-text">Mahsulotlarimiz</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Ta'lim uchun maxsus tayyorlangan to'plamlar
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className="bg-dark-card rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 group flex flex-col overflow-hidden"
                            data-aos="fade-up"
                            data-aos-delay={(index + 1) * 100}
                        >
                            <div className="relative h-64 bg-gray-800/50 p-8 flex items-center justify-center overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent opacity-50"></div>
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                                />
                                {product.badge && (
                                    <div className={`absolute top-4 right-4 ${product.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                                        {product.badge}
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{product.title}</h3>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {product.features.map((feature, idx) => (
                                        <span key={idx} className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto">
                                    <div className="flex items-end gap-3 mb-4">
                                        <span className="text-2xl font-bold text-white">{product.price}</span>
                                        {product.oldPrice && (
                                            <span className="text-sm text-gray-500 line-through mb-1 ml-auto">{product.oldPrice}</span>
                                        )}
                                    </div>

                                    <button className="btn-primary w-full justify-center group-hover:shadow-primary/50">
                                        <i className="fas fa-shopping-cart mr-2"></i>
                                        Sotib olish
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12" data-aos="fade-up">
                    <Link to="/products" className="btn-outline inline-flex">
                        Barcha mahsulotlarni ko'rish
                        <i className="fas fa-arrow-right ml-2 mt-1"></i>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Products
