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
            setIsScrolled(window.scrollY > 20)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [location])

    const handleNavClick = (e, targetId) => {
        const isHomePage = location.pathname === '/' || location.pathname === ''

        if (!isHomePage) {
            setIsMobileMenuOpen(false)
            return
        }

        e.preventDefault()
        const element = document.getElementById(targetId)
        if (element) {
            const offset = 80 // Height of navbar
            const bodyRect = document.body.getBoundingClientRect().top
            const elementRect = element.getBoundingClientRect().top
            const elementPosition = elementRect - bodyRect
            const offsetPosition = elementPosition - offset

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            })
        }
        setIsMobileMenuOpen(false)
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
                ? 'bg-dark/80 backdrop-blur-md border-b border-gray-800 py-3 shadow-lg'
                : 'bg-transparent py-5'
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 relative flex items-center justify-center bg-gradient-to-br from-primary to-secondary rounded-lg shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300 transform group-hover:scale-105">
                            <i className="fas fa-robot text-white text-xl"></i>
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 tracking-wide font-display">
                            Robotronix
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center gap-8">
                        <ul className="flex items-center gap-8">
                            {!hasRole('ADMIN') ? (
                                <>
                                    <li>
                                        <a
                                            href="/#home"
                                            className="text-gray-300 hover:text-white font-medium transition-colors relative group py-2"
                                            onClick={(e) => handleNavClick(e, 'home')}
                                        >
                                            Bosh sahifa
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                                        </a>
                                    </li>
                                    <li>
                                        <Link to="/courses" className="text-gray-300 hover:text-white font-medium transition-colors relative group py-2">
                                            Kurslar
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/products" className="text-gray-300 hover:text-white font-medium transition-colors relative group py-2">
                                            Do'kon
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                                        </Link>
                                    </li>
                                    {isAuthenticated && (
                                        <li>
                                            <Link to="/cart" className="relative text-gray-300 hover:text-primary transition-colors p-2">
                                                <i className="fas fa-shopping-cart text-lg"></i>
                                                {itemCount > 0 && (
                                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-dark">
                                                        {itemCount}
                                                    </span>
                                                )}
                                            </Link>
                                        </li>
                                    )}
                                    <li>
                                        <a
                                            href="/#about"
                                            className="text-gray-300 hover:text-white font-medium transition-colors relative group py-2"
                                            onClick={(e) => handleNavClick(e, 'about')}
                                        >
                                            Biz haqimizda
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href="/#contact"
                                            className="text-gray-300 hover:text-white font-medium transition-colors relative group py-2"
                                            onClick={(e) => handleNavClick(e, 'contact')}
                                        >
                                            Aloqa
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                                        </a>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <a href="http://admin.robotronix.uz" className="flex items-center gap-2 text-primary hover:text-secondary font-bold transition-colors">
                                        <i className="fas fa-user-shield"></i> Admin Panel
                                    </a>
                                </li>
                            )}
                        </ul>

                        <div className="flex items-center gap-4 border-l border-gray-700 pl-8">
                            {isAuthenticated ? (
                                <div className="flex items-center gap-4">
                                    <Link to="/dashboard" className="flex items-center gap-3 group">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary p-[2px] group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
                                            <div className="w-full h-full rounded-full bg-dark flex items-center justify-center">
                                                <i className="fas fa-user text-xs text-white"></i>
                                            </div>
                                        </div>
                                        <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                                            {user?.fullName}
                                        </span>
                                    </Link>
                                    <button
                                        className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                                        onClick={logout}
                                    >
                                        <i className="fas fa-sign-out-alt"></i>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    {/* <Link to="/login" className="text-gray-300 hover:text-white font-medium transition-colors">
                                        Kirish
                                    </Link> */}
                                    <button className="btn-primary py-2 px-6 text-sm">
                                        Kursga yozilish
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-50 relative"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <div
                    className={`fixed inset-0 bg-dark/95 backdrop-blur-xl z-40 lg:hidden transition-all duration-300 flex items-center justify-center ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                        }`}
                >
                    <div className="w-full max-w-md px-6 text-center space-y-8">
                        <ul className="space-y-6">
                            {!hasRole('ADMIN') ? (
                                <>
                                    <li>
                                        <a href="/#home" onClick={(e) => handleNavClick(e, 'home')} className="text-2xl font-bold text-white hover:text-primary transition-colors">Bosh sahifa</a>
                                    </li>
                                    <li>
                                        <Link to="/courses" className="text-2xl font-bold text-white hover:text-primary transition-colors">Kurslar</Link>
                                    </li>
                                    <li>
                                        <Link to="/products" className="text-2xl font-bold text-white hover:text-primary transition-colors">Do'kon</Link>
                                    </li>
                                    {isAuthenticated && (
                                        <li>
                                            <Link to="/cart" className="text-2xl font-bold text-white hover:text-primary transition-colors flex items-center justify-center gap-2">
                                                Savat
                                                {itemCount > 0 && <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">{itemCount}</span>}
                                            </Link>
                                        </li>
                                    )}
                                    <li>
                                        <a href="/#about" onClick={(e) => handleNavClick(e, 'about')} className="text-2xl font-bold text-white hover:text-primary transition-colors">Biz haqimizda</a>
                                    </li>
                                    <li>
                                        <a href="/#contact" onClick={(e) => handleNavClick(e, 'contact')} className="text-2xl font-bold text-white hover:text-primary transition-colors">Aloqa</a>
                                    </li>
                                </>
                            ) : (
                                <li>
                                    <a href="http://admin.robotronix.uz" className="text-2xl font-bold text-primary hover:text-secondary transition-colors">Admin Panel</a>
                                </li>
                            )}
                        </ul>

                        <div className="border-t border-gray-800 pt-8">
                            {isAuthenticated ? (
                                <div className="space-y-4">
                                    <Link to="/dashboard" className="block text-xl font-medium text-white hover:text-primary transition-colors text-center">
                                        {user?.fullName}
                                    </Link>
                                    <button onClick={logout} className="w-full text-red-500 font-medium hover:text-red-400">Chiqish</button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <button className="btn-primary w-full justify-center">Kursga yozilish</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
