import { useState, useEffect } from 'react'
import api from '../../services/api'
import AdminTable from '../../components/common/AdminTable'

const EnrollmentsPage = () => {
    const [enrollments, setEnrollments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => { fetchEnrollments() }, [])

    const fetchEnrollments = async () => {
        setLoading(true)
        try {
            const response = await api.get('/admin/enrollments')
            setEnrollments(response.data)
        } catch (error) {
            console.error('Error fetching enrollments:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleStatusUpdate = async (id, status) => {
        try {
            await api.put(`/admin/enrollments/${id}/status`, { status })
            fetchEnrollments()
        } catch (error) {
            alert('Xatolik yuz berdi')
        }
    }

    const getStatusStyle = (status) => {
        switch (status) {
            case 'CONFIRMED': return 'bg-emerald-500/10 text-emerald-400'
            case 'PENDING': return 'bg-yellow-500/10 text-yellow-400'
            case 'CANCELLED': return 'bg-red-500/10 text-red-400'
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
            <h2 className="text-xl font-bold text-white mb-6">Ro'yxatlar (Enrollments)</h2>
            <AdminTable headers={['ID', 'Foydalanuvchi', 'Kurs', 'Holat', 'Sana', 'Amallar']}>
                {enrollments.map(e => (
                    <tr key={e.id} className="hover:bg-gray-800/30 transition-colors">
                        <td className="px-4 py-3 text-gray-400">{e.id}</td>
                        <td className="px-4 py-3">
                            <div className="text-white font-medium">{e.user.fullName}</div>
                            <div className="text-gray-500 text-xs">{e.user.phone}</div>
                        </td>
                        <td className="px-4 py-3 text-gray-300">{e.course.title}</td>
                        <td className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusStyle(e.status)}`}>
                                {e.status}
                            </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-sm">{new Date(e.enrolledAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                            <select
                                value={e.status}
                                onChange={(opt) => handleStatusUpdate(e.id, opt.target.value)}
                                className="input-field !w-auto !py-1.5 !px-2 text-xs"
                            >
                                <option value="PENDING">Kutilmoqda</option>
                                <option value="CONFIRMED">Tasdiqlandi</option>
                                <option value="CANCELLED">Bekor qilindi</option>
                            </select>
                        </td>
                    </tr>
                ))}
            </AdminTable>
        </div>
    )
}

export default EnrollmentsPage
