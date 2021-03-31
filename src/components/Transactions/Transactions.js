const Transactions = ({ list, lastTransactionElementRef }) => {
  return (
    <>
      {list?.map((transaction, index) => {
        if (list.length === index + 1) {
          return (
            <div ref={lastTransactionElementRef} key={transaction.hash}>
              {transaction?.number}
              {new Date(parseInt(transaction?.time) * 1000).toLocaleDateString(
                "en-US"
              )}
            </div>
          );
        } else {
          return <div key={transaction.hash}>{transaction?.number}</div>;
        }
      })}
    </>
  );
};
export default Transactions;
