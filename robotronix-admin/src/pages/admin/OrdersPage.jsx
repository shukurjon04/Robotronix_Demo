import { useState, useEffect } from 'react'
import api from '../../services/api'
import AdminTable from '../../components/common/AdminTable'

const OrdersPage = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        setLoading(true)
        try {
            const response = await api.get('/admin/orders')
            setOrders(response.data)
        } catch (error) {
            console.error('Error fetching orders:', error)
        } finally {
            setLoading(false)
        }
    }

    const updateStatus = async (id, newStatus) => {
        try {
            await api.put(`/admin/orders/${id}/status`, { status: newStatus })
            fetchOrders()
        } catch (error) {
            alert('Statusni yangilashda xatolik')
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING': return '#ffcc00'
            case 'CONFIRMED': return '#00ccff'
            case 'SHIPPED': return '#8b5cf6'
            case 'DELIVERED': return '#10b981'
            case 'CANCELLED': return '#ff4d4d'
            default: return 'var(--text-muted)'
        }
    }

    if (loading) return <div>Yuklanmoqda...</div>

    return (
        <div>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>Buyurtmalar</h2>
            <AdminTable headers={['ID', 'Mijoz', 'Tel', 'Summa', 'Status', 'Sana', 'Amallar']}>
                {orders.map(order => (
                    <tr key={order.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '15px' }}>#{order.id}</td>
                        <td style={{ padding: '15px' }}>{order.user?.fullName}</td>
                        <td style={{ padding: '15px' }}>{order.contactPhone}</td>
                        <td style={{ padding: '15px' }}>{order.totalAmount.toLocaleString()} sum</td>
                        <td style={{ padding: '15px' }}>
                            <span style={{
                                color: getStatusColor(order.status),
                                background: `${getStatusColor(order.status)}20`,
                                padding: '4px 10px',
                                borderRadius: '15px',
                                fontSize: '12px',
                                fontWeight: '600'
                            }}>
                                {order.status}
                            </span>
                        </td>
                        <td style={{ padding: '15px' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td style={{ padding: '15px' }}>
                            <select
                                value={order.status}
                                onChange={(e) => updateStatus(order.id, e.target.value)}
                                style={{
                                    background: 'var(--dark-bg)',
                                    color: 'white',
                                    border: '1px solid var(--border-color)',
                                    padding: '5px',
                                    borderRadius: '5px',
                                    fontSize: '12px'
                                }}
                            >
                                <option value="PENDING">Kutilmoqda</option>
                                <option value="CONFIRMED">Tasdiqlandi</option>
                                <option value="SHIPPED">Yuborildi</option>
                                <option value="DELIVERED">Yetkazildi</option>
                                <option value="CANCELLED">Bekor qilindi</option>
                            </select>
                        </td>
                    </tr>
                ))}
            </AdminTable>
        </div>
    )
}

export default OrdersPage
