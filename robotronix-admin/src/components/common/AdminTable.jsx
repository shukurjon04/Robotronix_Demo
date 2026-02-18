const AdminTable = ({ headers, children }) => {
    return (
        <div className="card overflow-hidden !p-0">
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b border-gray-800 bg-dark">
                            {headers.map((header, index) => (
                                <th
                                    key={index}
                                    className="text-left px-4 py-3 text-gray-400 font-medium text-xs uppercase tracking-wider"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50">
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminTable
