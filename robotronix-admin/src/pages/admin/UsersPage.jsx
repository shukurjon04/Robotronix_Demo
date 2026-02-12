import { useState, useEffect } from 'react'
import api from '../../services/api'
import AdminTable from '../../components/common/AdminTable'
import { useAuth } from '../../context/AuthContext'

const UsersPage = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const { user: currentUser } = useAuth()

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        setLoading(true)
        try {
            const response = await api.get('/admin/users')
            setUsers(response.data)
        } catch (error) {
            console.error('Error fetching users:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleRoleUpdate = async (id, role) => {
        try {
            await api.put(`/admin/users/${id}/role`, { role })
            fetchUsers()
        } catch (error) {
            alert('Rolni o\'zgartirishda xatolik (Faqat SUPER_ADMIN huquqiga ega)')
        }
    }

    if (loading) return <div>Yuklanmoqda...</div>

    return (
        <div>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>Foydalanuvchilar</h2>
            <AdminTable headers={['ID', 'Ism', 'Email', 'Telefon', 'Rol', 'Amallar']}>
                {users.map(u => (
                    <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '15px' }}>{u.id}</td>
                        <td style={{ padding: '15px' }}>{u.fullName}</td>
                        <td style={{ padding: '15px' }}>{u.email}</td>
                        <td style={{ padding: '15px' }}>{u.phone}</td>
                        <td style={{ padding: '15px' }}>
                            <span style={{
                                color: u.role === 'SUPER_ADMIN' ? '#ff4d4d' : u.role === 'ADMIN' ? '#00ccff' : 'var(--text-muted)',
                                fontWeight: '600',
                                fontSize: '13px'
                            }}>
                                {u.role}
                            </span>
                        </td>
                        <td style={{ padding: '15px' }}>
                            {currentUser?.role === 'SUPER_ADMIN' && u.id !== currentUser.id && (
                                <select
                                    value={u.role}
                                    onChange={(e) => handleRoleUpdate(u.id, e.target.value)}
                                    style={{
                                        background: 'var(--dark-bg)',
                                        color: 'white',
                                        border: '1px solid var(--border-color)',
                                        borderRadius: '5px',
                                        padding: '5px'
                                    }}
                                >
                                    <option value="USER">USER</option>
                                    <option value="ADMIN">ADMIN</option>
                                    <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                                </select>
                            )}
                        </td>
                    </tr>
                ))}
            </AdminTable>
        </div>
    )
}

export default UsersPage
