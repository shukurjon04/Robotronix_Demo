import { useState, useEffect } from 'react'
import api from '../../services/api'

const SeoMetaPage = () => {
    const [seoItems, setSeoItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        pagePath: '', title: '', description: '', keywords: '', ogImage: ''
    })
    const [editingId, setEditingId] = useState(null)

    useEffect(() => { fetchSeoItems() }, [])

    const fetchSeoItems = async () => {
        try {
            const response = await api.get('/admin/seo')
            setSeoItems(response.data)
        } catch (error) {
            console.error('Error fetching SEO items:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editingId) {
                await api.put(`/admin/seo/${editingId}`, formData)
            } else {
                await api.post('/admin/seo', formData)
            }
            setShowModal(false)
            resetForm()
            fetchSeoItems()
        } catch (error) {
            console.error('Error saving SEO item:', error)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Haqiqatan ham o\'chirmoqchimisiz?')) return
        try {
            await api.delete(`/admin/seo/${id}`)
            fetchSeoItems()
        } catch (error) {
            console.error('Error deleting SEO item:', error)
        }
    }

    const handleEdit = (item) => {
        setFormData(item)
        setEditingId(item.id)
        setShowModal(true)
    }

    const resetForm = () => {
        setFormData({ pagePath: '', title: '', description: '', keywords: '', ogImage: '' })
        setEditingId(null)
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">SEO Sozlamalari</h2>
                <button onClick={() => { resetForm(); setShowModal(true) }} className="btn-primary">
                    <i className="fas fa-plus"></i> Yangi Sahifa
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
                                    <th className="text-left px-4 py-3 text-gray-400 font-medium text-xs uppercase tracking-wider">Sahifa</th>
                                    <th className="text-left px-4 py-3 text-gray-400 font-medium text-xs uppercase tracking-wider">Sarlavha (Title)</th>
                                    <th className="text-left px-4 py-3 text-gray-400 font-medium text-xs uppercase tracking-wider">Tavsif (Description)</th>
                                    <th className="text-left px-4 py-3 text-gray-400 font-medium text-xs uppercase tracking-wider">Amallar</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800/50">
                                {seoItems.map(item => (
                                    <tr key={item.id} className="hover:bg-gray-800/30 transition-colors">
                                        <td className="px-4 py-3 text-white font-semibold">{item.pagePath}</td>
                                        <td className="px-4 py-3 text-gray-300">{item.title}</td>
                                        <td className="px-4 py-3 text-gray-400 max-w-[300px] truncate">{item.description}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handleEdit(item)} className="p-2 rounded-lg text-secondary hover:bg-secondary/10 transition-colors">
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
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
                    <div className="card w-full max-w-xl max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-bold text-white mb-5">
                            {editingId ? 'SEO Tahrirlash' : 'Yangi SEO Sozlamasi'}
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="label-field">Sahifa manzili (masalan: /courses)</label>
                                <input type="text" value={formData.pagePath} onChange={(e) => setFormData({ ...formData, pagePath: e.target.value })} required className="input-field" />
                            </div>
                            <div>
                                <label className="label-field">Sarlavha (Title Tag)</label>
                                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="input-field" />
                            </div>
                            <div>
                                <label className="label-field">Tavsif (Meta Description)</label>
                                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required className="input-field min-h-[100px] resize-y" />
                            </div>
                            <div>
                                <label className="label-field">Kalit so'zlar (Keywords)</label>
                                <input type="text" value={formData.keywords} onChange={(e) => setFormData({ ...formData, keywords: e.target.value })} className="input-field" placeholder="vergul bilan ajratilgan" />
                            </div>
                            <div>
                                <label className="label-field">OG Image URL (Ijtimoiy tarmoqlar uchun)</label>
                                <input type="text" value={formData.ogImage} onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })} className="input-field" />
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

export default SeoMetaPage
