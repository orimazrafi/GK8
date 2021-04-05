import {
  useState,
  useRef,
  useCallback
}
  from "react";
import "./App.scss";
import styled from "styled-components";
import useFetchScroll from "./useFetchScroll";
import { url } from "./helpers"
import Query from "./components/Query/Query";
import Transactions from "./components/Transactions/Transactions";
import MessageComponent from "./components/MessageComponent/MessageComponent";
//0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae
//0x2c1ba59d6f58433fb1eaee7d20b26ed83bda51a3
//0x4e83362442b8d1bec281594cea3050c8eb01311c
//0x6975be450864c02b4613023c2152ee0743572325
//0x9dd134d14d1e65f84b706d6f205cd5b1cd03a46b
//0x41933422DC4a1cb8C822e06f12f7b52fA5E7E094 
//0x0516cbB0bdeA3A8c782D3eC6388283e2860Fdc8B
//0x206c813FF7B5cd890F0f385A3a87bf19F594f389  
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

  const handleSearch = async ({ target: { value } }) => {
    setQuery(value);
    setPageNumber(1);
  }

  return (
    <CenterWrapper>
      <FlexColumnWrapper>
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