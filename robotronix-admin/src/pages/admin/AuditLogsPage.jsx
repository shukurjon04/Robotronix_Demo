import { useState, useEffect } from 'react';
import api from '../../services/api';
import AdminTable from '../../components/common/AdminTable';

const AuditLogsPage = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await api.get('/admin/audit-logs');
                setLogs(response.data);
            } catch (error) {
                console.error('Error fetching audit logs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div>
            <h2 className="text-xl font-bold text-white mb-6">Audit Jurnali</h2>
            <AdminTable headers={['Vaqt', 'Admin', 'Amal', 'Resurs', 'Details']}>
                {logs.map(log => (
                    <tr key={log.id} className="hover:bg-gray-800/30 transition-colors">
                        <td className="px-4 py-3 text-gray-400 text-sm whitespace-nowrap">{new Date(log.timestamp).toLocaleString()}</td>
                        <td className="px-4 py-3 text-gray-300">{log.adminEmail}</td>
                        <td className="px-4 py-3">
                            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-primary/10 text-primary">
                                {log.action}
                            </span>
                        </td>
                        <td className="px-4 py-3 text-gray-300">
                            {log.resourceType} {log.resourceId && `(#${log.resourceId})`}
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-sm">{log.details || '—'}</td>
                    </tr>
                ))}
            </AdminTable>
        </div>
    );
};

export default AuditLogsPage;
