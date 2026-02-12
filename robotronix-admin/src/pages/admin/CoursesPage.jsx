import { useState, useEffect } from 'react'
import api from '../../services/api'
import AdminTable from '../../components/common/AdminTable'

const CoursesPage = () => {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingCourse, setEditingCourse] = useState(null)
    const [uploading, setUploading] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        ageGroup: '',
        duration: '',
        price: '',
        imageUrl: '',
        category: 'kids'
    })

    useEffect(() => {
        fetchCourses()
    }, [])

    const fetchCourses = async () => {
        setLoading(true)
        try {
            const response = await api.get('/courses')
            setCourses(response.data)
        } catch (error) {
            console.error('Error fetching courses:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (course) => {
        setEditingCourse(course)
        setFormData({
            title: course.title,
            description: course.description || '',
            ageGroup: course.ageGroup || '',
            duration: course.duration || '',
            price: course.price,
            imageUrl: course.imageUrl || '',
            category: course.category
        })
        setShowModal(true)
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Haqiqatan ham bu kursni o\'chirmoqchimisiz?')) return
        try {
            await api.delete(`/admin/courses/${id}`)
            fetchCourses()
        } catch (error) {
            alert('O\'chirishda xatolik yuz berdi')
        }
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0]
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)
        setUploading(true)

        try {
            const response = await api.post('/admin/files/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            setFormData(prev => ({ ...prev, imageUrl: response.data.url }))
        } catch (error) {
            alert('Rasm yuklashda xatolik')
        } finally {
            setUploading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editingCourse) {
                await api.put(`/admin/courses/${editingCourse.id}`, formData)
            } else {
                await api.post('/admin/courses', formData)
            }
            setShowModal(false)
            fetchCourses()
            setFormData({
                title: '',
                description: '',
                ageGroup: '',
                duration: '',
                price: '',
                imageUrl: '',
                category: 'kids'
            })
            setEditingCourse(null)
        } catch (error) {
            alert('Saqlashda xatolik yuz berdi')
        }
    }

    if (loading) return <div>Yuklanmoqda...</div>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: 'var(--text-primary)' }}>Kurslar</h2>
                <button
                    onClick={() => {
                        setEditingCourse(null)
                        setFormData({ title: '', description: '', ageGroup: '', duration: '', price: '', imageUrl: '', category: 'kids' })
                        setShowModal(true)
                    }}
                    style={{
                        background: 'var(--gradient-primary)',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                >
                    <i className="fas fa-plus"></i> Yangi kurs
                </button>
            </div>

            <AdminTable headers={['ID', 'Rasm', 'Nomi', 'Narxi', 'Kategoriya', 'Amallar']}>
                {courses.map(c => (
                    <tr key={c.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '15px' }}>{c.id}</td>
                        <td style={{ padding: '15px' }}>
                            <img src={c.imageUrl} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
                        </td>
                        <td style={{ padding: '15px' }}>{c.title}</td>
                        <td style={{ padding: '15px' }}>{(c.price || 0).toLocaleString()} sum</td>
                        <td style={{ padding: '15px' }}>{c.category === 'kids' ? 'Bolalar' : 'O\'qituvchilar'}</td>
                        <td style={{ padding: '15px' }}>
                            <button onClick={() => handleEdit(c)} style={{ marginRight: '10px', color: '#00ccff', background: 'none', border: 'none', cursor: 'pointer' }}>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button onClick={() => handleDelete(c.id)} style={{ color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer' }}>
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </AdminTable>

            {showModal && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div style={{
                        background: 'var(--card-bg)', padding: '30px', borderRadius: '15px', width: '500px', maxHeight: '90vh', overflowY: 'auto'
                    }}>
                        <h3 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>
                            {editingCourse ? 'Kursni tahrirlash' : 'Yangi kurs qo\'shish'}
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px' }}>Nomi</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    required
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--dark-bg)', border: '1px solid var(--border-color)', color: 'white' }}
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px' }}>Tavsif</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--dark-bg)', border: '1px solid var(--border-color)', color: 'white', minHeight: '100px' }}
                                />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                                <div>
                                    <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px' }}>Yosh toifasi</label>
                                    <input
                                        type="text"
                                        value={formData.ageGroup}
                                        onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--dark-bg)', border: '1px solid var(--border-color)', color: 'white' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px' }}>Davomiyligi</label>
                                    <input
                                        type="text"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--dark-bg)', border: '1px solid var(--border-color)', color: 'white' }}
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                                <div>
                                    <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px' }}>Narxi</label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        required
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--dark-bg)', border: '1px solid var(--border-color)', color: 'white' }}
                                    />
                                </div>
                                <div>
                                    <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px' }}>Kategoriya</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--dark-bg)', border: '1px solid var(--border-color)', color: 'white' }}
                                    >
                                        <option value="kids">Bolalar uchun</option>
                                        <option value="teachers">O'qituvchilar uchun</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px' }}>Rasm</label>
                                <input type="file" onChange={handleImageUpload} style={{ marginBottom: '10px' }} />
                                {uploading && <p style={{ fontSize: '12px', color: 'var(--primary-color)' }}>Yuklanmoqda...</p>}
                                {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    style={{ background: 'transparent', color: 'white', border: '1px solid var(--border-color)', padding: '10px 20px', borderRadius: '8px' }}
                                >
                                    Bekor qilish
                                </button>
                                <button
                                    type="submit"
                                    style={{ background: 'var(--gradient-primary)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600' }}
                                >
                                    Saqlash
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CoursesPage
