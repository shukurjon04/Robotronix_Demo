import { useState, useEffect } from 'react'
import api from '../../services/api'
import AdminTable from '../../components/common/AdminTable'

const MessagesPage = () => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => { fetchMessages() }, [])

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

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    )

    return (
        <div>
            <AdminTable headers={['ID', 'Ism', 'Telefon', 'Kurs', 'Xabar', 'Holat', 'Sana', 'Amallar']}>
                {messages.map(m => (
                    <tr key={m.id} className={`hover:bg-gray-800/30 transition-colors ${m.read ? 'opacity-60' : ''}`}>
                        <td className="px-4 py-3 text-gray-400">{m.id}</td>
                        <td className="px-4 py-3 text-white font-medium">{m.name}</td>
                        <td className="px-4 py-3 text-gray-300">{m.phone}</td>
                        <td className="px-4 py-3 text-gray-300">{m.course || '—'}</td>
                        <td className="px-4 py-3">
                            <div className="max-w-[200px] truncate text-gray-300 text-sm" title={m.message}>
                                {m.message}
                            </div>
                        </td>
                        <td className="px-4 py-3">
                            {m.read ? (
                                <span className="text-emerald-400 text-xs flex items-center gap-1">
                                    <i className="fas fa-check-double"></i> O'qildi
                                </span>
                            ) : (
                                <span className="text-yellow-400 text-xs flex items-center gap-1">
                                    <i className="fas fa-envelope"></i> Yangi
                                </span>
                            )}
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-sm">{new Date(m.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                                {!m.read && (
                                    <button onClick={() => markAsRead(m.id)} className="p-2 rounded-lg text-emerald-400 hover:bg-emerald-500/10 transition-colors" title="O'qildi deb belgilash">
                                        <i className="fas fa-check"></i>
                                    </button>
                                )}
                                <button onClick={() => handleDelete(m.id)} className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors" title="O'chirish">
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </AdminTable>
        </div>
    )
}

export default MessagesPage
