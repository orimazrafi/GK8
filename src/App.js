import { useState, useRef, useCallback } from "react";
import "./App.css";
import useFetchScroll from "./useFetchScroll";
const url =
  "https://api.etherscan.io/api?module=account&action=tokennfttx&sort=asc&apikey=4UF4GPKSKW7G6DIJWN29DDB9MY3KS79GK1";
function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { list, hasMore, loading, error } = useFetchScroll({
    url,
    query,
    pageNumber,
    offset: 1000,
    maxPage: 2,
  });
  const observer = useRef();
  const lastTransactionElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );
  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <label>
          Ethereum address
          <input
            value={query}
            onChange={handleSearch}
            placeholder="Address..."
          />
        </label>
        <div>
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
          <div>
            {!loading && !list?.length && query && "try a different query..."}
          </div>
          <div>{loading && "Loading..."}</div>
          <div>{error && "Error"}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
