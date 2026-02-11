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
            badgeClass: '',
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
            badgeClass: 'new',
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
            badgeClass: '',
            image: '/assets/images/placeholder.svg'
        }
    ]

    return (
        <section id="products" className="products">
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <h2 className="section-title">Mahsulotlarimiz</h2>
                    <p className="section-subtitle">
                        Ta'lim uchun maxsus tayyorlangan to'plamlar
                    </p>
                </div>

                <div className="products-grid">
                    {products.map((product, index) => (
                        <div
                            key={product.id}
                            className="product-card"
                            data-aos="fade-up"
                            data-aos-delay={(index + 1) * 100}
                        >
                            <div className="product-image">
                                <img src={product.image} alt={product.title} />
                                {product.badge && (
                                    <div className={`product-badge ${product.badgeClass}`}>
                                        {product.badge}
                                    </div>
                                )}
                            </div>
                            <div className="product-content">
                                <h3 className="product-title">{product.title}</h3>
                                <p className="product-description">{product.description}</p>
                                <div className="product-features">
                                    {product.features.map((feature, idx) => (
                                        <span key={idx} className="feature-tag">{feature}</span>
                                    ))}
                                </div>
                                <div className="product-price">
                                    <span className="price-main">{product.price}</span>
                                    {product.oldPrice && (
                                        <span className="price-old">{product.oldPrice}</span>
                                    )}
                                </div>
                                <button className="btn-primary btn-full">
                                    <i className="fas fa-shopping-cart"></i>
                                    Sotib olish
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="products-cta" data-aos="fade-up">
                    <button className="btn-outline btn-large">
                        Barcha mahsulotlarni ko'rish
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Products
