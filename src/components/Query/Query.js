import styled from 'styled-components';

const Query = ({ value, handleChange, placeholder }) => {
  return (
    <InputWrapper>
      Ethereum address:
      <input value={value} onChange={handleChange} placeholder={placeholder} />
    </InputWrapper>
  );
};
export default Query;

const InputWrapper = styled.label`
  font-size:1rem;
  font-weight:600;
  input{
    margin-left:0.625rem;
    font-size:1rem;
    padding:.5rem;
    border-radius:.25rem;
  }
`;
