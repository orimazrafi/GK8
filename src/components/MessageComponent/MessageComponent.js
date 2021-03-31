import styled from "styled-components";

const MessageComponent = ({ loading, list, query, error }) => {
  return (
    <>
      <MessageWrapper>
        {!loading &&
          !list?.length &&
          query &&
          "No results. Try a different query..."}
      </MessageWrapper>
      <MessageWrapper>{loading && query && "Loading..."}</MessageWrapper>
      <MessageWrapper>{error && "Error"}</MessageWrapper>
    </>
  );
};
export default MessageComponent;

const MessageWrapper = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-top: 10px;
`;
