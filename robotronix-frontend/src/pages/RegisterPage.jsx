import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { register } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        setError('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError('')

        if (formData.password !== formData.confirmPassword) {
            setError('Parollar mos kelmadi')
            setIsSubmitting(false)
            return
        }

        const result = await register({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password
        })

        if (result.success) {
            navigate('/login')
        } else {
            setError(result.error || 'Ro\'yxatdan o\'tish amalga oshmadi.')
        }

        setIsSubmitting(false)
    }

    return (
        <div className="min-h-screen bg-dark flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8" data-aos="fade-up">
                    <h2 className="text-3xl font-bold text-white mb-2">Ro'yxatdan o'tish</h2>
                    <p className="text-gray-400">Yangi hisob yarating</p>
                </div>

                <div className="bg-dark-card border border-gray-800 rounded-2xl p-8" data-aos="fade-up" data-aos-delay="100">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2">
                                <i className="fas fa-exclamation-circle"></i>
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-400 mb-2">
                                Ism va familiya *
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                name="fullName"
                                className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                                Email *
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                                Telefon raqam
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
                                Parol *
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                            />
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-2">
                                Parolni tasdiqlash *
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                className="w-full bg-dark border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                minLength={6}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-primary w-full justify-center py-3"
                            disabled={isSubmitting}
                        >
                            <i className={`fas ${isSubmitting ? 'fa-spinner fa-spin' : 'fa-user-plus'} mr-2`}></i>
                            {isSubmitting ? 'Yuborilmoqda...' : 'Ro\'yxatdan o\'tish'}
                        </button>

                        <p className="text-center text-gray-400 text-sm">
                            Hisobingiz bormi?{' '}
                            <Link to="/login" className="text-primary hover:text-blue-400 transition-colors">
                                Kirish
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
