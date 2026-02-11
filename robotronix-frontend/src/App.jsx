import { Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import Preloader from './components/common/Preloader'
import ScrollToHash from './components/common/ScrollToHash'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import AdminDashboard from './pages/admin/Dashboard'
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {
  const location = useLocation()
  const isAdminPath = location.pathname.startsWith('/admin') ||
    location.pathname === '/login' ||
    location.pathname === '/register'

  return (
    <AuthProvider>
      <CartProvider>
        <Preloader />
        <ScrollToHash />
        {!isAdminPath && <Navbar />}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        {!isAdminPath && <Footer />}
      </CartProvider>
    </AuthProvider>
  )
}

export default App
