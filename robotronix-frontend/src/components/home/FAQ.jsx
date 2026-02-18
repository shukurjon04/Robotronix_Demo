import { useState } from 'react'

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null)

    const faqs = [
        {
            question: 'Sertifikatlar qonuniymi?',
            answer: 'Ha, bizning sertifikatlarimiz rasmiy litsenziya asosida beriladi va maktab o\'qituvchilari uchun tarifikatsiya jarayonida inobatga olinadi (edo.ijro.uz bazasiga kiritiladi).'
        },
        {
            question: 'Online kursda o\'rganish qiyin emasmi?',
            answer: 'Yo\'q, bizning online darslarimiz maxsus metodika asosida, sodda tilda va to\'liq videoqo\'llanmalar bilan tashkil etilgan. 500 dan ortiq ustozlar muvaffaqiyatli bitirgan.'
        },
        {
            question: 'Farzandim 5 yoshda, unga qanday kurs mos keladi?',
            answer: '5 yoshli bolalar uchun LEGO konstruktorlari yordamida mantiqiy fikrlashni rivojlantiruvchi "Mitti Muhandis" kursimiz mavjud.'
        },
        {
            question: 'To\'lovni bo\'lib to\'lasa bo\'ladimi?',
            answer: 'Ha, kurslar va katta to\'plamlar uchun Uzum Nasiya, Alif Nasiya kabi hamkorlarimiz orqali muddatli to\'lov imkoniyati mavjud.'
        }
    ]

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <section className="py-20 bg-dark relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="gradient-text">Tez-tez beriladigan savollar</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Eng mashhur savollar va javoblar
                    </p>
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-dark-card rounded-xl border transition-all duration-300 overflow-hidden ${activeIndex === index
                                    ? 'border-primary/50 shadow-lg shadow-primary/10'
                                    : 'border-gray-800 hover:border-gray-700'
                                }`}
                            data-aos="fade-up"
                            data-aos-delay={(index + 1) * 50}
                        >
                            <button
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span className={`text-lg font-semibold transition-colors ${activeIndex === index ? 'text-primary' : 'text-white'}`}>
                                    {faq.question}
                                </span>
                                <i className={`fas fa-chevron-down text-gray-400 transition-transform duration-300 ${activeIndex === index ? 'rotate-180 text-primary' : ''}`}></i>
                            </button>

                            <div
                                className={`transition-all duration-300 ease-in-out ${activeIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-gray-800/50">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default FAQ
