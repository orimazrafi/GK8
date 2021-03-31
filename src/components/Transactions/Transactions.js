const Transactions = ({ list, lastTransactionElementRef }) => {
  return (
    <>
      {list?.map((transaction, index) => {
        if (list.length === index + 1) {
          return (
            <div ref={lastTransactionElementRef} key={transaction}>
              {transaction}
            </div>
          );
        } else {
          return <div key={transaction}>{transaction}</div>;
        }
      })}
    </>
  );
};
export default Transactions;
