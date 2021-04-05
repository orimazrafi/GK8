
const Transaction = ({ lastTransactionElementRef, index, number, date, confirmation, hash }) => {
    return (
        <tr ref={lastTransactionElementRef} key={Math.random()} className="transaction">
            <td>{index}.</td>
            <td> {number}</td>
            <td>   {date}</td>
            <td>{confirmation}</td>
            <td>{hash}</td>

        </tr>)
}
export default Transaction
