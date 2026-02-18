import { useState, useEffect } from 'react'
import api from '../../services/api'

const BannersPage = () => {
    const [banners, setBanners] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        title: '', description: '', imageUrl: '', linkUrl: '', position: 'hero', isActive: true
    })
    const [editingId, setEditingId] = useState(null)

    useEffect(() => { fetchBanners() }, [])

    const fetchBanners = async () => {
        try {
            const response = await api.get('/banners')
            setBanners(response.data)
        } catch (error) {
            console.error('Error fetching banners:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editingId) {
                await api.put(`/admin/banners/${editingId}`, formData)
            } else {
                await api.post('/admin/banners', formData)
            }
            setShowModal(false)
            resetForm()
            fetchBanners()
        } catch (error) {
            console.error('Error saving banner:', error)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Haqiqatan ham o\'chirmoqchimisiz?')) return
        try {
            await api.delete(`/admin/banners/${id}`)
            fetchBanners()
        } catch (error) {
            console.error('Error deleting banner:', error)
        }
    }

    const handleEdit = (banner) => {
        setFormData(banner)
        setEditingId(banner.id)
        setShowModal(true)
    }

    const resetForm = () => {
        setFormData({ title: '', description: '', imageUrl: '', linkUrl: '', position: 'hero', isActive: true })
        setEditingId(null)
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Bannerlar</h2>
                <button onClick={() => { resetForm(); setShowModal(true) }} className="btn-primary">
                    <i className="fas fa-plus"></i> Yangi Banner
                </button>
            </div>

            <div className="card !p-0 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-gray-800 bg-dark">
                                    <th className="text-left px-4 py-3 text-gray-400 font-medium text-xs uppercase tracking-wider">Rasm</th>
                                    <th className="text-left px-4 py-3 text-gray-400 font-medium text-xs uppercase tracking-wider">Sarlavha</th>
                                    <th className="text-left px-4 py-3 text-gray-400 font-medium text-xs uppercase tracking-wider">Pozitsiya</th>
                                    <th className="text-left px-4 py-3 text-gray-400 font-medium text-xs uppercase tracking-wider">Holati</th>
                                    <th className="text-left px-4 py-3 text-gray-400 font-medium text-xs uppercase tracking-wider">Amallar</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/50">
                                {banners.map(banner => (
                                    <tr key={banner.id} className="hover:bg-gray-800/30 transition-colors">
                                        <td className="px-4 py-3">
                                            <img src={banner.imageUrl} alt={banner.title} className="w-24 h-12 object-cover rounded-lg bg-gray-800" />
                                        </td>
                                        <td className="px-4 py-3 text-white font-medium">{banner.title}</td>
                                        <td className="px-4 py-3">
                                            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">{banner.position}</span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${banner.isActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                                                {banner.isActive ? 'Aktiv' : 'Nofaol'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handleEdit(banner)} className="p-2 rounded-lg text-secondary hover:bg-secondary/10 transition-colors">
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button onClick={() => handleDelete(banner.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="card w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-bold text-white mb-5">
                            {editingId ? 'Bannerni Tahrirlash' : 'Yangi Banner'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="label-field">Sarlavha</label>
                                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="input-field" />
                            </div>
                            <div>
                                <label className="label-field">Rasm URL</label>
                                <input type="text" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} required className="input-field" />
                            </div>
                            <div>
                                <label className="label-field">Link URL</label>
                                <input type="text" value={formData.linkUrl} onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })} className="input-field" />
                            </div>
                            <div>
                                <label className="label-field">Pozitsiya</label>
                                <select value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="input-field">
                                    <option value="hero">Hero (Bosh sahifa)</option>
                                    <option value="sidebar">Sidebar</option>
                                    <option value="footer">Footer</option>
                                </select>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    id="isActive"
                                    className="w-4 h-4 rounded border-gray-700 bg-dark text-primary focus:ring-primary"
                                />
                                <label htmlFor="isActive" className="text-white text-sm">Aktiv</label>
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

export default BannersPage
