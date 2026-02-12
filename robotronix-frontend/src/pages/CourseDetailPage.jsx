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

    if (loading) return <div className="loading">Yuklanmoqda...</div>;
    if (!course) return <div className="error">Kurs topilmadi</div>;

    return (
        <div className="course-detail-container">
            <div
                className="course-header"
                style={{ backgroundImage: `url(${course.imageUrl || '/assets/placeholder-course.jpg'})` }}
                data-aos="fade-down"
            >
                <div className="container">
                    <nav className="breadcrumb" data-aos="fade-right" data-aos-delay="200">
                        <Link to="/courses">Kurslar</Link> <i className="fas fa-chevron-right" style={{ fontSize: '10px', margin: '0 8px' }}></i> {course.title}
                    </nav>
                    <h1 data-aos="fade-up" data-aos-delay="300">{course.title}</h1>
                    <div className="course-badges" data-aos="fade-up" data-aos-delay="400">
                        <span className="badge"><i className="fas fa-layer-group"></i> {course.category}</span>
                        <span className="badge"><i className="fas fa-clock"></i> {course.duration}</span>
                    </div>
                </div>
            </div>

            <div className="course-content-grid container">
                <main className="course-main" data-aos="fade-right" data-aos-delay="500">
                    <div className="section-title-wrap">
                        <h2><i className="fas fa-info-circle"></i> Kurs haqida</h2>
                    </div>
                    <p className="description">{course.description}</p>

                    {course.syllabus && (
                        <div className="syllabus" data-aos="fade-up">
                            <h3><i className="fas fa-list-ul"></i> Kurs dasturi</h3>
                            <pre>{course.syllabus}</pre>
                        </div>
                    )}
                </main>

                <aside className="course-sidebar" data-aos="fade-left" data-aos-delay="500">
                    <div className="enrollment-card">
                        <div className="price-label">Kurs narxi:</div>
                        <div className="price">{course.price?.toLocaleString() || '0'} so'm</div>

                        <button
                            onClick={handleEnroll}
                            className="btn-primary btn-large btn-full"
                            disabled={isEnrolling}
                        >
                            {isEnrolling ? (
                                <><i className="fas fa-spinner fa-spin"></i> Yozilmoqda...</>
                            ) : (
                                <><i className="fas fa-user-plus"></i> Kursga yozilish</>
                            )}
                        </button>

                        <ul className="course-features">
                            <li><i className="fas fa-certificate"></i> Sertifikat beriladi</li>
                            <li><i className="fas fa-laptop-code"></i> Amaliy loyihalar</li>
                            <li><i className="fas fa-headset"></i> Mentor yordami</li>
                            <li><i className="fas fa-infinity"></i> Umrbod kirish</li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default CourseDetailPage;
