import { useState, useEffect } from 'react'
import api from '../../services/api'
import AdminTable from '../../components/common/AdminTable'

const ProductsPage = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [editingProduct, setEditingProduct] = useState(null)
    const [uploading, setUploading] = useState(false)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        oldPrice: '',
        imageUrl: '',
        badge: '',
        features: []
    })

    const [featureInput, setFeatureInput] = useState('')

    useEffect(() => {
        fetchProducts()
    }, [])

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
            title: product.title,
            description: product.description || '',
            price: product.price,
            oldPrice: product.oldPrice || '',
            imageUrl: product.imageUrl || '',
            badge: product.badge || '',
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

    if (loading) return <div>Yuklanmoqda...</div>

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: 'var(--text-primary)' }}>Mahsulotlar</h2>
                <button
                    onClick={() => {
                        setEditingProduct(null)
                        setFormData({ title: '', description: '', price: '', oldPrice: '', imageUrl: '', badge: '', features: [] })
                        setShowModal(true)
                    }}
                    style={{ background: 'var(--gradient-primary)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                >
                    <i className="fas fa-plus"></i> Yangi mahsulot
                </button>
            </div>

            <AdminTable headers={['ID', 'Rasm', 'Nomi', 'Narxi', 'Badge', 'Amallar']}>
                {products.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '15px' }}>{p.id}</td>
                        <td style={{ padding: '15px' }}>
                            <img src={p.imageUrl} alt="" style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
                        </td>
                        <td style={{ padding: '15px' }}>{p.title}</td>
                        <td style={{ padding: '15px' }}>{p.price.toLocaleString()} sum</td>
                        <td style={{ padding: '15px' }}>{p.badge || '-'}</td>
                        <td style={{ padding: '15px' }}>
                            <button onClick={() => handleEdit(p)} style={{ marginRight: '10px', color: '#00ccff', background: 'none', border: 'none', cursor: 'pointer' }}>
                                <i className="fas fa-edit"></i>
                            </button>
                            <button onClick={() => handleDelete(p.id)} style={{ color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer' }}>
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
                    <div style={{ background: 'var(--card-bg)', padding: '30px', borderRadius: '15px', width: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <h3 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>
                            {editingProduct ? 'Mahsulotni tahrirlash' : 'Yangi mahsulot'}
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px' }}>Nomi</label>
                                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--dark-bg)', border: '1px solid var(--border-color)', color: 'white' }} />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px' }}>Tavsif</label>
                                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--dark-bg)', border: '1px solid var(--border-color)', color: 'white', minHeight: '80px' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                                <div>
                                    <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px' }}>Narxi</label>
                                    <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--dark-bg)', border: '1px solid var(--border-color)', color: 'white' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px' }}>Eski narxi</label>
                                    <input type="number" value={formData.oldPrice} onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--dark-bg)', border: '1px solid var(--border-color)', color: 'white' }} />
                                </div>
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px' }}>Badge (e.g. "NEW", "HOT")</label>
                                <input type="text" value={formData.badge} onChange={(e) => setFormData({ ...formData, badge: e.target.value })} style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'var(--dark-bg)', border: '1px solid var(--border-color)', color: 'white' }} />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px' }}>Xususiyatlar</label>
                                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                                    <input type="text" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} style={{ flex: 1, padding: '10px', borderRadius: '8px', background: 'var(--dark-bg)', border: '1px solid var(--border-color)', color: 'white' }} />
                                    <button type="button" onClick={addFeature} style={{ padding: '10px', borderRadius: '8px', background: 'var(--primary-color)', border: 'none', color: 'white' }}>Qo'shish</button>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                    {formData.features.map((f, i) => (
                                        <span key={i} style={{ background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '15px', fontSize: '12px', color: 'white', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            {f} <i className="fas fa-times" onClick={() => removeFeature(i)} style={{ cursor: 'pointer', fontSize: '10px' }}></i>
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '5px' }}>Rasm</label>
                                <input type="file" onChange={handleImageUpload} style={{ marginBottom: '10px' }} />
                                {uploading && <p style={{ fontSize: '12px', color: 'var(--primary-color)' }}>Yuklanmoqda...</p>}
                                {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                <button type="button" onClick={() => setShowModal(false)} style={{ background: 'transparent', color: 'white', border: '1px solid var(--border-color)', padding: '10px 20px', borderRadius: '8px' }}>Bekor qilish</button>
                                <button type="submit" style={{ background: 'var(--gradient-primary)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '600' }}>Saqlash</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductsPage
