import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const ProtectedRoute = ({ children, requiredRole = 'USER' }) => {
    const { isAuthenticated, hasRole, loading } = useAuth()

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                background: 'var(--dark-bg)'
            }}>
                <div className="robot-loader">
                    <div className="robot-head">
                        <div className="robot-eye left"></div>
                        <div className="robot-eye right"></div>
                    </div>
                    <div className="loading-text">Yuklanmoqda...</div>
                </div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (!hasRole(requiredRole)) {
        return <Navigate to="/" replace />
    }

    return children
}

export default ProtectedRoute
