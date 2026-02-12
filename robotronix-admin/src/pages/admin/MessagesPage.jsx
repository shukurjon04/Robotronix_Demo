import { useState, useEffect } from 'react'
import api from '../../services/api'
import AdminTable from '../../components/common/AdminTable'

const MessagesPage = () => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        setLoading(true)
        try {
            const response = await api.get('/admin/messages')
            setMessages(response.data)
        } catch (error) {
            console.error('Error fetching messages:', error)
        } finally {
            setLoading(false)
        }
    }

    const markAsRead = async (id) => {
        try {
            await api.put(`/admin/messages/${id}/read`)
            fetchMessages()
        } catch (error) {
            alert('Xatolik yuz berdi')
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Haqiqatan ham bu xabarni o\'chirmoqchimisiz?')) return
        try {
            await api.delete(`/admin/messages/${id}`)
            fetchMessages()
        } catch (error) {
            alert('O\'chirishda xatolik yuz berdi')
        }
    }

    if (loading) return <div>Yuklanmoqda...</div>

    return (
        <div>
            <AdminTable headers={['ID', 'Ism', 'Telefon', 'Kurs', 'Xabar', 'Holat', 'Sana', 'Amallar']}>
                {messages.map(m => (
                    <tr key={m.id} style={{ borderBottom: '1px solid var(--border-color)', opacity: m.read ? 0.6 : 1 }}>
                        <td style={{ padding: '15px' }}>{m.id}</td>
                        <td style={{ padding: '15px' }}>{m.name}</td>
                        <td style={{ padding: '15px' }}>{m.phone}</td>
                        <td style={{ padding: '15px' }}>{m.course || '-'}</td>
                        <td style={{ padding: '15px' }}>
                            <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={m.message}>
                                {m.message}
                            </div>
                        </td>
                        <td style={{ padding: '15px' }}>
                            {m.read ?
                                <span style={{ color: '#10b981', fontSize: '12px' }}><i className="fas fa-check-double"></i> O'qildi</span> :
                                <span style={{ color: '#ffcc00', fontSize: '12px' }}><i className="fas fa-envelope"></i> Yangi</span>
                            }
                        </td>
                        <td style={{ padding: '15px' }}>{new Date(m.createdAt).toLocaleDateString()}</td>
                        <td style={{ padding: '15px' }}>
                            {!m.read && (
                                <button onClick={() => markAsRead(m.id)} style={{ marginRight: '10px', color: '#10b981', background: 'none', border: 'none', cursor: 'pointer' }} title="O'qildi deb belgilash">
                                    <i className="fas fa-check"></i>
                                </button>
                            )}
                            <button onClick={() => handleDelete(m.id)} style={{ color: '#ff4d4d', background: 'none', border: 'none', cursor: 'pointer' }} title="O'chirish">
                                <i className="fas fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </AdminTable>
        </div>
    )
}

export default MessagesPage
