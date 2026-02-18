import { useState, useEffect } from 'react'
import api from '../../services/api'
import AdminTable from '../../components/common/AdminTable'
import { useAuth } from '../../context/AuthContext'

const UsersPage = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const { user: currentUser } = useAuth()

    useEffect(() => { fetchUsers() }, [])

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

    const getRoleStyle = (role) => {
        switch (role) {
            case 'SUPER_ADMIN': return 'bg-red-500/10 text-red-400'
            case 'ADMIN': return 'bg-secondary/10 text-secondary'
            default: return 'bg-gray-800 text-gray-400'
        }
    }

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    )

    return (
        <div>
            <h2 className="text-xl font-bold text-white mb-6">Foydalanuvchilar</h2>
            <AdminTable headers={['ID', 'Ism', 'Email', 'Telefon', 'Rol', 'Amallar']}>
                {users.map(u => (
                    <tr key={u.id} className="hover:bg-gray-800/30 transition-colors">
                        <td className="px-4 py-3 text-gray-400">{u.id}</td>
                        <td className="px-4 py-3 text-white font-medium">{u.fullName}</td>
                        <td className="px-4 py-3 text-gray-300">{u.email}</td>
                        <td className="px-4 py-3 text-gray-300">{u.phone}</td>
                        <td className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getRoleStyle(u.role)}`}>
                                {u.role}
                            </span>
                        </td>
                        <td className="px-4 py-3">
                            {currentUser?.role === 'SUPER_ADMIN' && u.id !== currentUser.id && (
                                <select
                                    value={u.role}
                                    onChange={(e) => handleRoleUpdate(u.id, e.target.value)}
                                    className="input-field !w-auto !py-1.5 !px-2 text-xs"
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
