

function Table() {

    const thcss = 'p-3'
    const tdcss = "text-center p-3"
    return (
    <>
        <div className="container">
            <table className="table table-bordered table-striped text-center">
                <thead>
                    <tr>
                        <th className={thcss}>CheckBox</th>
                        <th className={thcss}>Todo Item</th>
                        <th className={thcss}>Status</th>
                        <th className={thcss}>Date Created</th>
                        <th className={thcss}>Options</th>
                    </tr>
                </thead>
                {/* contents */}
                
                <tbody>
                    <tr>
                        <td className="text-center p-3">
                            <input type="checkbox" />
                        </td>
                        <td className={tdcss}>Sample Todo Item</td>
                        <td className={tdcss}>In Progress</td>
                        <td className={tdcss}>2023-10-01</td>
                        <td className={tdcss}>Edit | Delete</td>
                    </tr>
                    {/* Add more rows as needed */}
                </tbody>
            </table>
        </div>
    </>);
}

export default Table;