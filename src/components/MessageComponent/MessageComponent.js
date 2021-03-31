import styled from "styled-components";
import LoaderComponent from "../Loader/Loader";

const MessageComponent = ({ loading, list, query, error }) => {
  return (
    <>
      <MessageWrapper>
        {!loading &&
          !list?.length &&
          query &&
          "No results. Try a different query..."}
      </MessageWrapper>
      <MessageWrapper>{loading && query && <LoaderComponent />}</MessageWrapper>
      <MessageWrapper>{error && "Error"}</MessageWrapper>
    </>
  );
};
export default MessageComponent;

const MessageWrapper = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom:0.75rem;
`;
