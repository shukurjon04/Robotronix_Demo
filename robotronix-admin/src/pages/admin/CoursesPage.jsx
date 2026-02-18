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
        title: '', description: '', ageGroup: '', duration: '', price: '', imageUrl: '', category: 'kids'
    })

    useEffect(() => { fetchCourses() }, [])

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
        const data = new FormData()
        data.append('file', file)
        setUploading(true)
        try {
            const response = await api.post('/admin/files/upload', data, {
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
            resetForm()
        } catch (error) {
            alert('Saqlashda xatolik yuz berdi')
        }
    }

    const resetForm = () => {
        setFormData({ title: '', description: '', ageGroup: '', duration: '', price: '', imageUrl: '', category: 'kids' })
        setEditingCourse(null)
    }

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    )

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Kurslar</h2>
                <button
                    onClick={() => { resetForm(); setShowModal(true) }}
                    className="btn-primary"
                >
                    <i className="fas fa-plus"></i> Yangi kurs
                </button>
            </div>

            <AdminTable headers={['ID', 'Rasm', 'Nomi', 'Narxi', 'Kategoriya', 'Amallar']}>
                {courses.map(c => (
                    <tr key={c.id} className="hover:bg-gray-800/30 transition-colors">
                        <td className="px-4 py-3 text-gray-400">{c.id}</td>
                        <td className="px-4 py-3">
                            <img src={c.imageUrl} alt="" className="w-10 h-10 object-cover rounded-lg bg-gray-800" />
                        </td>
                        <td className="px-4 py-3 text-white font-medium">{c.title}</td>
                        <td className="px-4 py-3 text-gray-300">{(c.price || 0).toLocaleString()} sum</td>
                        <td className="px-4 py-3">
                            <span className={`text-xs px-2 py-1 rounded-full ${c.category === 'kids' ? 'bg-blue-500/10 text-blue-400' : 'bg-purple-500/10 text-purple-400'}`}>
                                {c.category === 'kids' ? 'Bolalar' : "O'qituvchilar"}
                            </span>
                        </td>
                        <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                                <button onClick={() => handleEdit(c)} className="p-2 rounded-lg text-secondary hover:bg-secondary/10 transition-colors">
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button onClick={() => handleDelete(c.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </AdminTable>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="card w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-bold text-white mb-5">
                            {editingCourse ? 'Kursni tahrirlash' : 'Yangi kurs qo\'shish'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="label-field">Nomi</label>
                                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="input-field" />
                            </div>
                            <div>
                                <label className="label-field">Tavsif</label>
                                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input-field min-h-[80px] resize-y" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="label-field">Yosh toifasi</label>
                                    <input type="text" value={formData.ageGroup} onChange={(e) => setFormData({ ...formData, ageGroup: e.target.value })} className="input-field" />
                                </div>
                                <div>
                                    <label className="label-field">Davomiyligi</label>
                                    <input type="text" value={formData.duration} onChange={(e) => setFormData({ ...formData, duration: e.target.value })} className="input-field" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="label-field">Narxi</label>
                                    <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required className="input-field" />
                                </div>
                                <div>
                                    <label className="label-field">Kategoriya</label>
                                    <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="input-field">
                                        <option value="kids">Bolalar uchun</option>
                                        <option value="teachers">O'qituvchilar uchun</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label className="label-field">Rasm</label>
                                <input type="file" onChange={handleImageUpload} className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:cursor-pointer" />
                                {uploading && <p className="text-xs text-primary mt-1">Yuklanmoqda...</p>}
                                {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="w-20 h-20 object-cover rounded-lg mt-2" />}
                            </div>
                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowModal(false)} className="btn-outline">Bekor qilish</button>
                                <button type="submit" className="btn-primary">Saqlash</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CoursesPage
