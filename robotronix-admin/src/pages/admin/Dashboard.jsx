import { useState, useEffect } from 'react'
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'
import BannersPage from './BannersPage'
import SeoMetaPage from './SeoMetaPage'
import UsersPage from './UsersPage'
import CoursesPage from './CoursesPage'
import ProductsPage from './ProductsPage'
import OrdersPage from './OrdersPage'
import EnrollmentsPage from './EnrollmentsPage'
import MessagesPage from './MessagesPage'
import AuditLogsPage from './AuditLogsPage'

const Dashboard = () => {
    const { user, logout } = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const [stats, setStats] = useState(null)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get('/admin/stats')
                setStats(response.data)
            } catch (error) {
                console.error('Error fetching stats:', error)
            }
        }
        fetchStats()
    }, [])

    const menuItems = [
        { path: '/admin', label: 'Dashboard', icon: 'fas fa-home' },
        { path: '/admin/users', label: 'Foydalanuvchilar', icon: 'fas fa-users' },
        { path: '/admin/courses', label: 'Kurslar', icon: 'fas fa-book' },
        { path: '/admin/products', label: 'Mahsulotlar', icon: 'fas fa-box' },
        { path: '/admin/orders', label: 'Buyurtmalar', icon: 'fas fa-shopping-cart' },
        { path: '/admin/enrollments', label: 'Ro\'yxatlar', icon: 'fas fa-clipboard-list' },
        { path: '/admin/messages', label: 'Xabarlar', icon: 'fas fa-envelope' },
        { path: '/admin/banners', label: 'Bannerlar', icon: 'fas fa-images' },
        { path: '/admin/seo', label: 'SEO Sozlamalar', icon: 'fas fa-search' },
        { path: '/admin/audit', label: 'Audit Jurnali', icon: 'fas fa-history' }
    ]

    const statCards = [
        { label: 'Foydalanuvchilar', value: stats?.totalUsers || '0', icon: 'fas fa-users', color: 'primary' },
        { label: 'Kurslar', value: stats?.totalCourses || '0', icon: 'fas fa-book', color: 'secondary' },
        { label: 'Mahsulotlar', value: stats?.totalProducts || '0', icon: 'fas fa-box', color: 'accent' },
        { label: 'Buyurtmalar', value: stats?.totalOrders || '0', icon: 'fas fa-shopping-cart', color: 'purple' },
        { label: 'Xabarlar', value: stats?.unreadMessages || '0', icon: 'fas fa-envelope', color: 'green' }
    ]

    const colorMap = {
        primary: { bg: 'bg-primary/10', text: 'text-primary' },
        secondary: { bg: 'bg-secondary/10', text: 'text-secondary' },
        accent: { bg: 'bg-accent/10', text: 'text-accent' },
        purple: { bg: 'bg-purple-500/10', text: 'text-purple-400' },
        green: { bg: 'bg-emerald-500/10', text: 'text-emerald-400' }
    }

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const isActive = (path) => {
        if (path === '/admin') return location.pathname === '/' || location.pathname === '/admin'
        return location.pathname === path
    }

    return (
        <div className="min-h-screen bg-dark">
            {/* Mobile Header */}
            <div className="lg:hidden flex items-center justify-between p-4 bg-dark-card border-b border-gray-800">
                <h1 className="text-lg font-bold text-white">
                    <i className="fas fa-robot text-primary mr-2"></i>Admin
                </h1>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="text-white text-xl p-2"
                >
                    <i className={`fas ${sidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
                </button>
            </div>

            <div className="flex">
                {/* Sidebar */}
                <aside className={`
                    fixed lg:sticky top-0 left-0 h-screen w-64 bg-dark-card border-r border-gray-800 p-5 overflow-y-auto z-50
                    transition-transform duration-300 lg:translate-x-0
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}>
                    {/* Profile */}
                    <div className="text-center mb-6 pt-2">
                        <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-3 text-2xl text-white">
                            <i className="fas fa-user"></i>
                        </div>
                        <h3 className="text-white font-semibold text-sm">{user?.fullName || 'Admin'}</h3>
                        <span className="inline-block mt-1 text-xs text-primary bg-primary/10 px-3 py-1 rounded-full">
                            {user?.role || 'ADMIN'}
                        </span>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`
                                    flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all duration-200
                                    ${isActive(item.path)
                                        ? 'bg-primary/10 text-primary font-medium'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                    }
                                `}
                            >
                                <i className={`${item.icon} w-5 text-center`}></i>
                                {item.label}
                            </Link>
                        ))}

                        <div className="border-t border-gray-800 my-3"></div>

                        <Link
                            to="/"
                            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all"
                        >
                            <i className="fas fa-external-link-alt w-5 text-center"></i>
                            Saytga qaytish
                        </Link>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-all w-full text-left"
                        >
                            <i className="fas fa-sign-out-alt w-5 text-center"></i>
                            Chiqish
                        </button>
                    </nav>
                </aside>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/60 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    ></div>
                )}

                {/* Main Content */}
                <main className="flex-1 min-h-screen p-6 lg:p-8">
                    <Routes>
                        <Route path="/" element={
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-6">Dashboard</h2>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
                                    {statCards.map((stat, index) => (
                                        <div key={index} className="card flex items-center justify-between">
                                            <div>
                                                <p className="text-gray-500 text-xs mb-1">{stat.label}</p>
                                                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                                            </div>
                                            <div className={`w-11 h-11 ${colorMap[stat.color].bg} rounded-xl flex items-center justify-center`}>
                                                <i className={`${stat.icon} ${colorMap[stat.color].text}`}></i>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Welcome Card */}
                                <div className="card">
                                    <h3 className="text-white font-semibold mb-3">
                                        <i className="fas fa-hand-wave text-primary mr-2"></i>
                                        Xush kelibsiz!
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        Chap tomondagi menu orqali saytni boshqarishingiz mumkin.
                                    </p>
                                </div>
                            </div>
                        } />
                        <Route path="/users" element={<UsersPage />} />
                        <Route path="/courses" element={<CoursesPage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/orders" element={<OrdersPage />} />
                        <Route path="/enrollments" element={<EnrollmentsPage />} />
                        <Route path="/messages" element={
                            <div>
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-xl font-bold text-white">Xabarlar</h2>
                                    <a
                                        href={`${import.meta.env.VITE_API_URL || '/api'}/admin/leads/export`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/20 transition-colors text-sm"
                                    >
                                        <i className="fas fa-file-csv"></i> Eksport
                                    </a>
                                </div>
                                <MessagesPage />
                            </div>
                        } />
                        <Route path="/banners" element={<BannersPage />} />
                        <Route path="/seo" element={<SeoMetaPage />} />
                        <Route path="/audit" element={<AuditLogsPage />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default Dashboard
