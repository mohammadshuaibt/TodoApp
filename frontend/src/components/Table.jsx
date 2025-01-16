function Table({ todo, loading }) {
    if (loading) {
        return <p>Loading...</p>; // Show loading state
    }

    if (!Array.isArray(todo)) {
        return <p>No todos available.</p>; // Handle case where todo is not an array
    }

    return (
        <div className="container">
            <table className="table table-bordered table-striped text-center">
                <thead>
                    <tr>
                        <th className="p-3">CheckBox</th>
                        <th className="p-3">Todo Item</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Date Created</th>
                        <th className="p-3">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {todo.map((item, index) => (
                        <tr key={index}>
                            <td className="text-center p-3">
                                <input type="checkbox" />
                            </td>
                            <td className="text-center p-3">{item.body}</td>
                            <td className="text-center p-3">
                                <span className={`p-2 ${item.completed ? `bg-success`: `bg-danger`}`}>{item.completed ? 'Completed' : 'Pending'}</span>
                            </td>
                            <td className="text-center p-3">{new Date (item.created_at).toLocaleString()}</td>
                            <td className="text-center p-3">Edit | Delete</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table;