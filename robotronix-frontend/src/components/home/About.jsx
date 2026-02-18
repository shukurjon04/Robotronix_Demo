const About = () => {
    const achievements = [
        "Farg'ona va Namangan viloyatlarida 10 dan ortiq hamkor maktablar",
        "Xalqaro tanlovlarda sovrinli o'rinlar (WRO, Technovation, FGC)",
        "Respublika Ta'lim Markazi bilan hamkorlik"
    ]

    const stats = [
        { number: '500+', label: "Tayyorlangan o'qituvchi" },
        { number: '2000+', label: "Muvaffaqiyatli o'quvchi" },
        { number: '15+', label: 'Xalqaro yutuq' }
    ]

    return (
        <section id="about" className="py-20 bg-dark-card relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1" data-aos="fade-right">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            <span className="gradient-text">Robotronix haqida</span>
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            "Robotronix" — O'zbekistonda robototexnika ta'limini
                            yangi bosqichga olib chiqishni maqsad qilgan
                            innovatsion markazdir. Biz nafaqat bolalarga, balki
                            maktab o'qituvchilariga ham zamonaviy
                            texnologiyalarni o'rgatamiz.
                        </p>

                        <div className="bg-dark p-6 rounded-xl border border-gray-800 mb-8">
                            <h4 className="text-white font-bold mb-4 flex items-center">
                                <i className="fas fa-trophy text-yellow-500 mr-2"></i>
                                Bizning yutuqlarimiz:
                            </h4>
                            <ul className="space-y-3">
                                {achievements.map((achievement, index) => (
                                    <li key={index} className="flex items-start text-gray-400">
                                        <i className="fas fa-check-circle text-primary mt-1 mr-3"></i>
                                        <span>{achievement}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
                            <h4 className="text-primary font-bold mb-2">Missiyamiz:</h4>
                            <p className="text-gray-300 italic">
                                "Yoshlarni texnologiya iste'molchisidan texnologiya ixtirochisiga aylantirish."
                            </p>
                        </div>

                        <button className="btn-primary">
                            Biz bilan tanishing
                            <i className="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>

                    <div className="relative order-1 lg:order-2" data-aos="fade-left">
                        <div className="relative rounded-2xl overflow-hidden border border-gray-700 shadow-2xl group">
                            <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-60 z-10"></div>
                            <img
                                src="/assets/images/placeholder.svg"
                                alt="Robotronix jamoasi"
                                className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 flex items-center justify-center z-20">
                                <button className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/30 animate-pulse">
                                    <i className="fas fa-play text-2xl ml-1"></i>
                                </button>
                            </div>
                        </div>

                        <div className="absolute -bottom-6 -right-6 lg:-right-12 grid grid-cols-2 gap-4">
                            {stats.slice(0, 2).map((stat, index) => (
                                <div key={index} className="bg-dark-card p-4 rounded-xl border border-gray-700 shadow-xl backdrop-blur-md">
                                    <span className="block text-2xl font-bold text-primary mb-1">{stat.number}</span>
                                    <span className="text-xs text-gray-400">{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
