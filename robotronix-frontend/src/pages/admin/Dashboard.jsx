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
        { label: 'Foydalanuvchilar', value: stats?.totalUsers || '0', icon: 'fas fa-users', color: '#0066ff' },
        { label: 'Kurslar', value: stats?.totalCourses || '0', icon: 'fas fa-book', color: '#00ccff' },
        { label: 'Mahsulotlar', value: stats?.totalProducts || '0', icon: 'fas fa-box', color: '#ff6b35' },
        { label: 'Buyurtmalar', value: stats?.totalOrders || '0', icon: 'fas fa-shopping-cart', color: '#8b5cf6' },
        { label: 'Xabarlar', value: stats?.unreadMessages || '0', icon: 'fas fa-envelope', color: '#10b981' }
    ]

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    return (
        <section style={{ minHeight: '100vh', paddingTop: '40px', paddingBottom: '40px', background: 'var(--dark-bg)' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px' }}>
                    {/* Sidebar */}
                    <aside style={{
                        background: 'var(--card-bg)',
                        borderRadius: '15px',
                        padding: '20px',
                        border: '1px solid var(--border-color)',
                        height: 'fit-content'
                    }}>
                        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                            <div style={{
                                width: '80px',
                                height: '80px',
                                background: 'var(--gradient-primary)',
                                borderRadius: '50%',
                                margin: '0 auto 15px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '2rem',
                                color: 'white'
                            }}>
                                <i className="fas fa-user"></i>
                            </div>
                            <h3 style={{ color: 'var(--text-primary)', marginBottom: '5px' }}>
                                {user?.fullName || 'Admin'}
                            </h3>
                            <span style={{
                                color: 'var(--primary-color)',
                                fontSize: '12px',
                                background: 'rgba(0, 102, 255, 0.1)',
                                padding: '4px 12px',
                                borderRadius: '15px'
                            }}>
                                {user?.role || 'ADMIN'}
                            </span>
                        </div>

                        <nav>
                            {menuItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '12px 15px',
                                        borderRadius: '10px',
                                        color: location.pathname === item.path ? 'var(--primary-color)' : 'var(--text-secondary)',
                                        textDecoration: 'none',
                                        marginBottom: '5px',
                                        background: location.pathname === item.path ? 'rgba(0, 102, 255, 0.1)' : 'transparent',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    <i className={item.icon} style={{ width: '20px' }}></i>
                                    {item.label}
                                </Link>
                            ))}

                            <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '15px 0' }} />

                            <Link
                                to="/"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px 15px',
                                    borderRadius: '10px',
                                    color: 'var(--text-secondary)',
                                    textDecoration: 'none',
                                    marginBottom: '5px',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <i className="fas fa-external-link-alt" style={{ width: '20px' }}></i>
                                Saytga qaytish
                            </Link>

                            <button
                                onClick={handleLogout}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px 15px',
                                    borderRadius: '10px',
                                    color: '#ff4d4d',
                                    background: 'transparent',
                                    border: 'none',
                                    width: '100%',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    textAlign: 'left',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <i className="fas fa-sign-out-alt" style={{ width: '20px' }}></i>
                                Chiqish
                            </button>
                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main>
                        <Routes>
                            <Route path="/" element={
                                <div>
                                    <h2 style={{
                                        color: 'var(--text-primary)',
                                        marginBottom: '30px',
                                        fontSize: '1.8rem'
                                    }}>
                                        Dashboard
                                    </h2>

                                    {/* Stats Grid */}
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                        gap: '20px',
                                        marginBottom: '30px'
                                    }}>
                                        {statCards.map((stat, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    background: 'var(--card-bg)',
                                                    borderRadius: '15px',
                                                    padding: '25px',
                                                    border: '1px solid var(--border-color)'
                                                }}
                                            >
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <div>
                                                        <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>
                                                            {stat.label}
                                                        </p>
                                                        <h3 style={{ color: 'var(--text-primary)', fontSize: '1.8rem' }}>
                                                            {stat.value}
                                                        </h3>
                                                    </div>
                                                    <div style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        background: `${stat.color}20`,
                                                        borderRadius: '12px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <i className={stat.icon} style={{ color: stat.color, fontSize: '1.2rem' }}></i>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Recent Activity placeholder */}
                                    <div style={{
                                        background: 'var(--card-bg)',
                                        borderRadius: '15px',
                                        padding: '25px',
                                        border: '1px solid var(--border-color)'
                                    }}>
                                        <h3 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>
                                            Xush kelibsiz!
                                        </h3>
                                        <p style={{ color: 'var(--text-muted)', padding: '20px' }}>
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
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                        <h2 style={{ color: 'var(--text-primary)' }}>Xabarlar</h2>
                                        <a
                                            href={`${import.meta.env.VITE_API_URL || '/api'}/admin/leads/export`}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{
                                                background: '#10b981',
                                                color: 'white',
                                                textDecoration: 'none',
                                                padding: '10px 20px',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            }}
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
        </section>
    )
}

export default Dashboard
