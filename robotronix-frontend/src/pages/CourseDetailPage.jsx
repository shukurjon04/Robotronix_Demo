import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const CourseDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEnrolling, setIsEnrolling] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await api.get(`/courses/${id}`);
                setCourse(response.data);
            } catch (error) {
                console.error('Error fetching course:', error);
                navigate('/courses');
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id, navigate]);

    const handleEnroll = async () => {
        if (!isAuthenticated) {
            navigate(`/login?redirect=/courses/${id}`);
            return;
        }

        try {
            setIsEnrolling(true);
            await api.post(`/courses/${id}/enroll`);
            alert("Kursga muvaffaqiyatli yozildingiz! Tez orada operatorlarimiz bog'lanishadi.")
        } catch (error) {
            alert('Kursga yozilishda xatolik yuz berdi: ' + (error.response?.data?.message || error.message));
        } finally {
            setIsEnrolling(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-dark pt-24 pb-12 flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    if (!course) return (
        <div className="min-h-screen bg-dark pt-24 pb-12 flex items-center justify-center">
            <div className="text-center">
                <i className="fas fa-exclamation-triangle text-5xl text-gray-500 mb-4"></i>
                <p className="text-gray-400 text-lg">Kurs topilmadi</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-dark">
            {/* Hero Header */}
            <div
                className="relative h-[350px] bg-cover bg-center flex items-end"
                style={{ backgroundImage: `linear-gradient(to bottom, rgba(10,10,20,0.3), rgba(10,10,20,0.95)), url(${course.imageUrl || '/assets/placeholder-course.jpg'})` }}
            >
                <div className="container mx-auto px-4 pb-12">
                    <nav className="text-sm text-gray-400 mb-4" data-aos="fade-right">
                        <Link to="/courses" className="hover:text-primary transition-colors">Kurslar</Link>
                        <i className="fas fa-chevron-right text-[10px] mx-2"></i>
                        <span className="text-white">{course.title}</span>
                    </nav>
                    <h1 className="text-4xl font-bold text-white mb-4" data-aos="fade-up">{course.title}</h1>
                    <div className="flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="100">
                        <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium border border-primary/30">
                            <i className="fas fa-layer-group mr-2"></i>{course.category}
                        </span>
                        <span className="bg-gray-800/80 text-gray-300 px-4 py-1.5 rounded-full text-sm font-medium border border-gray-700">
                            <i className="fas fa-clock mr-2"></i>{course.duration}
                        </span>
                        {course.ageGroup && (
                            <span className="bg-secondary/20 text-secondary px-4 py-1.5 rounded-full text-sm font-medium border border-secondary/30">
                                <i className="fas fa-users mr-2"></i>{course.ageGroup}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-3 gap-8">
                    <main className="lg:col-span-2 space-y-8" data-aos="fade-right">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <i className="fas fa-info-circle text-primary"></i> Kurs haqida
                            </h2>
                            <p className="text-gray-400 leading-relaxed">{course.description}</p>
                        </div>

                        {course.syllabus && (
                            <div data-aos="fade-up">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                                    <i className="fas fa-list-ul text-primary"></i> Kurs dasturi
                                </h3>
                                <pre className="text-gray-400 bg-dark-card border border-gray-800 rounded-xl p-6 whitespace-pre-wrap font-sans">{course.syllabus}</pre>
                            </div>
                        )}
                    </main>

                    <aside className="lg:col-span-1" data-aos="fade-left">
                        <div className="bg-dark-card border border-gray-800 rounded-xl p-6 sticky top-24">
                            <div className="text-sm text-gray-400 mb-1">Kurs narxi:</div>
                            <div className="text-3xl font-bold text-white mb-6">{course.price?.toLocaleString() || '0'} so'm</div>

                            <button
                                onClick={handleEnroll}
                                className="btn-primary w-full justify-center py-3 mb-6"
                                disabled={isEnrolling}
                            >
                                {isEnrolling ? (
                                    <><i className="fas fa-spinner fa-spin mr-2"></i> Yozilmoqda...</>
                                ) : (
                                    <><i className="fas fa-user-plus mr-2"></i> Kursga yozilish</>
                                )}
                            </button>

                            <ul className="space-y-3">
                                {[
                                    { icon: 'fa-certificate', text: 'Sertifikat beriladi' },
                                    { icon: 'fa-laptop-code', text: 'Amaliy loyihalar' },
                                    { icon: 'fa-headset', text: 'Mentor yordami' },
                                    { icon: 'fa-infinity', text: 'Umrbod kirish' }
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-gray-400">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <i className={`fas ${item.icon} text-primary text-sm`}></i>
                                        </div>
                                        {item.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailPage;
