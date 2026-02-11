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
        <section className="contact" style={{ minHeight: '100vh', paddingTop: '120px' }}>
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <h2 className="section-title">Ro'yxatdan o'tish</h2>
                    <p className="section-subtitle">
                        Yangi hisob yarating
                    </p>
                </div>

                <div style={{ maxWidth: '500px', margin: '0 auto' }}>
                    <div className="contact-form" data-aos="fade-up">
                        <form onSubmit={handleSubmit}>
                            {error && (
                                <div style={{
                                    background: 'rgba(255, 107, 53, 0.1)',
                                    border: '1px solid var(--accent-color)',
                                    borderRadius: '10px',
                                    padding: '15px',
                                    marginBottom: '25px',
                                    color: 'var(--accent-color)'
                                }}>
                                    {error}
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="fullName" className="form-label">
                                    Ism va familiya *
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    className="form-input"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email" className="form-label">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-input"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone" className="form-label">
                                    Telefon raqam
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="form-input"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password" className="form-label">
                                    Parol *
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-input"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="confirmPassword" className="form-label">
                                    Parolni tasdiqlash *
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="form-input"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    minLength={6}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn-primary btn-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Yuborilmoqda...' : 'Ro\'yxatdan o\'tish'}
                            </button>

                            <p style={{
                                textAlign: 'center',
                                marginTop: '20px',
                                color: 'var(--text-secondary)'
                            }}>
                                Hisobingiz bormi?{' '}
                                <Link
                                    to="/login"
                                    style={{ color: 'var(--primary-color)', textDecoration: 'none' }}
                                >
                                    Kirish
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default RegisterPage
