import { useState } from 'react'
import api from '../../services/api'

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        course: '',
        message: '',
        agreement: false
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        try {
            await api.post('/contact', {
                name: formData.name,
                phone: formData.phone,
                course: formData.course,
                message: formData.message
            })
            setSubmitStatus('success')
            setFormData({
                name: '',
                phone: '',
                course: '',
                message: '',
                agreement: false
            })
        } catch (error) {
            setSubmitStatus('error')
            console.error('Contact form error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="py-20 bg-dark-card relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="gradient-text">Bog'lanish</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Savollaringiz bormi? Biz bilan bog'laning!
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="space-y-8" data-aos="fade-right">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i className="fas fa-map-marker-alt text-primary text-xl"></i>
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg mb-1">Manzil</h4>
                                <p className="text-gray-400">
                                    Farg'ona sh., Murabbiylar ko'chasi<br />
                                    Mo'ljal: Fizika-matematika fakulteti
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i className="fas fa-phone text-primary text-xl"></i>
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg mb-1">Telefon</h4>
                                <p className="text-gray-400">+998 33 803 33 53</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <i className="fas fa-envelope text-primary text-xl"></i>
                            </div>
                            <div>
                                <h4 className="text-white font-bold text-lg mb-1">Email</h4>
                                <p className="text-gray-400">info@robotronix.uz</p>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-800">
                            <h4 className="text-white font-bold mb-4">Ijtimoiy tarmoqlar:</h4>
                            <div className="flex gap-4">
                                <a
                                    href="https://t.me/robotronixuz"
                                    className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-500 hover:text-white transition-all duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fab fa-telegram"></i>
                                </a>
                                <a
                                    href="https://instagram.com/robotronixuz"
                                    className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fab fa-instagram"></i>
                                </a>
                                <a
                                    href="https://youtube.com/robotronixuz"
                                    className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fab fa-youtube"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-dark p-8 rounded-2xl border border-gray-800" data-aos="fade-left">
                        <form id="contactForm" onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
                                    Ism va familiya *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full bg-dark-card border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-400 mb-2">
                                    Telefon raqam *
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="w-full bg-dark-card border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="course" className="block text-sm font-medium text-gray-400 mb-2">
                                    Qiziqtiruvchi kurs
                                </label>
                                <select
                                    id="course"
                                    name="course"
                                    className="w-full bg-dark-card border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                                    value={formData.course}
                                    onChange={handleChange}
                                >
                                    <option value="">Kursni tanlang</option>
                                    <option value="mitti-muhandis">Mitti Muhandis (4-6 yosh)</option>
                                    <option value="kichik-muhandis">Kichik Muhandis (7-9 yosh)</option>
                                    <option value="yosh-muhandis">Yosh Muhandis (10-14 yosh)</option>
                                    <option value="dasturlash-ai">Dasturlash va AI (14+ yosh)</option>
                                    <option value="oquvchilar-kursi">O'qituvchilar kursi</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">
                                    Xabar
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="4"
                                    className="w-full bg-dark-card border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none"
                                    placeholder="Qo'shimcha savollaringiz..."
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    id="agreement"
                                    name="agreement"
                                    checked={formData.agreement}
                                    onChange={handleChange}
                                    required
                                    className="w-4 h-4 rounded border-gray-700 bg-dark-card text-primary focus:ring-primary"
                                />
                                <label htmlFor="agreement" className="text-sm text-gray-400 select-none cursor-pointer">
                                    Shaxsiy ma'lumotlarni qayta ishlashga roziman
                                </label>
                            </div>

                            {submitStatus === 'success' && (
                                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm flex items-center gap-2">
                                    <i className="fas fa-check-circle"></i>
                                    Xabar muvaffaqiyatli yuborildi! Tez orada bog'lanamiz.
                                </div>
                            )}
                            {submitStatus === 'error' && (
                                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-center gap-2">
                                    <i className="fas fa-exclamation-circle"></i>
                                    Xatolik yuz berdi. Qaytadan urinib ko'ring.
                                </div>
                            )}

                            <button
                                type="submit"
                                className="btn-primary w-full justify-center py-3"
                                disabled={isSubmitting}
                            >
                                <i className={`fas ${isSubmitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'} mr-2`}></i>
                                {isSubmitting ? 'Yuborilmoqda...' : 'Xabar yuborish'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
