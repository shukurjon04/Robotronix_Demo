import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const { login } = useAuth()
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

        const result = await login(formData.email, formData.password)

        if (result.success) {
            navigate('/')
        } else {
            setError(result.error || 'Login failed. Please try again.')
        }

        setIsSubmitting(false)
    }

    return (
        <section className="contact" style={{ minHeight: '100vh', paddingTop: '120px' }}>
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <h2 className="section-title">Kirish</h2>
                    <p className="section-subtitle">
                        Hisobingizga kiring
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
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn-primary btn-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Kirish...' : 'Kirish'}
                            </button>

                            <p style={{
                                textAlign: 'center',
                                marginTop: '20px',
                                color: 'var(--text-secondary)'
                            }}>
                                Hisobingiz yo'qmi?{' '}
                                <Link
                                    to="/register"
                                    style={{ color: 'var(--primary-color)', textDecoration: 'none' }}
                                >
                                    Ro'yxatdan o'tish
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LoginPage
