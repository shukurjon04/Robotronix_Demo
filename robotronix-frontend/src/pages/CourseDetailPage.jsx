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
            <div className="course-header" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${course.imageUrl || '/assets/placeholder-course.jpg'})` }}>
                <div className="container">
                    <nav className="breadcrumb">
                        <Link to="/courses">Kurslar</Link> / {course.title}
                    </nav>
                    <h1>{course.title}</h1>
                    <div className="course-badges">
                        <span className="badge">{course.category}</span>
                        <span className="badge">{course.duration}</span>
                    </div>
                </div>
            </div>

            <div className="course-content-grid container">
                <div className="course-main">
                    <h2>Kurs haqida</h2>
                    <p className="description">{course.description}</p>

                    {course.syllabus && (
                        <div className="syllabus">
                            <h3>Dastur</h3>
                            <pre>{course.syllabus}</pre>
                        </div>
                    )}
                </div>

                <div className="course-sidebar">
                    <div className="enrollment-card">
                        <div className="price">{course.price?.toLocaleString() || '0'} so'm</div>
                        <button
                            onClick={handleEnroll}
                            className="btn-primary btn-large btn-full"
                            disabled={isEnrolling}
                        >
                            {isEnrolling ? 'Yozilmoqda...' : 'Kursga yozilish'}
                        </button>
                        <ul className="course-features">
                            <li>Sertifikat beriladi</li>
                            <li>Amaliy loyihalar</li>
                            <li>Mentor yordami</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailPage;
