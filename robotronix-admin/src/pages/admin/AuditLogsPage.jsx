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

    const formatDetails = (details) => {
        if (!details) return '-';
        return <span style={{ fontSize: '13px' }}>{details}</span>;
    };

    if (loading) return <div>Audit jurnali yuklanmoqda...</div>;

    return (
        <div>
            <h2 style={{ color: 'var(--text-primary)', marginBottom: '20px' }}>Audit Jurnali</h2>
            <AdminTable headers={['Vaqt', 'Admin', 'Amal', 'Resurs', 'Details']}>
                {logs.map(log => (
                    <tr key={log.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '15px' }}>{new Date(log.timestamp).toLocaleString()}</td>
                        <td style={{ padding: '15px' }}>{log.adminEmail}</td>
                        <td style={{ padding: '15px' }}>
                            <span style={{
                                background: 'rgba(0, 102, 255, 0.1)',
                                color: 'var(--primary-color)',
                                padding: '4px 10px',
                                borderRadius: '5px',
                                fontSize: '12px',
                                fontWeight: '600'
                            }}>
                                {log.action}
                            </span>
                        </td>
                        <td style={{ padding: '15px' }}>
                            {log.resourceType} {log.resourceId && `(#${log.resourceId})`}
                        </td>
                        <td style={{ padding: '15px' }}>{formatDetails(log.details)}</td>
                    </tr>
                ))}
            </AdminTable>
        </div>
    );
};

export default AuditLogsPage;
