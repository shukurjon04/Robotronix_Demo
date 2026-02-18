import { useState } from 'react'
import { Link } from 'react-router-dom'

const Courses = () => {
    const [activeTab, setActiveTab] = useState('kids')

    const kidsCourses = [
        {
            id: 1,
            title: 'Mitti Muhandis',
            description: 'LEGO Classic va STEAM asosida ijodkorlikni rivojlantirish',
            age: '4-6 yosh',
            duration: '3 oy',
            price: "350.000 so'm",
            image: '/assets/images/placeholder.svg',
            color: 'from-blue-500 to-cyan-400'
        },
        {
            id: 2,
            title: 'Kichik Muhandis',
            description: 'LEGO WeDo 2.0 yordamida ilk mexanizmlarni yasash',
            age: '7-9 yosh',
            duration: '6 oy',
            price: "450.000 so'm",
            image: '/assets/images/placeholder.svg',
            color: 'from-green-500 to-emerald-400'
        },
        {
            id: 3,
            title: 'Yosh Muhandis',
            description: 'Arduino platformasi asosida elektronika va dasturlash',
            age: '10-14 yosh',
            duration: '9 oy',
            price: "550.000 so'm",
            image: '/assets/images/placeholder.svg',
            color: 'from-orange-500 to-yellow-400'
        },
        {
            id: 4,
            title: 'Dasturlash va AI',
            description: 'Flutter va Python orqali mobil ilovalar va AI',
            age: '14+ yosh',
            duration: '12 oy',
            price: "650.000 so'm",
            image: '/assets/images/placeholder.svg',
            color: 'from-purple-500 to-pink-400'
        }
    ]

    const teacherCourse = {
        title: "Texnologiya fani o'qituvchilari uchun maxsus kurs",
        features: [
            '5-7 sinf "Texnologiya" darsligidagi "Robototexnika" bo\'limini mukammal o\'rgatish',
            "Dars o'tish metodikasi va tayyor taqdimotlar",
            "Davlat namunasidagi sertifikat (tarifikatsiyada hisoblanadi)",
            "Online va Offline format (Zoom/Telegram, Farg'ona, Namangan)"
        ],
        oldPrice: "800.000 so'm",
        newPrice: "650.000 so'm",
        image: '/assets/images/placeholder.svg'
    }

    return (
        <section id="courses" className="py-20 bg-dark-card relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="gradient-text">Kurslarimiz</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        4 yoshdan boshlab barcha yoshdagilar uchun
                    </p>
                </div>

                <div className="flex justify-center mb-12" data-aos="fade-up">
                    <div className="bg-dark p-1 rounded-xl inline-flex border border-gray-800">
                        <button
                            className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === 'kids'
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                            onClick={() => setActiveTab('kids')}
                        >
                            Bolalar uchun
                        </button>
                        <button
                            className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 ${activeTab === 'teachers'
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                            onClick={() => setActiveTab('teachers')}
                        >
                            O'qituvchilar uchun
                        </button>
                    </div>
                </div>

                <div className="min-h-[400px]">
                    {activeTab === 'kids' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {kidsCourses.map((course, index) => (
                                <div
                                    key={course.id}
                                    className="bg-dark rounded-xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:-translate-y-2 group flex flex-col h-full"
                                    data-aos="fade-up"
                                    data-aos-delay={(index + 1) * 100}
                                >
                                    <div className={`h-40 bg-gradient-to-br ${course.color} relative p-6 flex items-center justify-center`}>
                                        <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white font-medium border border-white/10">
                                            {course.age}
                                        </div>
                                        <i className="fas fa-robot text-6xl text-white/20 absolute bottom-2 right-2 rotate-12"></i>
                                        <div className="text-5xl">🤖</div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
                                        <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{course.description}</p>

                                        <div className="flex items-center justify-between text-sm text-gray-400 mb-6 pt-4 border-t border-gray-800">
                                            <span className="flex items-center gap-2">
                                                <i className="fas fa-clock text-primary"></i> {course.duration}
                                            </span>
                                            <span className="flex items-center gap-2 font-semibold text-white">
                                                <i className="fas fa-tag text-secondary"></i> {course.price}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mt-auto">
                                            <button className="btn-primary justify-center py-2 text-sm !shadow-none">Yozilish</button>
                                            <Link to={`/courses/${course.id}`} className="btn-outline justify-center py-2 text-sm">Batafsil</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-dark rounded-2xl p-8 border border-gray-800" data-aos="fade-up">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                <div className="space-y-6">
                                    <div className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold border border-accent/20">
                                        Maxsus kurs
                                    </div>
                                    <h3 className="text-3xl font-bold text-white">{teacherCourse.title}</h3>

                                    <div className="space-y-4">
                                        {teacherCourse.features.map((feature, index) => (
                                            <div key={index} className="flex items-start gap-3">
                                                <div className="mt-1 w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                                                    <i className="fas fa-check text-green-500 text-xs"></i>
                                                </div>
                                                <span className="text-gray-300">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-4 pt-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm text-gray-500 line-through">{teacherCourse.oldPrice}</span>
                                            <span className="text-2xl font-bold text-white">{teacherCourse.newPrice}</span>
                                        </div>
                                        <button className="btn-primary ml-auto">
                                            Hoziroq yozilish
                                        </button>
                                    </div>
                                </div>
                                <div className="relative h-[400px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center border border-gray-700">
                                    <div className="text-center">
                                        <div className="text-8xl mb-4">👨‍🏫</div>
                                        <div className="text-gray-500">O'qituvchilar uchun maxsus zona</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default Courses
