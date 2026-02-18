import { useState, useEffect } from 'react'
import api from '../../services/api'
import AdminTable from '../../components/common/AdminTable'

const OrdersPage = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => { fetchOrders() }, [])

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

    const getStatusStyle = (status) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-500/10 text-yellow-400'
            case 'CONFIRMED': return 'bg-secondary/10 text-secondary'
            case 'SHIPPED': return 'bg-purple-500/10 text-purple-400'
            case 'DELIVERED': return 'bg-emerald-500/10 text-emerald-400'
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
            <h2 className="text-xl font-bold text-white mb-6">Buyurtmalar</h2>
            <AdminTable headers={['ID', 'Mijoz', 'Tel', 'Summa', 'Status', 'Sana', 'Amallar']}>
                {orders.map(order => (
                    <tr key={order.id} className="hover:bg-gray-800/30 transition-colors">
                        <td className="px-4 py-3 text-gray-400">#{order.id}</td>
                        <td className="px-4 py-3 text-white font-medium">{order.user?.fullName}</td>
                        <td className="px-4 py-3 text-gray-300">{order.contactPhone}</td>
                        <td className="px-4 py-3 text-gray-300 font-medium">{order.totalAmount.toLocaleString()} sum</td>
                        <td className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusStyle(order.status)}`}>
                                {order.status}
                            </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                            <select
                                value={order.status}
                                onChange={(e) => updateStatus(order.id, e.target.value)}
                                className="input-field !w-auto !py-1.5 !px-2 text-xs"
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
