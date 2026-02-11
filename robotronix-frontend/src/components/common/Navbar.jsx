import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { isAuthenticated, user, logout, hasRole } = useAuth()
    const { itemCount } = useCart()
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        // Close mobile menu on route change
        setIsMobileMenuOpen(false)
    }, [location])

    const handleNavClick = (e, targetId) => {
        const isHomePage = location.pathname === '/' || location.pathname === ''

        if (!isHomePage) {
            setIsMobileMenuOpen(false)
            return // Let standard anchor link handle it
        }

        e.preventDefault()
        const element = document.getElementById(targetId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
        setIsMobileMenuOpen(false)
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
            <div className="container">
                <div className="nav-content">
                    <Link to="/" className="logo">
                        <img
                            src="/assets/images/logo.svg"
                            alt="Robotronix"
                            className="logo-img"
                        />
                        <span className="logo-text">Robotronix</span>
                    </Link>

                    <ul className={`nav-menu ${isMobileMenuOpen ? 'active' : ''}`} id="nav-menu">
                        <li>
                            <a
                                href="/#home"
                                className="nav-link"
                                onClick={(e) => handleNavClick(e, 'home')}
                            >
                                Bosh sahifa
                            </a>
                        </li>
                        <li>
                            <Link to="/courses" className="nav-link">Kurslar</Link>
                        </li>
                        <li>
                            <Link to="/products" className="nav-link">Do'kon</Link>
                        </li>
                        {isAuthenticated && (
                            <li>
                                <Link to="/cart" className="nav-link">
                                    Savat {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
                                </Link>
                            </li>
                        )}
                        <li>
                            <a
                                href="/#about"
                                className="nav-link"
                                onClick={(e) => handleNavClick(e, 'about')}
                            >
                                Biz haqimizda
                            </a>
                        </li>
                        <li>
                            <a
                                href="/#contact"
                                className="nav-link"
                                onClick={(e) => handleNavClick(e, 'contact')}
                            >
                                Aloqa
                            </a>
                        </li>
                        {hasRole('ADMIN') && (
                            <li>
                                <Link to="/admin" className="nav-link">
                                    Admin Panel
                                </Link>
                            </li>
                        )}
                    </ul>

                    <div className="nav-actions">
                        {isAuthenticated ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                                    {user?.fullName}
                                </span>
                                <button className="btn-outline" onClick={logout}>
                                    Chiqish
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link to="/login" className="btn-outline" style={{ display: 'none' }}>
                                    Kirish
                                </Link>
                                <button className="btn-primary">Kursga yozilish</button>
                            </>
                        )}
                        <button
                            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
                            id="hamburger"
                            onClick={toggleMobileMenu}
                            aria-label="Toggle menu"
                        >
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
