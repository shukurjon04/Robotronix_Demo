import { useState, useEffect } from 'react'
import api from '../../services/api'
import AdminTable from '../../components/common/AdminTable'

const EnrollmentsPage = () => {
    const [enrollments, setEnrollments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchEnrollments()
    }, [])

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

    if (loading) return <div>Yuklanmoqda...</div>

    return (
        <div>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>Ro'yxatlar (Enrollments)</h2>
            <AdminTable headers={['ID', 'Foydalanuvchi', 'Kurs', 'Holat', 'Sana', 'Amallar']}>
                {enrollments.map(e => (
                    <tr key={e.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '15px' }}>{e.id}</td>
                        <td style={{ padding: '15px' }}>
                            <div style={{ fontWeight: '600' }}>{e.user.fullName}</div>
                            <small style={{ color: 'var(--text-muted)' }}>{e.user.phone}</small>
                        </td>
                        <td style={{ padding: '15px' }}>{e.course.title}</td>
                        <td style={{ padding: '15px' }}>
                            <span style={{
                                padding: '4px 10px',
                                borderRadius: '15px',
                                fontSize: '12px',
                                background: e.status === 'CONFIRMED' ? '#10b98120' : e.status === 'PENDING' ? '#ffcc0020' : '#ff4d4d20',
                                color: e.status === 'CONFIRMED' ? '#10b981' : e.status === 'PENDING' ? '#ffcc00' : '#ff4d4d'
                            }}>
                                {e.status}
                            </span>
                        </td>
                        <td style={{ padding: '15px' }}>{new Date(e.enrolledAt).toLocaleDateString()}</td>
                        <td style={{ padding: '15px' }}>
                            <select
                                value={e.status}
                                onChange={(opt) => handleStatusUpdate(e.id, opt.target.value)}
                                style={{
                                    background: 'var(--dark-bg)',
                                    color: 'white',
                                    border: '1px solid var(--border-color)',
                                    borderRadius: '5px',
                                    padding: '5px'
                                }}
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
