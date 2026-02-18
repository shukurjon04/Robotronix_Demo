import { useState, useEffect } from 'react'
import api from '../../services/api'
import AdminTable from '../../components/common/AdminTable'

const ProductsPage = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [uploading, setUploading] = useState(false)
    const [featureInput, setFeatureInput] = useState('')

    const [formData, setFormData] = useState({
        title: '', description: '', price: '', oldPrice: '', imageUrl: '', badge: '', features: []
    })

    useEffect(() => { fetchProducts() }, [])

    const fetchProducts = async () => {
        setLoading(true)
        try {
            const response = await api.get('/products')
            setProducts(response.data)
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (product) => {
        setEditingProduct(product)
        setFormData({
            title: product.title, description: product.description || '',
            price: product.price, oldPrice: product.oldPrice || '',
            imageUrl: product.imageUrl || '', badge: product.badge || '',
            features: product.features || []
        })
        setShowModal(true)
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Haqiqatan ham bu mahsulotni o\'chirmoqchimisiz?')) return
        try {
            await api.delete(`/admin/products/${id}`)
            fetchProducts()
        } catch (error) {
            alert('Mahsulotni o\'chirishda xatolik')
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

    const addFeature = () => {
        if (!featureInput.trim()) return
        setFormData(prev => ({ ...prev, features: [...prev.features, featureInput.trim()] }))
        setFeatureInput('')
    }

    const removeFeature = (index) => {
        setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (editingProduct) {
                await api.put(`/admin/products/${editingProduct.id}`, formData)
            } else {
                await api.post('/admin/products', formData)
            }
            setShowModal(false)
            fetchProducts()
        } catch (error) {
            alert('Saqlashda xatolik')
        }
    }

    const resetForm = () => {
        setFormData({ title: '', description: '', price: '', oldPrice: '', imageUrl: '', badge: '', features: [] })
        setEditingProduct(null)
        setFeatureInput('')
    }

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    )

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Mahsulotlar</h2>
                <button onClick={() => { resetForm(); setShowModal(true) }} className="btn-primary">
                    <i className="fas fa-plus"></i> Yangi mahsulot
                </button>
            </div>

            <AdminTable headers={['ID', 'Rasm', 'Nomi', 'Narxi', 'Badge', 'Amallar']}>
                {products.map(p => (
                    <tr key={p.id} className="hover:bg-gray-800/30 transition-colors">
                        <td className="px-4 py-3 text-gray-400">{p.id}</td>
                        <td className="px-4 py-3">
                            <img src={p.imageUrl} alt="" className="w-10 h-10 object-cover rounded-lg bg-gray-800" />
                        </td>
                        <td className="px-4 py-3 text-white font-medium">{p.title}</td>
                        <td className="px-4 py-3 text-gray-300">{(p.price || 0).toLocaleString()} sum</td>
                        <td className="px-4 py-3">
                            {p.badge ? (
                                <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400">{p.badge}</span>
                            ) : <span className="text-gray-600">—</span>}
                        </td>
                        <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                                <button onClick={() => handleEdit(p)} className="p-2 rounded-lg text-secondary hover:bg-secondary/10 transition-colors">
                                    <i className="fas fa-edit"></i>
                                </button>
                                <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors">
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
                            {editingProduct ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot'}
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
                                    <label className="label-field">Narxi</label>
                                    <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required className="input-field" />
                                </div>
                                <div>
                                    <label className="label-field">Eski narxi</label>
                                    <input type="number" value={formData.oldPrice} onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })} className="input-field" />
                                </div>
                            </div>
                            <div>
                                <label className="label-field">Badge (e.g. "NEW", "HOT")</label>
                                <input type="text" value={formData.badge} onChange={(e) => setFormData({ ...formData, badge: e.target.value })} className="input-field" />
                            </div>
                            <div>
                                <label className="label-field">Xususiyatlar</label>
                                <div className="flex gap-2 mb-2">
                                    <input type="text" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} className="input-field" placeholder="Xususiyat qo'shing..." />
                                    <button type="button" onClick={addFeature} className="btn-primary !px-4 shrink-0">
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.features.map((f, i) => (
                                        <span key={i} className="inline-flex items-center gap-1.5 bg-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded-full">
                                            {f}
                                            <i className="fas fa-times text-gray-500 hover:text-red-400 cursor-pointer" onClick={() => removeFeature(i)}></i>
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <label className="label-field">Rasm</label>
                                <input type="file" onChange={handleImageUpload} className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:cursor-pointer" />
                                {uploading && <p className="text-xs text-primary mt-1">Yuklanmoqda...</p>}
                                {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="w-16 h-16 object-cover rounded-lg mt-2" />}
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

export default ProductsPage
