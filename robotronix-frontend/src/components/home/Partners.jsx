const Partners = () => {
    const partners = [
        { name: 'IT Park', image: '/assets/images/placeholder.svg' },
        { name: 'Cyberpark', image: '/assets/images/placeholder.svg' },
        { name: "Ta'lim vazirligi", image: '/assets/images/placeholder.svg' },
        { name: 'RTM', image: '/assets/images/placeholder.svg' }
    ]

    return (
        <section className="py-16 bg-dark border-t border-b border-gray-800">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10" data-aos="fade-up">
                    <h2 className="text-2xl font-bold mb-2">Hamkorlarimiz</h2>
                    <p className="text-gray-400">Bizga ishonuvchi tashkilotlar</p>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
                    {partners.map((partner, index) => (
                        <div
                            key={index}
                            className="w-32 md:w-40 opacity-50 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 filter"
                            data-aos="fade-up"
                            data-aos-delay={(index + 1) * 100}
                        >
                            <img src={partner.image} alt={partner.name} className="w-full h-auto" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Partners
