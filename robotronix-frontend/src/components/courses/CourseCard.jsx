import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CourseCard = ({ course }) => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleEnroll = (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            navigate(`/courses/${course.id}/enroll`);
        }
    };

    return (
        <div className="bg-dark-card rounded-xl border border-gray-800 hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 group flex flex-col overflow-hidden" data-aos="fade-up">
            <div className="relative h-48 bg-gray-800/50 overflow-hidden">
                <img
                    src={course.imageUrl || '/assets/images/placeholder.svg'}
                    alt={course.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent opacity-50"></div>
                {course.ageGroup && (
                    <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white font-medium border border-white/10">
                        {course.ageGroup}
                    </div>
                )}
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                    {course.description ? course.description.substring(0, 100) + '...' : ''}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-400 mb-6 pt-4 border-t border-gray-800">
                    {course.duration && (
                        <span className="flex items-center gap-2">
                            <i className="fas fa-clock text-primary"></i> {course.duration}
                        </span>
                    )}
                    <span className="flex items-center gap-2 font-semibold text-white">
                        <i className="fas fa-tag text-secondary"></i> {course.price ? parseFloat(course.price).toLocaleString() : '0'} so'm
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-auto">
                    <button onClick={handleEnroll} className="btn-primary justify-center py-2 text-sm !shadow-none">Yozilish</button>
                    <Link to={`/courses/${course.id}`} className="btn-outline justify-center py-2 text-sm">Batafsil</Link>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
