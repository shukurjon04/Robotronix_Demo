import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const DashboardPage = () => {
    const { user, isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()
    const [enrollments, setEnrollments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
            return
        }

        const fetchEnrollments = async () => {
            try {
                // The endpoint might be /courses/my-enrollments based on CourseController
                // Or /enrollments/my based on a potential EnrollmentController
                // Let's try /courses/my-enrollments first as seen in previous context
                const response = await api.get('/courses/my-enrollments')
                setEnrollments(response.data)
            } catch (error) {
                console.error('Error fetching enrollments:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchEnrollments()
    }, [isAuthenticated, navigate])

    if (loading) {
        return (
            <div className="min-h-screen bg-dark pt-24 pb-12 flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-dark pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar / User Profile */}
                    <div className="lg:col-span-1">
                        <div className="bg-dark-card border border-gray-800 rounded-xl p-6 sticky top-24">
                            <div className="flex flex-col items-center text-center mb-6">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary p-1 mb-4">
                                    <div className="w-full h-full rounded-full bg-dark flex items-center justify-center">
                                        <i className="fas fa-user text-4xl text-gray-400"></i>
                                    </div>
                                </div>
                                <h2 className="text-xl font-bold text-white mb-1">{user?.fullName}</h2>
                                <p className="text-gray-400 text-sm mb-4">{user?.email}</p>
                                <div className="w-full h-px bg-gray-800 mb-4"></div>
                                <div className="w-full space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Role:</span>
                                        <span className="text-primary font-medium">{user?.role}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Kurslar:</span>
                                        <span className="text-white font-medium">{enrollments.length}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={logout}
                                className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <i className="fas fa-sign-out-alt"></i>
                                Chiqish
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <h1 className="text-3xl font-bold text-white mb-8">Mening kurslarim</h1>

                        {enrollments.length > 0 ? (
                            <div className="grid md:grid-cols-2 gap-6">
                                {enrollments.map((enrollment) => (
                                    <div key={enrollment.id} className="bg-dark-card border border-gray-800 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 group">
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={enrollment.course?.imageUrl || '/assets/images/placeholder.svg'}
                                                alt={enrollment.course?.title}
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-80"></div>
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded-md mb-2 inline-block">
                                                    {enrollment.course?.category}
                                                </span>
                                                <h3 className="text-xl font-bold text-white">{enrollment.course?.title}</h3>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                                                <span><i className="fas fa-clock mr-2"></i>{enrollment.course?.duration}</span>
                                                <span><i className="fas fa-calendar-alt mr-2"></i>{new Date(enrollment.enrollmentDate).toLocaleDateString()}</span>
                                            </div>

                                            {/* Progress Bar (Mocked for now) */}
                                            <div className="mb-4">
                                                <div className="flex justify-between text-xs mb-1">
                                                    <span className="text-gray-400">Progress</span>
                                                    <span className="text-primary">0%</span>
                                                </div>
                                                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                                    <div className="h-full bg-primary w-0"></div>
                                                </div>
                                            </div>

                                            <Link
                                                to={`/courses/${enrollment.course?.id}`}
                                                className="block w-full text-center py-3 bg-primary hover:bg-blue-600 text-white rounded-lg transition-colors font-medium"
                                            >
                                                Davom ettirish
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-dark-card border border-gray-800 rounded-xl p-12 text-center">
                                <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <i className="fas fa-book-open text-4xl text-gray-500"></i>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Hozircha kurslarga yozilmagansiz</h3>
                                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                                    Bizning kurslarimizdan birini tanlang va o'qishni boshlang.
                                </p>
                                <Link to="/courses" className="btn-primary inline-flex">
                                    Kurslarni ko'rish
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardPage
