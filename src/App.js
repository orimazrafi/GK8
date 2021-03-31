import {
  useState,
  useRef,
  useCallback
}

  from "react";
import "./App.scss";
import styled from "styled-components";
import useFetchScroll from "./useFetchScroll";
import Query from "./components/Query/Query";
import Transactions from "./components/Transactions/Transactions";
import MessageComponent from "./components/MessageComponent/MessageComponent";
const url = `https://api.etherscan.io/api?module=account&action=tokennfttx&sort=asc&apikey=${process.env.REACT_APP_API_KEY}`;

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { list, hasMore, loading, error } = useFetchScroll({ url, query, pageNumber, offset: 100, maxPage: 100 });

  const observer = useRef();
  const lastTransactionElementRef = useCallback((node) => {
    if (loading || !hasMore) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const handleSearch = ({ target: { value } }) => {
    setQuery(value);
    setPageNumber(1);
  }

  return (
    <CenterWrapper> <FlexColumnWrapper>
      <Query
        label="Ethereum address"
        value={query}
        handleChange={handleSearch}
        placeholder="Address..."
      />
      <FlexColumnWrapper>
        <Transactions
          list={list}
          lastTransactionElementRef={lastTransactionElementRef}
        />
        <MessageComponent loading={loading}
          list={list}
          query={query}
          error={error}
        />
      </FlexColumnWrapper>
    </FlexColumnWrapper>
    </CenterWrapper>);
}

export default App;

const CenterWrapper = styled.div` text-align: center;
`;

const FlexColumnWrapper = styled.div` display: flex;
align-content: center;
justify-content: center;
flex-direction: column;
`;