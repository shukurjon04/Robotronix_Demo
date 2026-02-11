import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

const SeoMetaPage = () => {
    const [seoItems, setSeoItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        pagePath: '',
        title: '',
        description: '',
        keywords: '',
        ogImage: ''
    })
    const [editingId, setEditingId] = useState(null)
    const { token } = useAuth()

    useEffect(() => {
        fetchSeoItems()
    }, [])

    const fetchSeoItems = async () => {
        try {
            const response = await fetch('/api/admin/seo', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            if (response.ok) {
                const data = await response.json()
                setSeoItems(data)
            }
        } catch (error) {
            console.error('Error fetching SEO items:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = editingId ? `/api/admin/seo/${editingId}` : '/api/admin/seo'
            const method = editingId ? 'PUT' : 'POST'

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setShowModal(false)
                setFormData({
                    pagePath: '',
                    title: '',
                    description: '',
                    keywords: '',
                    ogImage: ''
                })
                setEditingId(null)
                fetchSeoItems()
            }
        } catch (error) {
            console.error('Error saving SEO item:', error)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Haqiqatan ham o\'chirmoqchimisiz?')) {
            try {
                await fetch(`/api/admin/seo/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                fetchSeoItems()
            } catch (error) {
                console.error('Error deleting SEO item:', error)
            }
        }
    }

    const handleEdit = (item) => {
        setFormData(item)
        setEditingId(item.id)
        setShowModal(true)
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: 'var(--text-primary)' }}>SEO Sozlamalari</h2>
                <button
                    onClick={() => {
                        setEditingId(null)
                        setFormData({
                            pagePath: '',
                            title: '',
                            description: '',
                            keywords: '',
                            ogImage: ''
                        })
                        setShowModal(true)
                    }}
                    style={{
                        background: 'var(--primary-color)',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        cursor: 'pointer'
                    }}
                >
                    <i className="fas fa-plus"></i> Yangi Sahifa
                </button>
            </div>

            <div style={{ background: 'var(--card-bg)', borderRadius: '15px', padding: '25px', border: '1px solid var(--border-color)' }}>
                {loading ? (
                    <p style={{ color: 'var(--text-muted)' }}>Yuklanmoqda...</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-primary)' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                                <th style={{ padding: '15px' }}>Sahifa</th>
                                <th style={{ padding: '15px' }}>Sarlavha (Title)</th>
                                <th style={{ padding: '15px' }}>Tavsif (Description)</th>
                                <th style={{ padding: '15px' }}>Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {seoItems.map(item => (
                                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '15px', fontWeight: 'bold' }}>{item.pagePath}</td>
                                    <td style={{ padding: '15px' }}>{item.title}</td>
                                    <td style={{ padding: '15px', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                        {item.description}
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <button
                                            onClick={() => handleEdit(item)}
                                            style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', marginRight: '10px' }}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {showModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'var(--card-bg)',
                        padding: '30px',
                        borderRadius: '15px',
                        width: '600px',
                        maxWidth: '90%',
                        border: '1px solid var(--border-color)',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}>
                        <h3 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>
                            {editingId ? 'SEO Tahrirlash' : 'Yangi SEO Sozlamasi'}
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '5px' }}>Sahifa manzili (masalan: /courses)</label>
                                <input
                                    type="text"
                                    value={formData.pagePath}
                                    onChange={(e) => setFormData({ ...formData, pagePath: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '5px' }}>Sarlavha (Title Tag)</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '5px' }}>Tavsif (Meta Description)</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)', minHeight: '100px' }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '5px' }}>Kalit so'zlar (Keywords)</label>
                                <input
                                    type="text"
                                    value={formData.keywords}
                                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
                                    placeholder="vergul bilan ajratilgan"
                                />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '5px' }}>OG Image URL (Ijtimoiy tarmoqlar uchun)</label>
                                <input
                                    type="text"
                                    value={formData.ogImage}
                                    onChange={(e) => setFormData({ ...formData, ogImage: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer' }}
                                >
                                    Bekor qilish
                                </button>
                                <button
                                    type="submit"
                                    style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'var(--primary-color)', color: 'white', cursor: 'pointer' }}
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

export default SeoMetaPage
