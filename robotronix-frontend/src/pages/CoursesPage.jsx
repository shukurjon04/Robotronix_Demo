import { useState, useEffect } from 'react';
import api from '../services/api';
import CourseCard from '../components/courses/CourseCard';

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('kids');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await api.get('/courses');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const filteredCourses = courses.filter(course => course.category === activeTab);

    if (loading) return (
        <div className="min-h-screen bg-dark pt-24 pb-12 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <section className="min-h-screen bg-dark pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="gradient-text">O'quv kurslarimiz</span>
                    </h2>
                    <p className="text-gray-400 text-lg">Kelajak texnologiyalarini biz bilan o'rganing</p>
                </div>

                <div className="flex justify-center mb-12" data-aos="fade-up" data-aos-delay="100">
                    <div className="bg-dark-card p-1 rounded-xl inline-flex border border-gray-800">
                        <button
                            className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === 'kids'
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                            onClick={() => setActiveTab('kids')}
                        >
                            <i className="fas fa-child"></i> Bolalar uchun
                        </button>
                        <button
                            className={`px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${activeTab === 'teachers'
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                            onClick={() => setActiveTab('teachers')}
                        >
                            <i className="fas fa-chalkboard-teacher"></i> O'qituvchilar uchun
                        </button>
                    </div>
                </div>

                <div className="min-h-[400px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredCourses.length > 0 ? (
                            filteredCourses.map((course, index) => (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                    data-aos="fade-up"
                                    data-aos-delay={(index + 1) * 100}
                                />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20" data-aos="fade-up">
                                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <i className="fas fa-book-open text-4xl text-gray-500"></i>
                                </div>
                                <p className="text-gray-400 text-lg">Bu bo'limda hozircha kurslar mavjud emas.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoursesPage;

