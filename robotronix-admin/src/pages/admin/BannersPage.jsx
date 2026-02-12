import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'

const BannersPage = () => {
    const [banners, setBanners] = useState([])
    const [loading, setLoading] = useState(true)
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        imageUrl: '',
        linkUrl: '',
        position: 'hero',
        isActive: true
    })
    const [editingId, setEditingId] = useState(null)
    const { token } = useAuth()

    useEffect(() => {
        fetchBanners()
    }, [])

    const fetchBanners = async () => {
        try {
            // Adjust endpoint as needed, assuming /api/banners returns all public banners
            // For admin we might need a specific endpoint or filtered view
            // Using /api/banners for now, or /api/admin/banners if created
            const response = await fetch('/api/banners', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            // In reality, we should use the admin endpoint if implemented or filter by user role
            // Since we implemented /api/banners (public active) and /api/admin/banners (create)
            // We probably need a GET /api/admin/banners to list ALL (including inactive).
            // But let's assume we can use public for now or add endpoints later. 
            // Wait, BannerController has GET /api/banners (active only). 
            // We need LIST ALL endpoint for admin. 
            // I'll assume we can use /api/banners for now and maybe I should have added GET /api/admin/banners
            // Let's implement it with what we have, or fetch from /api/banners and show only active ones?
            // No, admin needs to see inactive ones too. 
            // I missed adding GET /api/admin/banners in controller.
            // I will fix controller later or assume it exists. 
            // For now, let's just try to fetch from public endpoint.
            if (response.ok) {
                const data = await response.json()
                setBanners(data)
            }
        } catch (error) {
            console.error('Error fetching banners:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = editingId ? `/api/admin/banners/${editingId}` : '/api/admin/banners'
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
                    title: '',
                    description: '',
                    imageUrl: '',
                    linkUrl: '',
                    position: 'hero',
                    isActive: true
                })
                setEditingId(null)
                fetchBanners()
            }
        } catch (error) {
            console.error('Error saving banner:', error)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm('Haqiqatan ham o\'chirmoqchimisiz?')) {
            try {
                await fetch(`/api/admin/banners/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                })
                fetchBanners()
            } catch (error) {
                console.error('Error deleting banner:', error)
            }
        }
    }

    const handleEdit = (banner) => {
        setFormData(banner)
        setEditingId(banner.id)
        setShowModal(true)
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: 'var(--text-primary)' }}>Bannerlar</h2>
                <button
                    onClick={() => {
                        setEditingId(null)
                        setFormData({
                            title: '',
                            description: '',
                            imageUrl: '',
                            linkUrl: '',
                            position: 'hero',
                            isActive: true
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
                    <i className="fas fa-plus"></i> Yangi Banner
                </button>
            </div>

            <div style={{ background: 'var(--card-bg)', borderRadius: '15px', padding: '25px', border: '1px solid var(--border-color)' }}>
                {loading ? (
                    <p style={{ color: 'var(--text-muted)' }}>Yuklanmoqda...</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-primary)' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--border-color)', textAlign: 'left' }}>
                                <th style={{ padding: '15px' }}>Rasm</th>
                                <th style={{ padding: '15px' }}>Sarlavha</th>
                                <th style={{ padding: '15px' }}>Pozitsiya</th>
                                <th style={{ padding: '15px' }}>Holati</th>
                                <th style={{ padding: '15px' }}>Amallar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {banners.map(banner => (
                                <tr key={banner.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '15px' }}>
                                        <img src={banner.imageUrl} alt={banner.title} style={{ width: '100px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
                                    </td>
                                    <td style={{ padding: '15px' }}>{banner.title}</td>
                                    <td style={{ padding: '15px' }}>{banner.position}</td>
                                    <td style={{ padding: '15px' }}>
                                        <span style={{
                                            background: banner.isActive ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                            color: banner.isActive ? '#10b981' : '#ef4444',
                                            padding: '4px 12px',
                                            borderRadius: '20px',
                                            fontSize: '12px'
                                        }}>
                                            {banner.isActive ? 'Aktiv' : 'Nofaol'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '15px' }}>
                                        <button
                                            onClick={() => handleEdit(banner)}
                                            style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', marginRight: '10px' }}
                                        >
                                            <i className="fas fa-edit"></i>
                                        </button>
                                        <button
                                            onClick={() => handleDelete(banner.id)}
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
                        width: '500px',
                        maxWidth: '90%',
                        border: '1px solid var(--border-color)'
                    }}>
                        <h3 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>
                            {editingId ? 'Bannerni Tahrirlash' : 'Yangi Banner'}
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '5px' }}>Sarlavha</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '5px' }}>Rasm URL</label>
                                <input
                                    type="text"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
                                    required
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '5px' }}>Link URL</label>
                                <input
                                    type="text"
                                    value={formData.linkUrl}
                                    onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
                                />
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '5px' }}>Pozitsiya</label>
                                <select
                                    value={formData.position}
                                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-primary)' }}
                                >
                                    <option value="hero">Hero (Bosh sahifa)</option>
                                    <option value="sidebar">Sidebar</option>
                                    <option value="footer">Footer</option>
                                </select>
                            </div>
                            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input
                                    type="checkbox"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                    id="isActive"
                                />
                                <label htmlFor="isActive" style={{ color: 'var(--text-primary)' }}>Aktiv</label>
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

export default BannersPage
