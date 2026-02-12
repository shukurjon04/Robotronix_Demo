import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext(null)

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState(localStorage.getItem('token'))

    useEffect(() => {
        const checkAuth = async () => {
            const storedToken = localStorage.getItem('token')
            const storedUser = localStorage.getItem('user')

            if (storedToken && storedUser) {
                try {
                    setToken(storedToken)
                    setUser(JSON.parse(storedUser))
                } catch (error) {
                    console.error('Error parsing stored user:', error)
                    logout()
                }
            }
            setLoading(false)
        }

        checkAuth()
    }, [])

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password })
            const data = response.data

            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            setToken(data.token)
            setUser(data.user)
            return { success: true }
        } catch (error) {
            return { success: false, error: error.response?.data?.message || error.message }
        }
    }

    const register = async (userData) => {
        try {
            const response = await api.post('/auth/register', userData)
            const data = response.data

            localStorage.setItem('token', data.token)
            localStorage.setItem('user', JSON.stringify(data.user))
            setToken(data.token)
            setUser(data.user)
            return { success: true, data }
        } catch (error) {
            return { success: false, error: error.response?.data?.message || error.message }
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setToken(null)
        setUser(null)
    }

    const hasRole = (role) => {
        if (!user) return false
        if (role === 'USER') return true
        if (role === 'ADMIN') return user.role === 'ADMIN' || user.role === 'SUPER_ADMIN'
        if (role === 'SUPER_ADMIN') return user.role === 'SUPER_ADMIN'
        return false
    }

    const value = {
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        hasRole,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
