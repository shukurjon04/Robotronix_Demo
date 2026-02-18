import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        const result = await login(formData.email, formData.password)
        if (result.success) {
            navigate('/')
        } else {
            setError(result.error || 'Login failed. Please try again.')
        }
        setIsSubmitting(false)
    }

    return (
        <div className="min-h-screen bg-dark flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl text-white">
                        <i className="fas fa-robot"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-1">Admin Panel</h2>
                    <p className="text-gray-500 text-sm">Tizimga kirish</p>
                </div>

                <div className="card">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2">
                                <i className="fas fa-exclamation-circle"></i>
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="label-field">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="input-field"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="label-field">Parol</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="input-field"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn-primary w-full justify-center py-3" disabled={isSubmitting}>
                            <i className={`fas ${isSubmitting ? 'fa-spinner fa-spin' : 'fa-sign-in-alt'}`}></i>
                            {isSubmitting ? 'Kirish...' : 'Kirish'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
