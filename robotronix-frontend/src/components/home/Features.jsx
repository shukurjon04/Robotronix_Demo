const Features = () => {
    const features = [
        {
            icon: 'fas fa-chalkboard-teacher',
            title: 'Tajribali ustozlar',
            description: "500 dan ortiq texnologiya fani o'qituvchilarini malakasini oshirgan professional jamoa"
        },
        {
            icon: 'fas fa-tools',
            title: 'Amaliy yondashuv',
            description: "Quruq nazariya emas, har bir darsda real qurilmalar yasash va ishga tushirish"
        },
        {
            icon: 'fas fa-certificate',
            title: 'Rasmiy maqom',
            description: "IT Park va Cyberpark rezidenti, litsenziyalangan sertifikat beruvchi"
        },
        {
            icon: 'fas fa-microchip',
            title: 'Sifatli jihozlar',
            description: "Darslar uchun maxsus tayyorlangan Arduino va LEGO to'plamlari"
        }
    ]

    return (
        <section className="py-20 relative bg-dark">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="gradient-text">Afzalliklarimiz</span>
                    </h2>
                    <p className="text-gray-400 text-lg">Nima uchun aynan Robotronix?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-dark-card p-6 rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 group"
                            data-aos="fade-up"
                            data-aos-delay={(index + 1) * 100}
                        >
                            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                <i className={`${feature.icon} text-2xl text-primary`}></i>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
