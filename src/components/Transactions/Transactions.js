import Transaction from "../Transaction/Transaction"
import TableWrapper from "../TableWrapper/TableWrapper"
const Transactions = ({ list, lastTransactionElementRef }) => {
  return (
    <TableWrapper list={list}>
      {list?.map((transaction, index) => {
        return (
          <Transaction
            key={Math.random()}
            lastTransactionElementRef={list.length === index + 1 ? lastTransactionElementRef : null}
            number={transaction?.number}
            date={new Date(parseInt(transaction?.time) * 1000).toLocaleDateString(
              "en-US"
            )}
            confirmation={transaction.confirmation}
            hash={transaction.hash}
            index={index + 1}
          />
        );
      })}
    </TableWrapper>
  );
};
export default Transactions;
