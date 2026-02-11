import { useState } from 'react'

const Courses = () => {
    const [activeTab, setActiveTab] = useState('kids')

    const kidsCourses = [
        {
            id: 1,
            title: 'Mitti Muhandis',
            description: 'LEGO Classic va STEAM asosida ijodkorlikni rivojlantirish',
            age: '4-6 yosh',
            duration: '3 oy',
            price: '350.000 so\'m',
            image: '/assets/images/placeholder.svg'
        },
        {
            id: 2,
            title: 'Kichik Muhandis',
            description: 'LEGO WeDo 2.0 yordamida ilk mexanizmlarni yasash',
            age: '7-9 yosh',
            duration: '6 oy',
            price: '450.000 so\'m',
            image: '/assets/images/placeholder.svg'
        },
        {
            id: 3,
            title: 'Yosh Muhandis',
            description: 'Arduino platformasi asosida elektronika va dasturlash',
            age: '10-14 yosh',
            duration: '9 oy',
            price: '550.000 so\'m',
            image: '/assets/images/placeholder.svg'
        },
        {
            id: 4,
            title: 'Dasturlash va AI',
            description: 'Flutter va Python orqali mobil ilovalar va AI',
            age: '14+ yosh',
            duration: '12 oy',
            price: '650.000 so\'m',
            image: '/assets/images/placeholder.svg'
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
        oldPrice: '800.000 so\'m',
        newPrice: '650.000 so\'m',
        image: '/assets/images/placeholder.svg'
    }

    return (
        <section id="courses" className="courses">
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <h2 className="section-title">Kurslarimiz</h2>
                    <p className="section-subtitle">
                        4 yoshdan boshlab barcha yoshdagilar uchun
                    </p>
                </div>

                <div className="course-tabs" data-aos="fade-up">
                    <button
                        className={`tab-btn ${activeTab === 'kids' ? 'active' : ''}`}
                        onClick={() => setActiveTab('kids')}
                    >
                        Bolalar uchun
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'teachers' ? 'active' : ''}`}
                        onClick={() => setActiveTab('teachers')}
                    >
                        O'qituvchilar uchun
                    </button>
                </div>

                <div className="courses-content">
                    <div className={`tab-content ${activeTab === 'kids' ? 'active' : ''}`} id="kids">
                        <div className="courses-grid">
                            {kidsCourses.map((course, index) => (
                                <div
                                    key={course.id}
                                    className="course-card"
                                    data-aos="fade-up"
                                    data-aos-delay={(index + 1) * 100}
                                >
                                    <div className="course-image">
                                        <img src={course.image} alt={course.title} />
                                        <div className="course-badge">{course.age}</div>
                                    </div>
                                    <div className="course-content">
                                        <h3 className="course-title">{course.title}</h3>
                                        <p className="course-description">{course.description}</p>
                                        <div className="course-meta">
                                            <span className="course-duration">
                                                <i className="fas fa-clock"></i> {course.duration}
                                            </span>
                                            <span className="course-price">
                                                <i className="fas fa-tag"></i> {course.price}
                                            </span>
                                        </div>
                                        <div className="course-actions">
                                            <button className="btn-primary btn-full">Yozilish</button>
                                            <button className="btn-outline">Batafsil</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`tab-content ${activeTab === 'teachers' ? 'active' : ''}`} id="teachers">
                        <div className="teacher-course">
                            <div className="teacher-course-content" data-aos="fade-up">
                                <h3 className="teacher-course-title">{teacherCourse.title}</h3>
                                <div className="teacher-course-features">
                                    {teacherCourse.features.map((feature, index) => (
                                        <div key={index} className="feature">
                                            <i className="fas fa-check-circle"></i>
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className="teacher-course-price">
                                    <span className="price-old">{teacherCourse.oldPrice}</span>
                                    <span className="price-new">{teacherCourse.newPrice}</span>
                                </div>
                                <button className="btn-primary btn-large">
                                    Hoziroq yozilish
                                </button>
                            </div>
                            <div className="teacher-course-image" data-aos="fade-left">
                                <img src={teacherCourse.image} alt="O'qituvchilar kursi" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Courses
