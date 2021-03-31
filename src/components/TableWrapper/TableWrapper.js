const TableWrapper = ({ children, list }) => (
    <table>
        {list?.length > 0 &&
            <thead>
                <tr className="transaction--headline">
                    <th>Number</th>
                    <th>Value</th>
                    <th>Date</th>
                    <th>confirmation</th>
                    <th>Hash</th>
                </tr>
            </thead>
        }
        <tbody>
            {children}
        </tbody>

    </table>
)

export default TableWrapper
